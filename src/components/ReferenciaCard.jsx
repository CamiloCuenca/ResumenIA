import { BookText, Copy } from 'lucide-react'

export function ReferenciaCard({ referencia, onCopy }) {
  return (
    <section className="card reference-card">
      <div className="section-title">
        <BookText size={19} />
        <h2>Referencia bibliográfica</h2>
      </div>

      {referencia ? (
        <>
          <p className="reference-text">{referencia}</p>
          <button className="copy-btn" onClick={() => onCopy(referencia)}>
            <Copy size={15} />
            Copiar referencia
          </button>
        </>
      ) : (
        <p className="help-text">
          Aquí verás la última referencia generada. En móvil aparece debajo del chat para ocupar toda la pantalla.
        </p>
      )}
    </section>
  )
}
