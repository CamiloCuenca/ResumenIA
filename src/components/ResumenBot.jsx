import { useState } from 'react'
import { Copy } from 'lucide-react'
import { MentalMap } from './MentalMap'
import { RelatedArticles } from './RelatedArticles'

export function ResumenBot({ data, onCopy }) {
  const [activeTab, setActiveTab] = useState('resumen')

  if (!data || typeof data !== 'object') {
    return <p className="inline-error">❌ Respuesta inválida del servidor.</p>
  }

  const {
    idea_principal,
    puntos_clave,
    argumentos,
    conclusiones,
    preguntas_abiertas,
    mapa_mental,
    consulta_relacionados,
    articulos_relacionados,
  } = data

  const resumenPlano = [
    idea_principal ? `Idea principal: ${idea_principal}` : '',
    Array.isArray(puntos_clave) && puntos_clave.length
      ? `Puntos clave:\n${puntos_clave.map((p) => `- ${p}`).join('\n')}`
      : '',
    Array.isArray(argumentos) && argumentos.length
      ? `Argumentos del autor:\n${argumentos.map((a) => `- ${a}`).join('\n')}`
      : '',
    conclusiones ? `Conclusiones: ${conclusiones}` : '',
    Array.isArray(preguntas_abiertas) && preguntas_abiertas.length
      ? `Preguntas abiertas:\n${preguntas_abiertas.map((q) => `- ${q}`).join('\n')}`
      : '',
  ]
    .filter(Boolean)
    .join('\n\n')

  const tabs = [
    { id: 'resumen', label: 'Resumen' },
    { id: 'mapa', label: 'Mapa mental' },
    {
      id: 'articulos',
      label: `Artículos${Array.isArray(articulos_relacionados) ? ` (${articulos_relacionados.length})` : ''}`,
    },
  ]

  return (
    <div className="summary-block">
      <div className="results-tabs">
        <div className="results-tablist" role="tablist" aria-label="Vistas del resultado">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`results-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="result-tabpanel" role="tabpanel">
          {activeTab === 'resumen' && (
            <>
              <div className="summary-actions">
                <button className="copy-btn" onClick={() => onCopy(resumenPlano)} title="Copiar resumen">
                  <Copy size={15} />
                  Copiar resumen
                </button>
              </div>

              {idea_principal && (
                <div>
                  <strong>Idea principal:</strong> {idea_principal}
                </div>
              )}

              {Array.isArray(puntos_clave) && puntos_clave.length > 0 && (
                <div>
                  <strong>Puntos clave:</strong>
                  <ul>
                    {puntos_clave.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {Array.isArray(argumentos) && argumentos.length > 0 && (
                <div>
                  <strong>Argumentos del autor:</strong>
                  <ul>
                    {argumentos.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {conclusiones && (
                <div>
                  <strong>Conclusiones:</strong> {conclusiones}
                </div>
              )}

              {Array.isArray(preguntas_abiertas) && preguntas_abiertas.length > 0 && (
                <div>
                  <strong>Preguntas abiertas:</strong>
                  <ul>
                    {preguntas_abiertas.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {activeTab === 'mapa' && (
            mapa_mental ? (
              <MentalMap mapaMental={mapa_mental} />
            ) : (
              <p className="tab-empty">No hay mapa mental disponible para este documento.</p>
            )
          )}

          {activeTab === 'articulos' && (
            <RelatedArticles articles={articulos_relacionados} searchQuery={consulta_relacionados} />
          )}
        </div>
      </div>
    </div>
  )
}
