import React, { useState, useRef, useEffect } from 'react'
import {
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronDown,
  Film,
  Image as ImageIcon,
  Maximize2,
  Mail,
  Heart,
  Calendar,
} from 'lucide-react'
import { CoupleInfo } from '../../types/wedding.ts'
import { weddingCouple } from '../../data/weddingData.ts'
import { useWeddingAudio } from '../../hooks/useWeddingAudio.ts'

export interface HeroReelItem {
  id: string
  chapter: string
  title: string
  subtitle: string
  type: 'video' | 'image'
  mediaUrl: string
  thumbnailUrl: string
  badge: string
  description?: string
}

interface HeroSectionProps {
  couple?: CoupleInfo
  onScrollToStory?: () => void
  onReopenGateway?: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  couple = weddingCouple,
  onScrollToStory,
  onReopenGateway,
}) => {
  const { isMuted, toggleMute } = useWeddingAudio()
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroContainerRef = useRef<HTMLDivElement>(null)

  const [activeReelIndex, setActiveReelIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isVideoLoading, setIsVideoLoading] = useState(false)

  // Curated 4K cinematic wedding reels & master shots
  const reels: HeroReelItem[] = [
    {
      id: 'reel-1',
      chapter: '01',
      title: 'Phim Cưới Điện Ảnh',
      subtitle: 'Con Đường Hạnh Phúc',
      type: 'video',
      mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-newlywed-couple-walking-outdoors-holding-hands-41140-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
      badge: 'Video 4K',
      description: 'Sánh bước bên nhau vào lễ đường trọn vẹn.',
    },
    {
      id: 'reel-2',
      chapter: '02',
      title: 'Trao Nhẫn Thiêng Liêng',
      subtitle: 'Lời Thề Trăm Năm',
      type: 'video',
      mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-bride-and-groom-with-wedding-rings-41142-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop',
      badge: 'Cinematic 3D',
      description: 'Nhẫn cưới trao tay, minh chứng tình yêu vĩnh cửu.',
    },
    {
      id: 'reel-3',
      chapter: '03',
      title: 'Khoảnh Khắc Ngọt Ngào',
      subtitle: 'Nụ Cười Vu Quy',
      type: 'video',
      mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-at-their-wedding-41139-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop',
      badge: 'Video 3D',
      description: 'Nụ cười rạng ngời và ánh mắt đong đầy yêu thương.',
    },
    {
      id: 'reel-4',
      chapter: '04',
      title: 'Bức Bích Họa Đôi Lứa',
      subtitle: 'Minh Quân & Thảo My',
      type: 'image',
      mediaUrl: couple.jointImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
      thumbnailUrl: couple.jointImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
      badge: 'Chân Dung Đôi',
      description: 'Bức chân dung cưới trang trọng gắn kết tình duyên.',
    },
    {
      id: 'reel-5',
      chapter: '05',
      title: 'Hoàng Hôn Tình Yêu',
      subtitle: 'Ngoại Cảnh Lãng Mạn',
      type: 'image',
      mediaUrl: (couple.heroBanners && couple.heroBanners[1]) || 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1600&auto=format&fit=crop',
      thumbnailUrl: (couple.heroBanners && couple.heroBanners[1]) || 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600&auto=format&fit=crop',
      badge: 'Master Shot',
      description: 'Khung cảnh thiên nhiên hoàng hôn êm đềm.',
    },
  ]

  const activeReel = reels[activeReelIndex] || reels[0]

  // Synchronize video play/pause
  useEffect(() => {
    if (activeReel.type === 'video' && videoRef.current) {
      setIsVideoLoading(true)
      videoRef.current.currentTime = 0
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
          setIsVideoLoading(false)
        })
        .catch(() => {
          setIsPlaying(false)
          setIsVideoLoading(false)
        })
    }
  }, [activeReelIndex, activeReel.type])

  const handleTogglePlay = () => {
    if (activeReel.type !== 'video' || !videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleFullscreen = () => {
    if (!heroContainerRef.current) return
    if (!document.fullscreenElement) {
      heroContainerRef.current.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.().catch(() => {})
    }
  }

  return (
    <section
      id="hero"
      ref={heroContainerRef}
      aria-label="Khung cảnh cưới điện ảnh 3D toàn màn hình"
      className="relative w-full h-screen min-h-[660px] md:min-h-[750px] max-h-[1400px] overflow-hidden flex flex-col justify-between select-none bg-black text-paper-light"
    >
      {/* 1. CINEMATIC FULLSCREEN STAGE LAYER (VIDEO / 3D PHOTO) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {activeReel.type === 'video' ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              key={activeReel.mediaUrl}
              src={activeReel.mediaUrl}
              poster={activeReel.thumbnailUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onPlaying={() => setIsVideoLoading(false)}
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Poster fallback image while video prepares */}
            {isVideoLoading && (
              <img
                src={activeReel.thumbnailUrl}
                alt={activeReel.title}
                className="absolute inset-0 w-full h-full object-cover object-center animate-fade-in"
              />
            )}
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              key={activeReel.mediaUrl}
              src={activeReel.mediaUrl}
              alt={activeReel.title}
              className="w-full h-full object-cover object-center animate-ken-burns scale-105"
            />
          </div>
        )}

        {/* Filmic Vignette & Luxury Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/75 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

        {/* Ambient Gold Shimmer Lighting Aura */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-gold/15 via-champagne/10 to-transparent blur-3xl pointer-events-none" />

        {/* Royal Corner Ornaments */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-gold/40 pointer-events-none hidden sm:block" />
        <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-gold/40 pointer-events-none hidden sm:block" />
      </div>

      {/* 2. TOP FLOATING STAGE HEADER: Monogram Brand & Interactive Controls */}
      <div className="relative z-20 w-full px-5 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between">
        {/* Monogram Seal & Chapter Info */}
        <div className="flex items-center gap-3.5">
          <div className="relative group">
            <div className="w-13 h-13 rounded-full border-2 border-gold bg-black/60 backdrop-blur-md flex items-center justify-center shadow-xl shadow-gold/25 ring-2 ring-gold/30">
              <span className="font-display font-bold text-base text-gold-light gold-foil-text tracking-wider">
                {couple.monogram}
              </span>
            </div>
            <div className="absolute inset-0 rounded-full border border-gold/40 animate-ping opacity-25 pointer-events-none" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-gold-light font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Wedding Cinema • 4K</span>
            </span>
            <span className="text-xs sm:text-sm text-paper-light/85 font-serif italic">
              {activeReel.title}
            </span>
          </div>
        </div>

        {/* Stage Media Controls: Sound, Play/Pause, Reopen 3D Envelope, Fullscreen */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio toggle button with sound visualizer bars */}
          <button
            type="button"
            onClick={toggleMute}
            className="h-10 px-4 rounded-full bg-black/60 hover:bg-black/85 border border-gold/50 text-gold-light text-xs font-serif flex items-center gap-2.5 backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
            title={isMuted ? 'Bật âm thanh hôn lễ' : 'Tắt âm thanh'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-paper-light/70" />
            ) : (
              <div className="flex items-center gap-0.5">
                <span className="w-0.5 h-3 bg-gold animate-pulse" />
                <span className="w-0.5 h-4 bg-gold-light animate-pulse delay-75" />
                <span className="w-0.5 h-2 bg-gold animate-pulse delay-150" />
              </div>
            )}
            <span className="font-medium">{isMuted ? 'Mute' : 'Nhạc Lễ'}</span>
          </button>

          {/* Video Play/Pause (only if active media is video) */}
          {activeReel.type === 'video' && (
            <button
              type="button"
              onClick={handleTogglePlay}
              className="h-10 w-10 rounded-full bg-black/60 hover:bg-black/85 border border-gold/50 text-gold-light flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
              title={isPlaying ? 'Tạm dừng video' : 'Tiếp tục phát'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5 fill-gold-light" />}
            </button>
          )}

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={handleFullscreen}
            className="hidden sm:flex h-10 w-10 rounded-full bg-black/60 hover:bg-black/85 border border-gold/50 text-gold-light items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
            title="Xem toàn màn hình"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Reopen 3D Envelope Gateway button */}
          {onReopenGateway && (
            <button
              type="button"
              onClick={onReopenGateway}
              className="h-10 px-3.5 sm:px-4 rounded-full bg-burgundy/85 hover:bg-burgundy border border-gold/60 text-paper-light text-xs font-serif flex items-center gap-2 backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
              title="Mở lại thiệp cưới 3D tương tác"
            >
              <Mail className="w-3.5 h-3.5 text-gold-light" />
              <span className="hidden sm:inline">Mở lại thiệp 3D</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. CENTER HERO BRANDING & MAJESTIC COUPLE NAMES */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center my-auto flex flex-col items-center">
        {/* Royal Crest Tagline */}
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-black/55 backdrop-blur-md border border-gold/60 text-gold-light text-xs uppercase tracking-[0.35em] font-medium shadow-2xl mb-5">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Save Our Date • Lễ Thành Hôn</span>
          <Sparkles className="w-3.5 h-3.5 text-gold" />
        </div>

        {/* Invitation Subtitle */}
        <p className="font-serif italic text-gold-light/95 text-base sm:text-xl mb-3 tracking-wider font-light drop-shadow-lg">
          Trân trọng báo tin hôn lễ của chúng mình
        </p>

        {/* Majestic Typography: Groom & Bride Names */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-paper-light drop-shadow-2xl leading-none">
          <span className="inline-block hover:text-gold-light transition-colors duration-300">
            {couple.groom.shortName}
          </span>
          <span className="inline-block mx-3 sm:mx-6 font-script text-gold font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl align-middle drop-shadow-md">
            &
          </span>
          <span className="inline-block hover:text-gold-light transition-colors duration-300">
            {couple.bride.shortName}
          </span>
        </h1>

        {/* Golden Hairline Divider */}
        <div className="flex items-center justify-center gap-3 my-5">
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <Heart className="w-4 h-4 text-gold fill-gold" />
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-gold to-transparent" />
        </div>

        {/* Wedding Date & Venue Glass Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-6 sm:px-8 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-xs sm:text-sm font-display tracking-[0.25em] uppercase text-paper-light shadow-xl">
          <span className="font-light">Thứ Sáu</span>
          <span className="text-gold">•</span>
          <span className="font-bold text-gold-light">20 Tháng 11 Năm 2026</span>
          <span className="text-gold">•</span>
          <span className="font-light">Riverside Palace, TP. HCM</span>
        </div>

        {/* Quick Action CTAs */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="#invitation"
            className="min-h-[46px] px-7 py-3 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-charcoal font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 shadow-xl shadow-gold/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-gold-light"
          >
            <Calendar className="w-4 h-4 text-charcoal" />
            <span>Xem Thiệp Mời & Lịch Cưới</span>
          </a>

          <a
            href="#rsvp"
            className="min-h-[46px] px-7 py-3 rounded-full bg-burgundy/90 hover:bg-burgundy text-paper-light border border-gold/60 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl hover:scale-105 transition-all active:scale-95 cursor-pointer backdrop-blur-xs"
          >
            <Heart className="w-3.5 h-3.5 text-gold-light fill-gold-light" />
            <span>Xác Nhận Tham Dự (RSVP)</span>
          </a>
        </div>
      </div>

      {/* 4. BOTTOM INTERACTIVE 3D / VIDEO REEL DOCK ("Click vào cái nào hiển thị cái đó") */}
      <div className="relative z-20 w-full px-4 sm:px-8 pb-4 sm:pb-6 bg-gradient-to-t from-black via-black/85 to-transparent pt-8">
        <div className="max-w-6xl mx-auto">
          {/* Dock Header Notice */}
          <div className="flex items-center justify-between mb-3 text-xs">
            <div className="flex items-center gap-2 text-gold-light font-medium uppercase tracking-widest text-[11px] sm:text-xs">
              <Film className="w-4 h-4 text-gold" />
              <span>Khoảnh Khắc Cưới 3D & Phim Điện Ảnh (Chạm để xem):</span>
            </div>
            <div className="text-[11px] text-paper-light/70 hidden sm:block font-serif italic">
              Thước phim {activeReelIndex + 1} / {reels.length}
            </div>
          </div>

          {/* Interactive Reel Cards Grid / Horizontal Deck */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3.5 overflow-x-auto pb-1">
            {reels.map((reel, index) => {
              const isActive = index === activeReelIndex
              return (
                <button
                  key={reel.id}
                  type="button"
                  onClick={() => setActiveReelIndex(index)}
                  className={`group relative rounded-2xl overflow-hidden text-left transition-all duration-300 cursor-pointer flex flex-col p-1.5 sm:p-2 ${
                    isActive
                      ? 'bg-gradient-to-b from-gold/35 via-gold/15 to-black/90 border-2 border-gold ring-2 ring-gold/40 shadow-xl shadow-gold/30 -translate-y-2'
                      : 'bg-black/60 hover:bg-black/90 border border-gold/30 hover:border-gold/75 opacity-75 hover:opacity-100 hover:-translate-y-1'
                  }`}
                >
                  {/* Thumbnail Container */}
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-black/40">
                    <img
                      src={reel.thumbnailUrl}
                      alt={reel.title}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                    {/* Chapter & Media Type Badge */}
                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-xs border border-gold/40 text-[9px] sm:text-[10px] text-gold-light font-medium flex items-center gap-1">
                      {reel.type === 'video' ? (
                        <>
                          <Film className="w-2.5 h-2.5 text-gold" />
                          <span>{reel.badge}</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-2.5 h-2.5 text-champagne" />
                          <span>{reel.badge}</span>
                        </>
                      )}
                    </div>

                    {/* Active State Pulse Indicator */}
                    {isActive && (
                      <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-full bg-burgundy/95 border border-gold text-[9px] text-white font-bold tracking-wider flex items-center gap-1 shadow-md animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                        <span>ĐANG CHIẾU</span>
                      </div>
                    )}
                  </div>

                  {/* Card Title & Subtitle */}
                  <div className="mt-1.5 px-1 pb-0.5">
                    <p
                      className={`text-xs font-serif font-bold truncate ${
                        isActive ? 'text-gold-light' : 'text-paper-light group-hover:text-gold-light'
                      }`}
                    >
                      {reel.chapter}. {reel.title}
                    </p>
                    <p className="text-[10px] text-paper-light/65 truncate font-light">
                      {reel.subtitle}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Bottom Scroll Cue */}
          <div className="mt-4 flex items-center justify-center">
            {onScrollToStory ? (
              <button
                type="button"
                onClick={onScrollToStory}
                className="inline-flex items-center gap-1.5 text-xs text-paper-light/75 hover:text-gold-light transition-colors cursor-pointer group py-1"
              >
                <span className="font-sans uppercase tracking-[0.2em] text-[10px]">
                  Cuộn xuống để khám phá hôn lễ
                </span>
                <ChevronDown className="w-4 h-4 text-gold group-hover:translate-y-1 transition-transform animate-bounce" />
              </button>
            ) : (
              <a
                href="#calendar"
                className="inline-flex items-center gap-1.5 text-xs text-paper-light/75 hover:text-gold-light transition-colors cursor-pointer group py-1"
              >
                <span className="font-sans uppercase tracking-[0.2em] text-[10px]">
                  Cuộn xuống để khám phá hôn lễ
                </span>
                <ChevronDown className="w-4 h-4 text-gold group-hover:translate-y-1 transition-transform animate-bounce" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
