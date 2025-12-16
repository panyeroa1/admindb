import React from 'react';
import { Lead } from '../types';

interface LeadsViewProps {
  leads: Lead[];
}

const LeadsView: React.FC<LeadsViewProps> = ({ leads }) => {
  return (
    <div className="p-8 animate-[fadeIn_0.3s_ease]">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h2 className="text-2xl font-bold text-primary">Leads Management</h2>
           <p className="text-secondary mt-1">{leads.length} active leads</p>
        </div>
        <div className="flex gap-3">
           <div className="relative">
             <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
             <input type="text" placeholder="Search leads..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent-blue" />
           </div>
           <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
              <span className="material-icons-outlined text-sm">person_add</span>
              Add Lead
           </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Source</th>
                    <th className="px-6 py-4">Last Contact</th>
                    <th className="px-6 py-4">Actions</th>
                 </tr>
              </thead>
              <tbody>
                 {leads.length === 0 ? (
                   <tr><td colSpan={6} className="text-center py-12 text-gray-400">No leads found</td></tr>
                 ) : (
                   leads.map(lead => (
                     <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                                {lead.name.charAt(0)}
                              </div>
                              <span className="font-medium text-sm">{lead.name}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="text-sm">{lead.email}</div>
                           <div className="text-xs text-gray-400">{lead.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                              lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                              lead.status === 'qualified' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-700'
                           }`}>
                              {lead.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{lead.source}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{lead.lastContact}</td>
                        <td className="px-6 py-4">
                           <button className="text-gray-400 hover:text-blue-600 mr-2"><span className="material-icons-outlined text-lg">edit</span></button>
                           <button className="text-gray-400 hover:text-red-600"><span className="material-icons-outlined text-lg">delete</span></button>
                        </td>
                     </tr>
                   ))
                 )}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default LeadsView;
