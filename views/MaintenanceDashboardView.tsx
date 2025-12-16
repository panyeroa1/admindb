import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const MaintenanceDashboardView: React.FC = () => {
  const weeklyLoad = [
    { name: 'Mon', jobs: 4, hours: 6 },
    { name: 'Tue', jobs: 6, hours: 8 },
    { name: 'Wed', jobs: 3, hours: 4 },
    { name: 'Thu', jobs: 5, hours: 7 },
    { name: 'Fri', jobs: 8, hours: 9 },
  ];

  const urgentJobs = [
    { id: 1, title: 'Water Leak - Apt 4B', property: 'Downtown Loft', priority: 'Urgent', status: 'Assigned' },
    { id: 2, title: 'Broken HVAC', property: 'Sunset Villa', priority: 'High', status: 'In Progress' },
    { id: 3, title: 'Lobby Light Replacement', property: 'Riverside Complex', priority: 'Medium', status: 'Pending' },
  ];

  return (
    <div className="p-8 space-y-8 animate-[fadeIn_0.3s_ease]">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary">Maintenance Hub</h2>
          <p className="text-secondary mt-1">3 urgent jobs require attention today.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 shadow-lg shadow-gray-200 flex items-center gap-2">
          <span className="material-icons-outlined text-sm">qr_code_scanner</span>
          Scan Part
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-red-50 p-6 rounded-xl border border-red-100 shadow-sm">
             <div className="flex items-center gap-3 mb-2">
                 <div className="p-2 bg-red-100 rounded-lg text-red-600">
                     <span className="material-icons-outlined">warning</span>
                 </div>
                 <span className="text-sm font-bold text-red-800 uppercase">Urgent</span>
             </div>
             <div className="text-3xl font-bold text-gray-900">3</div>
             <div className="text-xs text-red-600 font-medium mt-1">Response time: &lt; 2h</div>
         </div>

         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
             <div className="flex items-center gap-3 mb-2">
                 <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                     <span className="material-icons-outlined">assignment</span>
                 </div>
                 <span className="text-sm font-bold text-gray-500 uppercase">Open Jobs</span>
             </div>
             <div className="text-3xl font-bold text-gray-900">12</div>
             <div className="text-xs text-gray-400 mt-1">4 scheduled for today</div>
         </div>

         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
             <div className="flex items-center gap-3 mb-2">
                 <div className="p-2 bg-green-50 rounded-lg text-green-600">
                     <span className="material-icons-outlined">check_circle</span>
                 </div>
                 <span className="text-sm font-bold text-gray-500 uppercase">Completed</span>
             </div>
             <div className="text-3xl font-bold text-gray-900">28</div>
             <div className="text-xs text-green-600 mt-1">This week</div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Active Jobs List */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg text-gray-800 mb-6">Priority Work Orders</h3>
              <div className="space-y-4">
                  {urgentJobs.map(job => (
                      <div key={job.id} className="p-4 border border-gray-100 rounded-xl hover:border-red-200 transition-colors bg-white shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                  job.priority === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                              }`}>
                                  {job.priority}
                              </span>
                              <span className="material-icons-outlined text-gray-300">more_horiz</span>
                          </div>
                          <div className="font-bold text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <span className="material-icons-outlined text-xs">location_on</span>
                              {job.property}
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                              <div className="flex -space-x-2">
                                  <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                              </div>
                              <button className="text-xs font-bold text-blue-600 hover:underline">Update Status</button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Workload Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
             <h3 className="font-bold text-lg text-gray-800 mb-6">Workload Hours</h3>
             <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyLoad}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                        <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
             </div>
          </div>

      </div>
    </div>
  );
};

export default MaintenanceDashboardView;