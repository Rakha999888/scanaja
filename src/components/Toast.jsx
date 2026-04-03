import { useEffect, useState } from 'react'

const ICONS = {
  success: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <circle cx="12" cy="12" r="10" fill="#a7f3d0" />
      <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <circle cx="12" cy="12" r="10" fill="#fecaca" />
      <path d="M9 9l6 6M15 9l-6 6" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <circle cx="12" cy="12" r="10" fill="#bae6fd" />
      <path d="M12 8v4M12 16h.01" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
}

const STYLES = {
  success: { bg: '#f0fdf4', border: '#86efac', text: '#166534', bar: '#22c55e' },
  error:   { bg: '#fef2f2', border: '#fca5a5', text: '#991b1b', bar: '#ef4444' },
  info:    { bg: '#f0f9ff', border: '#7dd3fc', text: '#075985', bar: '#0ea5e9' },
}

export default function Toast({ toasts, remove }) {
  return (
    <div className="fixed top-6 right-6 z-[999] flex flex-col gap-3 pointer-events-none" style={{ minWidth: 300 }}>
      {toasts.map(({ id, type, title, message }) => {
        const s = STYLES[type] || STYLES.info
        return (
          <ToastItem key={id} id={id} type={type} title={title} message={message} s={s} remove={remove} />
        )
      })}
    </div>
  )
}

function ToastItem({ id, type, title, message, s, remove }) {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    const t = setTimeout(() => dismiss(), 3800)
    return () => clearTimeout(t)
  }, [])

  function dismiss() {
    setLeaving(true)
    setTimeout(() => remove(id), 350)
  }

  return (
    <div
      className="pointer-events-auto relative overflow-hidden rounded-[1.25rem] border-2"
      style={{
        background: s.bg,
        borderColor: s.border,
        boxShadow: `0 8px 0 0 ${s.border}, 0 12px 24px rgba(0,0,0,0.10)`,
        transform: visible && !leaving ? 'translateX(0) scale(1)' : leaving ? 'translateX(120%) scale(0.9)' : 'translateX(120%) scale(0.9)',
        opacity: visible && !leaving ? 1 : 0,
        transition: 'transform 0.35s cubic-bezier(.22,1,.36,1), opacity 0.35s ease',
      }}
    >
      {/* Progress bar */}
      <div
        className="absolute top-0 left-0 h-1 rounded-full"
        style={{
          background: s.bar,
          width: '100%',
          animation: visible ? 'toastProgress 3.8s linear forwards' : 'none',
        }}
      />

      <div className="flex items-start gap-3 px-4 py-4 pt-5">
        <div className="shrink-0 mt-0.5">{ICONS[type]}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-extrabold" style={{ color: s.text }}>{title}</p>
          {message && <p className="text-xs font-semibold mt-0.5" style={{ color: s.text, opacity: 0.7 }}>{message}</p>}
        </div>
        <button
          onClick={dismiss}
          className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black transition-all hover:scale-110"
          style={{ background: s.border, color: s.text }}
        >
          ×
        </button>
      </div>

      <style>{`
        @keyframes toastProgress {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  )
}
