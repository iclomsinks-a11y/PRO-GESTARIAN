import {
  LayoutDashboard, Users, ClipboardList, Calendar, Wrench,
  FileText, Scale, Truck, AlertTriangle,
  UserCog, Settings, FolderOpen, Coins
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  path: string
  icon: LucideIcon
  permiso?: string | null
}

// Full menu (hamburger / sidebar)
const DEFAULT_FOOTER_NAV: NavItem[] = [
  { label: 'Expedientes',  path: '/expedientes',   icon: FolderOpen,      permiso: null },
  { label: 'Clientes',     path: '/clientes',      icon: Users,           permiso: null },
  { label: 'Solicitudes',  path: '/solicitudes',   icon: FileText,        permiso: null },
  { label: 'Presupuestos', path: '/presupuestos',  icon: ClipboardList,   permiso: null },
  { label: 'Citas',        path: '/citas',         icon: Calendar,        permiso: null },
  { label: 'Facturas Emitidas', path: '/facturas/emitidas', icon: FileText, permiso: null },
  { label: 'Facturas Recibidas', path: '/facturas/recibidas', icon: FileText, permiso: null },
  { label: 'Taller',       path: '/taller',        icon: Wrench,          permiso: null },
  { label: 'Balances',     path: '/balances',      icon: Scale,           permiso: null },
  { label: 'Configuración', path: '/configuracion', icon: Settings,        permiso: null },
];

// Load saved order from localStorage
let storedOrder: string[] = [];
try {
  const raw = localStorage.getItem('gestarian_menu_order');
  if (raw) storedOrder = JSON.parse(raw);
} catch {}

export const FOOTER_NAV: NavItem[] = storedOrder.length
  ? storedOrder.map((label) => DEFAULT_FOOTER_NAV.find((i) => i.label === label)!).filter(Boolean)
  : DEFAULT_FOOTER_NAV;

// Mobile / Tablet Portrait footer (3 icons: camera, menu, mic)
export const MOBILE_FOOTER_ICONS = ['camera', 'menu', 'mic'] as const

export function openCameraWithPlate(matricula: string) {
  window.dispatchEvent(new CustomEvent('gestarian-camera-open', { detail: { matricula } }))
}

export function openCameraWithoutPlate() {
  window.dispatchEvent(new CustomEvent('gestarian-camera-open', {}))
}
