import React, { useEffect } from 'react'
import { X } from 'lucide-react'

interface JourneyDetailModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  icon?: React.ReactNode
  children: React.ReactNode
  maxWidth?: 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
}

export const JourneyDetailModal: React.FC<JourneyDetailModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  maxWidth = '3xl',
}) => {
  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const maxWidthClasses = {
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
  }[maxWidth]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="journey-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className={`relative w-full ${maxWidthClasses} max-h-[90vh] flex flex-col rounded-2xl border border-gold/70 bg-[#0c1f33]/95 text-white shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden animate-in zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gold foil accent strip */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold-light to-transparent" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gold/25 px-5 py-4 sm:px-7 sm:py-5 shrink-0 bg-[#081726]/60">
          <div className="flex items-center gap-3 pr-4">
            {icon && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold/15 text-gold-light">
                {icon}
              </div>
            )}
            <div>
              {subtitle && (
                <p className="font-serif text-xs italic tracking-wider text-gold-light">
                  {subtitle}
                </p>
              )}
              <h2
                id="journey-modal-title"
                className="font-serif text-lg font-semibold tracking-tight text-white sm:text-2xl"
              >
                {title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng bảng thông tin"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-[#12283e] text-paper-light transition-all hover:bg-gold/20 hover:text-gold-light hover:border-gold active:scale-95 cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  )
}
export default JourneyDetailModal
