import React from 'react';
import { ViewState, UserRole } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isOpen: boolean;
  role: UserRole;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isOpen, role, onLogout }) => {
  // Define menu items with enhanced role access
  // BROKER sees EVERYTHING.
  // MANAGER: Dashboard, Portfolio, Admin
  // AGENT: Dashboard, Sales, Work Orders
  // OWNER: Dashboard, Portfolio, Finance
  // MAINTENANCE: Dashboard, Maintenance
  const allItems = [
    // Common
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', roles: ['broker', 'manager', 'agent', 'owner', 'maintenance', 'user'] },
    { id: 'inbox', icon: 'inbox', label: 'Inbox', badge: 12, roles: ['broker', 'agent', 'manager', 'user'] },
    
    // User / Tenant Section
    { category: 'MY RENTAL', roles: ['user'] },
    { id: 'listings', icon: 'search', label: 'Browse Homes', roles: ['user'] },
    { id: 'my_requests', icon: 'build', label: 'My Requests', roles: ['user'] },
    
    // Broker / Agent Section
    { category: 'SALES & LEASING', roles: ['broker', 'agent'] },
    { id: 'leads', icon: 'people', label: 'Leads', roles: ['broker', 'agent'] },
    { id: 'listings', icon: 'home', label: 'My Listings', roles: ['broker', 'agent'] },
    { id: 'viewings', icon: 'event', label: 'Viewings', roles: ['broker', 'agent'] },
    { id: 'offers', icon: 'gavel', label: 'Offers', roles: ['broker'] },
    
    // Manager / Owner Section
    { category: 'PORTFOLIO', roles: ['manager', 'owner', 'maintenance', 'broker'] },
    { id: 'portfolio', icon: 'apartment', label: 'Properties', roles: ['manager', 'owner', 'broker'] },
    { id: 'maintenance', icon: 'build', label: 'Maintenance', roles: ['manager', 'owner', 'agent', 'maintenance', 'broker'] },
    { id: 'work_orders', icon: 'assignment', label: 'Work Orders', roles: ['manager', 'agent', 'maintenance', 'broker'] },
    { id: 'vendors', icon: 'engineering', label: 'Vendors', roles: ['manager', 'broker'] },
    { id: 'compliance', icon: 'verified_user', label: 'Compliance', roles: ['manager', 'broker'] },
    
    // Admin / Finance
    { category: 'ADMINISTRATION', roles: ['broker', 'manager', 'owner'] },
    { id: 'team', icon: 'groups', label: 'Team', roles: ['manager', 'broker'] },
    { id: 'finance', icon: 'paid', label: 'Financials', roles: ['owner', 'manager', 'broker'] },
    { id: 'commissions', icon: 'payments', label: 'Commissions', roles: ['broker'] },
    { id: 'reports', icon: 'assessment', label: 'Reports', roles: ['broker', 'manager', 'owner'] },
    
    // Settings
    { id: 'settings', icon: 'settings', label: 'Settings', roles: ['broker', 'manager', 'agent', 'owner', 'maintenance', 'user'] },
  ];

  // Filter items based on role
  const menuItems = allItems.filter(item => item.roles.includes(role));

  return (
    <>
      <aside className={`fixed top-0 left-0 h-full w-[260px] bg-sidebar border-r border-gray-200 flex flex-col z-40 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 flex items-center gap-3 border-b border-gray-200">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-gray-700 text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-lg shadow-gray-200">E</div>
          <div className="font-bold text-lg bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">Eburon</div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin">
          {menuItems.map((item, idx) => {
            // Check if this item is a category header
            if (item.category) {
               // Logic to check if any item in this category is actually visible for the current role
               const nextItems = menuItems.slice(idx + 1);
               // Find the index of the next category to limit our search scope
               const nextCategoryIndex = nextItems.findIndex(i => i.category);
               // Get items only until the next category
               const itemsInCategory = nextCategoryIndex === -1 ? nextItems : nextItems.slice(0, nextCategoryIndex);
               
               // If there are no items in this category for this role, hide the header
               if (itemsInCategory.length === 0) return null;

               return (
                <div key={idx} className="px-6 pt-6 pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {item.category}
                </div>
              );
            }
            const isActive = currentView === item.id;
            return (
              <div
                key={idx}
                onClick={() => item.id && onChangeView(item.id as ViewState)}
                className={`flex items-center justify-between px-6 py-3 cursor-pointer text-sm font-medium border-l-[3px] transition-all duration-200
                  ${isActive 
                    ? 'bg-gray-50 text-primary border-primary font-semibold' 
                    : 'text-secondary hover:bg-gray-50 hover:text-primary border-transparent'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-icons-outlined text-[20px] w-6 text-center ${isActive ? 'text-accent-blue' : 'text-gray-400'}`}>{item.icon}</span>
                  {item.label}
                </div>
                {item.badge ? (
                  <div className="bg-accent-blue text-white text-[10px] font-bold h-5 min-w-[20px] px-1.5 rounded-full flex items-center justify-center shadow-sm">
                    {item.badge}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200">
           <button 
             onClick={onLogout}
             className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
           >
             <span className="material-icons-outlined">logout</span>
             Sign Out
           </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;