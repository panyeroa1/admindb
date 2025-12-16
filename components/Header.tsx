import React from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  title: string;
  onToggleSidebar: () => void;
  onOpenVoice: () => void;
  role: UserRole;
  userEmail: string | null;
}

const Header: React.FC<HeaderProps> = ({ title, onToggleSidebar, onOpenVoice, role, userEmail }) => {
  const roleStyles = {
    broker: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
    manager: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100' },
    agent: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-100' },
    owner: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100' }
  };
  
  const currentStyle = roleStyles[role] || roleStyles.broker;

  return (
    <header className="px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0 z-20 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <span 
          className="material-icons-outlined lg:hidden text-2xl cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
          onClick={onToggleSidebar}
        >
          menu
        </span>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          <div className="flex items-center gap-2 mt-0.5">
             <div className={`w-2 h-2 rounded-full ${currentStyle.text.replace('text', 'bg')}`}></div>
             <p className="text-secondary text-xs font-medium capitalize">{role} Portal</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Call Us Button */}
        <button 
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full cursor-pointer hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200 group"
          onClick={onOpenVoice}
        >
          <span className="material-icons-round text-lg group-hover:animate-[tada_1s_ease-in-out_infinite]">call</span>
          <span className="text-sm font-semibold">Call Us</span>
        </button>

        <div className="h-8 w-px bg-gray-200 mx-1 hidden md:block"></div>

        <div className="relative cursor-pointer p-2.5 rounded-xl hover:bg-gray-100 transition-colors">
          <span className="material-icons-outlined text-gray-500">notifications</span>
          <div className="absolute top-2 right-2 bg-red-500 border-2 border-white text-white text-[9px] h-3 w-3 flex items-center justify-center rounded-full"></div>
        </div>

        <div className="flex items-center gap-3 cursor-pointer pl-2">
          <div className={`w-10 h-10 ${currentStyle.bg} ${currentStyle.text} rounded-xl flex items-center justify-center font-bold uppercase border-2 border-white shadow-sm`}>
            {role.substring(0, 2)}
          </div>
          <div className="hidden md:block text-right">
            <div className="font-semibold text-sm truncate max-w-[120px] text-gray-700">{userEmail ? userEmail.split('@')[0] : 'User'}</div>
            <div className={`text-[10px] font-bold uppercase tracking-wider ${currentStyle.text}`}>{role}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
