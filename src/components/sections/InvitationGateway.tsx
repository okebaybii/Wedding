import React, { useState } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Envelope3DScene } from '../canvas/Envelope3DScene.tsx'
import { CoupleInfo } from '../../types/wedding.ts'

export interface InvitationGatewayProps {
  couple: CoupleInfo
  onEnterSite: () => void
  isMuted?: boolean
}

export const InvitationGateway: React.FC<InvitationGatewayProps> = ({
  couple,
  onEnterSite,
  isMuted = false,
}) => {
  const [isOpened, setIsOpened] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  // Smooth curtain transition when proceeding into the main website
  const handleProceedToSite = () => {
    setIsExiting(true)
    setTimeout(() => {
      onEnterSite()
    }, 900)
  }

  // Khi người dùng chạm mở con dấu sáp/thiệp 3D:
  // Nắp phong bì mở và lá thư trồi lên trong 1.5s,
  // sau đó tự động chuyển thẳng vào trang đầu tiên sau 1.8s mà không cần bấm thêm nút nào.
  const handleEnvelopeOpen = () => {
    if (isOpened) return
    setIsOpened(true)
    setTimeout(() => {
      handleProceedToSite()
    }, 1800)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Thiệp cưới 3D mở màn"
      className={`fixed inset-0 z-50 flex flex-col justify-between items-center bg-gradient-to-b from-paper-light via-paper to-paper-dark transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] select-none overflow-hidden ${
        isExiting
          ? '-translate-y-full opacity-0 pointer-events-none scale-105 filter blur-xs'
          : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Ambient background glows & luxury filigree corners */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-gold/15 via-champagne/25 to-transparent blur-3xl" />
        <div className="absolute -top-12 -left-12 w-48 h-48 border border-gold/25 rounded-full pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-48 h-48 border border-gold/25 rounded-full pointer-events-none" />
      </div>

      {/* Top Header: Monogram Brand & Skip Action */}
      <header className="w-full max-w-5xl mx-auto px-6 pt-6 sm:pt-8 flex items-center justify-between relative z-20">
        {/* Monogram Seal */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full border-2 border-gold flex items-center justify-center bg-paper-light shadow-md shadow-gold/15">
            <span className="font-display font-bold text-sm text-burgundy gold-foil-text">
              {couple.monogram}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-sm sm:text-base text-charcoal tracking-tight">
              {couple.groom.shortName} <span className="text-gold font-script text-lg">&</span> {couple.bride.shortName}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold-dark font-medium">
              Thiệp Cưới Hoàng Gia
            </span>
          </div>
        </div>

        {/* Quick Direct Skip to Site */}
        <button
          type="button"
          onClick={handleProceedToSite}
          className="text-xs text-charcoal-muted hover:text-burgundy flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper/80 hover:bg-paper border border-gold/30 hover:border-gold transition-all duration-300 cursor-pointer backdrop-blur-xs"
        >
          <span>Vào trang ngay</span>
          <ArrowRight className="w-3.5 h-3.5 text-gold-dark" />
        </button>
      </header>

      {/* Centerpiece: Welcome Title & 3D Interactive Envelope Showcase */}
      <main className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center flex-1 px-4 relative z-10 my-auto">
        {/* Editorial Greeting Header */}
        <div className="text-center mb-2 sm:mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <p className="font-serif italic text-burgundy text-sm sm:text-base tracking-wide mb-1">
            Trân trọng kính gửi thiệp cưới đến Quý Khách
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-semibold tracking-tight">
            Minh Quân <span className="text-gold font-script text-4xl sm:text-5xl">&</span> Thảo My
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-gold-dark font-medium mt-1.5 flex items-center justify-center gap-2">
            <span>20 . 11 . 2026</span>
            <span>•</span>
            <span>Riverside Palace</span>
          </p>
        </div>

        {/* 3D Envelope Canvas Container */}
        <div className="w-full max-w-2xl h-[440px] sm:h-[500px] md:h-[540px] relative my-1">
          <Envelope3DScene
            isOpened={isOpened}
            onOpen={handleEnvelopeOpen}
            isMuted={isMuted}
            monogram={couple.monogram}
            groomName={couple.groom.shortName}
            brideName={couple.bride.shortName}
            weddingDate="THỨ SÁU • 20 . 11 . 2026"
          />
        </div>
      </main>

      {/* Bottom Footer Action Area */}
      <footer className="w-full max-w-md mx-auto px-4 pb-6 sm:pb-8 flex flex-col items-center justify-center relative z-20">
        {isOpened ? (
          /* Automatic transition indicator */
          <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in-95 duration-500">
            <div className="px-6 py-2.5 rounded-full bg-paper-light/95 border border-gold/70 text-burgundy font-serif font-semibold text-sm flex items-center gap-2.5 shadow-lg shadow-gold/20 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-gold animate-spin" />
              <span>Đang mở thiệp cưới & chuẩn bị bước vào hôn lễ...</span>
            </div>
            <button
              type="button"
              onClick={handleProceedToSite}
              className="text-xs text-charcoal-muted hover:text-burgundy flex items-center gap-1 transition-colors cursor-pointer py-1"
            >
              <span>Vào trang ngay</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-dark" />
            </button>
          </div>
        ) : (
          /* Gentle Guidance Prompt while envelope is closed */
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-xs font-serif text-charcoal tracking-wide flex items-center gap-1.5 text-gold-dark">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-gold" />
              <span>Chạm vào con dấu sáp niêm phong để mở thiệp cưới</span>
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-gold" />
            </p>
            <p className="text-[11px] text-charcoal-muted/80 font-light">
              Âm nhạc và lời mời trang trọng sẽ tự động bắt đầu
            </p>
          </div>
        )}
      </footer>
    </div>
  )
}

export default InvitationGateway
