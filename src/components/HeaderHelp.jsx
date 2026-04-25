import { FileUp, Moon, SendHorizontal, Sparkles, Sun } from 'lucide-react'

export function HeaderHelp({ theme, onToggleTheme }) {
  const isDark = theme === 'dark'

  return (
    <header className="card header-card">
      <div className="title-row">
        <div className="title-main">
          <Sparkles size={24} />
          <h1>XtractIA Text</h1>
        </div>
        <button type="button" className="theme-toggle-btn" onClick={onToggleTheme} aria-label="Cambiar tema">
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
          <span>{isDark ? 'Modo claro' : 'Modo oscuro'}</span>
        </button>
      </div>
      <p className="subtitle">
        Obtén un resumen estructurado y una referencia bibliográfica de tu documento en segundos.
      </p>
      <div className="steps-grid">
        <div className="step-item">
          <FileUp size={18} />
          <span>Sube tu PDF</span>
        </div>
        <div className="step-item">
          <span className="step-dot" />
          <span>Elige formato (APA, MLA, IEEE...)</span>
        </div>
        <div className="step-item">
          <SendHorizontal size={18} />
          <span>Presiona Enviar</span>
        </div>
      </div>
    </header>
  )
}
