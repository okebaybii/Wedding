import React from 'react'

export type DividerVariant = 'arch' | 'infinity' | 'flourish' | 'leaves' | 'rings'

interface SectionDividerProps {
  variant?: DividerVariant
  className?: string
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'flourish',
  className = '',
}) => {
  return (
    <div
      className={`relative w-full flex items-center justify-center my-10 sm:my-16 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Left Delicate Gold Hairline */}
      <div className="flex-1 max-w-xs sm:max-w-md h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-gold" />

      {/* Center Motif Ornament */}
      <div className="mx-4 sm:mx-6 flex items-center justify-center text-gold">
        {variant === 'flourish' && (
          <div className="flex items-center gap-2">
            <svg
              className="w-12 h-6 sm:w-16 sm:h-8 text-gold drop-shadow-xs"
              viewBox="0 0 100 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 20C25 20 30 10 40 10C48 10 48 25 35 25C25 25 25 15 32 15C38 15 42 22 50 20C58 22 62 15 68 15C75 15 75 25 65 25C52 25 52 10 60 10C70 10 75 20 90 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="50" cy="20" r="3" fill="#254465" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>
        )}

        {variant === 'arch' && (
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-dark/60" />
            <svg
              className="w-8 h-8 text-gold-dark drop-shadow-xs"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 4C9.37 4 4 9.37 4 16v10h2V16c0-5.52 4.48-10 10-10s10 4.48 10 10v10h2V16c0-6.63-5.37-12-12-12z"
                fill="currentColor"
              />
              <path
                d="M16 11c-2.76 0-5 2.24-5 5 0 3.5 5 8 5 8s5-4.5 5-8c0-2.76-2.24-5-5-5z"
                fill="#254465"
              />
            </svg>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-dark/60" />
          </div>
        )}

        {variant === 'infinity' && (
          <div className="flex items-center gap-2">
            <svg
              className="w-10 h-6 text-gold drop-shadow-xs"
              viewBox="0 0 40 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6c3.8 0 6.2-4.5 8-6 1.8-1.5 4.2-6 8-6 3.3 0 6 2.7 6 6s-2.7 6-6 6c-3.8 0-6.2-4.5-8-6-1.8-1.5-4.2-6-8-6z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="20" cy="12" r="2" fill="#C8A86B" />
            </svg>
          </div>
        )}

        {variant === 'leaves' && (
          <div className="flex items-center gap-1.5">
            <svg
              className="w-12 h-6 text-emerald-light drop-shadow-xs"
              viewBox="0 0 60 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 12c-8-2-14-8-20-4 4 6 12 6 20 4z"
                fill="currentColor"
                opacity="0.8"
              />
              <path
                d="M30 12c8-2 14-8 20-4-4 6-12 6-20 4z"
                fill="currentColor"
                opacity="0.8"
              />
              <circle cx="30" cy="12" r="2.5" fill="#C8A86B" />
            </svg>
          </div>
        )}

        {variant === 'rings' && (
          <div className="flex items-center">
            <svg
              className="w-12 h-7 text-gold drop-shadow-xs"
              viewBox="0 0 48 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="18" cy="14" r="9" stroke="currentColor" strokeWidth="2" />
              <circle cx="30" cy="14" r="9" stroke="#254465" strokeWidth="2" />
              <polygon points="18,3 19.5,6 16.5,6" fill="#D4AF37" />
            </svg>
          </div>
        )}
      </div>

      {/* Right Delicate Gold Hairline */}
      <div className="flex-1 max-w-xs sm:max-w-md h-[1px] bg-gradient-to-l from-transparent via-gold/40 to-gold" />
    </div>
  )
}

export default SectionDivider
