import { BookOpen, Link2, Copy } from 'lucide-react'
import { useState } from 'react'

export function ReferencesPanel({ referencias, onCopy }) {
  const [expandedRef, setExpandedRef] = useState(null)

  if (!referencias || typeof referencias !== 'object') {
    return null
  }

  const { formato, del_articulo_original = [], externas_sugeridas = {} } = referencias
  const { relacionadas_tema = [], trabajos_autores_relacionados = [] } = externas_sugeridas

  const totalReferencias =
    (Array.isArray(del_articulo_original) ? del_articulo_original.length : 0) +
    (Array.isArray(relacionadas_tema) ? relacionadas_tema.length : 0) +
    (Array.isArray(trabajos_autores_relacionados) ? trabajos_autores_relacionados.length : 0)

  return (
    <section className="card references-panel">
      <div className="section-title">
        <BookOpen size={19} />
        <h3>Referencias ({totalReferencias})</h3>
        {formato && <span className="format-badge">{formato}</span>}
      </div>

      {/* Referencias del artículo original */}
      {Array.isArray(del_articulo_original) && del_articulo_original.length > 0 && (
        <div className="references-section">
          <h4 className="references-subsection">Del artículo original ({del_articulo_original.length})</h4>
          <div className="references-list">
            {del_articulo_original.map((ref, idx) => (
              <div key={idx} className="reference-item">
                <button
                  className="reference-toggle"
                  onClick={() => setExpandedRef(expandedRef === `orig-${idx}` ? null : `orig-${idx}`)}
                >
                  <span className="ref-number">[{idx + 1}]</span>
                  <span className="ref-text">{ref.texto_original}</span>
                </button>
                
                {expandedRef === `orig-${idx}` && (
                  <div className="reference-details">
                    <div className="ref-formatted">
                      <p className="ref-title">Formato APA:</p>
                      <p className="ref-content">{ref.referencia_formateada}</p>
                      <button
                        className="copy-small-btn"
                        onClick={() => onCopy(ref.referencia_formateada)}
                      >
                        <Copy size={14} />
                        Copiar
                      </button>
                    </div>
                    {ref.nota && (
                      <div className="ref-note">
                        <p className="note-title">Nota:</p>
                        <p className="note-text">{ref.nota}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Referencias relacionadas por tema */}
      {Array.isArray(relacionadas_tema) && relacionadas_tema.length > 0 && (
        <div className="references-section">
          <h4 className="references-subsection">Relacionadas por tema ({relacionadas_tema.length})</h4>
          <div className="references-list external">
            {relacionadas_tema.map((ref, idx) => (
              <div key={idx} className="reference-item external-ref">
                <button
                  className="reference-toggle"
                  onClick={() => setExpandedRef(expandedRef === `tema-${idx}` ? null : `tema-${idx}`)}
                >
                  <span className="ref-title-external">{ref.titulo}</span>
                  <span className="ref-year">({ref.anio})</span>
                </button>

                {expandedRef === `tema-${idx}` && (
                  <div className="reference-details">
                    <p className="ref-authors">
                      <strong>Autores:</strong> {Array.isArray(ref.autores) ? ref.autores.join(', ') : ref.autores}
                    </p>
                    {ref.doi && (
                      <div className="ref-doi">
                        <Link2 size={14} />
                        <a href={ref.url} target="_blank" rel="noopener noreferrer" className="doi-link">
                          DOI: {ref.doi}
                        </a>
                      </div>
                    )}
                    <p className="ref-content">{ref.referencia_formateada}</p>
                    <button
                      className="copy-small-btn"
                      onClick={() => onCopy(ref.referencia_formateada)}
                    >
                      <Copy size={14} />
                      Copiar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trabajos de autores relacionados */}
      {Array.isArray(trabajos_autores_relacionados) && trabajos_autores_relacionados.length > 0 && (
        <div className="references-section">
          <h4 className="references-subsection">Trabajos de autores relacionados ({trabajos_autores_relacionados.length})</h4>
          <div className="references-list external">
            {trabajos_autores_relacionados.map((ref, idx) => (
              <div key={idx} className="reference-item external-ref">
                <button
                  className="reference-toggle"
                  onClick={() => setExpandedRef(expandedRef === `author-${idx}` ? null : `author-${idx}`)}
                >
                  <span className="ref-title-external">{ref.titulo}</span>
                  <span className="ref-year">({ref.anio})</span>
                </button>

                {expandedRef === `author-${idx}` && (
                  <div className="reference-details">
                    <p className="ref-authors">
                      <strong>Autores:</strong> {Array.isArray(ref.autores) ? ref.autores.join(', ') : ref.autores}
                    </p>
                    {ref.doi && (
                      <div className="ref-doi">
                        <Link2 size={14} />
                        <a href={ref.url} target="_blank" rel="noopener noreferrer" className="doi-link">
                          DOI: {ref.doi}
                        </a>
                      </div>
                    )}
                    <p className="ref-content">{ref.referencia_formateada}</p>
                    <button
                      className="copy-small-btn"
                      onClick={() => onCopy(ref.referencia_formateada)}
                    >
                      <Copy size={14} />
                      Copiar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
