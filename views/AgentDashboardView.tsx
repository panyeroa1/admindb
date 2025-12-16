import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const AgentDashboardView: React.FC = () => {
  const activityData = [
    { name: 'Mon', calls: 12, viewings: 2 },
    { name: 'Tue', calls: 15, viewings: 4 },
    { name: 'Wed', calls: 8, viewings: 1 },
    { name: 'Thu', calls: 20, viewings: 5 },
    { name: 'Fri', calls: 10, viewings: 3 },
  ];

  const upcomingViewings = [
    { id: 1, time: '10:00 AM', property: 'Sunset Villa', client: 'Alice Johnson', type: 'First Viewing' },
    { id: 2, time: '02:30 PM', property: 'Downtown Loft', client: 'Bob Smith', type: 'Second Viewing' },
    { id: 3, time: '04:15 PM', property: 'Seaside Plot', client: 'Carol White', type: 'Site Visit' },
  ];

  const hotLeads = [
    { id: 1, name: 'David Miller', interest: 'High', budget: '€450k', status: 'Ready to buy' },
    { id: 2, name: 'Sarah Wilson', interest: 'Medium', budget: '€300k', status: 'Looking' },
    { id: 3, name: 'James Bond', interest: 'High', budget: '€1.2M', status: 'Urgent' },
  ];

  return (
    <div className="p-8 space-y-8 animate-[fadeIn_0.3s_ease]">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary">Agent Workspace</h2>
          <p className="text-secondary mt-1">Good morning! You have 3 viewings today.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 shadow-lg shadow-gray-200 flex items-center gap-2">
          <span className="material-icons-outlined text-sm">add_task</span>
          Log Activity
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
           <div className="absolute right-0 top-0 p-4 opacity-10">
               <span className="material-icons-outlined text-6xl text-blue-600">trending_up</span>
           </div>
           <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Potential Comm.</div>
           <div className="text-3xl font-bold text-gray-900 mt-2">€12,450</div>
           <div className="text-xs font-medium text-green-600 mt-1 flex items-center gap-1">
               <span className="material-icons-outlined text-xs">arrow_upward</span> 3 deals closing
           </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
           <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Active Leads</div>
           <div className="text-3xl font-bold text-gray-900 mt-2">24</div>
           <div className="text-xs text-gray-400 mt-1">5 requires follow-up</div>
           <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
               <div className="bg-orange-400 h-full w-[40%] rounded-full"></div>
           </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
           <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Tasks Done</div>
           <div className="text-3xl font-bold text-gray-900 mt-2">8/12</div>
           <div className="text-xs text-gray-400 mt-1">Keep pushing!</div>
           <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
               <div className="bg-green-500 h-full w-[66%] rounded-full"></div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Schedule / Viewings */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
                  <span className="material-icons-outlined text-gray-400">calendar_today</span>
                  Today's Schedule
              </h3>
              <div className="space-y-4">
                  {upcomingViewings.map((viewing, idx) => (
                      <div key={viewing.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors group cursor-pointer bg-gray-50/50">
                          <div className="flex flex-col items-center justify-center min-w-[60px] border-r border-gray-200 pr-4">
                              <span className="text-sm font-bold text-gray-900">{viewing.time.split(' ')[0]}</span>
                              <span className="text-xs text-gray-500">{viewing.time.split(' ')[1]}</span>
                          </div>
                          <div className="flex-1">
                              <div className="font-bold text-primary group-hover:text-blue-600 transition-colors">{viewing.property}</div>
                              <div className="text-sm text-gray-600 flex items-center gap-1 mt-0.5">
                                  <span className="material-icons-outlined text-[14px]">person</span>
                                  {viewing.client}
                              </div>
                          </div>
                          <div className="text-xs font-medium px-2 py-1 bg-white border border-gray-200 rounded-md h-fit text-gray-500 self-center">
                              {viewing.type}
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Activity Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
             <h3 className="font-bold text-lg text-gray-800 mb-6">Weekly Activity</h3>
             <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData} barGap={0}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                        <Bar dataKey="calls" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={20} />
                        <Bar dataKey="viewings" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
             </div>
             <div className="flex justify-center gap-6 mt-4">
                 <div className="flex items-center gap-2 text-xs text-gray-500">
                     <div className="w-2 h-2 rounded-full bg-blue-500"></div> Calls
                 </div>
                 <div className="flex items-center gap-2 text-xs text-gray-500">
                     <div className="w-2 h-2 rounded-full bg-orange-500"></div> Viewings
                 </div>
             </div>
          </div>

      </div>

      {/* Hot Leads Table */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-gray-800">Priority Leads</h3>
              <button className="text-sm text-blue-600 hover:underline">View All Leads</button>
          </div>
          <table className="w-full text-left text-sm">
              <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase">
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">Budget</th>
                      <th className="pb-3 font-medium">Interest</th>
                      <th className="pb-3 font-medium text-right">Status</th>
                  </tr>
              </thead>
              <tbody>
                  {hotLeads.map(lead => (
                      <tr key={lead.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                          <td className="py-3 font-medium text-gray-900">{lead.name}</td>
                          <td className="py-3 text-gray-600">{lead.budget}</td>
                          <td className="py-3">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  lead.interest === 'High' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                              }`}>{lead.interest}</span>
                          </td>
                          <td className="py-3 text-right text-gray-500">{lead.status}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>

    </div>
  );
};

export default AgentDashboardView;