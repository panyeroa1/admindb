import { supabase } from '../utils/supabaseClient';
import { Property, Lead, Task, Message } from '../types';

// --- Caching Logic ---
const CACHE_PREFIX = 'eburon_cache_';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCache = <T>(key: string): T[] | null => {
  const cached = localStorage.getItem(CACHE_PREFIX + key);
  if (!cached) return null;

  try {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      console.log(`[Cache Hit] ${key}`);
      return data;
    }
  } catch (e) {
    console.warn('Cache parse error', e);
  }
  return null;
};

const setCache = (key: string, data: any[]) => {
  localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
    timestamp: Date.now(),
    data
  }));
};

export const clearCache = () => {
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith(CACHE_PREFIX)) localStorage.removeItem(key);
    });
};

// --- Utils ---
// Convert snake_case (DB) to camelCase (App)
const toCamel = (obj: any): any => {
  if (Array.isArray(obj)) return obj.map(v => toCamel(v));
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      result[camelKey] = toCamel(obj[key]);
      return result;
    }, {} as any);
  }
  return obj;
};

// Convert camelCase (App) to snake_case (DB)
const toSnake = (obj: any): any => {
    if (Array.isArray(obj)) return obj.map(v => toSnake(v));
    if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((result, key) => {
            const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
            result[snakeKey] = toSnake(obj[key]);
            return result;
        }, {} as any);
    }
    return obj;
};

// --- Data Fetching ---

export const fetchCollection = async <T>(table: string, forceRefresh = false): Promise<T[]> => {
  if (!forceRefresh) {
      const cached = getCache<T>(table);
      if (cached) return cached;
  }

  const { data, error } = await supabase.from(table).select('*');
  
  if (error) {
    console.error(`Error fetching ${table}:`, error);
    return [];
  }

  const camelData = toCamel(data) as T[];
  setCache(table, camelData);
  return camelData;
};

// --- Data Seeding ---

export const seedDatabase = async () => {
  console.log("Starting DB Seed...");
  
  // 1. Properties
  const properties = [
    { name: 'Sunset Villa', address: '123 Palm St, Beverly Hills', price: 1200000, type: 'villa', status: 'active', bedrooms: 5, bathrooms: 4, size: 450 },
    { name: 'Downtown Loft', address: '456 Main St, New York', price: 850000, type: 'apartment', status: 'pending', bedrooms: 2, bathrooms: 2, size: 120 },
    { name: 'Seaside Plot', address: '789 Beach Rd, Miami', price: 450000, type: 'land', status: 'active', size: 800 },
    { name: 'Oakwood Family Home', address: '32 Maple Ave, Seattle', price: 950000, type: 'house', status: 'sold', bedrooms: 4, bathrooms: 3, size: 280 },
    { name: 'Tech Hub Commercial', address: '101 Silicon Way, SF', price: 2500000, type: 'commercial', status: 'rented', size: 1200 }
  ];

  // 2. Leads
  const leads = [
    { name: 'Alice Johnson', email: 'alice@example.com', phone: '+1 555-0123', status: 'new', source: 'Website', last_contact: '2 hours ago' },
    { name: 'Bob Smith', email: 'bob@tech.com', phone: '+1 555-9876', status: 'qualified', source: 'Referral', last_contact: '1 day ago' },
    { name: 'Carol White', email: 'carol@design.io', phone: '+1 555-4567', status: 'contacted', source: 'LinkedIn', last_contact: '3 days ago' },
    { name: 'David Miller', email: 'david@corp.com', phone: '+1 555-1111', status: 'lost', source: 'Cold Call', last_contact: '1 week ago' },
    { name: 'Eva Green', email: 'eva@nature.org', phone: '+1 555-2222', status: 'new', source: 'Walk-in', last_contact: 'Just now' }
  ];

  // 3. Tasks
  const tasks = [
    { title: 'Call new lead Alice', completed: false, due_date: 'Today', priority: 'high' },
    { title: 'Update listing photos for Sunset Villa', completed: true, due_date: 'Yesterday', priority: 'medium' },
    { title: 'Prepare contract for Downtown Loft', completed: false, due_date: 'Tomorrow', priority: 'urgent' },
    { title: 'Team meeting', completed: false, due_date: 'Fri', priority: 'low' },
    { title: 'Review monthly financials', completed: false, due_date: 'Mon', priority: 'high' }
  ];

  // 4. Messages
  const messages = [
    { sender: 'John Doe', email: 'john@gmail.com', subject: 'Inquiry about Villa', body: 'Hi, is this available?', date: '10:30 AM', read: false },
    { sender: 'Jane Smith', email: 'jane@yahoo.com', subject: 'Offer', body: 'I would like to make an offer.', date: 'Yesterday', read: true },
    { sender: 'Support Team', email: 'support@eburon.ai', subject: 'System Update', body: 'Maintenance scheduled for tonight.', date: '2 days ago', read: true }
  ];

  // Execute Upserts
  // Note: Using 'upsert' or 'insert' requires RLS policies allowing it.
  
  await supabase.from('properties').insert(properties);
  await supabase.from('leads').insert(leads);
  await supabase.from('tasks').insert(tasks);
  await supabase.from('messages').insert(messages);

  // Clear cache after seeding
  clearCache();
  
  console.log("Database seeded successfully via Supabase");
};