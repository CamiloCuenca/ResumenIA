import { Copy } from 'lucide-react'

export function ResumenBot({ data, onCopy }) {
  if (!data || typeof data !== 'object') {
    return <p className="inline-error">❌ Respuesta inválida del servidor.</p>
  }

  const { idea_principal, puntos_clave, argumentos, conclusiones, preguntas_abiertas } = data

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

  return (
    <div className="summary-block">
      <button className="copy-btn" onClick={() => onCopy(resumenPlano)} title="Copiar resumen">
        <Copy size={15} />
        Copiar
      </button>

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
    </div>
  )
}
