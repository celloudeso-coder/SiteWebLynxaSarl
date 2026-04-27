import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://qsxavvmfqoksvyylhqbm.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzeGF2dm1mcW9rc3Z5eWxocWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MTE0NDksImV4cCI6MjA3OTk4NzQ0OX0.D0VM9SexAEakwY-A5rmUW7gPkjgrYpF-YzWXZkJwaEM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
