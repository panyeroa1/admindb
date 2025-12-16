import { createClient } from '@supabase/supabase-js';

// Helper to safely get env vars in various environments (Vite, CRA, or plain)
const getEnv = (key: string) => {
  try {
    // Check for Vite
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      // @ts-ignore
      return import.meta.env[key];
    }
  } catch (e) {}

  try {
    // Check for Node/CRA/Process
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
  } catch (e) {}
  
  return null;
};

// Configured with provided credentials as fallbacks
const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL') || getEnv('REACT_APP_SUPABASE_URL') || 'https://mkmyfdqrejabgnymfmbb.supabase.co';
const supabaseKey = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') || getEnv('REACT_APP_SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rbXlmZHFyZWphYmdueW1mbWJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MzMxMzYsImV4cCI6MjA4MDAwOTEzNn0.x_1VnQ-HWWPwNe9jjafhD_uoH2dyCyjO2RaKOQhYoJw';

export const supabase = createClient(supabaseUrl, supabaseKey);