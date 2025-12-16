import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';

const ManagerDashboardView: React.FC = () => {
  // Mock Data for Analytics
  const performanceData = [
    { name: 'Jan', revenue: 125000, budget: 110000 },
    { name: 'Feb', revenue: 132000, budget: 115000 },
    { name: 'Mar', revenue: 145000, budget: 120000 },
    { name: 'Apr', revenue: 138000, budget: 125000 },
    { name: 'May', revenue: 155000, budget: 130000 },
    { name: 'Jun', revenue: 162000, budget: 135000 },
  ];

  const occupancyData = [
    { name: 'Occupied', value: 85 },
    { name: 'Vacant', value: 10 },
    { name: 'Maintenance', value: 5 },
  ];
  const COLORS = ['#10B981', '#EF4444', '#F59E0B'];

  const complianceItems = [
    { id: 1, property: 'Sunset Heights A12', type: 'Fire Safety', status: 'Expiring Soon', date: '2023-11-15' },
    { id: 2, property: 'Downtown Loft 4B', type: 'Gas Inspection', status: 'Overdue', date: '2023-10-30' },
    { id: 3, property: 'Riverside Complex', type: 'Elevator Cert', status: 'Valid', date: '2024-03-01' },
  ];

  const teamMembers = [
    { id: 1, name: 'Sarah J.', role: 'Leasing Agent', status: 'Active', tasks: 12 },
    { id: 2, name: 'Mike T.', role: 'Maintenance', status: 'On Site', tasks: 5 },
    { id: 3, name: 'Emma W.', role: 'Admin', status: 'Away', tasks: 0 },
  ];

  const vendorJobs = [
    { id: 1, vendor: 'RapidPlumb', job: 'Leak repair - Unit 204', status: 'In Progress', cost: '€450' },
    { id: 2, vendor: 'SafeElectric', job: 'Lobby lighting', status: 'Scheduled', cost: '€200' },
    { id: 3, vendor: 'CleanCo', job: 'Deep clean - Unit 101', status: 'Pending', cost: '€350' },
  ];

  const commsLogs = [
    { id: 1, client: 'John Doe', type: 'Email', subject: 'Lease Renewal Question', time: '10:30 AM' },
    { id: 2, client: 'Alice Smith', type: 'Call', subject: 'Noise Complaint', time: 'Yesterday' },
    { id: 3, client: 'Robert Brown', type: 'Portal', subject: 'Maintenance Request', time: 'Yesterday' },
  ];

  return (
    <div className="p-8 space-y-8 animate-[fadeIn_0.3s_ease]">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Manager Overview</h2>
          <p className="text-secondary mt-1">Portfolio performance and operational control center.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <span className="material-icons-outlined text-sm">download</span>
            Export Report
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2 shadow-lg shadow-gray-200">
            <span className="material-icons-outlined text-sm">add</span>
            New Property
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'TOTAL UNITS', value: '342', sub: 'Across 12 buildings', icon: 'apartment', color: 'blue' },
          { label: 'OCCUPANCY RATE', value: '92%', sub: '+2% vs last month', icon: 'pie_chart', color: 'green' },
          { label: 'OPEN MAINTENANCE', value: '28', sub: '4 urgent', icon: 'build', color: 'orange' },
          { label: 'COMPLIANCE ALERTS', value: '5', sub: 'Action required', icon: 'warning', color: 'red' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                <span className="material-icons-outlined">{stat.icon}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.color === 'red' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                {stat.color === 'red' ? 'Action' : 'Info'}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">{stat.label}</div>
            <div className="text-xs text-gray-400 mt-2">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Financial Performance Chart */}
        <div className="xl:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-800">Portfolio Financials</h3>
            <div className="flex gap-2">
                <span className="flex items-center gap-1 text-xs text-gray-500"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Revenue</span>
                <span className="flex items-center gap-1 text-xs text-gray-500"><div className="w-2 h-2 bg-gray-300 rounded-full"></div> Budget</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#F9FAFB'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} 
                />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="budget" fill="#E5E7EB" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy & Team */}
        <div className="space-y-6">
            {/* Occupancy Donut */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center relative">
                <h3 className="font-bold text-lg text-gray-800 w-full mb-2">Occupancy</h3>
                <div className="h-[200px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={occupancyData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {occupancyData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                        <span className="text-3xl font-bold text-gray-900">92%</span>
                        <span className="text-xs text-gray-500">Occupied</span>
                    </div>
                </div>
                <div className="flex justify-center gap-4 w-full mt-2">
                    {occupancyData.map((d, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                            <span className="text-xs text-gray-500">{d.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team Overview */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex-1">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-gray-800">Team Status</h3>
                    <button className="text-xs text-blue-600 font-medium hover:underline">Manage</button>
                </div>
                <div className="space-y-4">
                    {teamMembers.map((member) => (
                        <div key={member.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-600">
                                    {member.name.split(' ')[0][0]}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">{member.name}</div>
                                    <div className="text-xs text-gray-500">{member.role}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${member.status === 'Active' || member.status === 'On Site' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                <span className="text-xs text-gray-500">{member.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Compliance & Safety */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <span className="material-icons-outlined text-gray-400">verified_user</span>
                    Compliance Tracking
                </h3>
                <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded-full">2 Critical</span>
             </div>
             <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm">
                     <thead>
                         <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase">
                             <th className="pb-3 font-medium">Property</th>
                             <th className="pb-3 font-medium">Certification</th>
                             <th className="pb-3 font-medium text-right">Deadline</th>
                         </tr>
                     </thead>
                     <tbody className="text-gray-600">
                        {complianceItems.map((item) => (
                            <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                                <td className="py-3 font-medium text-gray-900">{item.property}</td>
                                <td className="py-3">{item.type}</td>
                                <td className="py-3 text-right">
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        item.status === 'Overdue' ? 'bg-red-100 text-red-700' : 
                                        item.status === 'Expiring Soon' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                                    }`}>
                                        {item.date}
                                    </span>
                                </td>
                            </tr>
                        ))}
                     </tbody>
                 </table>
             </div>
          </div>

          {/* Vendor Coordination */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <span className="material-icons-outlined text-gray-400">engineering</span>
                    Active Work Orders
                </h3>
             </div>
             <div className="space-y-4">
                 {vendorJobs.map((job) => (
                     <div key={job.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:border-blue-200 transition-colors">
                         <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                 <span className="material-icons-outlined">build</span>
                             </div>
                             <div>
                                 <div className="text-sm font-bold text-gray-900">{job.job}</div>
                                 <div className="text-xs text-gray-500">{job.vendor}</div>
                             </div>
                         </div>
                         <div className="text-right">
                             <div className="text-sm font-semibold">{job.cost}</div>
                             <div className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-1">{job.status}</div>
                         </div>
                     </div>
                 ))}
             </div>
             <button className="w-full mt-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50">
                 View All Vendors
             </button>
          </div>

      </div>

      {/* Communications Log */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
         <h3 className="font-bold text-lg text-gray-800 mb-6">Recent Client Communications</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {commsLogs.map((log) => (
                <div key={log.id} className="flex gap-3 items-start p-4 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        log.type === 'Email' ? 'bg-blue-100 text-blue-600' :
                        log.type === 'Call' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                    }`}>
                        <span className="material-icons-outlined text-sm">
                            {log.type === 'Email' ? 'mail' : log.type === 'Call' ? 'phone' : 'portal'}
                        </span>
                    </div>
                    <div>
                        <div className="text-xs font-bold text-gray-900">{log.client}</div>
                        <div className="text-sm text-gray-700 mt-0.5">{log.subject}</div>
                        <div className="text-xs text-gray-400 mt-2">{log.time} • via {log.type}</div>
                    </div>
                </div>
            ))}
         </div>
      </div>

    </div>
  );
};

export default ManagerDashboardView;