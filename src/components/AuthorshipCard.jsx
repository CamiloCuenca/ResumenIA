import { Users, Award, UserCheck } from 'lucide-react'

export function AuthorshipCard({ autoria }) {
  if (!autoria || typeof autoria !== 'object') {
    return null
  }

  const { autores_principales = [], participantes = [] } = autoria

  return (
    <section className="card authorship-card">
      <div className="section-title">
        <Users size={19} />
        <h3>Autoría y participantes</h3>
      </div>

      {/* Autores Principales */}
      {Array.isArray(autores_principales) && autores_principales.length > 0 && (
        <div className="authorship-section">
          <h4 className="subsection-title">Autores Principales</h4>
          <div className="authors-list">
            {autores_principales.map((autor, idx) => (
              <div key={idx} className="author-item">
                <div className="author-header">
                  <Award size={16} className="author-icon" />
                  <div className="author-info">
                    <p className="author-name">{autor.nombre}</p>
                    <span className="author-role">{autor.rol}</span>
                  </div>
                </div>
                {autor.evidencia && (
                  <p className="author-evidence">{autor.evidencia}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Participantes */}
      {Array.isArray(participantes) && participantes.length > 0 && (
        <div className="authorship-section">
          <h4 className="subsection-title">Participantes</h4>
          <div className="participants-list">
            {participantes.map((participante, idx) => (
              <div key={idx} className="participant-item">
                <div className="participant-header">
                  <UserCheck size={16} className="participant-icon" />
                  <div className="participant-info">
                    <p className="participant-name">{participante.nombre}</p>
                    <span className="participant-role">{participante.rol}</span>
                  </div>
                </div>
                {participante.evidencia && (
                  <p className="participant-evidence">{participante.evidencia}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
