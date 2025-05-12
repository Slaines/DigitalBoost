import { ClientData, Project } from '../../api/services';
import { calculateProgress, getNextMilestone } from '../projects/projectUtils';

/**
 * Get the appropriate greeting based on the time of day
 */
export const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return 'Good morning';
  } else if (hour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};

/**
 * Get summarized client data from projects and other data
 */
export const getSummarizedClientData = (projects: Project[]): Partial<ClientData> => {
  // Count active projects
  const activeProjectsCount = projects.length;
  
  // Count pending milestones
  const pendingMilestonesCount = projects.reduce((count, project) => {
    return count + project.milestones.filter(m => m.status !== 'done').length;
  }, 0);
  
  // Find the next milestone due date
  const allMilestones = projects.flatMap(project => 
    project.milestones.filter(m => m.status !== 'done')
      .map(m => ({ ...m, projectName: project.name }))
  );
  
  const sortedMilestones = allMilestones.sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );
  
  const nextMilestoneDate = sortedMilestones.length > 0 
    ? new Date(sortedMilestones[0].dueDate) 
    : null;
    
  return {
    activeProjectsCount,
    pendingMilestonesCount,
    nextMilestoneDate
  };
};

/**
 * Get recent/featured projects to display on the dashboard
 * Returns the most recent or highest priority projects
 */
export const getRecentProjects = (projects: Project[], count: number = 2): Project[] => {
  // Sort projects by due date (most recent first)
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );
  
  return sortedProjects.slice(0, count);
};

/**
 * Format project card data for display
 * This consolidates all the information needed for a project card
 */
export const formatProjectCardData = (project: Project) => {
  const progress = calculateProgress(project.milestones);
  const nextMilestone = getNextMilestone(project);
  
  const completedStages = project.milestones.filter(m => m.status === 'done').length;
  const totalStages = project.milestones.length;
  
  return {
    id: project.id,
    name: project.name,
    type: project.type,
    progress,
    progressText: `${completedStages}/${totalStages} stages complete`,
    dueDate: project.dueDate,
    nextMilestone: nextMilestone ? {
      title: nextMilestone.title,
      dueDate: nextMilestone.dueDate
    } : null,
    milestones: project.milestones.map(m => ({
      title: m.title,
      status: m.status
    }))
  };
};
