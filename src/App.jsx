import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { HeaderHelp } from './components/HeaderHelp'
import { ChatPanel } from './components/ChatPanel'
import { ReferenciaCard } from './components/ReferenciaCard'
import { UploadForm } from './components/UploadForm'
import { StatusBanner } from './components/StatusBanner'
import { Toast } from './components/Toast'

const FORMATOS = ['APA', 'MLA', 'IEEE', 'Chicago', 'Vancouver']

export default function App() {
  const [file, setFile] = useState(null)
  const [chat, setChat] = useState([
    {
      sender: 'bot',
      text: '¡Hola! Soy tu asistente para analizar PDFs. Sube un archivo, elige formato y presiona “Enviar”.',
    },
  ])
  const [loading, setLoading] = useState(false)
  const [formato, setFormato] = useState('APA')
  const [status, setStatus] = useState({
    type: 'info',
    message: 'Paso 1: sube un PDF. Paso 2: elige formato. Paso 3: envía para generar resumen y referencia.',
  })
  const [toast, setToast] = useState('')
  const fileInputRef = useRef(null)
  const chatEndRef = useRef(null)

  const referenciaActual = useMemo(() => {
    for (let i = chat.length - 1; i >= 0; i -= 1) {
      if (chat[i].data?.cita) {
        return chat[i].data.cita
      }
    }
    return null
  }, [chat])

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setToast('Texto copiado')
      setTimeout(() => setToast(''), 1400)
    } catch {
      setToast('No se pudo copiar')
      setTimeout(() => setToast(''), 1400)
    }
  }

  const handleFileChange = (event) => {
    const selected = event.target.files?.[0]
    if (!selected) {
      return
    }

    const isPdf = selected.type === 'application/pdf' || selected.name.toLowerCase().endsWith('.pdf')
    if (!isPdf) {
      setFile(null)
      setStatus({ type: 'error', message: 'Archivo inválido. Solo se permiten archivos PDF.' })
      return
    }

    setFile(selected)
    setStatus({ type: 'success', message: `Archivo listo: ${selected.name}` })
  }


  const handleSend = async () => {
    if (!file || loading) {
      return
    }

    setLoading(true)
    setStatus({ type: 'loading', message: 'Procesando documento... esto puede tardar unos minutos.' })
    setChat((prev) => [
      ...prev,
      { sender: 'user', text: `📄 ${file.name} · Formato ${formato}` },
      { sender: 'bot', text: 'Procesando documento...', isLoading: true },
    ])

    const formData = new FormData()
    formData.append('formato', formato)
    formData.append('file', file)

    // Mostrar en consola lo que se envía
    const formDataEntries = []
    for (let pair of formData.entries()) {
      formDataEntries.push({ key: pair[0], value: pair[1] })
    }
    console.log('FormData enviado al endpoint:', formDataEntries)

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 300000)

    let response = null
    let data = null
    try {
      response = await fetch('http://localhost:5678/webhook-test/cc6c7ad0-c4a3-42a0-be3e-72218abafc63', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      })
      clearTimeout(timeout)

      if (!response.ok) {
        throw new Error(`HTTP_${response.status}`)
      }

      try {
        data = await response.json()
      } catch {
        data = null
      }

      setChat((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          sender: 'bot',
          data,
          text: !data ? '❌ Respuesta inválida del servidor.' : undefined,
        }
        return updated
      })

      if (data) {
        setStatus({ type: 'success', message: 'Resumen generado con éxito. Revisa el chat y la referencia.' })
      } else {
        setStatus({ type: 'error', message: 'El servidor respondió, pero el contenido no fue válido.' })
      }

      setFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      console.log('Respuesta del endpoint:', response, data)
    } catch (error) {
      clearTimeout(timeout)
      const message =
        error.name === 'AbortError'
          ? 'El servidor tardó demasiado en responder (timeout de 5 minutos).'
          : 'Error de red o servidor. Intenta nuevamente.'

      setChat((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = { sender: 'bot', text: `❌ ${message}` }
        return updated
      })

      setStatus({ type: 'error', message })
      console.log('Error al enviar al endpoint:', error, 'FormData:', formDataEntries)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chat, loading])

  return (
    <div className="app-shell">
      <Toast show={Boolean(toast)} message={toast} />
      <main className="app-layout">
        <section className="main-column">
          <HeaderHelp />
          <ChatPanel chat={chat} onCopy={handleCopy} chatEndRef={chatEndRef} />
          <StatusBanner type={status.type} message={status.message} />
          <UploadForm
            file={file}
            loading={loading}
            formato={formato}
            formatos={FORMATOS}
            fileInputRef={fileInputRef}
            onFileChange={handleFileChange}
            onFormatoChange={setFormato}
            onSend={handleSend}
          />
        </section>

        <aside className="side-column">
          <ReferenciaCard referencia={referenciaActual} onCopy={handleCopy} />
        </aside>
      </main>
    </div>
  )
}

