import { Shield, Eye, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export function EthicsTransparencyCard({ etica_y_uso_responsable, transparencia }) {
  const [expandedSection, setExpandedSection] = useState(null)

  const ethics = etica_y_uso_responsable || {}
  const transparency = transparencia || {}

  const { derechos_autor, no_plagio, cita_correcta, reconocimiento_intelectual } = ethics
  const { no_disponible_en_pdf = [], inferido_o_externo = [] } = transparency

  if (!ethics || Object.keys(ethics).length === 0) {
    return null
  }

  return (
    <section className="card ethics-card">
      <div className="section-title">
        <Shield size={19} />
        <h3>Ética y transparencia</h3>
      </div>

      {/* Derechos de autor */}
      {derechos_autor && (
        <div className="ethics-item">
          <button
            className="ethics-toggle"
            onClick={() =>
              setExpandedSection(expandedSection === 'derechos' ? null : 'derechos')
            }
          >
            <span className="toggle-icon">
              {expandedSection === 'derechos' ? '▼' : '▶'}
            </span>
            <span className="ethics-title">Derechos de autor</span>
          </button>
          {expandedSection === 'derechos' && (
            <p className="ethics-content">{derechos_autor}</p>
          )}
        </div>
      )}

      {/* No plagio */}
      {no_plagio && (
        <div className="ethics-item">
          <button
            className="ethics-toggle"
            onClick={() =>
              setExpandedSection(expandedSection === 'plagio' ? null : 'plagio')
            }
          >
            <span className="toggle-icon">
              {expandedSection === 'plagio' ? '▼' : '▶'}
            </span>
            <span className="ethics-title">Verificación de originalidad</span>
          </button>
          {expandedSection === 'plagio' && (
            <p className="ethics-content">{no_plagio}</p>
          )}
        </div>
      )}

      {/* Cita correcta */}
      {cita_correcta && (
        <div className="ethics-item">
          <button
            className="ethics-toggle"
            onClick={() =>
              setExpandedSection(expandedSection === 'cita' ? null : 'cita')
            }
          >
            <span className="toggle-icon">
              {expandedSection === 'cita' ? '▼' : '▶'}
            </span>
            <span className="ethics-title">Citación correcta</span>
          </button>
          {expandedSection === 'cita' && (
            <p className="ethics-content">{cita_correcta}</p>
          )}
        </div>
      )}

      {/* Reconocimiento intelectual */}
      {reconocimiento_intelectual && (
        <div className="ethics-item">
          <button
            className="ethics-toggle"
            onClick={() =>
              setExpandedSection(expandedSection === 'reconoc' ? null : 'reconoc')
            }
          >
            <span className="toggle-icon">
              {expandedSection === 'reconoc' ? '▼' : '▶'}
            </span>
            <span className="ethics-title">Reconocimiento intelectual</span>
          </button>
          {expandedSection === 'reconoc' && (
            <p className="ethics-content">{reconocimiento_intelectual}</p>
          )}
        </div>
      )}

      {/* Transparencia */}
      {(no_disponible_en_pdf.length > 0 || inferido_o_externo.length > 0) && (
        <div className="transparency-section">
          <h4 className="transparency-title">
            <Eye size={16} />
            Información de transparencia
          </h4>

          {no_disponible_en_pdf.length > 0 && (
            <div className="transparency-item">
              <p className="transparency-label">
                <AlertCircle size={14} />
                No disponible en PDF
              </p>
              <ul className="transparency-list">
                {no_disponible_en_pdf.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {inferido_o_externo.length > 0 && (
            <div className="transparency-item">
              <p className="transparency-label">
                <AlertCircle size={14} />
                Inferido o de fuentes externas
              </p>
              <ul className="transparency-list">
                {inferido_o_externo.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
