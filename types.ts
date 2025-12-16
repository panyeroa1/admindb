export type UserRole = 'broker' | 'manager' | 'agent' | 'owner' | 'maintenance' | 'user';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'lost';
  source: string;
  lastContact: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  price: number;
  type: 'apartment' | 'house' | 'villa' | 'commercial' | 'land';
  bedrooms?: number;
  bathrooms?: number;
  size?: number;
  status: 'active' | 'pending' | 'sold' | 'rented';
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface Message {
  id: string;
  sender: string;
  email: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
}

export type ViewState = 
  | 'dashboard' 
  | 'inbox' 
  | 'leads' 
  | 'properties' 
  | 'tasks' 
  | 'calendar' 
  | 'finance' 
  | 'reports' 
  | 'settings'
  | 'listings'
  | 'viewings'
  | 'offers'
  | 'commissions'
  | 'portfolio'
  | 'team'
  | 'vendors'
  | 'compliance'
  | 'maintenance'
  | 'work_orders'
  | 'my_requests'
  | 'schedule';