import { FileUp, SendHorizontal, Sparkles } from 'lucide-react'

export function HeaderHelp() {
  return (
    <header className="card header-card">
      <div className="title-row">
        <Sparkles size={24} />
        <h1>Asistente de lectura PDF</h1>
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
