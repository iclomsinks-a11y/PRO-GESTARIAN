import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Building2, 
  ChevronRight, 
  CheckCircle2, 
  X, 
  Sparkles, 
  FileText, 
  ArrowRight,
  Database,
  Calendar,
  Camera,
  Car,
  Receipt,
  PieChart,
  Send,
  Lock,
  Download,
  Smartphone,
  Check,
  Layers,
  Boxes,
  Activity,
  Users,
  Clock
} from 'lucide-react';

// CaracterÃ­sticas ampliadas para Gestarian Lite
const LITE_FEATURES_AMPLIADAS = [
  {
    icon: Smartphone,
    titulo: 'FacturaciÃ³n UltrarrÃ¡pida en tu Smartphone',
    desc: 'Emite facturas legales en menos de 30 segundos directamente desde tu telÃ©fono mÃ³vil. DiseÃ±ado especÃ­ficamente para profesionales en movilidad, sin instalaciones complejas ni curva de aprendizaje.'
  },
  {
    icon: Lock,
    titulo: 'Cumplimiento Veri*Factu Oficial',
    desc: 'Adaptado a la normativa fiscal y antifraude de la Agencia Tributaria. Genera registros inalterables y cÃ³digos QR reglamentarios en cada factura para total tranquilidad ante cualquier inspecciÃ³n.'
  },
  {
    icon: Send,
    titulo: 'EnvÃ­o Directo por WhatsApp sin Guardar Contactos',
    desc: 'EnvÃ­a facturas y presupuestos directamente al chat de WhatsApp de tu cliente con un formato elegante y profesional, sin saturar la agenda de tu telÃ©fono.'
  },
  {
    icon: FileText,
    titulo: 'GeneraciÃ³n de PDF Profesional',
    desc: 'Documentos en formato PDF vectorial de alta calidad, limpios y con tus datos fiscales perfectamente organizados, listos para descargar, imprimir o archivar.'
  },
  {
    icon: Zap,
    titulo: '100% Gratuito: Cero Costes y Cero Comisiones',
    desc: 'Descarga libre y uso ilimitado sin cuotas mensuales, sin comisiones por factura y sin sorpresas. Una herramienta esencial para autÃ³nomos que empiezan o necesitan agilidad inmediata.'
  },
  {
    icon: Clock,
    titulo: 'Arranque Inmediato y Modo Ligero',
    desc: 'Carga instantÃ¡nea en cualquier navegador mÃ³vil o de escritorio. No consume espacio ni baterÃ­a en tu dispositivo gracias a su arquitectura ultraligera.'
  }
];

// CaracterÃ­sticas ampliadas para Gestarian Pro
const PRO_FEATURES_AMPLIADAS = [
  {
    icon: Database,
    titulo: 'Nube Documental y FacturaciÃ³n VeriFactu',
    desc: 'Facturas oficiales, presupuestos y albaranes centralizados 24/7 en la nube. MÃ¡xima seguridad de almacenamiento, acceso inmediato desde mÃ³vil, tablet o PC y total cumplimiento legal con cÃ³digos QR antifraude.'
  },
  {
    icon: Send,
    titulo: 'GestiÃ³n Directa y EnvÃ­os a GestorÃ­a',
    desc: 'OlvÃ­date de buscar, imprimir o escanear papeles a final de trimestre. GESTARIAN compila automÃ¡ticamente todas tus facturas de ingresos, gastos y modelos, y los remite en un solo clic al correo de tu gestor.'
  },
  {
    icon: PieChart,
    titulo: 'Balance EconÃ³mico y Financiero en Vivo',
    desc: 'Controla al cÃ©ntimo la salud econÃ³mica de tu negocio. Visualiza ingresos brutos, gastos operativos, beneficio neto e IVA devengado en tiempo real con estadÃ­sticas y grÃ¡ficos automÃ¡ticos.'
  },
  {
    icon: Camera,
    titulo: 'Registro de Gastos mediante OCR MÃ³vil',
    desc: 'Haz una foto a cualquier ticket de combustible, factura de proveedor o recambio desde tu smartphone. La IA extrae automÃ¡ticamente el CIF, razÃ³n social, base imponible e IVA sin que tengas que teclear nada.'
  },
  {
    icon: Car,
    titulo: 'Lectura de MatrÃ­culas OCR (para talleres)',
    desc: 'Apunta con la cÃ¡mara al vehÃ­culo para cargar en segundos su ficha tÃ©cnica, histÃ³rico de averÃ­as, cliente titular y presupuestos asociados, agilizando la recepciÃ³n al mÃ¡ximo.'
  },
  {
    icon: Receipt,
    titulo: 'Control de Abonos, Deudas y Pagos Parciales',
    desc: 'Seguimiento riguroso de cobros pendientes, entregas a cuenta y pagos fraccionados con emisiÃ³n instantÃ¡nea de recibos oficiales de liquidaciÃ³n para mayor tranquilidad.'
  },
  {
    icon: FileText,
    titulo: 'Presupuestos Online con Enlaces WhatsApp y Email',
    desc: 'Crea presupuestos en segundos y compÃ¡rtelos con enlaces ultra-cortos interactivos. Tus clientes los revisan y aprueban al instante con un simple toque desde su smartphone.'
  },
  {
    icon: Calendar,
    titulo: 'Agenda y Control de Citas Integrado',
    desc: 'Planificador de entradas, citas y recepciones para organizar el trabajo diario de tu equipo, evitar solapamientos y garantizar los plazos de entrega pactados.'
  },
  {
    icon: Sparkles,
    titulo: 'Roadmap Visual de Estados de Trabajo',
    desc: 'Panel visual por fases (recepciÃ³n, diagnÃ³stico, chapa, pintura, mecÃ¡nica, listo para entrega) para que todo el equipo sepa quÃ© hacer en cada instante.'
  },
  {
    icon: Lock,
    titulo: 'EmisiÃ³n AutomÃ¡tica de Recibos y Proformas',
    desc: 'Genera documentaciÃ³n mercantil profesional y numerada con validez legal, lista para firmar o enviar por medios telemÃ¡ticos a tus clientes.'
  }
];

// CaracterÃ­sticas ampliadas para Gestarian Enterprise (PrÃ³ximamente)
const ENTERPRISE_FEATURES_AMPLIADAS = [
  {
    icon: Building2,
    titulo: 'GestorÃ­a Online Integral en Tiempo Real',
    desc: 'Tu asesorÃ­a fiscal conectada en vivo a tu plataforma. Los asesores acceden directamente a libros contables, retenciones y modelos fiscales oficiales sin intercambiar archivos por email.'
  },
  {
    icon: Activity,
    titulo: 'Business Intelligence y AnÃ¡lisis Predictivo',
    desc: 'Cuadro de mando integral con previsiÃ³n de tesorerÃ­a, rentabilidad por operario, anÃ¡lisis de mÃ¡rgenes por servicio y detecciÃ³n automÃ¡tica de cuellos de botella.'
  },
  {
    icon: Boxes,
    titulo: 'Control Automatizado de Stock y AlmacÃ©n',
    desc: 'Trazabilidad de recambios con avisos automÃ¡ticos de rotura de stock, pedidos directos a distribuidores y valoraciÃ³n continua de inventario.'
  },
  {
    icon: Layers,
    titulo: 'GestiÃ³n Multi-Sede y Multi-Taller',
    desc: 'Supervisa varios centros de trabajo, talleres o delegaciones desde un panel Ãºnico centralizado con informes comparativos y permisos por delegaciÃ³n.'
  },
  {
    icon: Users,
    titulo: 'Portal de Empleados y Control Horario',
    desc: 'Fichaje digital homologado, gestiÃ³n de turnos, partes de trabajo por operario y liquidaciÃ³n automÃ¡tica de productividades.'
  },
  {
    icon: Sparkles,
    titulo: 'Incluye Todo lo Ofrecido en Gestarian Pro',
    desc: 'Toda la potencia de Pro potenciada a escala corporativa con soporte prioritario 24/7 y copias de seguridad de alta disponibilidad.'
  }
];

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [expandedCard, setExpandedCard] = useState<'lite' | 'pro' | 'enterprise' | null>(null);

  const handleAccederPro = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onEnterApp();
  };

  const handleDownloadApp = (version: 'lite' | 'pro') => {
    if (version === 'lite') {
      window.open('https://lite-gestarian.web.app', '_blank');
    } else {
      onEnterApp();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30 relative">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      {/* Oscurecimiento cinematogrÃ¡fico global al expandir cualquiera de las tarjetas */}
      <AnimatePresence>
        {expandedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setExpandedCard(null)}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-40 cursor-pointer"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 sm:px-8 py-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl lg:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              GESTARIAN
            </span>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={onEnterApp}
              className="px-6 py-3 lg:px-8 lg:py-3.5 text-base lg:text-lg font-bold rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Acceso a Roles</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 lg:py-24 text-center max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: expandedCard ? 0.2 : 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 lg:gap-3 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-6 lg:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs lg:text-sm font-medium tracking-wide">Asistente de IA y automatizaciÃ³n a tu servicio</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: expandedCard ? 0.2 : 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.15]"
          >
            Automatiza tu documentaciÃ³n y <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-500 to-cyan-400">
              recupera tu tiempo libre
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: expandedCard ? 0.2 : 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mb-8 leading-relaxed font-normal mx-auto"
          >
            Ahorra horas de trabajo a la semana automatizando la documentaciÃ³n de tu empresa con GESTARIAN. 
            Una plataforma asistida por IA y accesible 100% online con solo el mÃ³vil.
            <span className="text-slate-400 block mt-2 font-medium">
              Tu oficina en la nube con acceso total en todo momento, estÃ©s donde estÃ©s.
            </span>
          </motion.p>

          {/* BotÃ³n CTA Acceder x2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: expandedCard ? 0.2 : 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mb-14"
          >
            <button
              onClick={onEnterApp}
              className="inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl font-extrabold rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white shadow-2xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-indigo-400/30"
            >
              <span>Acceso a Roles</span>
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>

          {/* Grid de Productos (3 Tarjetas con animaciÃ³n y despliegue individual) */}
          <div className="relative w-full max-w-[96vw] xl:max-w-[1500px]">
            <div className={`flex overflow-x-auto md:grid gap-6 w-full snap-x snap-mandatory pt-8 pb-8 md:pb-0 px-4 md:px-0 transition-all duration-500 ${
              expandedCard ? 'md:grid-cols-1 justify-items-center' : 'md:grid-cols-[1fr_1.2fr_1fr]'
            }`}>

              <AnimatePresence mode="popLayout">
                {!expandedCard && (
                  <motion.div 
                    layoutId="card-lite"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    onClick={() => setExpandedCard('lite')}
                    className="group relative rounded-3xl bg-slate-900/50 border border-slate-800 p-8 flex flex-col text-left hover:bg-slate-800/50 hover:border-emerald-500/40 transition-colors min-w-[85vw] md:min-w-0 snap-center shrink-0 cursor-pointer shadow-xl hover:scale-[1.02]"
                  >
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
                  
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>

                  <div className="absolute top-8 right-8 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold tracking-wider border border-emerald-500/30">
                    GRATIS 100%
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-white">Gestarian Lite</h3>
                  <p className="text-slate-400 mb-6 flex-1 text-sm lg:text-base">
                    Factura con tu smartphone cumpliendo con VeriFactu. Cero complicaciones.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {['Cero configuraciÃ³n', 'EnvÃ­o por WhatsApp', 'PDF profesional', 'Descarga y uso 100% gratis'].map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="xl:whitespace-nowrap">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={(e) => { e.stopPropagation(); setExpandedCard('lite'); }}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20 mb-3"
                  >
                    <span>Conocer todo lo que Lite te ofrece</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="flex gap-2">
                    <a
                      href="https://lite-gestarian.web.app"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
                    >
                      Acceder a Lite
                    </a>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDownloadApp('lite'); }}
                      className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 transition-colors border border-emerald-500/30 flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar</span>
                    </button>
                  </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 2. GESTARIAN PRO (ESTADO NORMAL) */}
              <AnimatePresence mode="popLayout">
                {!expandedCard && (
                  <motion.div 
                    layoutId="card-pro"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    onClick={() => setExpandedCard('pro')}
                    className="group relative rounded-3xl bg-gradient-to-b from-indigo-900/40 to-slate-900/50 border border-indigo-500/30 p-8 flex flex-col text-left transform md:-translate-y-6 hover:border-indigo-400/60 transition-colors shadow-2xl shadow-indigo-900/25 min-w-[85vw] md:min-w-0 snap-center shrink-0 cursor-pointer hover:scale-[1.02]"
                  >
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-60" />
                  
                  <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="absolute top-8 right-8 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold tracking-wider border border-indigo-500/30">
                    RECOMENDADO
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-white">Gestarian Pro</h3>
                  <p className="text-slate-400 mb-6 flex-1 text-sm lg:text-base">
                    Haz un presupuesto online y olvÃ­date del resto de documentaciÃ³n, GESTARIAN lo hace por ti. 
                    Confirma la factura y la enviamos junto a tus informes a tu gestorÃ­a.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {[
                      'AdemÃ¡s de lo ofrecido en Lite...',
                      'Nube para documentaciÃ³n, facturas y gastos',
                      'Balance econÃ³mico y financiero',
                      'GestiÃ³n directa y envÃ­os a gestorÃ­a',
                      'Registro de gastos OCR y matrÃ­culas',
                      'Roadmap visual y control de citas'
                    ].map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-indigo-400" />
                        <span className="xl:whitespace-nowrap">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={(e) => { e.stopPropagation(); setExpandedCard('pro'); }}
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/25 mb-3"
                  >
                    <span>Conocer todo lo que Pro te ofrece</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={handleAccederPro}
                      className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 cursor-pointer"
                    >
                      Acceder a Pro
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDownloadApp('pro'); }}
                      className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-300 transition-colors border border-indigo-500/30 flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar Pro</span>
                    </button>
                  </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 3. GESTARIAN ENTERPRISE (ESTADO NORMAL) */}
              <AnimatePresence mode="popLayout">
                {!expandedCard && (
                  <motion.div 
                    layoutId="card-enterprise"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    onClick={() => setExpandedCard('enterprise')}
                    className="group relative rounded-3xl bg-slate-900/50 border border-purple-500/20 p-8 flex flex-col text-left min-w-[85vw] md:min-w-0 snap-center shrink-0 cursor-pointer hover:border-purple-500/40 hover:bg-slate-800/40 transition-colors shadow-xl hover:scale-[1.02]"
                  >
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
                  
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20">
                    <Building2 className="w-6 h-6 text-purple-400" />
                  </div>

                  <div className="absolute top-8 right-8 px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-300 text-xs font-semibold tracking-wide border border-purple-500/20">
                    EvoluciÃ³n de Pro
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-slate-200">Gestarian Enterprise</h3>
                  <p className="text-slate-400 mb-6 flex-1 text-sm lg:text-base">
                    Tu gestorÃ­a completa online con acceso en tiempo real a todos tus documentos e informes, grÃ¡ficos y control de stocks.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {['GestorÃ­a completa online en vivo', 'GrÃ¡ficos y anÃ¡lisis de negocio', 'EstadÃ­sticas y control de stocks', 'Multi-taller y multi-sede'].map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                        <span className="xl:whitespace-nowrap">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={(e) => { e.stopPropagation(); setExpandedCard('enterprise'); }}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-purple-900/50 hover:bg-purple-800 text-purple-200 rounded-xl font-bold transition-all border border-purple-500/30 mb-3"
                  >
                    <span>Conocer Gestarian Enterprise</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="flex gap-2 opacity-60">
                    <button
                      disabled
                      className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-slate-800/40 text-slate-500 border border-slate-700/50 cursor-not-allowed"
                    >
                      Acceder (PrÃ³x.)
                    </button>
                    <button
                      disabled
                      className="flex-1 py-2 text-center text-xs font-semibold rounded-lg bg-slate-800/40 text-slate-500 border border-slate-700/50 cursor-not-allowed flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar (PrÃ³x.)</span>
                    </button>
                  </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* VISTAS EXPANDIDAS CON ANIMACIÃ“N: DESPLAZAMIENTO A LA IZQUIERDA Y CRECIMIENTO HACIA LA DERECHA */}

            {/* 1. EXPANDIDO: GESTARIAN LITE */}
            <AnimatePresence>
              {expandedCard === 'lite' && (
                <motion.div
                  layoutId="card-lite"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-auto md:w-[min(1280px,96vw)] max-h-[92vh] overflow-y-auto bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col text-left"
                >
                  <button
                    onClick={() => setExpandedCard(null)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700 z-20"
                    title="Cerrar"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 xl:gap-12 flex-1 items-start">
                    {/* Columna Izquierda */}
                    <div className="flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0 lg:pr-8">
                      <div>
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/30">
                          <Zap className="w-8 h-8 text-white" />
                        </div>

                        <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold tracking-wider border border-emerald-500/30 mb-3">
                          100% GRATIS DE POR VIDA
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Gestarian Lite</h2>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                          FacturaciÃ³n en 30 segundos desde tu mÃ³vil con homologaciÃ³n Veri*Factu. 
                          Pensado para que no pierdas ni un minuto en papeleo innecesario.
                        </p>

                        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 space-y-2 mb-6">
                          <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span>Descarga y Uso Gratuito</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Sin registro de tarjeta bancaria, sin suscripciones mensuales y sin lÃ­mite de facturas. Totalmente libre para ti.
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-slate-400 space-y-1">
                        <p className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>EnvÃ­o de facturas por WhatsApp</span>
                        </p>
                        <p className="flex items-center gap-1.5 text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Generador de PDF instantÃ¡neo</span>
                        </p>
                      </div>
                    </div>

                    {/* Columna Derecha */}
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="flex flex-col space-y-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                          <Zap className="w-5 h-5 text-emerald-400" />
                          <span>Todo lo que incluye Gestarian Lite</span>
                        </h3>
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                          Uso y Descarga Gratis
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[50vh] lg:max-h-[58vh] overflow-y-auto pr-2">
                        {LITE_FEATURES_AMPLIADAS.map((item, idx) => {
                          const IconComp = item.icon;
                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 + idx * 0.04 }}
                              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-emerald-500/40 hover:bg-slate-900/80 transition-all text-left space-y-1.5"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                                  {item.titulo}
                                </h4>
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed pl-9">
                                {item.desc}
                              </p>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </div>

                  {/* Botones inferiores de Lite */}
                  <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={() => setExpandedCard(null)}
                      className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer order-last sm:order-first"
                    >
                      â† Volver a todas las versiones
                    </button>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => handleDownloadApp('lite')}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <Download className="w-4 h-4 text-emerald-400" />
                        <span>Descargar Lite (Gratis)</span>
                      </button>

                      <a
                        href="https://lite-gestarian.web.app"
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base transition-all shadow-xl shadow-emerald-600/25 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Acceder a Lite</span>
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2. EXPANDIDO: GESTARIAN PRO */}
            <AnimatePresence>
              {expandedCard === 'pro' && (
                <motion.div
                  layoutId="card-pro"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-auto md:w-[min(1280px,96vw)] max-h-[92vh] overflow-y-auto bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col text-left"
                >
                  <button
                    onClick={() => setExpandedCard(null)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700 z-20"
                    title="Cerrar"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 xl:gap-12 flex-1 items-start">
                    {/* Columna Izquierda */}
                    <div className="flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0 lg:pr-8">
                      <div>
                        <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/30">
                          <Shield className="w-8 h-8 text-white" />
                        </div>

                        <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold tracking-wider border border-indigo-500/30 mb-3">
                          PLATAFORMA INTEGRAL PRO
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Gestarian Pro</h2>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                          Haz un presupuesto online y olvÃ­date del resto de documentaciÃ³n, GESTARIAN lo hace por ti. 
                          Solo confirma la factura y nosotros nos encargamos de enviarla junto a tus informes trimestrales y anuales a tu gestorÃ­a.
                        </p>

                        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2 mb-6">
                          <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                            <span>Tranquilidad y tiempo libre</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            DiseÃ±ado para talleres y pymes que quieren delegar el papeleo en la tecnologÃ­a y recuperar su tiempo libre.
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-slate-400 space-y-1">
                        <p className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Todo lo ofrecido en Lite incluido</span>
                        </p>
                        <p className="flex items-center gap-1.5 text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                          <span>Sin permanencia ni configuraciones complejas</span>
                        </p>
                      </div>
                    </div>

                    {/* Columna Derecha */}
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="flex flex-col space-y-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-indigo-400" />
                          <span>Todo lo que Gestarian Pro hace por ti</span>
                        </h3>
                        <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
                          10 herramientas en una sola app
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[50vh] lg:max-h-[58vh] overflow-y-auto pr-2">
                        {PRO_FEATURES_AMPLIADAS.map((item, idx) => {
                          const IconComp = item.icon;
                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 + idx * 0.04 }}
                              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-indigo-500/40 hover:bg-slate-900/80 transition-all text-left space-y-1.5"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                                  {item.titulo}
                                </h4>
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed pl-9">
                                {item.desc}
                              </p>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </div>

                  {/* Botones inferiores de Pro */}
                  <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={() => setExpandedCard(null)}
                      className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer order-last sm:order-first"
                    >
                      â† Volver a todas las versiones
                    </button>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                      <button
                        onClick={onEnterApp}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Shield className="w-4 h-4 text-indigo-400" />
                        <span>Acceso Cliente</span>
                      </button>

                      <button
                        onClick={() => handleDownloadApp('pro')}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-950/60 hover:bg-indigo-900 text-indigo-300 font-semibold text-xs sm:text-sm border border-indigo-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Descargar Pro</span>
                      </button>

                      <button
                        onClick={handleAccederPro}
                        className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-extrabold text-sm sm:text-base transition-all shadow-xl shadow-indigo-500/25 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-indigo-400/30"
                      >
                        <span>Acceder a Pro</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3. EXPANDIDO: GESTARIAN ENTERPRISE */}
            <AnimatePresence>
              {expandedCard === 'enterprise' && (
                <motion.div
                  layoutId="card-enterprise"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-auto md:w-[min(1280px,96vw)] max-h-[92vh] overflow-y-auto bg-slate-900 border border-purple-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col text-left"
                >
                  <button
                    onClick={() => setExpandedCard(null)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700 z-20"
                    title="Cerrar"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 xl:gap-12 flex-1 items-start">
                    {/* Columna Izquierda */}
                    <div className="flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0 lg:pr-8">
                      <div>
                        <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mb-6 shadow-xl shadow-purple-500/20">
                          <Building2 className="w-8 h-8 text-purple-400" />
                        </div>

                        <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold tracking-wider border border-purple-500/30 mb-3">
                          PRÃ“XIMA EVOLUCIÃ“N EMPRESARIAL
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Gestarian Enterprise</h2>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                          EvoluciÃ³n avanzada de Gestarian Pro. Conecta a tu gestorÃ­a en tiempo real, 
                          controla stocks automatizados, supervisa mÃºltiples sedes y analiza tu negocio con business intelligence predictivo.
                        </p>

                        <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/20 space-y-2 mb-6">
                          <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase tracking-wider">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span>En Fase de Desarrollo</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Actualmente en diseÃ±o para grandes talleres y redes comerciales. Los botones de acceso y descarga se habilitarÃ¡n muy pronto.
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-slate-400 space-y-1">
                        <p className="flex items-center gap-1.5 text-purple-400 font-semibold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Incluye todas las funciones de Gestarian Pro</span>
                        </p>
                        <p className="flex items-center gap-1.5 text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-purple-400" />
                          <span>Arquitectura corporativa multi-taller</span>
                        </p>
                      </div>
                    </div>

                    {/* Columna Derecha */}
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="flex flex-col space-y-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-purple-400" />
                          <span>Capacidades Avanzadas de Enterprise</span>
                        </h3>
                        <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                          PrÃ³ximamente
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[50vh] lg:max-h-[58vh] overflow-y-auto pr-2">
                        {ENTERPRISE_FEATURES_AMPLIADAS.map((item, idx) => {
                          const IconComp = item.icon;
                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 + idx * 0.04 }}
                              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-purple-500/40 hover:bg-slate-900/80 transition-all text-left space-y-1.5"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                                  {item.titulo}
                                </h4>
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed pl-9">
                                {item.desc}
                              </p>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </div>

                  {/* Botones inferiores de Enterprise (no operativos todavÃ­a) */}
                  <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={() => setExpandedCard(null)}
                      className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer order-last sm:order-first"
                    >
                      â† Volver a todas las versiones
                    </button>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                      <button
                        disabled
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800/50 text-slate-500 font-bold text-xs sm:text-sm border border-slate-700/50 cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Descargar Enterprise (PrÃ³ximamente)</span>
                      </button>

                      <button
                        disabled
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-purple-900/30 text-purple-400/60 font-extrabold text-sm sm:text-base border border-purple-500/30 cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <span>Acceso Enterprise (En Desarrollo)</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        <footer className="py-8 text-center text-sm text-slate-500">
          <p>Â© {new Date().getFullYear()} Gestarian. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

