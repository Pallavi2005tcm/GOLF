import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wqsmtmbwlndemsnzsdxi.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxc210bWJ3bG5kZW1zbnpzZHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MTkyMzYsImV4cCI6MjA3MzE5NTIzNn0.fp6b0fxdsv0nOvN9XmLrYOWllfLAJGs1t6fbDrJmFBY"; 

export const supabase = createClient(supabaseUrl, supabaseKey);
