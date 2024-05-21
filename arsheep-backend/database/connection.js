// Archivo connection.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://niqxbeaxtqofvrboxnzb.supabase.co'; // Sustituye esto con tu URL real de Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pcXhiZWF4dHFvZnZyYm94bnpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4NTMyMDksImV4cCI6MjAzMDQyOTIwOX0.k025dPkt6rB55YNbs1elSUr-Zoi1CF5Of_HDOV3OENc'; // Sustituye esto con tu clave real de Supabase

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;