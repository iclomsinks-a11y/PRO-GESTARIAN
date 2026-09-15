import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRealtimeSubscription } from '../hooks/useRealtimeSubscription';
import { PageHeader } from '../components/UI';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../lib/ToastContext';

export function SolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState<any[]>([]);
  const { showToast } = useToast();

  // Real‑time subscription to the `solicitudes` table
  useRealtimeSubscription('solicitudes', async () => {
    const { data, error } = await supabase
      .from('solicitudes')
      .select('*')
      .order('creado_en', { ascending: false });
    if (!error && data) setSolicitudes(data as any[]);
    else showToast('Error cargando solicitudes', 'error');
  });

  // Initial load
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('solicitudes')
        .select('*')
        .order('creado_en', { ascending: false });
      if (!error && data) setSolicitudes(data as any[]);
    })();
  }, []);

  const aceptar = async (id: string) => {
    const { error } = await supabase.from('solicitudes').update({ estado: 'Aceptada' }).eq('id', id);
    if (!error) showToast('Solicitud aceptada', 'success');
    else showToast('Error al aceptar', 'error');
  };

  const rechazar = async (id: string) => {
    const { error } = await supabase.from('solicitudes').update({ estado: 'Rechazada' }).eq('id', id);
    if (!error) showToast('Solicitud rechazada', 'success');
    else showToast('Error al rechazar', 'error');
  };

  return (
    <div className="space-y-4 pb-24 animate-fade-in">
      <PageHeader title="SOLICITUDES" subtitle="Listado de solicitudes pendientes" />
      <AnimatePresence>
        {solicitudes.map((s) => (
          <motion.div
            key={s.id}
            className="rounded-xl border border-slate-600 bg-bg-800/80 p-4 hover:bg-bg-800/60 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-cyan-400 font-medium">{s.matricula ?? '—'} – {s.marca ?? ''} {s.modelo ?? ''}</p>
                <p className="text-slate-400">Estado: {s.estado}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => aceptar(s.id)}
                  className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-500 transition"
                >
                  Aceptar
                </button>
                <button
                  onClick={() => rechazar(s.id)}
                  className="px-3 py-1 bg-rose-600 text-white rounded hover:bg-rose-500 transition"
                >
                  Rechazar
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
