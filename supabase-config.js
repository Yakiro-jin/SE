// supabase-config.js
// CONFIGURACIÓN DE SUPABASE - REEMPLAZA CON TUS CREDENCIALES

// TUS CREDENCIALES (las que me proporcionaste)
const SUPABASE_URL = 'https://elnmiwhsmppxakbeoegx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsbm1pd2hzbXBweGFrYmVvZWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNjIyMzUsImV4cCI6MjA4MDkzODIzNX0.7WJJGXnIEcTUMqAsJuoKwGpCFRNIRZvEcLLlX8cVdBY';

console.log('🔧 Inicializando Supabase...');

// Verificar que la biblioteca de Supabase esté cargada
if (typeof supabase === 'undefined') {
    console.error('❌ ERROR: La biblioteca @supabase/supabase-js no se cargó');
    
    // Cargar dinámicamente si no está
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
    script.onload = function() {
        console.log('✅ Biblioteca Supabase cargada dinámicamente');
        initializeSupabase();
    };
    document.head.appendChild(script);
} else {
    initializeSupabase();
}

function initializeSupabase() {
    try {
        // Crear el cliente de Supabase
        const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        // Hacerlo disponible globalmente
        window.supabase = supabaseClient;
        
        console.log('✅ Supabase inicializado correctamente');
        console.log('📡 URL:', SUPABASE_URL);
        console.log('🔑 Key (primeros 10 chars):', SUPABASE_ANON_KEY.substring(0, 10) + '...');
        
        // Probar la conexión
        testConnection();
        
    } catch (error) {
        console.error('❌ Error al inicializar Supabase:', error);
    }
}

async function testConnection() {
    try {
        console.log('🔍 Probando conexión con Supabase...');
        
        // Esperar un momento para asegurar que supabase esté listo
        setTimeout(async () => {
            if (window.supabase) {
                // Intentar una consulta simple
                const { data, error } = await window.supabase
                    .from('specimens')
                    .select('count', { count: 'exact', head: true });
                
                if (error) {
                    console.warn('⚠️ Advertencia en conexión:', error.message);
                    console.log('📝 Nota: Esto puede ser normal si la tabla specimens está vacía o no existe aún');
                } else {
                    console.log('✅ Conexión exitosa. Especímenes en DB:', data || 0);
                }
            }
        }, 1000);
    } catch (error) {
        console.warn('⚠️ Error en prueba de conexión:', error.message);
    }
}

// También exportar para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { supabase: window.supabase };
}