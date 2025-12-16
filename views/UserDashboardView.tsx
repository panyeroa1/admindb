import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const UserDashboardView: React.FC = () => {
  const nextPayment = {
    amount: 1250,
    date: 'Oct 1, 2023',
    status: 'Due Soon'
  };

  const myRequests = [
    { id: 1, title: 'Leaky Faucet', category: 'Plumbing', date: 'Sep 24', status: 'In Progress' },
    { id: 2, title: 'Intercom Glitch', category: 'Electrical', date: 'Aug 10', status: 'Resolved' }
  ];

  const documents = [
    { name: 'Lease Agreement 2023.pdf', date: 'Jan 1, 2023' },
    { name: 'Building Rules.pdf', date: 'Jan 1, 2023' }
  ];

  const rentData = [
    { name: 'Paid', value: 9 },
    { name: 'Remaining', value: 3 }
  ];
  const COLORS = ['#10B981', '#E5E7EB'];

  return (
    <div className="p-8 space-y-8 animate-[fadeIn_0.3s_ease]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-primary">Welcome Home</h2>
           <p className="text-secondary mt-1">Unit 4B • Sunset Villa Complex</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <span className="material-icons-outlined text-sm">history</span>
            Payment History
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 shadow-md flex items-center gap-2">
             <span className="material-icons-outlined text-sm">payment</span>
             Pay Rent
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Rent & Status */}
          <div className="space-y-6">
              {/* Rent Card */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                      <span className="material-icons-outlined text-9xl">home</span>
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Next Payment</div>
                  <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">€{nextPayment.amount}</span>
                      <span className="text-sm text-gray-500">/ month</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                      <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-1 rounded-md font-medium text-xs border border-orange-100">
                          <span className="material-icons-outlined text-xs">event</span>
                          Due {nextPayment.date}
                      </span>
                  </div>
              </div>

              {/* Lease Status */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-4 text-sm">Lease Status</h3>
                  <div className="flex items-center justify-between mb-2 text-sm">
                      <span className="text-gray-500">Period</span>
                      <span className="font-medium text-gray-900">12 Months</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full w-[75%] rounded-full"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-400">
                      <span>Jan '23</span>
                      <span>Dec '23</span>
                  </div>
              </div>
          </div>

          {/* Middle Column: Active Issues */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg text-gray-800">Maintenance Requests</h3>
                  <button className="text-blue-600 text-sm font-medium hover:underline">+ New Request</button>
              </div>
              
              <div className="space-y-4">
                  {myRequests.length > 0 ? myRequests.map(req => (
                      <div key={req.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  req.category === 'Plumbing' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'
                              }`}>
                                  <span className="material-icons-outlined">{req.category === 'Plumbing' ? 'water_drop' : 'bolt'}</span>
                              </div>
                              <div>
                                  <div className="font-bold text-gray-900">{req.title}</div>
                                  <div className="text-xs text-gray-500">Reported on {req.date}</div>
                              </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              req.status === 'In Progress' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-green-50 text-green-600 border border-green-100'
                          }`}>
                              {req.status}
                          </span>
                      </div>
                  )) : (
                      <div className="text-center py-8 text-gray-400">No active requests</div>
                  )}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {documents.map((doc, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-200 cursor-pointer group transition-all">
                              <div className="bg-red-50 text-red-500 p-2 rounded-lg">
                                  <span className="material-icons-outlined text-xl">picture_as_pdf</span>
                              </div>
                              <div className="flex-1">
                                  <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{doc.name}</div>
                                  <div className="text-xs text-gray-400">{doc.date}</div>
                              </div>
                              <span className="material-icons-outlined text-gray-300 group-hover:text-blue-400">download</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default UserDashboardView;