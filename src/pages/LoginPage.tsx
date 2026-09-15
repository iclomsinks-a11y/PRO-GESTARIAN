import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '../lib/ToastContext'
import { ShieldCheck, User, Users, Briefcase, ChevronLeft, Building2, Zap, LayoutTemplate, ArrowRight } from 'lucide-react'

type AccessMode = 'NONE' | 'USUARIO' | 'CLIENTE' | 'AUTORIZADO'
type VersionMode = 'LITE' | 'PRO' | 'ENTERPRISE' | null

export const LoginPage: React.FC = () => {
  const { addToast } = useToast()
  const navigate = useNavigate()

  const [accessMode, setAccessMode] = useState<AccessMode>('NONE')
  const [versionMode, setVersionMode] = useState<VersionMode>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Dev backdoor check
  const checkDevBackdoor = async (emailInput: string) => {
    if (emailInput.trim().toLowerCase() === 'iclomsinks' || emailInput.trim().toLowerCase() === 'iclomsinks@gmail.com') {
      try {
        setLoading(true)
        // Hardcoded Dev login bypass
        localStorage.setItem('gestarian_test_user', 'iclomsinks@gmail.com')
        sessionStorage.setItem('gestarian_account_chosen', 'true')
        window.location.href = '/'
      } catch (err) {
        addToast('Error al acceder como Desarrollador', 'error')
      } finally {
        setLoading(false)
      }
      return true
    }
    return false
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check Dev Backdoor first
    if (await checkDevBackdoor(email)) return

    if (!email.trim() || !password.trim()) {
      addToast('Por favor introduce email y contraseña.', 'error')
      return
    }

    setLoading(true)
    try {
      if (accessMode === 'USUARIO') {
        localStorage.setItem('gestarian_test_user', email.trim().toLowerCase())
        sessionStorage.setItem('gestarian_account_chosen', 'true')
        window.location.href = '/'
      } else if (accessMode === 'AUTORIZADO') {
        // Lógica de login autorizado (TODO)
        addToast('Modo Autorizado: Login pendiente de backend', 'info')
      } else if (accessMode === 'CLIENTE') {
        // Lógica de login cliente (TODO)
        addToast('Modo Cliente: Login pendiente de backend', 'info')
      }
    } catch (err: any) {
      addToast(err.message || 'Error de acceso', 'error')
    } finally {
      setLoading(false)
    }
  }

  // --- COMPONENTES VISUALES ---

  const renderAccessButtons = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col gap-6 w-full max-w-sm mx-auto"
    >
      <h2 className="text-3xl font-extrabold text-white text-center mb-6">Portal de Acceso</h2>
      
      <button
        onClick={() => setAccessMode('USUARIO')}
        className="group relative flex items-center gap-4 p-5 rounded-2xl bg-indigo-500/20 border-2 border-indigo-500 hover:bg-indigo-500/30 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] cursor-pointer overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <Briefcase className="w-8 h-8 text-indigo-400 shrink-0" />
        <div className="text-left">
          <span className="block text-xl font-bold text-white tracking-wide">USUARIO</span>
          <span className="block text-sm text-indigo-200">Talleres y Administradores</span>
        </div>
      </button>

      <button
        onClick={() => setAccessMode('CLIENTE')}
        className="group relative flex items-center gap-4 p-5 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500 hover:bg-emerald-500/30 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] cursor-pointer overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <User className="w-8 h-8 text-emerald-400 shrink-0" />
        <div className="text-left">
          <span className="block text-xl font-bold text-white tracking-wide">CLIENTE</span>
          <span className="block text-sm text-emerald-200">Portal de Vehículos y Citas</span>
        </div>
      </button>

      <button
        onClick={() => setAccessMode('AUTORIZADO')}
        className="group relative flex items-center gap-4 p-5 rounded-2xl bg-amber-500/20 border-2 border-amber-500 hover:bg-amber-500/30 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] cursor-pointer overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <Users className="w-8 h-8 text-amber-400 shrink-0" />
        <div className="text-left">
          <span className="block text-xl font-bold text-white tracking-wide">AUTORIZADO</span>
          <span className="block text-sm text-amber-200">Empleados y Operarios</span>
        </div>
      </button>
    </motion.div>
  )

  const renderUsuarioVersions = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full max-w-4xl mx-auto"
    >
      <button 
        onClick={() => setAccessMode('NONE')}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 self-start transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Volver a Modos de Acceso</span>
      </button>

      <h2 className="text-3xl font-extrabold text-white text-center mb-10">Selecciona tu Versión</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lite */}
        <div className="flex flex-col bg-slate-900/50 border border-emerald-500/30 rounded-3xl p-6 shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:border-emerald-500/60 transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-emerald-300">Versión Lite</h3>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setVersionMode('LITE'); handleLogin(e) }} className="flex flex-col gap-4 mt-auto">
            <input 
              type="text" 
              placeholder="Email / iclomsinks" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-colors mt-2"
            >
              {loading ? 'Accediendo...' : 'Entrar a Lite'}
            </button>
          </form>
        </div>

        {/* Pro */}
        <div className="flex flex-col bg-slate-900/50 border border-indigo-500/50 rounded-3xl p-6 shadow-[0_0_30px_rgba(99,102,241,0.25)] hover:border-indigo-500/80 transition-all transform md:scale-105 z-10 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-indigo-500/50">
            Recomendado
          </div>
          <div className="flex items-center gap-3 mb-6 mt-2">
            <div className="p-3 bg-indigo-500/20 rounded-xl">
              <LayoutTemplate className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-indigo-300">Versión Pro</h3>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setVersionMode('PRO'); handleLogin(e) }} className="flex flex-col gap-4 mt-auto">
            <input 
              type="text" 
              placeholder="Email / iclomsinks" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors mt-2 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <span>Entrar a Pro</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Enterprise */}
        <div className="flex flex-col bg-slate-900/50 border border-purple-500/30 rounded-3xl p-6 shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-purple-500/60 transition-all opacity-80 hover:opacity-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Building2 className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-purple-300">Enterprise</h3>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setVersionMode('ENTERPRISE'); handleLogin(e) }} className="flex flex-col gap-4 mt-auto">
            <input 
              type="text" 
              placeholder="Email / iclomsinks" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-colors mt-2"
            >
              {loading ? 'Accediendo...' : 'Entrar a Enterprise'}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  )

  const renderOtherLogins = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col w-full max-w-sm mx-auto"
    >
      <button 
        onClick={() => setAccessMode('NONE')}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 self-start transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Volver a Modos de Acceso</span>
      </button>

      <h2 className="text-3xl font-extrabold text-white text-center mb-6">
        {accessMode === 'CLIENTE' ? 'Acceso Clientes' : 'Acceso Autorizados'}
      </h2>
      
      <form onSubmit={handleLogin} className="flex flex-col gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
        <input 
          type="text" 
          placeholder="Email / iclomsinks" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <input 
          type="password" 
          placeholder="Contraseña / PIN" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-4 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors"
        >
          {loading ? 'Accediendo...' : 'Ingresar'}
        </button>
      </form>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="z-10 w-full flex justify-center">
        <AnimatePresence mode="wait">
          {accessMode === 'NONE' && renderAccessButtons()}
          {accessMode === 'USUARIO' && renderUsuarioVersions()}
          {(accessMode === 'CLIENTE' || accessMode === 'AUTORIZADO') && renderOtherLogins()}
        </AnimatePresence>
      </div>
    </div>
  )
}
