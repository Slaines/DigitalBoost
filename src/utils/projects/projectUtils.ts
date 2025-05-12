import { Project, Milestone } from '../../api/services';

// Project status types
export type ProjectStatus = 'Planning' | 'In Progress' | 'Completed' | 'All';
export type SortOption = 'Name A ▸ Z' | '% Complete' | 'Due Date';

/**
 * Calculate days remaining until due date
 */
export const getDaysRemaining = (dateString: string): number => {
  const dueDate = new Date(dateString);
  const today = new Date();
  
  // Reset time part for accurate day calculation
  dueDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

/**
 * Determine project status based on milestones
 */
export const getProjectStatus = (project: Project): ProjectStatus => {
  const completedCount = project.milestones.filter(m => m.status === 'done').length;
  
  if (completedCount === project.milestones.length) {
    return 'Completed';
  } else if (project.milestones.some(m => m.status === 'inProgress')) {
    return 'In Progress';
  } else {
    return 'Planning';
  }
};

/**
 * Calculate overall project progress percentage
 */
export const calculateProgress = (milestones: Milestone[]): number => {
  if (milestones.length === 0) return 0;
  
  const completedCount = milestones.filter(m => m.status === 'done').length;
  const inProgressCount = milestones.filter(m => m.status === 'inProgress').length;
  
  // Count in-progress milestones as half complete for progress calculation
  return Math.round(((completedCount + (inProgressCount * 0.5)) / milestones.length) * 100);
};

/**
 * Get the next pending milestone for a project
 */
export const getNextMilestone = (project: Project) => {
  const pendingMilestones = project.milestones
    .filter(m => m.status !== 'done')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  
  return pendingMilestones[0];
};

/**
 * Filter projects by status
 */
export const filterProjectsByStatus = (projects: Project[], statusFilter: ProjectStatus): Project[] => {
  if (statusFilter === 'All') {
    return projects;
  }
  
  return projects.filter(project => getProjectStatus(project) === statusFilter);
};

/**
 * Sort projects based on sort option
 */
export const sortProjects = (projects: Project[], sortOption: SortOption): Project[] => {
  return [...projects].sort((a, b) => {
    switch (sortOption) {
      case 'Name A ▸ Z':
        return a.name.localeCompare(b.name);
      case '% Complete':
        return calculateProgress(b.milestones) - calculateProgress(a.milestones);
      case 'Due Date':
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      default:
        return 0;
    }
  });
};

/**
 * Filter and sort projects
 */
export const filterAndSortProjects = (
  projects: Project[], 
  statusFilter: ProjectStatus, 
  sortOption: SortOption
): Project[] => {
  const filtered = filterProjectsByStatus(projects, statusFilter);
  return sortProjects(filtered, sortOption);
};
