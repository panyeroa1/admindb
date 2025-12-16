import React, { useState } from 'react';
import { signInAnonymously, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { UserRole } from '../types';

interface AuthPageProps {
  onLoginSuccess: (role: UserRole) => void;
}

type AuthTab = 'quick' | 'login' | 'register';

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<AuthTab>('quick');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerRole, setRegisterRole] = useState<UserRole>('broker');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Authenticating...');

  const handleQuickLogin = async (role: UserRole) => {
    setLoading(true);
    // Simulate navigation to specific dashboard files concept
    setLoadingText(`Redirecting to ${role}-dashboard...`);
    setError(null);
    try {
      // Simulate slight network delay for realism
      await new Promise(resolve => setTimeout(resolve, 800));
      await signInAnonymously(auth);
      onLoginSuccess(role);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter credentials");
      return;
    }
    setLoading(true);
    setLoadingText('Signing In...');
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess('broker'); // Default role for manual login in demo
    } catch (err: any) {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setLoadingText('Creating Account...');
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onLoginSuccess(registerRole);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-16 h-16 border-4 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-secondary font-medium animate-pulse">{loadingText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg p-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-gray-50 to-white">
      <div className="w-full max-w-[600px] bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-white/50 backdrop-blur-sm">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-gray-800 text-white rounded-2xl flex items-center justify-center font-bold text-3xl mx-auto mb-4 shadow-lg shadow-gray-200">E</div>
          <h1 className="text-2xl font-bold text-primary mb-1">Eburon Portal</h1>
          <p className="text-secondary text-sm">Secure access for authorized personnel</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 mb-8">
          <button 
            onClick={() => { setActiveTab('quick'); setError(null); }}
            className={`flex-1 pb-3 text-sm font-semibold transition-all relative ${activeTab === 'quick' ? 'text-accent-blue' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Quick Access
            {activeTab === 'quick' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-blue rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => { setActiveTab('login'); setError(null); }}
            className={`flex-1 pb-3 text-sm font-semibold transition-all relative ${activeTab === 'login' ? 'text-accent-blue' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Login
            {activeTab === 'login' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-blue rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => { setActiveTab('register'); setError(null); }}
            className={`flex-1 pb-3 text-sm font-semibold transition-all relative ${activeTab === 'register' ? 'text-accent-blue' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Register
            {activeTab === 'register' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-blue rounded-t-full"></div>}
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 text-red-600 text-xs font-medium p-3 rounded-xl border border-red-100 flex items-center gap-2 animate-[fadeIn_0.3s_ease]">
            <span className="material-icons-round text-sm">error_outline</span>
            {error}
          </div>
        )}

        {/* Quick Access Tab */}
        {activeTab === 'quick' && (
          <div className="animate-[fadeIn_0.3s_ease]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {[
                { id: 'broker', icon: 'real_estate_agent', label: 'Broker', color: 'blue' },
                { id: 'manager', icon: 'domain', label: 'Manager', color: 'green' },
                { id: 'agent', icon: 'badge', label: 'Agent', color: 'orange' },
                { id: 'owner', icon: 'key', label: 'Owner', color: 'purple' },
                { id: 'maintenance', icon: 'build', label: 'Maintenance', color: 'red' },
              ].map((role) => (
                <button 
                  key={role.id}
                  onClick={() => handleQuickLogin(role.id as UserRole)}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-${role.color}-100 text-${role.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className="material-icons-round text-2xl">{role.icon}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-600 group-hover:text-primary">{role.label}</span>
                </button>
              ))}
            </div>
            <div className="text-center">
               <p className="text-xs text-gray-400">Select your role to simulate dashboard navigation.</p>
            </div>
          </div>
        )}

        {/* Login Tab */}
        {activeTab === 'login' && (
          <form onSubmit={handleManualLogin} className="space-y-4 animate-[fadeIn_0.3s_ease]">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@eburon.ai"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent-blue focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent-blue focus:bg-white transition-colors"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
               <label className="flex items-center gap-2 cursor-pointer">
                 <input type="checkbox" className="rounded border-gray-300 text-accent-blue focus:ring-accent-blue" />
                 Remember me
               </label>
               <button type="button" className="hover:text-accent-blue">Forgot Password?</button>
            </div>
            <button type="submit" className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-transform active:scale-[0.98] shadow-lg shadow-gray-200 mt-2">
              Sign In
            </button>
          </form>
        )}

        {/* Register Tab */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4 animate-[fadeIn_0.3s_ease]">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent-blue focus:bg-white transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Password</label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent-blue focus:bg-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Confirm</label>
                <input 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent-blue focus:bg-white transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Role</label>
              <select 
                value={registerRole}
                onChange={(e) => setRegisterRole(e.target.value as UserRole)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent-blue focus:bg-white transition-colors"
              >
                <option value="broker">Broker</option>
                <option value="manager">Property Manager</option>
                <option value="agent">Agent</option>
                <option value="owner">Owner</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div className="pt-2">
               <label className="flex items-start gap-2 text-xs text-gray-500 cursor-pointer">
                 <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-accent-blue focus:ring-accent-blue" required />
                 <span>I agree to the <a href="#" className="text-accent-blue hover:underline">Terms of Service</a> and <a href="#" className="text-accent-blue hover:underline">Privacy Policy</a></span>
               </label>
            </div>
            <button type="submit" className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-transform active:scale-[0.98] shadow-lg shadow-gray-200">
              Create Account
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default AuthPage;