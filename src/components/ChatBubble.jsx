export function ChatBubble({ sender, children }) {
  const isUser = sender === 'user'
  return (
    <div className={`chat-row ${isUser ? 'user' : 'bot'}`}>
      <article className={`chat-bubble ${isUser ? 'user' : 'bot'}`}>{children}</article>
    </div>
  )
}
