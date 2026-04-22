import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
    "https://qsxavvmfqoksvyylhqbm.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzeGF2dm1mcW9rc3Z5eWxocWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MTE0NDksImV4cCI6MjA3OTk4NzQ0OX0.D0VM9SexAEakwY-A5rmUW7gPkjgrYpF-YzWXZkJwaEM"
  );



{/* import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qsxavvmfqoksvyylhqbm.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey) */}