import React, { useState, useEffect } from 'react'
import { Disc3, Volume2, VolumeX, Music } from 'lucide-react'
import { useWeddingAudio } from '../../hooks/useWeddingAudio.ts'
import { cn } from '../../utils/cn.ts'

export interface AudioPlayerProps {
  className?: string
  position?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left'
  autoShowTooltipOnMount?: boolean
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  className,
  position = 'bottom-right',
  autoShowTooltipOnMount = true,
}) => {
  const { isPlaying, isMuted, trackTitle, toggleMusic, toggleMute } = useWeddingAudio()
  const [isHovered, setIsHovered] = useState(false)
  const [showInitialBadge, setShowInitialBadge] = useState(false)

  // Floating position classes (defaults to bottom-right or top-right)
  const positionClasses = {
    'top-right': 'top-4 right-4 sm:top-6 sm:right-6',
    'bottom-right': 'bottom-6 right-6 sm:bottom-8 sm:right-8',
    'top-left': 'top-4 left-4 sm:top-6 sm:left-6',
    'bottom-left': 'bottom-6 left-6 sm:bottom-8 sm:left-8',
  }[position]

  const isRightSide = position.includes('right')
  const tooltipAlignment = isRightSide
    ? 'right-full mr-3.5 origin-right'
    : 'left-full ml-3.5 origin-left'

  // Show a gentle welcoming tooltip on mount for 5 seconds
  useEffect(() => {
    if (!autoShowTooltipOnMount) return
    const timer = setTimeout(() => {
      setShowInitialBadge(true)
    }, 1200)

    const hideTimer = setTimeout(() => {
      setShowInitialBadge(false)
    }, 6000)

    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [autoShowTooltipOnMount])

  const shouldShowTooltip = isHovered || showInitialBadge

  return (
    <aside
      aria-label="Điều khiển nhạc nền đám cưới"
      className={cn(
        'fixed z-50 flex items-center select-none',
        positionClasses,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Tooltip / Elegant luxury badge */}
      <div
        className={cn(
          'absolute pointer-events-none transition-all duration-300 ease-out flex items-center',
          tooltipAlignment,
          shouldShowTooltip
            ? 'opacity-100 translate-x-0 scale-100'
            : isRightSide
            ? 'opacity-0 translate-x-2 scale-95'
            : 'opacity-0 -translate-x-2 scale-95'
        )}
      >
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-paper/95 dark:bg-charcoal/95 border border-gold/50 shadow-xl backdrop-blur-md whitespace-nowrap">
          {/* Animated pulse dot */}
          <span className="relative flex h-2.5 w-2.5">
            {isPlaying && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
            )}
            <span
              className={cn(
                'relative inline-flex rounded-full h-2.5 w-2.5 transition-colors duration-300',
                isPlaying ? 'bg-gold' : 'bg-charcoal-muted/40'
              )}
            />
          </span>

          <div className="flex flex-col text-left">
            <span className="text-[11px] font-medium tracking-wide text-charcoal/90 dark:text-paper-light flex items-center gap-1">
              <Music className="w-3 h-3 text-gold-dark inline" />
              <span>Nhạc nền:</span>
              <span className="font-serif italic font-semibold text-gold-dark dark:text-gold-light">
                {trackTitle || 'Canon in D (Acoustic)'}
              </span>
            </span>
            <span className="text-[9px] text-charcoal-muted dark:text-paper-dark/80 tracking-wider">
              {isPlaying ? 'Đang phát • Chạm để tạm dừng' : 'Đã tạm dừng • Chạm để nghe'}
            </span>
          </div>
        </div>
      </div>

      {/* Minimalist Circular Button with Gold Accent */}
      <div className="relative group">
        {/* Golden ambient breathing aura when playing */}
        {isPlaying && (
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-gold/30 via-champagne/20 to-gold/30 blur-sm animate-pulse pointer-events-none" />
        )}

        <button
          type="button"
          onClick={() => {
            setShowInitialBadge(false)
            toggleMusic()
          }}
          aria-label={isPlaying ? 'Tạm dừng nhạc nền Canon in D' : 'Phát nhạc nền Canon in D'}
          aria-pressed={isPlaying}
          className={cn(
            'relative flex items-center justify-center',
            // Touch target size >= 48px
            'w-12 h-12 sm:w-14 sm:h-14 rounded-full',
            'bg-paper-light/95 dark:bg-charcoal/95 backdrop-blur-md',
            'border-2 border-gold shadow-lg shadow-gold/20 hover:shadow-gold/35',
            'transition-all duration-300 ease-out hover:scale-105 active:scale-95 cursor-pointer',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2'
          )}
        >
          {/* Concentric vinyl groove micro-lines */}
          <div className="absolute inset-1 rounded-full border border-gold/20 pointer-events-none" />
          <div className="absolute inset-2.5 rounded-full border border-gold/15 pointer-events-none" />

          {/* Rotating Vinyl / Music Disc Icon */}
          <div
            className={cn(
              'relative flex items-center justify-center transition-transform',
              isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
            )}
            style={{
              animationPlayState: isPlaying ? 'running' : 'paused',
            }}
          >
            <Disc3
              className={cn(
                'w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300',
                isPlaying ? 'text-gold-dark dark:text-gold' : 'text-charcoal-muted dark:text-paper-dark'
              )}
              strokeWidth={1.75}
            />

            {/* Center vinyl spindle label */}
            <div
              className={cn(
                'absolute w-2 h-2 rounded-full border transition-colors duration-300',
                isPlaying
                  ? 'bg-burgundy border-gold-light'
                  : 'bg-charcoal-muted/40 border-gold/30'
              )}
            />
          </div>

          {/* Animated Soundwave Equalizer Bars */}
          <div
            className="absolute bottom-1.5 flex items-end justify-center gap-[2.5px] h-3.5 px-2 pointer-events-none"
            aria-hidden="true"
          >
            <span
              className={cn(
                'w-[2px] rounded-full bg-gold transition-all duration-300',
                isPlaying ? 'animate-[eq1_0.8s_ease-in-out_infinite]' : 'h-1 opacity-40'
              )}
              style={{
                height: isPlaying ? undefined : '2px',
              }}
            />
            <span
              className={cn(
                'w-[2px] rounded-full bg-gold transition-all duration-300',
                isPlaying ? 'animate-[eq2_0.6s_ease-in-out_infinite_0.15s]' : 'h-1.5 opacity-40'
              )}
              style={{
                height: isPlaying ? undefined : '3px',
              }}
            />
            <span
              className={cn(
                'w-[2px] rounded-full bg-gold transition-all duration-300',
                isPlaying ? 'animate-[eq3_0.9s_ease-in-out_infinite_0.3s]' : 'h-1 opacity-40'
              )}
              style={{
                height: isPlaying ? undefined : '2px',
              }}
            />
            <span
              className={cn(
                'w-[2px] rounded-full bg-gold transition-all duration-300',
                isPlaying ? 'animate-[eq2_0.7s_ease-in-out_infinite_0.2s]' : 'h-1.5 opacity-40'
              )}
              style={{
                height: isPlaying ? undefined : '3px',
              }}
            />
          </div>
        </button>

        {/* Small quick mute/unmute button on hover */}
        {isPlaying && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              toggleMute()
            }}
            title={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
            aria-label={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
            className={cn(
              'absolute -top-1 -right-1 w-5 h-5 rounded-full',
              'bg-paper dark:bg-charcoal border border-gold/50 text-gold-dark dark:text-gold-light',
              'flex items-center justify-center shadow-md',
              'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
              'hover:scale-110 active:scale-95 focus:outline-none'
            )}
          >
            {isMuted ? (
              <VolumeX className="w-3 h-3 text-burgundy" />
            ) : (
              <Volume2 className="w-3 h-3" />
            )}
          </button>
        )}
      </div>
    </aside>
  )
}

export default AudioPlayer
