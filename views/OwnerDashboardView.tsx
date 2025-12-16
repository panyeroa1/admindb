import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const OwnerDashboardView: React.FC = () => {
  const financialData = [
    { name: 'Jan', income: 45000, expense: 12000 },
    { name: 'Feb', income: 47000, expense: 15000 },
    { name: 'Mar', income: 46500, expense: 11000 },
    { name: 'Apr', income: 52000, expense: 18000 },
    { name: 'May', income: 51000, expense: 13000 },
    { name: 'Jun', income: 58000, expense: 14000 },
  ];

  const properties = [
    { id: 1, name: 'Sunset Villa', units: 1, occupancy: '100%', status: 'Good', lastRent: 'Today' },
    { id: 2, name: 'Downtown Lofts', units: 12, occupancy: '92%', status: 'Maintenance', lastRent: 'Yesterday' },
    { id: 3, name: 'Riverside Commercial', units: 5, occupancy: '80%', status: 'Good', lastRent: '2 days ago' },
  ];

  return (
    <div className="p-8 space-y-8 animate-[fadeIn_0.3s_ease]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Owner Portal</h2>
          <p className="text-secondary mt-1">Financial overview and asset performance.</p>
        </div>
        <div className="flex gap-2">
            <button className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                Statements
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 shadow-lg shadow-gray-200">
                Contact Manager
            </button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-purple-900 text-white p-6 rounded-xl shadow-lg shadow-purple-200">
              <div className="text-purple-200 text-xs font-bold uppercase tracking-wider mb-2">Total Net Income (YTD)</div>
              <div className="text-3xl font-bold">€245,300</div>
              <div className="text-sm text-purple-200 mt-1">+8.4% vs last year</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Portfolio Value</div>
              <div className="text-2xl font-bold text-gray-900">€4.2M</div>
              <div className="text-xs text-green-600 mt-1">Appreciating</div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Occupancy Rate</div>
              <div className="text-2xl font-bold text-gray-900">94%</div>
              <div className="text-xs text-gray-400 mt-1">Across 3 properties</div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Pending Expenses</div>
              <div className="text-2xl font-bold text-gray-900">€1,250</div>
              <div className="text-xs text-orange-500 mt-1">Approval needed</div>
          </div>
      </div>

      {/* Income Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
         <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-800">Cash Flow</h3>
            <div className="flex gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-3 h-1 bg-purple-600 rounded-full"></span> Income
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-3 h-1 bg-red-400 rounded-full"></span> Expense
                </div>
            </div>
         </div>
         <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={financialData}>
                   <defs>
                       <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                       </linearGradient>
                       <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#F87171" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#F87171" stopOpacity={0}/>
                       </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                   <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                   <Area type="monotone" dataKey="income" stroke="#7C3AED" strokeWidth={3} fill="url(#colorIncome)" />
                   <Area type="monotone" dataKey="expense" stroke="#F87171" strokeWidth={3} fill="url(#colorExpense)" />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* Property List */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-800 mb-6">My Properties</h3>
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                 <thead>
                     <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase">
                         <th className="pb-3 pl-2 font-medium">Property Name</th>
                         <th className="pb-3 font-medium">Units</th>
                         <th className="pb-3 font-medium">Occupancy</th>
                         <th className="pb-3 font-medium">Condition</th>
                         <th className="pb-3 font-medium text-right pr-2">Last Rent Collected</th>
                     </tr>
                 </thead>
                 <tbody>
                     {properties.map(p => (
                         <tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                             <td className="py-4 pl-2 font-bold text-gray-900">{p.name}</td>
                             <td className="py-4 text-gray-600">{p.units}</td>
                             <td className="py-4">
                                 <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-bold">{p.occupancy}</span>
                             </td>
                             <td className="py-4 text-gray-600">
                                 <div className="flex items-center gap-2">
                                     <span className={`w-2 h-2 rounded-full ${p.status === 'Good' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                     {p.status}
                                 </div>
                             </td>
                             <td className="py-4 text-right pr-2 text-gray-500">{p.lastRent}</td>
                         </tr>
                     ))}
                 </tbody>
             </table>
          </div>
      </div>

    </div>
  );
};

export default OwnerDashboardView;