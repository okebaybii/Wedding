import React, { useState, useEffect, useMemo } from 'react'
import { Gift, Heart, Sparkles } from 'lucide-react'
import {
  HeroSection,
  SaveTheDateSection,
  CoupleSection,
  EventDetailsSection,
  GallerySection,
  RsvpSection,
  GuestbookSection,
  GiftBoxModal,
  InvitationGateway,
} from './components/sections/index.ts'
import { AudioPlayer } from './components/ui/AudioPlayer.tsx'
import { WeddingJourneyScene } from './components/canvas/WeddingJourneyScene.tsx'
import { useWeddingAudio } from './hooks/useWeddingAudio.ts'
import { useWeddingJourney } from './hooks/useWeddingJourney.ts'
import { WeddingDataProvider, useWeddingData } from './store/WeddingContext.tsx'
import { AdminDashboard } from './components/admin/AdminDashboard.tsx'

const MainAppContent: React.FC = () => {
  const { state } = useWeddingData()
  const { couple, events, gallery } = state

  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [hasEnteredSite, setHasEnteredSite] = useState(false)
  const [activeHeroPortrait, setActiveHeroPortrait] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { isMuted } = useWeddingAudio()
  const journeyRef = useWeddingJourney(hasEnteredSite && !isAdminOpen)
  const heroPortraits = useMemo(
    () => Array.from(
      new Set([couple.jointImage, ...(couple.heroBanners ?? [])].filter(Boolean)),
    ).slice(0, 4),
    [couple.heroBanners, couple.jointImage],
  )
  const heroImage = heroPortraits[activeHeroPortrait] ?? couple.jointImage

  useEffect(() => {
    if (activeHeroPortrait >= heroPortraits.length) setActiveHeroPortrait(0)
  }, [activeHeroPortrait, heroPortraits.length])

  // Detect /admin in pathname or #admin in hash to open Admin Dashboard
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase()
      const hash = window.location.hash.toLowerCase()
      if (path === '/admin' || path.endsWith('/admin') || hash === '#admin') {
        setIsAdminOpen(true)
        setHasEnteredSite(true)
      }
    }

    checkAdminRoute()
    window.addEventListener('popstate', checkAdminRoute)
    window.addEventListener('hashchange', checkAdminRoute)

    // Keyboard shortcut: Ctrl+Shift+A or Alt+A to quickly open Admin
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') ||
        (e.altKey && e.key.toLowerCase() === 'a')
      ) {
        e.preventDefault()
        setIsAdminOpen((prev) => !prev)
        setHasEnteredSite(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('popstate', checkAdminRoute)
      window.removeEventListener('hashchange', checkAdminRoute)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleCloseAdmin = () => {
    setIsAdminOpen(false)
    if (window.location.pathname.endsWith('/admin')) {
      const cleanPath = window.location.pathname.replace(/\/admin\/?$/, '/') || '/'
      window.history.pushState(null, '', cleanPath)
    } else if (window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname)
    }
  }

  // Track scroll progress for subtle golden indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100
        setScrollProgress(Math.min(100, Math.max(0, progress)))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollToStory = () => {
    const el = document.getElementById('invitation') || document.getElementById('calendar') || document.getElementById('couple')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#0b1a2a] text-charcoal font-sans selection:bg-gold-light/40 relative">
      {!hasEnteredSite && (
        <InvitationGateway
          couple={couple}
          onEnterSite={() => setHasEnteredSite(true)}
          isMuted={isMuted}
        />
      )}

      {hasEnteredSite && (
        <WeddingJourneyScene
          couple={couple}
          events={events}
          gallery={gallery}
          heroImage={heroImage}
          journeyRef={journeyRef}
          paused={isAdminOpen}
        />
      )}

      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-white/10 z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[#789aba] via-gold-light to-gold transition-all duration-150 ease-out shadow-[0_0_12px_rgba(228,202,136,0.7)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="journey-content relative z-10">
        <HeroSection
          couple={couple}
          activePortrait={activeHeroPortrait}
          onActivePortraitChange={setActiveHeroPortrait}
          onScrollToStory={handleScrollToStory}
        />
        <SaveTheDateSection couple={couple} />
        <CoupleSection couple={couple} />
        <EventDetailsSection events={events} />
        <GallerySection photos={gallery} />
        <RsvpSection />
        <GuestbookSection />
      </main>

      <footer
        data-journey-chapter="finale"
        className="journey-chapter relative z-10 overflow-hidden min-h-[100svh] flex flex-col justify-end px-4 pb-12 sm:pb-16 text-center text-white"
      >
        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
          <h3 className="font-serif text-3xl sm:text-5xl text-white font-medium tracking-tight mb-2 [text-shadow:0_4px_24px_rgba(4,18,31,0.85)]">
            {couple.groom.shortName} <span className="font-script text-gold-light text-2xl sm:text-4xl">&</span> {couple.bride.shortName}
          </h3>

          <p className="font-serif italic text-sky-100 text-sm sm:text-base mb-4 [text-shadow:0_2px_12px_rgba(4,18,31,0.85)]">
            “Cảm ơn bạn đã là một phần đặc biệt trong ngày trọng đại của chúng mình!”
          </p>

          <div className="flex items-center gap-2 mb-4">
            <span className="h-[1px] w-12 bg-gold/40" />
            <Heart className="w-4 h-4 text-gold-light fill-gold-light" />
            <span className="h-[1px] w-12 bg-gold/40" />
          </div>

          <p className="text-xs text-sky-100/75 font-light">
            20 · 11 · 2026 • {events.find((e) => e.type === 'reception')?.locationName || 'Riverside Palace'} • TP. Hồ Chí Minh
          </p>

          <div className="mt-5 pt-4 border-t border-gold/20 flex flex-wrap items-center justify-center gap-3 text-[11px] text-sky-100/60">
            <span>Thiệp Cưới Điện Tử Cao Cấp D--Webdding © 2026</span>
            <span>•</span>
            <a
              href="#admin"
              onClick={(e) => {
                e.preventDefault()
                setIsAdminOpen(true)
              }}
              className="text-gold-light hover:text-white font-serif underline underline-offset-4 cursor-pointer"
            >
              <span>Quản Trị (/admin)</span>
            </a>
          </div>
        </div>
      </footer>

      {hasEnteredSite && (
        <>
          <div className="fixed bottom-6 right-6 z-40 [perspective:700px]">
            <button
              type="button"
              onClick={() => setIsGiftModalOpen(true)}
              aria-label="Mở hộp mừng cưới"
              className="journey-gift-button min-h-[50px] px-5 py-3 text-charcoal font-sans text-xs sm:text-sm font-bold tracking-wider flex items-center gap-2.5 cursor-pointer"
            >
              <Gift className="w-4 h-4 text-charcoal" />
              <span>Mừng cưới</span>
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
          <AudioPlayer position="bottom-left" />
        </>
      )}

      {/* Gift Box Modal */}
      <GiftBoxModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
      />

      {/* Admin Management Dashboard Modal (Gõ /admin hoặc #admin để mở) */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
      />
    </div>
  )
}

export const App: React.FC = () => {
  return (
    <WeddingDataProvider>
      <MainAppContent />
    </WeddingDataProvider>
  )
}

export default App
