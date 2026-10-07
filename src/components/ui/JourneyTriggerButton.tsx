import React from 'react'
import { Sparkles } from 'lucide-react'

interface JourneyTriggerButtonProps {
  onClick: () => void
  label: string
  icon?: React.ReactNode
  badge?: string | number
  className?: string
}

export const JourneyTriggerButton: React.FC<JourneyTriggerButtonProps> = ({
  onClick,
  label,
  icon,
  badge,
  className = '',
}) => {
  return (
    <div className={`pointer-events-auto flex items-center justify-center ${className}`}>
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className="group relative inline-flex min-h-[48px] items-center gap-2.5 rounded-full border border-gold/75 bg-[#0e243a]/85 px-6 py-3 font-serif text-xs font-semibold tracking-wide text-white shadow-[0_12px_32px_rgba(4,18,31,0.55)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold hover:bg-[#163656]/95 hover:text-gold-light active:scale-95 sm:text-sm cursor-pointer"
      >
        {/* Subtle gold inner aura */}
        <span
          className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-gold/30 via-gold-light/40 to-gold/30 opacity-0 blur-xs transition-opacity duration-300 group-hover:opacity-100 -z-10"
          aria-hidden="true"
        />

        {icon ? (
          <span className="text-gold-light transition-transform duration-300 group-hover:rotate-12">
            {icon}
          </span>
        ) : (
          <Sparkles className="h-4 w-4 text-gold-light transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
        )}

        <span>{label}</span>

        {badge !== undefined && (
          <span className="ml-1 rounded-full bg-gold/25 px-2 py-0.5 text-[10px] font-bold text-gold-light border border-gold/40">
            {badge}
          </span>
        )}
      </button>
    </div>
  )
}
export default JourneyTriggerButton
