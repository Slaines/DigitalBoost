import { useQuery } from '@tanstack/react-query';
import { fetchInvoices, fetchProjects, fetchClientData } from './services';
// These types are used in the return type inference of the hooks
// TypeScript may not detect this usage directly

// Query keys
export const queryKeys = {
  invoices: ['invoices'],
  projects: ['projects'],
  clientData: ['clientData'],
};

// Invoice hooks
export const useInvoices = () => {
  return useQuery({
    queryKey: queryKeys.invoices,
    queryFn: fetchInvoices,
  });
};

// Project hooks
export const useProjects = () => {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: fetchProjects,
  });
};

// Client data hooks
export const useClientData = () => {
  return useQuery({
    queryKey: queryKeys.clientData,
    queryFn: fetchClientData,
  });
};
