import React from 'react'

interface FrenchCornerProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
  size?: number
}

/**
 * French Baroque / Rococo Acanthus Leaf Corner Scroll (Họa tiết góc hoa văn Baroque Pháp dát vàng)
 */
export const FrenchCornerFlourish: React.FC<FrenchCornerProps> = ({
  position = 'top-left',
  className = '',
  size = 56,
}) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'scaleX(-1)'
      case 'bottom-left':
        return 'scaleY(-1)'
      case 'bottom-right':
        return 'scale(-1, -1)'
      default:
        return 'none'
    }
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-2 right-2'
      case 'bottom-left':
        return 'bottom-2 left-2'
      case 'bottom-right':
        return 'bottom-2 right-2'
      default:
        return 'top-2 left-2'
    }
  }

  return (
    <div
      className={`absolute ${getPositionClasses()} pointer-events-none select-none z-10 ${className}`}
      style={{ transform: getTransform() }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold drop-shadow-[0_1px_2px_rgba(180,130,50,0.35)]"
      >
        <defs>
          <linearGradient id="frenchGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFBF7A" />
            <stop offset="35%" stopColor="#FBF5B7" />
            <stop offset="70%" stopColor="#C8A86B" />
            <stop offset="100%" stopColor="#966F2C" />
          </linearGradient>
        </defs>
        {/* Outer Corner Frame Lines with scalloped notch */}
        <path
          d="M4 36 L4 12 C4 7.57 7.57 4 12 4 L36 4"
          stroke="url(#frenchGoldGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M10 42 L10 16 C10 12.68 12.68 10 16 10 L42 10"
          stroke="url(#frenchGoldGrad)"
          strokeWidth="1.2"
          strokeOpacity="0.7"
        />

        {/* Acanthus / Rococo S-curve and C-scrolls */}
        <path
          d="M6 6 C18 10 24 22 22 34 C20 42 12 46 8 40 C4 34 10 26 20 28 C26 29 28 36 24 40 C20 44 14 42 12 38"
          stroke="url(#frenchGoldGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M6 6 C10 18 22 24 34 22 C42 20 46 12 40 8 C34 4 26 10 28 20 C29 26 36 28 40 24 C44 20 42 14 38 12"
          stroke="url(#frenchGoldGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Small Rococo Leaf Bud and Dot */}
        <circle cx="6" cy="6" r="3" fill="url(#frenchGoldGrad)" />
        <circle cx="16" cy="16" r="2" fill="#254465" stroke="url(#frenchGoldGrad)" strokeWidth="0.8" />
        <path
          d="M18 18 C26 26 38 32 50 32 C60 32 64 26 58 22 C52 18 42 24 48 30"
          stroke="url(#frenchGoldGrad)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M18 18 C26 26 32 38 32 50 C32 60 26 64 22 58 C18 52 24 42 30 48"
          stroke="url(#frenchGoldGrad)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

/**
 * French Rococo Cartouche / Royal Crest Pediment (Vương miện hoa văn đỉnh khung Pháp)
 */
export const FrenchCrestPediment: React.FC<{ className?: string; title?: string }> = ({
  className = '',
  title,
}) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none pointer-events-none ${className}`}>
      <svg
        width="180"
        height="48"
        viewBox="0 0 180 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold drop-shadow-[0_2px_4px_rgba(180,130,50,0.3)]"
      >
        <defs>
          <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#966F2C" stopOpacity="0.2" />
            <stop offset="25%" stopColor="#C8A86B" />
            <stop offset="50%" stopColor="#FBF5B7" />
            <stop offset="75%" stopColor="#C8A86B" />
            <stop offset="100%" stopColor="#966F2C" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Center French Ribbon Knot & Scalloped Shell (Coquille Rococo) */}
        <path
          d="M90 6 C84 6 78 12 76 18 C74 24 78 28 84 28 C87 28 89 26 90 24 C91 26 93 28 96 28 C102 28 106 24 104 18 C102 12 96 6 90 6 Z"
          fill="#F2F6FA"
          stroke="url(#crestGold)"
          strokeWidth="1.8"
        />
        {/* Central Crown Jewel */}
        <circle cx="90" cy="18" r="3.5" fill="#254465" stroke="url(#crestGold)" strokeWidth="1.2" />

        {/* Left Acanthus Flourish */}
        <path
          d="M75 18 C65 14 55 18 45 12 C38 7 30 10 24 16 C18 22 22 28 28 26 C34 24 36 18 42 20 C48 22 55 30 70 25"
          stroke="url(#crestGold)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M45 12 C35 12 25 18 10 16 C4 15 2 22 8 24 C14 26 22 22 28 22"
          stroke="url(#crestGold)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Right Acanthus Flourish (Mirrored) */}
        <path
          d="M105 18 C115 14 125 18 135 12 C142 7 150 10 156 16 C162 22 158 28 152 26 C146 24 144 18 138 20 C132 22 125 30 110 25"
          stroke="url(#crestGold)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M135 12 C145 12 155 18 170 16 C176 15 178 22 172 24 C166 26 158 22 152 22"
          stroke="url(#crestGold)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Subtle decorative beading */}
        <circle cx="56" cy="17" r="1.5" fill="url(#crestGold)" />
        <circle cx="124" cy="17" r="1.5" fill="url(#crestGold)" />
        <circle cx="36" cy="15" r="1.2" fill="url(#crestGold)" />
        <circle cx="144" cy="15" r="1.2" fill="url(#crestGold)" />
      </svg>
      {title && (
        <span className="text-[10px] font-display uppercase tracking-[0.3em] text-gold-dark font-bold -mt-2">
          {title}
        </span>
      )}
    </div>
  )
}

/**
 * French Rococo Flourish Divider with center French Rose & Pearls
 */
export const FrenchFlourishDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 select-none pointer-events-none my-4 ${className}`} aria-hidden="true">
      <div className="h-[1.5px] flex-1 max-w-[120px] sm:max-w-[180px] bg-gradient-to-r from-transparent via-gold/60 to-gold" />
      <svg
        width="64"
        height="24"
        viewBox="0 0 64 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold drop-shadow-xs"
      >
        <path
          d="M4 12 C14 12 18 6 24 6 C28 6 30 10 26 14 C22 18 16 14 20 10 C22 8 26 9 28 12"
          stroke="#C8A86B"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M60 12 C50 12 46 6 40 6 C36 6 34 10 38 14 C42 18 48 14 44 10 C42 8 38 9 36 12"
          stroke="#C8A86B"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="32" cy="12" r="3.5" fill="#254465" stroke="#DFBF7A" strokeWidth="1.5" />
        <circle cx="32" cy="12" r="1.5" fill="#FBF5B7" />
        <circle cx="28" cy="12" r="1" fill="#C8A86B" />
        <circle cx="36" cy="12" r="1" fill="#C8A86B" />
      </svg>
      <div className="h-[1.5px] flex-1 max-w-[120px] sm:max-w-[180px] bg-gradient-to-l from-transparent via-gold/60 to-gold" />
    </div>
  )
}

/**
 * Royal French Fleur-de-lis Emblem (Hoa bách hợp hoàng gia Pháp)
 */
export const FrenchFleurDeLis: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-gold select-none pointer-events-none drop-shadow-xs ${className}`}
      aria-hidden="true"
    >
      <path d="M12 2 C11 5 8 8 8 11 C8 13 9.5 14 11 13 C11 15 10 17 9 18 C11 18 13 18 15 18 C14 17 13 15 13 13 C14.5 14 16 13 16 11 C16 8 13 5 12 2 Z" />
      <path d="M7 11 C6 9 3 9 2 12 C1 15 3 17 5 16 C6 15 6.5 13 7 11 Z" />
      <path d="M17 11 C18 9 21 9 22 12 C23 15 21 17 19 16 C18 15 17.5 13 17 11 Z" />
      <rect x="7" y="16.5" width="10" height="2" rx="1" />
      <path d="M10 19 C10 21 11 22 12 22 C13 22 14 21 14 19 Z" />
    </svg>
  )
}
