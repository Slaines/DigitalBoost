// Firebase imports would be used in a real implementation
// import { db } from '../firebase/config';
// import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

// Types
export interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

export interface Milestone {
  id: string;
  title: string;
  status: "pending" | "inProgress" | "done";
  dueDate: string; // ISO-8601
}

export interface Project {
  id: number;
  name: string;
  type: string;
  dueDate: Date;
  progress: number;
  milestones: Milestone[];
  status?: 'Planning' | 'In Progress' | 'Completed';
}

export interface ClientData {
  activeProjectsCount: number;
  pendingMilestonesCount: number;
  hasOutstandingInvoice: boolean;
  outstandingInvoiceAmount: number;
  outstandingInvoiceDueDays: number;
  nextMilestoneDate: Date | null;
}

// API functions
export const fetchInvoices = async (): Promise<Invoice[]> => {
  try {
    // In a real app, this would fetch from Firestore
    // For now, we'll use mock data
    const mockInvoices: Invoice[] = [
      { id: '1', number: 'INV-2025-001', date: '2025-04-15', amount: 1500, status: 'paid' },
      { id: '2', number: 'INV-2025-002', date: '2025-04-28', amount: 2200, status: 'paid' },
      { id: '3', number: 'INV-2025-003', date: '2025-05-10', amount: 1800, status: 'pending' },
      { id: '4', number: 'INV-2025-004', date: '2025-05-25', amount: 3000, status: 'pending' },
      { id: '5', number: 'INV-2025-005', date: '2025-03-15', amount: 1200, status: 'overdue' },
      { id: '6', number: 'INV-2025-006', date: '2025-02-28', amount: 2500, status: 'paid' },
      { id: '7', number: 'INV-2025-007', date: '2025-01-15', amount: 1800, status: 'paid' },
      { id: '8', number: 'INV-2025-008', date: '2025-03-05', amount: 3200, status: 'paid' },
    ];
    
    return mockInvoices;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw new Error('Failed to fetch invoices');
  }
};

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    // In a real app, this would fetch from Firestore
    // For now, we'll use mock data
    const mockProjects: Project[] = [
      {
        id: 1,
        name: "Website Redesign",
        type: "Web Development",
        dueDate: new Date(2025, 5, 15),
        progress: 67,
        milestones: [
          { id: '1-1', title: "Design Approval", status: "done", dueDate: "2025-04-15" },
          { id: '1-2', title: "Development", status: "inProgress", dueDate: "2025-05-01" },
          { id: '1-3', title: "Testing", status: "pending", dueDate: "2025-05-15" }
        ]
      },
      {
        id: 2,
        name: "Brand Refresh",
        type: "Branding",
        dueDate: new Date(2025, 4, 30),
        progress: 25,
        milestones: [
          { id: '2-1', title: "Discovery", status: "done", dueDate: "2025-04-10" },
          { id: '2-2', title: "Concept Development", status: "inProgress", dueDate: "2025-04-20" },
          { id: '2-3', title: "Refinement", status: "pending", dueDate: "2025-04-25" },
          { id: '2-4', title: "Final Delivery", status: "pending", dueDate: "2025-04-30" }
        ]
      },
      {
        id: 3,
        name: "SEO Optimization",
        type: "Digital Marketing",
        dueDate: new Date(2025, 6, 10),
        progress: 40,
        milestones: [
          { id: '3-1', title: "Audit", status: "done", dueDate: "2025-05-15" },
          { id: '3-2', title: "Keyword Research", status: "done", dueDate: "2025-05-25" },
          { id: '3-3', title: "On-Page Optimization", status: "inProgress", dueDate: "2025-06-05" },
          { id: '3-4', title: "Content Strategy", status: "pending", dueDate: "2025-06-10" }
        ]
      }
    ];
    
    return mockProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
};

export const fetchClientData = async (): Promise<ClientData> => {
  try {
    // In a real app, this would fetch from Firestore
    // For now, we'll use mock data
    const mockClientData: ClientData = {
      activeProjectsCount: 3,
      pendingMilestonesCount: 8,
      hasOutstandingInvoice: true,
      outstandingInvoiceAmount: 1200,
      outstandingInvoiceDueDays: 15,
      nextMilestoneDate: new Date(2025, 4, 25)
    };
    
    return mockClientData;
  } catch (error) {
    console.error('Error fetching client data:', error);
    throw new Error('Failed to fetch client data');
  }
};
