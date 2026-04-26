import { Globe, Calendar, Building2 } from 'lucide-react'

export function EditorialContextCard({ contexto_editorial }) {
  if (!contexto_editorial || typeof contexto_editorial !== 'object') {
    return null
  }

  const {
    fecha_publicacion,
    lugar_publicacion,
    entidad_publicadora,
    relevancia_fuente,
  } = contexto_editorial

  return (
    <section className="card editorial-card">
      <div className="section-title">
        <Globe size={19} />
        <h3>Contexto Editorial</h3>
      </div>

      <div className="editorial-grid">
        {fecha_publicacion && (
          <div className="editorial-item">
            <div className="editorial-label">
              <Calendar size={16} />
              <span>Fecha de publicación</span>
            </div>
            <p className="editorial-value">{fecha_publicacion}</p>
          </div>
        )}

        {lugar_publicacion && (
          <div className="editorial-item">
            <div className="editorial-label">
              <Building2 size={16} />
              <span>Lugar de publicación</span>
            </div>
            <p className="editorial-value">{lugar_publicacion}</p>
          </div>
        )}

        {entidad_publicadora && (
          <div className="editorial-item">
            <div className="editorial-label">
              <Building2 size={16} />
              <span>Entidad publicadora</span>
            </div>
            <p className="editorial-value">{entidad_publicadora}</p>
          </div>
        )}
      </div>

      {relevancia_fuente && (
        <div className="editorial-relevance">
          <h4>Relevancia de la fuente</h4>
          <p>{relevancia_fuente}</p>
        </div>
      )}
    </section>
  )
}
