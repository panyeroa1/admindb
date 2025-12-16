import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AuthPage from './components/AuthPage';
import DashboardView from './views/DashboardView';
import LeadsView from './views/LeadsView';
import VoiceAssistant from './components/VoiceAssistant';
import { ViewState, Lead, Task, Message, Property, User, UserRole } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const storedRole = localStorage.getItem('userRole') as UserRole || 'broker';
        
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || 'User',
          role: storedRole
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleLoginSuccess = (role: UserRole) => {
    localStorage.setItem('userRole', role);
    // User state update will trigger via onAuthStateChanged
  };

  const handleLogout = () => {
    auth.signOut();
    localStorage.removeItem('userRole');
  };

  // Mock Data
  const [leads] = useState<Lead[]>([
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', phone: '+1 555-0123', status: 'new', source: 'Website', lastContact: '2 hours ago' },
    { id: '2', name: 'Bob Smith', email: 'bob@tech.com', phone: '+1 555-9876', status: 'qualified', source: 'Referral', lastContact: '1 day ago' },
    { id: '3', name: 'Carol White', email: 'carol@design.io', phone: '+1 555-4567', status: 'contacted', source: 'LinkedIn', lastContact: '3 days ago' },
  ]);

  const [tasks] = useState<Task[]>([
    { id: '1', title: 'Call new lead', completed: false, dueDate: 'Today', priority: 'high' },
    { id: '2', title: 'Update listing photos', completed: true, dueDate: 'Yesterday', priority: 'medium' },
    { id: '3', title: 'Prepare contract', completed: false, dueDate: 'Tomorrow', priority: 'urgent' },
    { id: '4', title: 'Team meeting', completed: false, dueDate: 'Fri', priority: 'low' },
  ]);

  const [messages] = useState<Message[]>([
    { id: '1', sender: 'John Doe', email: 'john@gmail.com', subject: 'Inquiry about Villa', body: 'Hi, is this available?', date: '10:30 AM', read: false },
    { id: '2', sender: 'Jane Smith', email: 'jane@yahoo.com', subject: 'Offer', body: 'I would like to make an offer.', date: 'Yesterday', read: true },
  ]);

  const [properties] = useState<Property[]>([
    { id: '1', name: 'Sunset Villa', address: '123 Palm St', price: 1200000, type: 'villa', status: 'active' },
    { id: '2', name: 'Downtown Loft', address: '456 Main St', price: 850000, type: 'apartment', status: 'pending' },
    { id: '3', name: 'Seaside Plot', address: '789 Beach Rd', price: 450000, type: 'land', status: 'active' },
  ]);

  const renderView = () => {
    // If we have specific components, use them. Otherwise, placeholder.
    switch (currentView) {
      case 'dashboard':
        return <DashboardView leads={leads} tasks={tasks} messages={messages} properties={properties} />;
      case 'leads':
        return <LeadsView leads={leads} />;
      case 'listings':
      case 'portfolio':
        return (
             <div className="p-8">
                <h2 className="text-2xl font-bold mb-4 capitalize">{currentView}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map(p => (
                        <div key={p.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <div className="font-bold">{p.name}</div>
                            <div className="text-sm text-gray-500">{p.address}</div>
                            <div className="mt-2 font-semibold">€{p.price.toLocaleString()}</div>
                            <div className="mt-2 text-xs uppercase bg-gray-100 inline-block px-2 py-1 rounded">{p.status}</div>
                        </div>
                    ))}
                </div>
             </div>
        );
      default:
        // Generic placeholder for other views
        return (
            <div className="p-12 flex flex-col items-center justify-center text-center text-gray-400 h-full">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                   <span className="material-icons-outlined text-4xl text-gray-300">construction</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-700 capitalize mb-2">{currentView.replace('_', ' ')} View</h2>
                <p className="max-w-md">This module is part of the expanded role capabilities and is currently under development.</p>
            </div>
        );
    }
  };

  if (loading) return null;

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
          title={currentView.charAt(0).toUpperCase() + currentView.slice(1).replace('_', ' ')} 
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
