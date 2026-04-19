export function Toast({ show, message }) {
  if (!show) return null
  return <div className="toast">{message}</div>
}
