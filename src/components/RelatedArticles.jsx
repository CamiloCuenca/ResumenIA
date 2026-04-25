import { Bookmark, ExternalLink } from 'lucide-react'

function normalizeArticle(article, index) {
  if (!article || typeof article !== 'object') {
    return null
  }

  const doiValue = typeof article.doi === 'string' ? article.doi.trim() : ''
  const doiUrl = doiValue
    ? doiValue.startsWith('http')
      ? doiValue
      : `https://doi.org/${doiValue.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')}`
    : null

  return {
    id: article.id ?? `article-${index}`,
    title: article.titulo || article.title || 'Artículo sin título',
    year: article.anio || article.year || null,
    source: article.revista || article.journal || article.fuente || null,
    authors: Array.isArray(article.autores)
      ? article.autores
      : typeof article.autores === 'string'
        ? [article.autores]
        : [],
    doi: doiValue || null,
    link: article.url || doiUrl,
  }
}

export function RelatedArticles({ articles, searchQuery }) {
  const normalizedArticles = Array.isArray(articles)
    ? articles.map((article, index) => normalizeArticle(article, index)).filter(Boolean)
    : []

  return (
    <section className="related-articles-card insight-card">
      <div className="section-title">
        <Bookmark size={19} />
        <h2>Artículos relacionados</h2>
      </div>

      {searchQuery && (
        <p className="related-query">
          Consulta usada: <span>{searchQuery}</span>
        </p>
      )}

      {normalizedArticles.length === 0 ? (
        <p className="related-empty">
          Aún no se encontraron artículos relacionados para este documento. Puedes ajustar la consulta y volver a
          ejecutar.
        </p>
      ) : (
        <div className="articles-list">
          {normalizedArticles.map((article) => (
            <article key={article.id} className="article-item">
              <div className="article-header">
                <h3 className="article-title">{article.title}</h3>
                {article.year && <span className="article-year">{article.year}</span>}
              </div>

              {article.authors.length > 0 && <p className="article-authors">{article.authors.join(', ')}</p>}

              {article.source && <p className="article-source">{article.source}</p>}

              {(article.link || article.doi) && (
                <div className="article-links">
                  {article.link && (
                    <a href={article.link} target="_blank" rel="noopener noreferrer" className="article-link" title="Abrir artículo">
                      <ExternalLink size={14} />
                      Ver artículo
                    </a>
                  )}
                  {article.doi && <span className="article-doi">{article.doi}</span>}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
