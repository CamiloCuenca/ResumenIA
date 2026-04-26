import { useState } from 'react'
import { Copy } from 'lucide-react'
import { MentalMap } from './MentalMap'
import { RelatedArticles } from './RelatedArticles'
import { AuthorshipCard } from './AuthorshipCard'
import { EditorialContextCard } from './EditorialContextCard'
import { ReferencesPanel } from './ReferencesPanel'
import { EthicsTransparencyCard } from './EthicsTransparencyCard'

export function ResumenBot({ data, onCopy }) {
  const [activeTab, setActiveTab] = useState('resumen')

  if (!data || typeof data !== 'object') {
    return <p className="inline-error">❌ Respuesta inválida del servidor.</p>
  }

  // Datos de análisis antiguo (resumen)
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

  // Datos nuevos de análisis académico
  const {
    modulo,
    accion_ejecutada,
    motivo,
    autoria,
    contexto_editorial,
    referencias,
    etica_y_uso_responsable,
    transparencia,
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

  // Construir tabs dinámicas basadas en datos disponibles
  const tabs = [
    { id: 'resumen', label: 'Resumen', available: true }, // Siempre mostrar
    { id: 'mapa', label: 'Mapa mental', available: !!mapa_mental },
    {
      id: 'articulos',
      label: `Artículos${Array.isArray(articulos_relacionados) ? ` (${articulos_relacionados.length})` : ''}`,
      available: Array.isArray(articulos_relacionados) && articulos_relacionados.length > 0,
    },
    { id: 'autoria', label: 'Autoría', available: !!autoria && (Array.isArray(autoria.autores_principales) || Array.isArray(autoria.participantes)) },
    { id: 'editorial', label: 'Editorial', available: !!contexto_editorial },
    { id: 'referencias', label: `Referencias${referencias?.del_articulo_original ? ` (${referencias.del_articulo_original.length})` : ''}`, available: !!referencias },
    { id: 'etica', label: 'Ética', available: !!etica_y_uso_responsable || !!transparencia },
  ].filter((tab) => tab.available)

  // Si no hay tabs disponibles, mostrar al menos resumen
  const availableTabs = tabs.length > 0 ? tabs : [{ id: 'resumen', label: 'Resumen', available: true }]

  // Asegurar que activeTab sea válido
  const isActiveTabValid = availableTabs.some(tab => tab.id === activeTab)
  const currentActiveTab = isActiveTabValid ? activeTab : availableTabs[0]?.id || 'resumen'

  return (
    <div className="summary-block">
      <div className="results-tabs">
        <div className="results-tablist" role="tablist" aria-label="Vistas del resultado">
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={currentActiveTab === tab.id}
              className={`results-tab ${currentActiveTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="result-tabpanel" role="tabpanel">
          {currentActiveTab === 'resumen' && (
            <>
              {idea_principal || (Array.isArray(puntos_clave) && puntos_clave.length > 0) || 
               Array.isArray(argumentos) && argumentos.length > 0 || conclusiones || 
               (Array.isArray(preguntas_abiertas) && preguntas_abiertas.length > 0) ? (
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
              ) : (
                <p className="tab-empty">No hay datos de resumen disponibles para este documento.</p>
              )}
            </>
          )}

          {currentActiveTab === 'mapa' && (
            mapa_mental ? (
              <MentalMap mapaMental={mapa_mental} />
            ) : (
              <p className="tab-empty">No hay mapa mental disponible para este documento.</p>
            )
          )}

          {currentActiveTab === 'articulos' && (
            <RelatedArticles articles={articulos_relacionados} searchQuery={consulta_relacionados} />
          )}

          {currentActiveTab === 'autoria' && <AuthorshipCard autoria={autoria} />}

          {currentActiveTab === 'editorial' && <EditorialContextCard contexto_editorial={contexto_editorial} />}

          {currentActiveTab === 'referencias' && <ReferencesPanel referencias={referencias} onCopy={onCopy} />}

          {currentActiveTab === 'etica' && (
            <EthicsTransparencyCard
              etica_y_uso_responsable={etica_y_uso_responsable}
              transparencia={transparencia}
            />
          )}
        </div>
      </div>
    </div>
  )
}
