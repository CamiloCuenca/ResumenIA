import { AlertCircle, CheckCircle2, Info, LoaderCircle } from 'lucide-react'

const ICONS = {
  info: Info,
  loading: LoaderCircle,
  success: CheckCircle2,
  error: AlertCircle,
}

export function StatusBanner({ type = 'info', message }) {
  const Icon = ICONS[type] || Info
  return (
    <div className={`status-banner ${type}`} role="status" aria-live="polite">
      <Icon size={18} className={type === 'loading' ? 'spin' : ''} />
      <p>{message}</p>
    </div>
  )
}
