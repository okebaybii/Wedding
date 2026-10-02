import React, { useState, useEffect } from 'react'
import { Gift, Heart, Sparkles, Sliders } from 'lucide-react'
import {
  HeroSection,
  SaveTheDateSection,
  CoupleSection,
  LoveStorySection,
  EventDetailsSection,
  GallerySection,
  RsvpSection,
  GuestbookSection,
  GiftBoxModal,
  InvitationGateway,
} from './components/sections/index.ts'
import { SectionDivider } from './components/ui/SectionDivider.tsx'
import { AudioPlayer } from './components/ui/AudioPlayer.tsx'
import { useWeddingAudio } from './hooks/useWeddingAudio.ts'
import { WeddingDataProvider, useWeddingData } from './store/WeddingContext.tsx'
import { AdminDashboard } from './components/admin/AdminDashboard.tsx'

const MainAppContent: React.FC = () => {
  const { state } = useWeddingData()
  const { couple, events, milestones, gallery } = state

  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [hasEnteredSite, setHasEnteredSite] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { isMuted } = useWeddingAudio()

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
    const el = document.getElementById('calendar') || document.getElementById('couple')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleReopenGateway = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setHasEnteredSite(false)
  }

  return (
    <div className="min-h-screen bg-paper text-charcoal font-sans selection:bg-gold-light/40 relative">
      {/* 1. Fullscreen 3D Interactive Invitation Gateway (Tự động chuyển vào sau 1.8s khi chạm mở) */}
      {!hasEnteredSite && (
        <InvitationGateway
          couple={couple}
          onEnterSite={() => setHasEnteredSite(true)}
          isMuted={isMuted}
        />
      )}

      {/* 2. Delicate Golden Scroll Progress Bar (Top Hairline) */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gold/20 z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-gold-dark via-gold-light to-gold transition-all duration-150 ease-out shadow-xs shadow-gold/50"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Quick Admin Trigger Button (Discreet top-right button when needed) */}
      <div className="fixed top-4 right-4 z-40">
        <button
          type="button"
          onClick={() => setIsAdminOpen(true)}
          className="h-9 px-3 rounded-full bg-black/40 hover:bg-black/75 text-paper-light border border-gold/40 text-xs font-serif flex items-center gap-1.5 backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-md opacity-70 hover:opacity-100"
          title="Bảng Quản Trị (Admin)"
        >
          <Sliders className="w-3.5 h-3.5 text-gold-light" />
          <span className="hidden sm:inline">Quản Trị</span>
        </button>
      </div>

      {/* Main Wedding Content Sections with Luxury Ornaments */}
      <main>
        {/* 1. Hero: Fullscreen Cinematic 3D/Video Reel Stage ("click vào cái nào hiển thị cái đó") */}
        <HeroSection
          couple={couple}
          onScrollToStory={handleScrollToStory}
          onReopenGateway={handleReopenGateway}
        />

        {/* 2. Save The Date: Visual Wedding Calendar & Countdown (Cụm đếm ngược nằm bên dưới như ảnh 5.png) */}
        <SaveTheDateSection couple={couple} />

        <SectionDivider variant="arch" />

        {/* 3. Couple Section: Chú Rể | Bức Bích Họa Chung Đôi | Cô Dâu */}
        <CoupleSection couple={couple} />

        <SectionDivider variant="infinity" />

        {/* 4. Love Story Journey */}
        <LoveStorySection milestones={milestones} />

        <SectionDivider variant="rings" />

        {/* 5. Event Schedule & Maps (Sự Kiện) */}
        <EventDetailsSection events={events} />

        <SectionDivider variant="flourish" />

        {/* 6. Wedding Photo Album (ĐƯA XUỐNG DƯỚI SỰ KIỆN theo yêu cầu người dùng) */}
        <GallerySection photos={gallery} />

        <SectionDivider variant="leaves" />

        {/* 7. RSVP Confirmation */}
        <RsvpSection />

        <SectionDivider variant="flourish" />

        {/* 8. Guestbook Wishes */}
        <GuestbookSection />
      </main>

      {/* Luxury Footer */}
      <footer className="bg-paper-light border-t border-gold/30 py-16 px-4 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {/* Monogram Seal */}
          <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center bg-paper mb-4 shadow-sm">
            <span className="font-display font-bold text-lg text-burgundy gold-foil-text">
              {couple.monogram}
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-bold tracking-tight mb-2">
            {couple.groom.shortName} & {couple.bride.shortName}
          </h3>

          <p className="font-serif italic text-burgundy text-sm sm:text-base mb-6">
            “Cảm ơn bạn đã là một phần đặc biệt trong ngày trọng đại của chúng mình!”
          </p>

          <div className="flex items-center gap-2 mb-8">
            <span className="h-[1px] w-12 bg-gold/40" />
            <Heart className="w-4 h-4 text-burgundy fill-burgundy" />
            <span className="h-[1px] w-12 bg-gold/40" />
          </div>

          <p className="text-xs text-charcoal-muted font-light">
            20 . 11 . 2026 • Riverside Palace • TP. Hồ Chí Minh
          </p>

          <div className="mt-6 pt-4 border-t border-gold/20 flex flex-wrap items-center justify-center gap-4 text-xs text-charcoal-muted">
            <span>Thiệp Cưới Điện Tử Cao Cấp D--Webdding © 2026</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="text-gold-dark hover:text-burgundy flex items-center gap-1 font-serif underline underline-offset-4 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Bảng Quản Trị Admin</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Gift Box Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsGiftModalOpen(true)}
          aria-label="Mở hộp mừng cưới"
          className="min-h-[50px] px-5 py-3 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-charcoal font-sans text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center gap-2.5 shadow-xl shadow-gold/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-gold-light"
        >
          <Gift className="w-4 h-4 text-charcoal animate-bounce" />
          <span>Mừng Cưới</span>
          <Sparkles className="w-3.5 h-3.5 text-paper-light" />
        </button>
      </div>

      {/* Floating Audio Player (Bottom Left) */}
      <AudioPlayer position="bottom-left" />

      {/* Gift Box Modal */}
      <GiftBoxModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
      />

      {/* Admin Management Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
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
