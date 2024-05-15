import { createClient } from '@supabase/supabase-js'


interface Cliente {
    run_cliente: number;
    dv_run: string;
    nombre_cliente: string;
    direccion_cliente: string;
    contacto: number;
  }

const supabase = createClient(
    'https://niqxbeaxtqofvrboxnzb.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pcXhiZWF4dHFvZnZyYm94bnpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4NTMyMDksImV4cCI6MjAzMDQyOTIwOX0.k025dPkt6rB55YNbs1elSUr-Zoi1CF5Of_HDOV3OENc')

    export async function obtenerClientes() {
        const { data, error } = await supabase.from("CLIENTE").select("*");
        if (error) {
          console.error("Error al obtener clientes:", error.message);
          return [];
        }
        return data || [];
      }
   