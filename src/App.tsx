import React, { useState, useEffect } from 'react'
import { Gift, Menu, X, Heart, Sparkles, Mail, Sliders } from 'lucide-react'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hasEnteredSite, setHasEnteredSite] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const { isMuted } = useWeddingAudio()

  const navLinks = [
    { href: '#hero', id: 'hero', label: 'Trang Chủ' },
    { href: '#calendar', id: 'calendar', label: 'Lịch Cưới' },
    { href: '#couple', id: 'couple', label: 'Cặp Đôi' },
    { href: '#story', id: 'story', label: 'Chuyện Tình' },
    { href: '#events', id: 'events', label: 'Sự Kiện' },
    { href: '#gallery', id: 'gallery', label: 'Album Ảnh' },
    { href: '#rsvp', id: 'rsvp', label: 'Xác Nhận' },
    { href: '#guestbook', id: 'guestbook', label: 'Lưu Bút' },
  ]

  // Track scroll progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100
        setScrollProgress(Math.min(100, Math.max(0, progress)))
      }

      // Check current section in view
      const sections = ['guestbook', 'rsvp', 'gallery', 'events', 'story', 'couple', 'calendar', 'hero']
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 250) {
            setActiveSection(sectionId)
            break
          }
        }
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

      {/* 2. Delicate Golden Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gold/20 z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-gold-dark via-gold-light to-gold transition-all duration-150 ease-out shadow-xs shadow-gold/50"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Floating Luxury Navigation Bar */}
      <header className="sticky top-0 z-40 bg-paper-light/90 backdrop-blur-md border-b border-gold/30 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          {/* Monogram Brand */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group min-h-[48px]"
            aria-label="Về đầu trang"
          >
            <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center bg-paper group-hover:border-gold-dark transition-colors">
              <span className="font-display font-bold text-xs text-burgundy gold-foil-text">
                {couple.monogram}
              </span>
            </div>
            <span className="font-serif font-bold text-base sm:text-lg text-charcoal hidden sm:inline tracking-tight">
              {couple.groom.shortName} <span className="text-gold font-script text-xl">&</span> {couple.bride.shortName}
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6" aria-label="Điều hướng chính">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-widest font-medium transition-colors py-2 border-b-2 ${
                  activeSection === link.id
                    ? 'text-burgundy border-gold font-semibold'
                    : 'text-charcoal hover:text-burgundy border-transparent hover:border-gold/60'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Admin Access, Re-open 3D Envelope, Gift Box Trigger & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Admin Management Dashboard Button */}
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="min-h-[40px] px-3 sm:px-3.5 py-1.5 rounded-full bg-paper hover:bg-gold/20 text-charcoal hover:text-burgundy text-xs font-serif flex items-center gap-1.5 border border-gold/50 transition-all duration-200 cursor-pointer shadow-2xs"
              title="Mở Bảng Quản Trị (Admin)"
            >
              <Sliders className="w-3.5 h-3.5 text-gold-dark" />
              <span className="hidden sm:inline font-semibold">Quản Trị</span>
            </button>

            {/* Reopen 3D Envelope Gateway button */}
            <button
              type="button"
              onClick={handleReopenGateway}
              className="hidden lg:flex min-h-[40px] px-3.5 py-1.5 rounded-full bg-paper hover:bg-gold/15 text-charcoal hover:text-burgundy text-xs font-serif items-center gap-1.5 border border-gold/40 transition-all duration-200 cursor-pointer shadow-2xs"
              title="Mở lại thiệp cưới 3D"
            >
              <Mail className="w-3.5 h-3.5 text-gold-dark" />
              <span>Xem Lại Thiệp 3D</span>
            </button>

            {/* Gift Box Trigger */}
            <button
              type="button"
              onClick={() => setIsGiftModalOpen(true)}
              className="min-h-[44px] px-3.5 sm:px-4 py-2 rounded-full bg-gold/15 hover:bg-gold/25 text-charcoal text-xs font-semibold tracking-wider uppercase border border-gold flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <Gift className="w-4 h-4 text-gold-dark" />
              <span>Mừng Cưới</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Mở danh mục điều hướng"
              className="md:hidden w-11 h-11 rounded-full bg-paper border border-gold/30 flex items-center justify-center text-charcoal hover:text-burgundy cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-paper-light border-b border-gold/30 px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block min-h-[44px] py-2.5 text-sm font-medium border-b border-gold/15 flex items-center justify-between ${
                  activeSection === link.id ? 'text-burgundy font-semibold' : 'text-charcoal hover:text-burgundy'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-gold text-xs">→</span>
              </a>
            ))}

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false)
                setIsAdminOpen(true)
              }}
              className="w-full min-h-[44px] py-2.5 text-sm font-serif text-charcoal flex items-center justify-between border-t border-gold/20 pt-3"
            >
              <span className="flex items-center gap-2 font-semibold">
                <Sliders className="w-4 h-4 text-gold-dark" />
                <span>Bảng Quản Trị Admin (Cấu hình)</span>
              </span>
              <span className="text-gold text-xs">→</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false)
                handleReopenGateway()
              }}
              className="w-full min-h-[44px] py-2.5 text-sm font-serif text-burgundy flex items-center justify-between border-t border-gold/20 pt-2"
            >
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-dark" />
                <span>Mở lại màn hình thiệp cưới 3D</span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-gold" />
            </button>
          </div>
        )}
      </header>

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
              <Sliders className="w-3.5 h-3.5 text-gold-dark" />
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
