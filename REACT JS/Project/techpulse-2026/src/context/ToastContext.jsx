import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi'

const ToastContext = createContext(null)

const icons = {
  success: <FiCheckCircle className="text-aurora" size={18} />,
  error: <FiAlertCircle className="text-red-400" size={18} />,
  info: <FiInfo className="text-nebula-light" size={18} />,
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const counter = useRef(0)

  const showToast = useCallback((message, type = 'success') => {
    const id = ++counter.current
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id))
    }, 3200)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 w-[90vw] max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-2 bg-space-800/95 backdrop-blur border border-space-600 text-mist text-sm px-4 py-3 rounded-xl shadow-lg animate-reveal"
          >
            {icons[t.type]}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
