import React from 'react';

interface Request {
  id: string;
  project: string;
  pack: string;
  status: 'pending' | 'in-progress' | 'completed' | 'canceled';
  progress: number;
  nextMilestone: string;
}

interface RequestsTableProps {
  requests: Request[];
}

const RequestsTable = ({ requests }: RequestsTableProps) => {
  const getStatusBadge = (status: Request['status']) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">Pending</span>;
      case 'in-progress':
        return <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">In Progress</span>;
      case 'completed':
        return <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Completed</span>;
      case 'canceled':
        return <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">Canceled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h3 className="font-medium text-gray-900">My Requests</h3>
        <button className="text-sm text-[#0055A4] hover:text-blue-700">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pack</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Milestone</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.project}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.pack}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(request.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#0055A4] h-2 rounded-full" 
                      style={{ width: `${request.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{request.progress}%</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.nextMilestone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestsTable;