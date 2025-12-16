import React from 'react';
import { Lead, Task, Message, Property } from '../types';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

interface DashboardProps {
  leads: Lead[];
  tasks: Task[];
  messages: Message[];
  properties: Property[];
}

const DashboardView: React.FC<DashboardProps> = ({ leads, tasks, messages, properties }) => {
  const chartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];

  return (
    <div className="p-8 space-y-8 animate-[fadeIn_0.3s_ease]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Dashboard Overview</h2>
          <p className="text-secondary mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="bg-white border border-gray-200 text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <span className="material-icons-outlined text-sm">calendar_today</span>
            Last 30 Days
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'TOTAL REVENUE', value: '€42.5k', trend: '+12.5%', color: 'black', icon: 'euro' },
          { label: 'ACTIVE LEADS', value: leads.length, trend: '+3 new', color: 'green', icon: 'trending_up' },
          { label: 'PENDING TASKS', value: tasks.filter(t => !t.completed).length, trend: '2 due today', color: 'orange', icon: 'pending_actions', trendDown: true },
          { label: 'UNREAD MESSAGES', value: messages.filter(m => !m.read).length, trend: '+5 unread', color: 'blue', icon: 'mail' },
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
              card.color === 'black' ? 'from-gray-700 to-black' : 
              card.color === 'green' ? 'from-green-400 to-green-600' :
              card.color === 'orange' ? 'from-orange-400 to-orange-600' :
              'from-blue-400 to-blue-600'
            }`}></div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xs font-bold text-gray-400 tracking-wider mb-2">{card.label}</h3>
                <div className="text-3xl font-bold text-primary mb-2">{card.value}</div>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <span className={card.trendDown ? 'text-accent-red' : 'text-accent-green'}>{card.trend}</span>
                  <span className="text-gray-400 font-normal">vs last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${
                 card.color === 'black' ? 'bg-gradient-to-br from-gray-700 to-black' : 
                 card.color === 'green' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                 card.color === 'orange' ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                 'bg-gradient-to-br from-blue-400 to-blue-600'
              }`}>
                <span className="material-icons-outlined">{card.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Revenue Analytics</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} 
                />
                <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
           <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
           <div className="space-y-6">
              {[
                { title: 'New Lead Added', desc: 'Sarah Connor', time: '2m ago', icon: 'person_add', color: 'bg-blue-100 text-blue-600' },
                { title: 'Task Completed', desc: 'Call John Doe', time: '1h ago', icon: 'check', color: 'bg-green-100 text-green-600' },
                { title: 'Property Sold', desc: 'Villa Sunset', time: '4h ago', icon: 'home', color: 'bg-purple-100 text-purple-600' },
                { title: 'New Message', desc: 'Inquiry about Loft', time: '1d ago', icon: 'mail', color: 'bg-orange-100 text-orange-600' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <span className="material-icons-outlined text-sm">{item.icon}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{item.title}</div>
                    <div className="text-xs text-secondary mt-0.5">{item.desc}</div>
                  </div>
                  <div className="ml-auto text-xs text-gray-400">{item.time}</div>
                </div>
              ))}
           </div>
           <button className="w-full mt-6 py-2 text-sm font-medium text-accent-blue hover:bg-blue-50 rounded-lg transition-colors">
             View All Activity
           </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
