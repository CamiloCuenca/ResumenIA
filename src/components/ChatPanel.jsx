import { MessageSquareText } from 'lucide-react'
import { ChatBubble } from './ChatBubble'

function SpinnerInline() {
  return <span className="spinner-inline" aria-hidden="true" />
}

export function ChatPanel({ chat, chatEndRef }) {
  return (
    <section className="card chat-card">
      <div className="section-title">
        <MessageSquareText size={19} />
        <h2>Resultado del análisis</h2>
      </div>
      <div className="chat-area">
        {chat.map((msg, index) => (
          <ChatBubble sender={msg.sender} key={index}>
            {msg.sender === 'bot' && msg.data ? (
              '✅ Análisis listo. Revisa las pestañas de resultados debajo del chat.'
            ) : msg.isLoading ? (
              <span className="loading-inline">
                Procesando documento...
                <SpinnerInline />
              </span>
            ) : (
              msg.text
            )}
          </ChatBubble>
        ))}
        <div ref={chatEndRef} />
      </div>
    </section>
  )
}
