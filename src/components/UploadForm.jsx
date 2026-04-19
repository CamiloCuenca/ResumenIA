import { FileText, SendHorizontal } from 'lucide-react'

export function UploadForm({
  file,
  loading,
  formato,
  formatos,
  fileInputRef,
  onFileChange,
  onFormatoChange,
  onSend,
}) {
  return (
    <section className="card upload-card">
      <div className="section-title">
        <FileText size={19} />
        <h2>Subida y envío</h2>
      </div>

      <p className="help-text">
        Selecciona tu PDF, elige el formato de referencia y presiona “Enviar”.
      </p>

      <div className="upload-grid">
        <label className="file-picker">
          <span>{file ? file.name : 'Seleccionar PDF'}</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={onFileChange}
            disabled={loading}
          />
        </label>

        <select
          className="format-select"
          value={formato}
          onChange={(event) => onFormatoChange(event.target.value)}
          disabled={loading}
        >
          {formatos.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button className="send-btn" onClick={onSend} disabled={!file || loading}>
          <SendHorizontal size={18} />
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </section>
  )
}
