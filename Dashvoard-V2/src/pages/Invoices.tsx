import React, { useState } from 'react';
import { Download, CreditCard, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  project: string;
  pack: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'overdue' | 'pending';
}

const invoicesData: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2025-001',
    project: 'Website Redesign',
    pack: 'Premium',
    amount: 1999,
    date: '2025-05-01',
    dueDate: '2025-06-01',
    status: 'pending',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2025-002',
    project: 'SEO Optimization',
    pack: 'Basic',
    amount: 299,
    date: '2025-04-15',
    dueDate: '2025-05-15',
    status: 'overdue',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2025-003',
    project: 'Content Creation',
    pack: 'Standard',
    amount: 599,
    date: '2025-03-20',
    dueDate: '2025-04-20',
    status: 'paid',
  },
  {
    id: '4',
    invoiceNumber: 'INV-2025-004',
    project: 'Logo Design',
    pack: 'Premium',
    amount: 1499,
    date: '2025-02-10',
    dueDate: '2025-03-10',
    status: 'paid',
  },
  {
    id: '5',
    invoiceNumber: 'INV-2025-005',
    project: 'Social Media Campaign',
    pack: 'Standard',
    amount: 799,
    date: '2025-05-20',
    dueDate: '2025-06-20',
    status: 'pending',
  },
];

const Invoices = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const filteredInvoices = invoicesData.filter(invoice => {
    if (activeFilter === 'all') return true;
    return invoice.status === activeFilter;
  });
  
  // Calculate totals
  const totalDue = invoicesData
    .filter(invoice => invoice.status !== 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
    
  const totalOverdue = invoicesData
    .filter(invoice => invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Paid</span>;
      case 'overdue':
        return <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">Overdue</span>;
      case 'pending':
        return <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">Pending</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Invoices</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900">Total Due</h2>
          <p className="mt-2 text-3xl font-bold text-[#0055A4]">{formatCurrency(totalDue)}</p>
          
          {totalOverdue > 0 && (
            <div className="mt-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">
                {formatCurrency(totalOverdue)} is overdue. Please make payment as soon as possible.
              </p>
            </div>
          )}
          
          <button className="mt-4 px-4 py-2 bg-[#0055A4] text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Pay All Outstanding
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900">Next Due Dates</h2>
          <div className="mt-2 space-y-4">
            {invoicesData
              .filter(invoice => invoice.status !== 'paid')
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .slice(0, 3)
              .map(invoice => (
                <div key={invoice.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{invoice.project}</p>
                    <p className="text-sm text-gray-500">{formatDate(invoice.dueDate)}</p>
                  </div>
                  <p className="font-semibold">{formatCurrency(invoice.amount)}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'all' ? 'bg-[#0055A4] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'pending' ? 'bg-[#0055A4] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'overdue' ? 'bg-[#0055A4] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter('overdue')}
          >
            Overdue
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'paid' ? 'bg-[#0055A4] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter('paid')}
          >
            Paid
          </button>
        </div>
      </div>
      
      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice No.
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <p className="font-medium text-gray-900">{invoice.project}</p>
                      <p className="text-xs text-gray-500">{invoice.pack} Package</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(invoice.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(invoice.dueDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(invoice.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="px-2 py-1 text-gray-500 hover:text-gray-700">
                        <Download className="h-4 w-4" />
                      </button>
                      {invoice.status !== 'paid' && (
                        <button className="px-3 py-1 bg-[#0055A4] text-white text-xs rounded hover:bg-blue-700">
                          Pay
                        </button>
                      )}
                      <button className="px-2 py-1 text-gray-500 hover:text-gray-700">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoices;