// src/services/gestarianFlow/flow.ts

import { supabase } from '../../lib/supabase';
import { Database } from '../../types/supabase'; // Assuming a DB type definition exists
import { generatePdfFromPresupuesto as pdfGenerator } from '../../utils/pdfGenerator'; // Existing utility
import { sendBudgetEmail as emailSender } from '../../utils/emailSender'; // Existing utility

/** Helper type aliases for clarity */
type Solicitud = Database['public']['Tables']['solicitudes']['Row'];
type Presupuesto = Database['public']['Tables']['presupuestos']['Row'];
type Cita = Database['public']['Tables']['citas']['Row'];
type Cobro = Database['public']['Tables']['cobros']['Row'];

/**
 * Create a presupuesto from a solicitud.
 * Inserts a presupuesto row (state Borrador) and its line items.
 */
export async function createPresupuestoFromSolicitud(
  solicitudId: string,
  lineas: Array<{ descripcion: string; cantidad: number; precio: number }>
): Promise<Presupuesto | null> {
  // 1️⃣ Obtener la solicitud (solo columnas necesarias)
  const { data: sol, error: errSol } = await supabase
    .from('solicitudes')
    .select('id, expediente_id, cliente_id, taller_id, matricula, marca, modelo, titular')
    .eq('id', solicitudId)
    .single();
  if (errSol || !sol) {
    console.error('Error fetching solicitud', errSol);
    return null;
  }

  // 2️⃣ Insertar el presupuesto (estado Borrador)
  const { data: pres, error: errPres } = await supabase
    .from('presupuestos')
    .insert({
      expediente_id: sol.expediente_id,
      solicitud_id: sol.id,
      taller_id: sol.taller_id,
      cliente_id: sol.cliente_id,
      total: 0, // se actualizará tras insertar lineas
      estado: 'Borrador',
    })
    .select('*')
    .single();
  if (errPres || !pres) {
    console.error('Error inserting presupuesto', errPres);
    return null;
  }

  // 3️⃣ Insertar lineas_presupuesto
  const lineItems = lineas.map((l) => ({
    presupuesto_id: pres.id,
    descripcion: l.descripcion,
    cantidad: l.cantidad,
    precio: l.precio,
  }));
  const { error: errLines } = await supabase.from('lineas_presupuesto').insert(lineItems);
  if (errLines) {
    console.error('Error inserting lineas_presupuesto', errLines);
    return null;
  }

  // 4️⃣ Calcular total (aunque la columna total es GENERATED, actualizamos por seguridad)
  const total = lineas.reduce((acc, l) => acc + l.cantidad * l.precio, 0);
  await supabase.from('presupuestos').update({ total }).eq('id', pres.id);

  return pres;
}

/** Proponer una nueva fecha para una cita (cliente) */
export async function proposeCitaDate(citaId: string, propuesta: string): Promise<boolean> {
  const { error } = await supabase
    .from('citas')
    .update({ fecha_propuesta_cliente: propuesta, estado: 'Pendiente' })
    .eq('id', citaId);
  return !error;
}

/** Aceptar la fecha de una cita (taller o cliente) */
export async function acceptCitaDate(
  citaId: string,
  aceptadoPor: 'cliente' | 'usuario'
): Promise<boolean> {
  const nuevoEstado = aceptadoPor === 'cliente' ? 'AceptadaCliente' : 'AceptadaUsuario';
  const { error } = await supabase.from('citas').update({ estado: nuevoEstado }).eq('id', citaId);
  return !error;
}

/** Marcar una reparación como completada */
export async function finalizeReparacion(citaId: string): Promise<boolean> {
  const { error } = await supabase
    .from('reparaciones')
    .update({ estado: 'Completada' })
    .eq('cita_id', citaId);
  return !error;
}

/** Generar PDF de un presupuesto usando la utilidad existente */
export async function generatePdfFromPresupuesto(presupuestoId: string): Promise<Blob | null> {
  try {
    const pdf = await pdfGenerator(presupuestoId);
    return pdf;
  } catch (e) {
    console.error('PDF generation failed', e);
    return null;
  }
}

/** Enviar email con el presupuesto PDF */
export async function sendBudgetEmail(presupuestoId: string, email: string): Promise<boolean> {
  try {
    await emailSender(presupuestoId, email);
    return true;
  } catch (e) {
    console.error('Email sending failed', e);
    return false;
  }
}

/**
 * Actualizar el estado de la parada de cobro según la lógica de negocio.
 * - Naranja: < 1 semana desde emisión y sin abono.
 * - Azul:  abono parcial y < 1 mes desde último abono parcial.
 * - Verde: abono total.
 * - Rojo:  > 1 semana sin abono desde emisión **o** > 1 mes desde último abono parcial.
 */
export async function actualizarEstadoCobro(cobroId: string): Promise<boolean> {
  const { data: cobro, error } = await supabase
    .from('cobros')
    .select('id, emitida_en, monto_total, monto_abonado, ultima_fecha_abono')
    .eq('id', cobroId)
    .single();
  if (error || !cobro) {
    console.error('Error fetching cobro', error);
    return false;
  }

  const ahora = new Date();
  const emitida = new Date(cobro.emitida_en as string);
  const ultima = cobro.ultima_fecha_abono ? new Date(cobro.ultima_fecha_abono as string) : null;
  const unaSemana = 7 * 24 * 60 * 60 * 1000;
  const unMes = 30 * 24 * 60 * 60 * 1000;

  let nuevoEstado = 'Naranja';
  if (cobro.monto_abonado >= cobro.monto_total) {
    nuevoEstado = 'Verde';
  } else if (cobro.monto_abonado > 0) {
    if (ultima && ahora.getTime() - ultima.getTime() > unMes) {
      nuevoEstado = 'Rojo';
    } else {
      nuevoEstado = 'Azul';
    }
  } else {
    if (ahora.getTime() - emitida.getTime() > unaSemana) {
      nuevoEstado = 'Rojo';
    } else {
      nuevoEstado = 'Naranja';
    }
  }

  const { error: updErr } = await supabase.from('cobros').update({ estado_cobro: nuevoEstado }).eq('id', cobro.id);
  return !updErr;
}

export const gestarianFlow = {
  createPresupuestoFromSolicitud,
  proposeCitaDate,
  acceptCitaDate,
  finalizeReparacion,
  generatePdfFromPresupuesto,
  sendBudgetEmail,
  actualizarEstadoCobro,
};
