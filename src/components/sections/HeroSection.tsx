import React from 'react'
import { ChevronDown, Sparkles } from 'lucide-react'
import { CoupleInfo } from '../../types/wedding.ts'
import { weddingCouple } from '../../data/weddingData.ts'
import { WeddingFloralFlanks } from '../ui/WeddingFloralFlanks.tsx'
import { useWeddingData } from '../../store/WeddingContext.tsx'

interface HeroSectionProps {
  couple?: CoupleInfo
  activePortrait?: number
  onActivePortraitChange?: (index: number) => void
  onScrollToStory?: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  couple = weddingCouple,
  onScrollToStory,
}) => {
  const { state } = useWeddingData()
  const receptionEvent = state.events.find((e) => e.type === 'reception') || state.events[2]
  const venueLocation = receptionEvent?.locationName
    ? `${receptionEvent.locationName} · TP. Hồ Chí Minh`
    : 'Riverside Palace · TP. Hồ Chí Minh'
  return (
    <section
      id="hero"
      data-journey-chapter="hero"
      aria-label="Cổng hoa lễ đường Serenity Château"
      className="journey-chapter journey-hero relative min-h-[100svh] overflow-hidden text-white flex flex-col justify-between"
    >
      {/* 2D Fallback only used when WebGL fails */}
      <div className="journey-fallback-only absolute inset-0 z-0">
        <img
          src={couple.jointImage}
          alt="Chân dung cưới của cô dâu và chú rể"
          className="h-full w-full object-cover"
        />
        <WeddingFloralFlanks />
      </div>

      {/* Very light subtle ambient vignette */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#071421]/60 via-transparent to-[#071421]/60 pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 pt-16 sm:pt-20 text-center px-4">
        <p className="journey-kicker text-gold-light tracking-[0.2em] uppercase text-xs sm:text-sm">
          Trân trọng báo tin hôn lễ
        </p>

        <h1 className="mt-4 font-serif text-[clamp(2.8rem,8vw,6.5rem)] font-medium leading-[0.88] tracking-tight text-white [text-shadow:0_6px_32px_rgba(4,18,31,0.85)]">
          <span className="inline-block">{couple.groom.shortName}</span>
          <span className="mx-3 inline-block font-script text-[0.75em] text-gold-light">&</span>
          <span className="inline-block">{couple.bride.shortName}</span>
        </h1>

        <div className="mt-4 flex items-center justify-center gap-3 text-xs sm:text-sm text-sky-100/90 font-serif">
          <time dateTime={couple.weddingDate} className="tracking-widest font-semibold text-gold-light">
            20 · 11 · 2026
          </time>
          <span className="h-3 w-px bg-gold-light/50" />
          <span>{venueLocation}</span>
        </div>
      </div>

      {/* Bottom CTA: Smoothly invites guest to scroll into the 3D chateau */}
      <div className="relative z-20 pb-10 text-center px-4 flex flex-col items-center">
        <button
          type="button"
          onClick={onScrollToStory}
          className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full border border-gold/75 bg-[#0e243a]/80 px-7 py-3 font-serif text-xs sm:text-sm font-semibold tracking-wide text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-gold/25 hover:text-gold-light cursor-pointer"
        >
          <Sparkles className="h-4 w-4 text-gold-light" />
          <span>Bước vào lễ đường 3D</span>
          <ChevronDown className="h-4 w-4 text-gold-light animate-bounce" />
        </button>
        <span className="mt-2 text-[11px] text-sky-100/60 font-light">
          Cuộn chuột hoặc lướt xuống để trải nghiệm
        </span>
      </div>
    </section>
  )
}

export default HeroSection
