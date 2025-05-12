import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, X, Image, Video, FileSpreadsheet, FileArchive, Download, File, Check, AlertCircle, CheckCircle } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
}

// Toast notification component
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: 'bg-green-100 border-green-400 text-green-800',
    error: 'bg-red-100 border-red-400 text-red-800',
    info: 'bg-blue-100 border-blue-400 text-blue-800'
  }[type];

  const Icon = {
    success: <CheckCircle size={18} className="text-green-500" />,
    error: <AlertCircle size={18} className="text-red-500" />,
    info: <AlertCircle size={18} className="text-blue-500" />
  }[type];

  return (
    <div className={`fixed top-4 right-4 flex items-center p-4 mb-4 rounded-lg border ${bgColor} z-50 shadow-lg animate-fade-in-down`}>
      <div className="inline-flex items-center justify-center flex-shrink-0 mr-2">
        {Icon}
      </div>
      <div className="text-sm font-medium">{message}</div>
      <button
        type="button"
        className="ml-4 -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 hover:bg-gray-200 hover:bg-opacity-30"
        onClick={onClose}
      >
        <X size={16} />
      </button>
    </div>
  );
};

const DeliverablesSection: React.FC = () => {
  // UI state
  const [isDragging, setIsDragging] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [recentlyUploaded, setRecentlyUploaded] = useState<string[]>([]);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'info' }>({ 
    show: false, 
    message: '', 
    type: 'info' 
  });
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'complete'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'fileManager' | 'activity'>('fileManager');

  // Mock data for client submissions and admin deliverables
  const clientSubmissions: FileItem[] = [
    { id: '1', name: 'Requirements Document.pdf', type: 'PDF', size: 1500000, uploadedAt: new Date(2023, 3, 10) },
    { id: '2', name: 'Brand Guidelines.docx', type: 'DOCX', size: 2200000, uploadedAt: new Date(2023, 3, 12) },
    { id: '3', name: 'Logo Inspiration.zip', type: 'ZIP', size: 5600000, uploadedAt: new Date(2023, 3, 15) },
  ];
  
  const adminDeliverables: FileItem[] = [
    { id: '1', name: 'Project Proposal.pdf', type: 'PDF', size: 2500000, uploadedAt: new Date(2023, 3, 15) },
    { id: '2', name: 'Marketing Strategy.docx', type: 'DOCX', size: 1800000, uploadedAt: new Date(2023, 3, 18) },
    { id: '3', name: 'Logo Design Final.png', type: 'PNG', size: 4200000, uploadedAt: new Date(2023, 3, 20) },
    { id: '4', name: 'Social Media Assets.zip', type: 'ZIP', size: 15000000, uploadedAt: new Date(2023, 3, 22) },
    { id: '5', name: 'Marketing Video.mp4', type: 'MP4', size: 28500000, uploadedAt: new Date(2023, 3, 25) },
    { id: '6', name: 'Analytics Report.xlsx', type: 'XLSX', size: 1800000, uploadedAt: new Date(2023, 3, 28) },
  ];

  // File drag and drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      setIsUploadOpen(true);
      
      // Initialize progress for each file
      const newProgress: {[key: string]: number} = {};
      newFiles.forEach(file => {
        newProgress[file.name] = 0;
      });
      setUploadProgress(prev => ({ ...prev, ...newProgress }));
    }
  };

  // File input change handler
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      setIsUploadOpen(true);
      
      // Initialize progress for each file
      const newProgress: {[key: string]: number} = {};
      newFiles.forEach(file => {
        newProgress[file.name] = 0;
      });
      setUploadProgress(prev => ({ ...prev, ...newProgress }));
    }
  };

  // Remove file from upload list
  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    
    // Remove progress for this file
    if (fileToRemove) {
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fileToRemove.name];
        return newProgress;
      });
    }
    
    // Close upload area if no files left
    if (files.length <= 1) {
      setIsUploadOpen(false);
    }
  };
  
  // Simulate file upload with progress
  const simulateUpload = () => {
    // Simulate upload progress for each file
    const fileNames = files.map(file => file.name);
    const totalSize = files.reduce((total, file) => total + file.size, 0);
    const isLargeUpload = totalSize > 5 * 1024 * 1024; // Consider uploads larger than 5MB as "large"
    
    // Update upload status
    setUploadStatus('uploading');
    
    // Show initial toast for large uploads
    if (isLargeUpload) {
      setToast({
        show: true,
        message: `Uploading ${files.length} file${files.length > 1 ? 's' : ''} (${formatFileSize(totalSize)})...`,
        type: 'info'
      });
    }
    
    // Start progress simulation
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        let allComplete = true;
        let totalProgress = 0;
        
        fileNames.forEach(name => {
          if (newProgress[name] < 100) {
            // Increment by a random amount between 5-15%
            // Make large files upload more slowly to simulate realistic behavior
            const fileSize = files.find(f => f.name === name)?.size || 0;
            const increment = fileSize > 1024 * 1024 ? 
              Math.floor(Math.random() * 5) + 3 : // Slower for large files
              Math.floor(Math.random() * 10) + 5; // Faster for small files
            
            newProgress[name] += increment;
            
            // Cap at 100%
            if (newProgress[name] > 100) newProgress[name] = 100;
            
            if (newProgress[name] < 100) allComplete = false;
          }
          
          totalProgress += newProgress[name];
        });
        
        // Calculate average progress for all files
        const averageProgress = Math.floor(totalProgress / fileNames.length);
        
        // Update progress toast for large uploads
        if (isLargeUpload && averageProgress % 20 === 0 && averageProgress < 100) {
          setToast({
            show: true,
            message: `Upload in progress: ${averageProgress}% complete`,
            type: 'info'
          });
        }
        
        // If all files are uploaded, clear the interval
        if (allComplete) {
          clearInterval(interval);
          setUploadStatus('complete');
          
          // Show completion toast
          setToast({
            show: true,
            message: `Successfully uploaded ${files.length} file${files.length > 1 ? 's' : ''}!`,
            type: 'success'
          });
          
          // Add files to deliverables (in a real app, this would happen after server confirms upload)
          setTimeout(() => {
            // Mark these files as recently uploaded
            setRecentlyUploaded(fileNames);
            
            // Clear the upload area
            setFiles([]);
            setUploadProgress({});
            setIsUploadOpen(false);
            setUploadStatus('idle');
            
            // Clear the "recently uploaded" status after 10 seconds
            setTimeout(() => {
              setRecentlyUploaded([]);
            }, 10000);
          }, 500);
        }
        
        return newProgress;
      });
    }, 300);
  };

  // Utility functions
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'short', 
      year: 'numeric'
    });
  };
  
  // Get appropriate icon based on file type
  const getFileIcon = (fileType: string) => {
    const iconSize = 24;
    const iconColor = 'text-indigo-600';
    
    switch(fileType.toLowerCase()) {
      case 'pdf':
        return <FileText size={iconSize} className={iconColor} />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Image size={iconSize} className={iconColor} />;
      case 'mp4':
      case 'mov':
      case 'avi':
        return <Video size={iconSize} className={iconColor} />;
      case 'xlsx':
      case 'xls':
      case 'csv':
        return <FileSpreadsheet size={iconSize} className={iconColor} />;
      case 'zip':
      case 'rar':
        return <FileArchive size={iconSize} className={iconColor} />;
      default:
        return <File size={iconSize} className={iconColor} />;
    }
  };
  
  // Truncate filename if too long
  const truncateFilename = (filename: string, maxLength: number = 20): string => {
    if (filename.length <= maxLength) return filename;
    
    const extension = filename.split('.').pop() || '';
    const nameWithoutExtension = filename.substring(0, filename.lastIndexOf('.'));
    
    const truncatedName = nameWithoutExtension.substring(0, maxLength - extension.length - 3) + '...';
    return `${truncatedName}.${extension}`;
  };

  // Render a file item - Used in the component JSX below
  const renderFileItem = (file: FileItem, showSentBadge: boolean = false) => (
    <div key={file.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex items-center py-2 px-3 mb-2">
      <div className="relative flex-shrink-0 mr-3">
        <div className="p-1.5 bg-indigo-50 rounded-lg">
          {getFileIcon(file.type)}
        </div>
        <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-gray-100 text-gray-600 px-1 py-0 rounded-sm border border-gray-200 leading-tight">
          {file.type}
        </span>
      </div>
      <div className="flex-1 min-w-0 overflow-hidden"> {/* min-width-0 and overflow-hidden ensure truncation works */}
        <div className="flex flex-row items-center">
          <h3 className="text-sm font-medium text-gray-800 truncate flex-1 pr-2" title={file.name}>
            {truncateFilename(file.name, 24)}
          </h3>
          {showSentBadge && recentlyUploaded.includes(file.name) && (
            <span className="flex-shrink-0 flex items-center text-xs font-medium bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
              <Check size={10} className="mr-0.5" />
              Sent
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-xs text-gray-500 truncate">{formatDate(file.uploadedAt)}</span>
          <button className="flex-shrink-0 p-1 bg-indigo-50 hover:bg-indigo-100 rounded-full transition-colors ml-2" title="Download file">
            <Download size={14} className="text-indigo-600" />
          </button>
        </div>
      </div>
    </div>
  );

  // Render the upload progress for a file - Used in the component JSX below
  const renderUploadProgress = (file: File, index: number) => (
    <div key={index} className="flex items-center mb-3">
      <div className="flex items-center flex-1 overflow-hidden">
        <div className="flex-shrink-0 p-2 bg-indigo-50 rounded mr-3">
          {getFileIcon(file.name.split('.').pop() || '')}
        </div>
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex items-center mb-1">
            <p className="text-sm font-medium truncate flex-1 mr-2" title={file.name}>
              {file.name.length > 25 ? truncateFilename(file.name, 25) : file.name}
            </p>
            <p className="flex-shrink-0 text-xs text-gray-500">{formatFileSize(file.size)}</p>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress[file.name] || 0}%` }}
            ></div>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 flex-shrink-0">
              {uploadProgress[file.name] === 100 ? 
                'Complete' : 
                `${uploadProgress[file.name] || 0}%`
              }
            </span>
            <div className="flex-1"></div>
            {uploadProgress[file.name] !== 100 && (
              <button 
                onClick={() => removeFile(index)}
                className="text-xs text-red-500 hover:text-red-700 flex-shrink-0"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Add CSS animation for toast
  useEffect(() => {
    // Add the animation styles to the document if they don't exist
    if (!document.getElementById('toast-animations')) {
      const style = document.createElement('style');
      style.id = 'toast-animations';
      style.innerHTML = `
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Close toast handler
  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  return (
    <div className="relative p-6">
      {/* Toast notification */}
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={handleCloseToast} 
        />
      )}
      {/* Page Header */}
      <div className="sticky top-0 z-5 bg-gray-50 -mx-6 px-6 py-4 flex justify-between items-center mb-6 border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">File Manager</h1>
        <input 
          ref={fileInputRef}
          type="file" 
          multiple 
          className="hidden" 
          onChange={handleFileInputChange}
        />
      </div>
      
      {/* Split layout - Two equal halves */}
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        {/* Left Half - Upload and Submissions Section */}
        <div className="lg:w-1/2 mb-6 lg:mb-0">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Upload Section */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Submit Documents</h2>
                  <p className="text-sm text-gray-500">Upload your project documents</p>
                </div>
                {isUploadOpen && files.length > 0 && (
                  <button 
                    className="p-1.5 hover:bg-gray-100 rounded-full"
                    onClick={() => setIsUploadOpen(false)}
                  >
                    <X size={16} className="text-gray-500" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Upload Content */}
            <div className="p-4">
              {isUploadOpen && files.length > 0 ? (
                <div className="space-y-3">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex items-center flex-1 overflow-hidden">
                        <div className="flex-shrink-0 p-2 bg-indigo-50 rounded mr-3">
                          {getFileIcon(file.name.split('.').pop() || '')}
                        </div>
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <div className="flex items-center mb-1">
                            <p className="text-sm font-medium truncate flex-1 mr-2" title={file.name}>
                              {file.name.length > 25 ? truncateFilename(file.name, 25) : file.name}
                            </p>
                            <p className="flex-shrink-0 text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                          {/* Progress bar */}
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
                              style={{ width: `${uploadProgress[file.name] || 0}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 flex-shrink-0">
                              {uploadProgress[file.name] === 100 ? 
                                'Complete' : 
                                `${uploadProgress[file.name] || 0}%`
                              }
                            </span>
                            <div className="flex-1"></div>
                            {uploadProgress[file.name] !== 100 && (
                              <button 
                                onClick={() => removeFile(index)}
                                className="text-xs text-red-500 hover:text-red-700 flex-shrink-0"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Action buttons */}
                  <div className="pt-4 flex justify-end border-t border-gray-100 mt-4">
                    <div className="flex flex-col w-full">
                    {/* Upload status indicator */}
                    {uploadStatus === 'uploading' && files.length > 0 && (
                      <div className="mb-3 p-2 bg-blue-50 border border-blue-100 rounded-md">
                        <div className="flex items-center">
                          <div className="mr-2 relative">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                          </div>
                          <p className="text-xs text-blue-700">
                            Uploading files... Please wait until the upload completes.
                          </p>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300 ease-out"
                            style={{ 
                              width: `${Math.floor(
                                Object.values(uploadProgress).reduce((sum, val) => sum + val, 0) / 
                                (Object.values(uploadProgress).length * 100) * 100
                              )}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Upload success indicator */}
                    {uploadStatus === 'complete' && (
                      <div className="mb-3 p-2 bg-green-50 border border-green-100 rounded-md">
                        <div className="flex items-center">
                          <CheckCircle size={16} className="mr-2 text-green-600" />
                          <p className="text-xs text-green-700">
                            All files uploaded successfully! They will appear in your submissions list.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end">
                      <button 
                        onClick={simulateUpload}
                        disabled={Object.values(uploadProgress).some(progress => progress > 0 && progress < 100)}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                      >
                        {Object.values(uploadProgress).some(progress => progress > 0) ? 
                          'Uploading...' : 'Upload All Files'}
                      </button>
                    </div>
                  </div>
                  </div>
                </div>
              ) : (
                /* Drag & Drop Area */
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center h-40 flex flex-col items-center justify-center ${
                    isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload size={36} className={`mb-3 ${isDragging ? 'text-indigo-500' : 'text-gray-400'}`} />
                  <p className="text-sm text-gray-600 mb-2">
                    {isDragging ? 'Drop files here' : 'Drag and drop files here'}
                  </p>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-md hover:bg-indigo-200 transition-colors"
                  >
                    Click to select files
                  </button>
                </div>
              )}
            </div>
            
            {/* Client Submissions List - Directly below uploader */}
            <div className="border-t border-gray-200">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-sm font-medium text-gray-700">Your Submitted Documents</h3>
                <p className="text-xs text-gray-500">Documents You've Submitted</p>
              </div>
              
              {clientSubmissions.length > 0 ? (
                <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
                  <div className="space-y-2">
                    {clientSubmissions.map((file) => (
                      <div key={file.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex items-center py-2 px-3">
                        <div className="relative flex-shrink-0 mr-3">
                          <div className="p-1.5 bg-indigo-50 rounded-lg">
                            {getFileIcon(file.type)}
                          </div>
                          <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-gray-100 text-gray-600 px-1 py-0 rounded-sm border border-gray-200 leading-tight">
                            {file.type}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-row items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-800 truncate" title={file.name}>
                              {truncateFilename(file.name, 24)}
                            </h3>
                          </div>
                          
                          <div className="flex items-center justify-between mt-0.5">
                            <span className="text-xs text-gray-500">{formatDate(file.uploadedAt)}</span>
                            <button className="p-1 bg-indigo-50 hover:bg-indigo-100 rounded-full transition-colors" title="Download file">
                              <Download size={14} className="text-indigo-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">No submitted documents yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow overflow-hidden h-full">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Your Deliverables</h2>
              <p className="text-sm text-gray-500">Completed documents ready for download</p>
            </div>
            
            {adminDeliverables.length > 0 ? (
              <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
                {/* Grid view for desktop, list view for mobile */}
                <div className="space-y-2">
                  {adminDeliverables.map((file) => (
                    <div key={file.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex items-center py-2 px-3">
                      <div className="relative flex-shrink-0 mr-3">
                        <div className="p-1.5 bg-indigo-50 rounded-lg">
                          {getFileIcon(file.type)}
                        </div>
                        <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-gray-100 text-gray-600 px-1 py-0 rounded-sm border border-gray-200 leading-tight">
                          {file.type}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0"> {/* min-width-0 allows truncation to work */}
                        <div className="flex flex-row items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-800 truncate" title={file.name}>
                            {truncateFilename(file.name, 24)}
                          </h3>
                          {recentlyUploaded.includes(file.name) && (
                            <span className="flex items-center text-xs font-medium bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full ml-2">
                              <Check size={10} className="mr-0.5" />
                              Sent
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="text-xs text-gray-500">{formatDate(file.uploadedAt)}</span>
                          <button className="p-1 bg-indigo-50 hover:bg-indigo-100 rounded-full transition-colors" title="Download file">
                            <Download size={14} className="text-indigo-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">No deliverables available yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliverablesSection;
