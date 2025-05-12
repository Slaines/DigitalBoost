import React, { useState, useMemo } from 'react';
import {
  Plus,
  Clock,
  ChevronDown,
  Filter,
  SortAsc,
  Pencil,
  Eye,
  Loader
} from '../../utils/icons';
import { useProjects } from '../../api/hooks';

// Import utility functions
import { 
  ProjectStatus,
  SortOption,
  getDaysRemaining,
  getProjectStatus,
  calculateProgress,
  getNextMilestone,
  filterAndSortProjects
} from '../../utils/projects/projectUtils';
import { getStatusBadgeStyle, formatDaysRemaining } from '../../utils/projects/uiUtils';

interface Props {
  canCreateProject?: boolean; // default false
  onCreateProject?(): void; // "+New Project" click
}

const ProjectTrackingSection: React.FC<Props> = ({
  canCreateProject = false,
  onCreateProject
}) => {
  // Using TanStack Query to fetch projects
  const { data: projects = [], isLoading, error } = useProjects();
  
  // State for filtering and sorting - moved to top level before any conditional returns
  const [statusFilter, setStatusFilter] = useState<ProjectStatus>('All');
  const [sortOption, setSortOption] = useState<SortOption>('Name A ▸ Z');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  // Filter and sort projects using utility functions
  const filteredAndSortedProjects = useMemo(() => {
    return filterAndSortProjects(projects, statusFilter, sortOption);
  }, [projects, statusFilter, sortOption]);
  
  // Show loading state - moved after all hooks
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 flex flex-col items-center justify-center h-64">
        <Loader className="animate-spin text-indigo-600 mb-4" size={32} />
        <p className="text-gray-500">Loading projects...</p>
      </div>
    );
  }
  
  // Show error state - moved after all hooks
  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <p className="text-red-500">Failed to load projects. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar with filter and sort options */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        {/* Header actions */}
        <div className="flex items-center space-x-4">
          {/* Filter dropdown */}
          <div className="relative">
            <button 
              className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <Filter size={16} className="mr-2 text-gray-500" />
              Filter: {statusFilter}
              <ChevronDown size={16} className="ml-2 text-gray-500" />
            </button>
            
            {showFilterDropdown && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                {(['All', 'Planning', 'In Progress', 'Completed'] as ProjectStatus[]).map((status) => (
                  <button
                    key={status}
                    className={`block w-full text-left px-4 py-2 text-sm ${statusFilter === status ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => {
                      setStatusFilter(status);
                      setShowFilterDropdown(false);
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Sort dropdown */}
          <div className="relative">
            <button 
              className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              <SortAsc size={16} className="mr-2 text-gray-500" />
              Sort: {sortOption}
              <ChevronDown size={16} className="ml-2 text-gray-500" />
            </button>
            
            {showSortDropdown && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                {(['Name A ▸ Z', '% Complete', 'Due Date'] as SortOption[]).map((option) => (
                  <button
                    key={option}
                    className={`block w-full text-left px-4 py-2 text-sm ${sortOption === option ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => {
                      setSortOption(option);
                      setShowSortDropdown(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* New Project button */}
        {canCreateProject && onCreateProject && (
          <button
            onClick={onCreateProject}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            New Project
          </button>
        )}
      </div>

      {/* Project Cards Grid */}
      {filteredAndSortedProjects.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAndSortedProjects.map(project => {
            const progress = calculateProgress(project.milestones);
            const status = getProjectStatus(project);
            const nextMilestone = getNextMilestone(project);
            const completedCount = project.milestones.filter(m => m.status === 'done').length;
            
            return (
              <div 
                key={project.id} 
                className="bg-white rounded-2xl shadow hover:shadow-md transition-shadow p-6 relative group"
              >
                {/* Title row with status badge */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">{project.name}</h2>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeStyle(status)}`}>
                    {status}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="flex items-center mb-3">
                  <div className="flex-grow bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{progress}%</span>
                </div>
                
                {/* Milestones info */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500">
                    {completedCount} / {project.milestones.length} milestones completed
                  </p>
                  
                  {nextMilestone && (
                    <div className="flex items-center mt-2 text-sm text-gray-700">
                      <Clock size={14} className="mr-1 text-indigo-500" />
                      <span>
                        Next: <span className="font-medium">{nextMilestone.title}</span>
                        {getDaysRemaining(nextMilestone.dueDate) > 0 ? (
                          <span className="ml-1 text-gray-500">
                            ({formatDaysRemaining(getDaysRemaining(nextMilestone.dueDate))})
                          </span>
                        ) : (
                          <span className="ml-1 text-red-500 font-medium">
                            ({formatDaysRemaining(getDaysRemaining(nextMilestone.dueDate))})
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Action buttons (visible on hover) */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                  <button 
                    className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                    title="Edit project"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Edit project: ${project.name}`);
                    }}
                  >
                    <Pencil size={14} />
                  </button>
                  <button 
                    className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                    title="View details"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`View details: ${project.name}`);
                    }}
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty state */
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-500 mb-4">
              No projects match the current filter. Try changing the filter or clicking 'All'.
            </p>
            <button
              onClick={() => setStatusFilter('All')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Show All Projects
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTrackingSection;
