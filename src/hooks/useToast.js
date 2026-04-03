import { useState, useCallback } from 'react'

export default function useToast() {
  const [toasts, setToasts] = useState([])

  const add = useCallback((type, title, message = '') => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, type, title, message }])
  }, [])

  const remove = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toast = {
    success: (title, msg) => add('success', title, msg),
    error:   (title, msg) => add('error',   title, msg),
    info:    (title, msg) => add('info',    title, msg),
  }

  return { toasts, toast, remove }
}
