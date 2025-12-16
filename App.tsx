import React, { useState, useEffect } from 'react';
import { supabase } from './utils/supabaseClient';
import { fetchCollection } from './services/supabaseService';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AuthPage from './components/AuthPage';
import VoiceAssistant from './components/VoiceAssistant';

// Views
import DashboardView from './views/DashboardView';
import ManagerDashboardView from './views/ManagerDashboardView';
import AgentDashboardView from './views/AgentDashboardView';
import OwnerDashboardView from './views/OwnerDashboardView';
import MaintenanceDashboardView from './views/MaintenanceDashboardView';
import UserDashboardView from './views/UserDashboardView';
import LeadsView from './views/LeadsView';
import PropertiesView from './views/PropertiesView';
import SettingsView from './views/SettingsView';
import FinanceView from './views/FinanceView';

import { ViewState, Lead, Task, Message, Property, User, UserRole } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  // Application Data State
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    let mounted = true;

    // Safety timeout to prevent infinite loading
    const safetyTimer = setTimeout(() => {
        if (mounted && loading) {
            console.warn("Auth check timed out, forcing load.");
            setLoading(false);
        }
    }, 2000);

    // Check active session
    const checkSession = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (mounted) handleSession(session);
        } catch (e) {
            console.error("Auth check failed:", e);
        } finally {
            if (mounted) setLoading(false);
        }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) handleSession(session);
    });

    return () => {
        mounted = false;
        clearTimeout(safetyTimer);
        subscription.unsubscribe();
    };
  }, []);

  const handleSession = (session: any) => {
      if (session?.user) {
          const role = (session.user.user_metadata?.role as UserRole) || 'user';
          setUser({
              uid: session.user.id,
              email: session.user.email,
              displayName: session.user.user_metadata?.full_name || 'User',
              role: role
          });
          localStorage.setItem('userRole', role); // For fallback
          loadData();
      } else {
          // If no session, check if we are in "Demo Mode" (set by AuthPage quick login)
          const demoRole = localStorage.getItem('demoRole') as UserRole;
          if (demoRole) {
               // We are in demo mode
               setUser({
                   uid: 'demo-user',
                   email: 'demo@eburon.ai',
                   displayName: 'Demo User',
                   role: demoRole
               });
               loadData();
          } else {
              setUser(null);
          }
      }
  };

  const loadData = async () => {
    // Fetch from Supabase with Caching
    // If table is empty (e.g. fresh DB), we fall back to initial mock data for display 
    // until user hits "Seed Database" in settings.
    
    try {
        const props = await fetchCollection<Property>('properties');
        const lds = await fetchCollection<Lead>('leads');
        const tsks = await fetchCollection<Task>('tasks');
        const msgs = await fetchCollection<Message>('messages');

        if (props.length > 0) setProperties(props);
        else {
             setProperties([
                { id: '1', name: 'Sunset Villa', address: '123 Palm St', price: 1200000, type: 'villa', status: 'active' },
                { id: '2', name: 'Downtown Loft', address: '456 Main St', price: 850000, type: 'apartment', status: 'pending' },
                { id: '3', name: 'Seaside Plot', address: '789 Beach Rd', price: 450000, type: 'land', status: 'active' },
             ]);
        }

        if (lds.length > 0) setLeads(lds);
        else {
            setLeads([
                { id: '1', name: 'Alice Johnson', email: 'alice@example.com', phone: '+1 555-0123', status: 'new', source: 'Website', lastContact: '2 hours ago' },
                { id: '2', name: 'Bob Smith', email: 'bob@tech.com', phone: '+1 555-9876', status: 'qualified', source: 'Referral', lastContact: '1 day ago' },
            ]);
        }

        if (tsks.length > 0) setTasks(tsks);
        if (msgs.length > 0) setMessages(msgs);
    } catch (e) {
        console.error("Error loading data:", e);
    }
  };

  const handleLoginSuccess = (role: UserRole) => {
    localStorage.setItem('userRole', role);
    // If we are here from Quick Access, we might not have a session.
    // Force a re-render/user set for Demo mode if needed
    if (!supabase.auth.getSession()) {
        localStorage.setItem('demoRole', role);
        handleSession(null); 
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('userRole');
    localStorage.removeItem('demoRole');
    setUser(null);
  };

  const renderView = () => {
    // 1. Dashboard View (Role Specific)
    if (currentView === 'dashboard') {
      switch (user?.role) {
        case 'manager': return <ManagerDashboardView />;
        case 'agent': return <AgentDashboardView />;
        case 'owner': return <OwnerDashboardView />;
        case 'maintenance': return <MaintenanceDashboardView />;
        case 'user': return <UserDashboardView />;
        case 'broker': 
        default: return <DashboardView leads={leads} tasks={tasks} messages={messages} properties={properties} />;
      }
    }

    // 2. Specific Views based on sidebar selection
    switch (currentView) {
      case 'leads':
        return <LeadsView leads={leads} />;
      
      case 'portfolio':
      case 'listings':
        // Reuse PropertiesView for both Portfolio (Manager/Owner) and Listings (Agent)
        return <PropertiesView properties={properties} />;

      case 'settings':
        return <SettingsView role={user?.role || 'user'} email={user?.email || ''} />;

      case 'maintenance':
      case 'work_orders':
        // For maintenance tab, use the maintenance dashboard view which has list of jobs
        return <MaintenanceDashboardView />;

      case 'my_requests':
        // For tenants, reuse UserDashboardView but ideally could be a filtered list
        return <UserDashboardView />;

      case 'finance':
      case 'commissions':
        return <FinanceView />;

      case 'viewings':
      case 'offers':
      case 'reports':
      case 'vendors':
      case 'compliance':
      case 'team':
        return (
            <div className="p-12 flex flex-col items-center justify-center text-center text-gray-400 h-full animate-[fadeIn_0.3s_ease]">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                   <span className="material-icons-outlined text-4xl text-gray-300">
                       {currentView === 'team' ? 'groups' : 
                        currentView === 'reports' ? 'assessment' : 
                        currentView === 'viewings' ? 'event' : 'folder'}
                   </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-700 capitalize mb-2">{currentView.replace(/_/g, ' ')}</h2>
                <p className="max-w-md">
                    This module is active. Real-time data integration for {currentView} is scheduled for the next update.
                </p>
            </div>
        );

      default:
        return <div>View not found</div>;
    }
  };

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-bg">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-gray-800 text-white rounded-2xl flex items-center justify-center font-bold text-3xl shadow-xl mb-6 animate-bounce">
                E
            </div>
            <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-accent-blue animate-[loading_1.5s_ease-in-out_infinite] w-1/3"></div>
            </div>
            <style>{`
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(300%); }
                }
            `}</style>
        </div>
    );
  }

  if (!user) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex h-screen bg-bg">
      <Sidebar 
        currentView={currentView} 
        onChangeView={(view) => { setCurrentView(view); setIsSidebarOpen(false); }} 
        isOpen={isSidebarOpen}
        role={user.role}
        onLogout={handleLogout}
      />
      
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 lg:ml-[260px]">
        <Header 
          title={currentView.charAt(0).toUpperCase() + currentView.slice(1).replace(/_/g, ' ')} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onOpenVoice={() => setIsVoiceOpen(true)}
          role={user.role}
          userEmail={user.email}
        />
        
        <div className="flex-1 overflow-y-auto">
          {renderView()}
        </div>
      </main>

      <VoiceAssistant isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
    </div>
  );
};

export default App;