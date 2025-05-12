import { Invoice } from '../../api/services';

/**
 * Format currency amount
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

/**
 * Format date string to more readable format
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Calculate the total amount from an array of invoices
 */
export const calculateTotalAmount = (invoices: Invoice[]): number => {
  return invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
};

/**
 * Calculate the total outstanding balance
 */
export const calculateOutstandingBalance = (invoices: Invoice[]): number => {
  return invoices
    .filter(invoice => invoice.status !== 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
};

/**
 * Find the next due invoice
 */
export const findNextDueInvoice = (invoices: Invoice[]): Invoice | undefined => {
  return invoices
    .filter(invoice => invoice.status === 'pending')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
};

/**
 * Calculate total paid amount this year
 */
export const calculateTotalPaidThisYear = (invoices: Invoice[]): number => {
  const currentYear = new Date().getFullYear();
  
  return invoices
    .filter(invoice => {
      const invoiceDate = new Date(invoice.date);
      return invoice.status === 'paid' && invoiceDate.getFullYear() === currentYear;
    })
    .reduce((sum, invoice) => sum + invoice.amount, 0);
};

/**
 * Filter invoices by status
 */
export const filterInvoicesByStatus = (invoices: Invoice[], status: string): Invoice[] => {
  if (status === 'all') {
    return invoices;
  }
  
  return invoices.filter(invoice => invoice.status === status);
};

/**
 * Search invoices by query string
 */
export const searchInvoices = (invoices: Invoice[], query: string): Invoice[] => {
  const lowerQuery = query.toLowerCase();
  
  return invoices.filter(invoice => 
    invoice.number.toLowerCase().includes(lowerQuery) ||
    invoice.date.includes(lowerQuery) ||
    invoice.amount.toString().includes(lowerQuery)
  );
};

/**
 * Filter and search invoices
 */
export const filterAndSearchInvoices = (
  invoices: Invoice[], 
  statusFilter: string, 
  searchQuery: string
): Invoice[] => {
  const filteredByStatus = filterInvoicesByStatus(invoices, statusFilter);
  return searchQuery ? searchInvoices(filteredByStatus, searchQuery) : filteredByStatus;
};

/**
 * Paginate invoices
 */
export const paginateInvoices = (
  invoices: Invoice[],
  currentPage: number,
  itemsPerPage: number
): Invoice[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return invoices.slice(startIndex, startIndex + itemsPerPage);
};

/**
 * Generate CSV data from invoices
 */
export const generateCSVData = (invoices: Invoice[]): string => {
  const headers = ['Invoice #', 'Date', 'Amount', 'Status'];
  const csvData = invoices.map(invoice => [
    invoice.number,
    invoice.date,
    invoice.amount.toString(),
    invoice.status
  ]);
  
  return [
    headers.join(','),
    ...csvData.map(row => row.join(','))
  ].join('\n');
};
