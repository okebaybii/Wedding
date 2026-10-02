import React, { useState } from 'react'
import { Gift, Menu, X, Heart, Sparkles } from 'lucide-react'
import {
  HeroSection,
  CoupleSection,
  LoveStorySection,
  EventDetailsSection,
  RsvpSection,
  GuestbookSection,
  GiftBoxModal,
} from './components/sections/index.ts'
import { AudioPlayer } from './components/ui/AudioPlayer.tsx'
import { weddingCouple } from './data/weddingData.ts'

export const App: React.FC = () => {
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '#hero', label: 'Trang Chủ' },
    { href: '#couple', label: 'Cặp Đôi' },
    { href: '#story', label: 'Chuyện Tình' },
    { href: '#events', label: 'Sự Kiện' },
    { href: '#rsvp', label: 'Xác Nhận' },
    { href: '#guestbook', label: 'Lưu Bút' },
  ]

  const handleScrollToStory = () => {
    const el = document.getElementById('couple')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-paper text-charcoal font-sans selection:bg-gold-light/40 relative">
      {/* Top Floating Luxury Navigation Bar */}
      <header className="sticky top-0 z-40 bg-paper-light/90 backdrop-blur-md border-b border-gold/30 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          {/* Monogram Brand */}
          <a
            href="#hero"
            className="flex items-center gap-2 group min-h-[48px] items-center"
            aria-label="Về đầu trang"
          >
            <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center bg-paper group-hover:border-gold-dark transition-colors">
              <span className="font-display font-bold text-xs text-burgundy gold-foil-text">
                {weddingCouple.monogram}
              </span>
            </div>
            <span className="font-serif font-bold text-base sm:text-lg text-charcoal hidden sm:inline tracking-tight">
              Minh Quân <span className="text-gold font-script text-xl">&</span> Thảo My
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Điều hướng chính">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-widest font-medium text-charcoal hover:text-burgundy transition-colors py-2 border-b-2 border-transparent hover:border-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Gift Box Trigger & Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsGiftModalOpen(true)}
              className="min-h-[44px] px-4 py-2 rounded-full bg-gold/15 hover:bg-gold/25 text-charcoal text-xs font-semibold tracking-wider uppercase border border-gold flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-xs"
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
                className="block min-h-[44px] py-2.5 text-sm font-medium text-charcoal hover:text-burgundy border-b border-gold/15 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-gold text-xs">→</span>
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Main Wedding Content Sections */}
      <main>
        <HeroSection couple={weddingCouple} onScrollToStory={handleScrollToStory} />
        <CoupleSection couple={weddingCouple} />
        <LoveStorySection />
        <EventDetailsSection />
        <RsvpSection />
        <GuestbookSection />
      </main>

      {/* Luxury Footer */}
      <footer className="bg-paper-light border-t border-gold/30 py-16 px-4 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {/* Monogram Seal */}
          <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center bg-paper mb-4 shadow-sm">
            <span className="font-display font-bold text-lg text-burgundy gold-foil-text">
              {weddingCouple.monogram}
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-bold tracking-tight mb-2">
            Minh Quân & Thảo My
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
          <p className="text-[11px] text-charcoal-muted/70 mt-2">
            Thiệp Cưới Điện Tử Cao Cấp D--Webdding © 2026
          </p>
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
    </div>
  )
}

export default App
