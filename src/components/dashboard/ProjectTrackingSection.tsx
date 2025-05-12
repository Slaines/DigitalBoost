import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Clock, 
  ChevronDown, 
  Filter, 
  SortAsc,
  Pencil,
  Eye
} from 'lucide-react';

// Define interfaces
interface Milestone {
  id: string;
  title: string;
  status: "pending" | "inProgress" | "done";
  dueDate: string; // ISO-8601
}

interface Project {
  id: string;
  name: string;
  milestones: Milestone[];
}

interface Props {
  projects: Project[]; // at least 1
  canCreateProject?: boolean; // default false
  onCreateProject?(): void; // "+New Project" click
}

// Project status types
type ProjectStatus = 'Planning' | 'In Progress' | 'Completed' | 'All';
type SortOption = 'Name A ▸ Z' | '% Complete' | 'Due Date';

const ProjectTrackingSection: React.FC<Props> = ({
  projects,
  canCreateProject = false,
  onCreateProject
}) => {
  // State for filtering and sorting
  const [statusFilter, setStatusFilter] = useState<ProjectStatus>('All');
  const [sortOption, setSortOption] = useState<SortOption>('Name A ▸ Z');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  

  // Calculate days remaining until due date
  const getDaysRemaining = (dateString: string): number => {
    const dueDate = new Date(dateString);
    const today = new Date();
    
    // Reset time part for accurate day calculation
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Determine project status based on milestones
  const getProjectStatus = (project: Project): ProjectStatus => {
    const completedCount = project.milestones.filter(m => m.status === 'done').length;
    
    if (completedCount === project.milestones.length) {
      return 'Completed';
    } else if (project.milestones.some(m => m.status === 'inProgress')) {
      return 'In Progress';
    } else {
      return 'Planning';
    }
  };

  // Get status badge styling
  const getStatusBadgeStyle = (status: ProjectStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Planning':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Calculate overall project progress percentage
  const calculateProgress = (milestones: Milestone[]): number => {
    if (milestones.length === 0) return 0;
    
    const completedCount = milestones.filter(m => m.status === 'done').length;
    const inProgressCount = milestones.filter(m => m.status === 'inProgress').length;
    
    // Count in-progress milestones as half complete for progress calculation
    return Math.round(((completedCount + (inProgressCount * 0.5)) / milestones.length) * 100);
  };

  // Get the next pending milestone for a project
  const getNextMilestone = (project: Project) => {
    const pendingMilestones = project.milestones
      .filter(m => m.status !== 'done')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    
    return pendingMilestones[0];
  };

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    // First filter by status
    let result = [...projects];
    
    if (statusFilter !== 'All') {
      result = result.filter(project => getProjectStatus(project) === statusFilter);
    }
    
    // Then sort
    return result.sort((a, b) => {
      switch (sortOption) {
        case 'Name A ▸ Z':
          return a.name.localeCompare(b.name);
        case '% Complete':
          return calculateProgress(b.milestones) - calculateProgress(a.milestones);
        case 'Due Date':
          const aNextMilestone = getNextMilestone(a);
          const bNextMilestone = getNextMilestone(b);
          
          if (!aNextMilestone) return 1;
          if (!bNextMilestone) return -1;
          
          return new Date(aNextMilestone.dueDate).getTime() - new Date(bNextMilestone.dueDate).getTime();
        default:
          return 0;
      }
    });
  }, [projects, statusFilter, sortOption]);

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
                        {getDaysRemaining(nextMilestone.dueDate) > 0 && (
                          <span className="ml-1 text-gray-500">
                            ({getDaysRemaining(nextMilestone.dueDate)} days left)
                          </span>
                        )}
                        {getDaysRemaining(nextMilestone.dueDate) <= 0 && (
                          <span className="ml-1 text-red-500 font-medium">
                            (Overdue)
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
