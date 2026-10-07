import React from 'react'
import { twMerge } from 'tailwind-merge'

type JourneyPanelTone = 'porcelain' | 'glass' | 'midnight'
type JourneyPanelAlign = 'left' | 'center' | 'right'

interface JourneyPanelProps {
  children: React.ReactNode
  className?: string
  tone?: JourneyPanelTone
  align?: JourneyPanelAlign
  as?: 'div' | 'article'
}

const toneClasses: Record<JourneyPanelTone, string> = {
  porcelain: 'journey-panel--porcelain text-charcoal',
  glass: 'journey-panel--glass text-white',
  midnight: 'journey-panel--midnight text-white',
}

const alignClasses: Record<JourneyPanelAlign, string> = {
  left: 'journey-panel--left',
  center: 'journey-panel--center',
  right: 'journey-panel--right',
}

export const JourneyPanel: React.FC<JourneyPanelProps> = ({
  children,
  className = '',
  tone = 'porcelain',
  align = 'center',
  as = 'div',
}) => {
  const Component = as

  return (
    <Component
      className={twMerge(
        'journey-panel relative',
        toneClasses[tone],
        alignClasses[align],
        className,
      )}
    >
      <span className="journey-panel__edge" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </Component>
  )
}

export default JourneyPanel
