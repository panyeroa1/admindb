import React, { useState } from 'react';
import { seedDatabase } from '../services/supabaseService';
import { UserRole } from '../types';

interface SettingsViewProps {
  role: UserRole;
  email: string | null;
}

export default function SettingsView({ role, email }: SettingsViewProps) {
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await seedDatabase();
      setSeedMessage("Database populated with sample data successfully!");
    } catch (error) {
      setSeedMessage("Error seeding database: " + (error as any).message);
    } finally {
      setSeeding(false);
      setTimeout(() => setSeedMessage(null), 3000);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto animate-[fadeIn_0.3s_ease]">
      <h2 className="text-2xl font-bold text-primary mb-2">Settings</h2>
      <p className="text-secondary mb-8">Manage account preferences and system configuration.</p>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
           <h3 className="font-bold text-lg text-gray-800 mb-4 border-b border-gray-100 pb-2">Profile Information</h3>
           <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
                  {email ? email.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="space-y-1">
                  <div className="font-semibold text-gray-900">Current User</div>
                  <div className="text-sm text-gray-500">{email}</div>
                  <div className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded uppercase mt-1">
                      {role}
                  </div>
              </div>
           </div>
        </div>

        {/* Admin Actions (Broker Only) */}
        {role === 'broker' && (
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm border-l-4 border-l-purple-500">
                <h3 className="font-bold text-lg text-gray-800 mb-2">System Administration</h3>
                <p className="text-sm text-gray-500 mb-6">Advanced controls for system data and configuration.</p>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                        <div className="font-bold text-gray-900">Seed Database</div>
                        <div className="text-xs text-gray-500 mt-1">
                            Reset and populate Supabase with sample data (Properties, Leads, Tasks).
                            <br/><span className="text-red-500">Warning: Requires authenticated write access.</span>
                        </div>
                    </div>
                    <button 
                        onClick={handleSeed}
                        disabled={seeding}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                            seeding ? 'bg-gray-200 text-gray-400' : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-200'
                        }`}
                    >
                        {seeding ? 'Seeding...' : 'Populate Data'}
                    </button>
                </div>
                {seedMessage && (
                    <div className="mt-4 p-3 bg-green-50 text-green-700 text-sm font-medium rounded-lg text-center animate-pulse">
                        {seedMessage}
                    </div>
                )}
            </div>
        )}

        {/* General Settings Placeholder */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm opacity-60">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Notifications (Coming Soon)</h3>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Email Notifications</span>
                    <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-not-allowed"><div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div></div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Browser Alerts</span>
                    <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-not-allowed"><div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div></div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}