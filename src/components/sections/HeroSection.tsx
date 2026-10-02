import React, { useState, useEffect } from 'react'
import { Calendar, Heart, Clock, ChevronDown, Check, Download, ExternalLink, RotateCcw } from 'lucide-react'
import { CoupleInfo } from '../../types/wedding.ts'
import { weddingCouple } from '../../data/weddingData.ts'
import { getGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendar.ts'
import { Envelope3DScene } from '../canvas/Envelope3DScene.tsx'
import { useWeddingAudio } from '../../hooks/useWeddingAudio.ts'

interface HeroSectionProps {
  couple?: CoupleInfo
  onScrollToStory?: () => void
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  couple = weddingCouple,
  onScrollToStory,
}) => {
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false)
  const [addedNotice, setAddedNotice] = useState<string | null>(null)
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false)
  const { startMusic, isMuted } = useWeddingAudio()

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(couple.weddingDate))

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpened(true)
    startMusic().catch(() => {})
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(couple.weddingDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [couple.weddingDate])

  function calculateTimeLeft(targetDateStr: string): TimeLeft {
    const target = new Date(targetDateStr).getTime()
    const now = new Date().getTime()
    const diff = target - now

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds, isExpired: false }
  }

  const calendarParams = {
    title: `Lễ Cưới ${couple.groom.shortName} & ${couple.bride.shortName}`,
    description: `Trân trọng kính mời quý khách tới tham dự Lễ thành hôn của ${couple.groom.fullName} & ${couple.bride.fullName}.`,
    location: 'Riverside Palace, 360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh',
    startDate: couple.weddingDate,
    durationHours: 4,
  }

  const handleAddToGoogle = () => {
    const url = getGoogleCalendarUrl(calendarParams)
    window.open(url, '_blank', 'noopener,noreferrer')
    setCalendarMenuOpen(false)
    setAddedNotice('Đã mở Google Calendar!')
    setTimeout(() => setAddedNotice(null), 3000)
  }

  const handleDownloadIcs = () => {
    downloadIcsFile(calendarParams)
    setCalendarMenuOpen(false)
    setAddedNotice('Đã tải lịch Apple / Outlook (.ics)!')
    setTimeout(() => setAddedNotice(null), 3000)
  }

  return (
    <section
      id="hero"
      aria-label="Thư mời cưới"
      className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 py-16 sm:py-24 overflow-hidden bg-gradient-to-b from-paper-light via-paper to-paper-dark/30"
    >
      {/* Subtle vintage luxury corner ornament borders */}
      <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-gold/40 pointer-events-none hidden sm:block" />
      <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-gold/40 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-gold/40 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-gold/40 pointer-events-none hidden sm:block" />

      {/* Background Soft Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
        <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-gold/15 via-champagne/25 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Monogram Seal Badge */}
        <div className="mb-6 flex flex-col items-center">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[2px] bg-gradient-to-tr from-gold-dark via-gold-light to-gold shadow-md shadow-gold/20 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-paper flex flex-col items-center justify-center border border-gold/40 relative overflow-hidden group">
              <span className="font-display font-bold text-xl sm:text-2xl tracking-widest text-burgundy gold-foil-text select-none">
                {couple.monogram}
              </span>
              <div className="absolute inset-0 border border-gold/30 rounded-full scale-90 pointer-events-none" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-gold/70" />
            <span className="font-display text-xs sm:text-sm tracking-[0.25em] uppercase text-gold-dark font-medium">
              Save Our Date
            </span>
            <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-gold/70" />
          </div>
        </div>

        {/* Invitation Headline */}
        <p className="font-serif italic text-burgundy text-base sm:text-lg mb-2 tracking-wide">
          Trân trọng báo tin Lễ Thành Hôn
        </p>

        {/* Couple Names */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-charcoal font-semibold tracking-tight mb-4 leading-tight">
          <span className="block sm:inline">{couple.groom.shortName}</span>
          <span className="inline-block mx-3 text-gold font-script text-4xl sm:text-5xl md:text-6xl align-middle font-normal">
            &
          </span>
          <span className="block sm:inline">{couple.bride.shortName}</span>
        </h1>

        {/* Wedding Date Display */}
        <div className="my-3 py-2 px-6 rounded-full border border-gold/40 bg-paper-light/90 shadow-sm backdrop-blur-xs flex items-center gap-3">
          <Calendar className="w-4 h-4 text-gold-dark" aria-hidden="true" />
          <span className="font-display text-sm sm:text-base font-semibold tracking-widest text-charcoal uppercase">
            Thứ Sáu • 20 . 11 . 2026
          </span>
          <Heart className="w-3.5 h-3.5 text-burgundy fill-burgundy" aria-hidden="true" />
        </div>

        <p className="text-charcoal-muted text-sm sm:text-base max-w-md mx-auto mb-4 font-light">
          Tại Trung Tâm Tiệc Cưới Riverside Palace • TP. Hồ Chí Minh
        </p>

        {/* 3D Interactive Wedding Envelope Showcase */}
        <div className="w-full max-w-2xl h-[500px] sm:h-[580px] my-6 relative rounded-3xl overflow-hidden shadow-2xl border border-gold/40 bg-gradient-to-b from-paper-light via-paper to-paper-dark">
          <Envelope3DScene
            isOpened={isEnvelopeOpened}
            onOpen={handleEnvelopeOpen}
            isMuted={isMuted}
            monogram={couple.monogram}
            groomName={couple.groom.shortName}
            brideName={couple.bride.shortName}
            weddingDate="THỨ SÁU • 20 . 11 . 2026"
          />

          {isEnvelopeOpened && (
            <div className="absolute top-4 right-4 z-30">
              <button
                type="button"
                onClick={() => setIsEnvelopeOpened(false)}
                className="px-3.5 py-1.5 rounded-full bg-paper-light/95 border border-gold/60 text-charcoal hover:text-burgundy text-xs font-serif flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer backdrop-blur-md active:scale-95"
                title="Đóng phong bì để xem lại"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gold-dark" />
                <span>Gập lại phong bì</span>
              </button>
            </div>
          )}
        </div>

        {/* Countdown Timer */}
        <div className="w-full max-w-lg mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-gold-dark font-medium mb-3 flex items-center justify-center gap-2">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Đếm ngược ngày chung đôi</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { label: 'Ngày', value: timeLeft.days },
              { label: 'Giờ', value: timeLeft.hours },
              { label: 'Phút', value: timeLeft.minutes },
              { label: 'Giây', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-paper-light/90 border border-gold/30 rounded-xl p-3 sm:p-4 shadow-sm flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-xs"
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark opacity-60" />
                <span className="font-serif text-2xl sm:text-4xl font-bold text-burgundy tracking-tight">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-charcoal-muted mt-1 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions: Add to Calendar & Quick Links */}
        <div className="relative flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Calendar Trigger */}
          <div className="relative w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setCalendarMenuOpen((prev) => !prev)}
              aria-expanded={calendarMenuOpen}
              aria-haspopup="true"
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-full bg-emerald text-paper-light font-sans text-sm font-medium tracking-wide flex items-center justify-center gap-2.5 shadow-md shadow-emerald/20 hover:bg-emerald-light transition-colors active:scale-[0.98] border border-gold/30"
            >
              <Calendar className="w-4 h-4 text-gold-light" aria-hidden="true" />
              <span>Thêm vào lịch</span>
              <ChevronDown
                className={`w-4 h-4 text-gold-light transition-transform duration-200 ${
                  calendarMenuOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {/* Dropdown Menu */}
            {calendarMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setCalendarMenuOpen(false)}
                  aria-hidden="true"
                />
                <div className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 w-64 rounded-xl bg-paper-light border border-gold/40 shadow-xl p-2 z-30 text-left animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-gold/15 mb-1">
                    <p className="text-xs font-semibold text-charcoal">Chọn loại lịch nhắc nhở</p>
                    <p className="text-[11px] text-charcoal-muted">Không bỏ lỡ ngày vui của hai đứa mình</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddToGoogle}
                    className="w-full min-h-[44px] px-3 py-2.5 rounded-lg flex items-center justify-between text-xs font-medium text-charcoal hover:bg-paper hover:text-emerald transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-gold" />
                      Google Calendar
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-charcoal-muted" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadIcs}
                    className="w-full min-h-[44px] px-3 py-2.5 rounded-lg flex items-center justify-between text-xs font-medium text-charcoal hover:bg-paper hover:text-emerald transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-burgundy" />
                      Apple / Outlook (.ics)
                    </span>
                    <Download className="w-3.5 h-3.5 text-charcoal-muted" aria-hidden="true" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Toast / Notification when calendar added */}
          {addedNotice && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald text-paper-light text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-gold/30">
              <Check className="w-3.5 h-3.5 text-gold-light" />
              <span>{addedNotice}</span>
            </div>
          )}

          {/* Quick link to RSVP */}
          <a
            href="#rsvp"
            className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-full bg-burgundy text-paper-light font-sans text-sm font-medium tracking-wide flex items-center justify-center gap-2 shadow-md shadow-burgundy/20 hover:bg-burgundy-light transition-colors active:scale-[0.98] border border-gold/30"
          >
            <Heart className="w-4 h-4 text-champagne" aria-hidden="true" />
            <span>Xác nhận tham dự</span>
          </a>
        </div>

        {/* Scroll cue */}
        {onScrollToStory && (
          <button
            type="button"
            onClick={onScrollToStory}
            aria-label="Cuộn xem chi tiết"
            className="mt-14 inline-flex flex-col items-center gap-1 text-charcoal-muted hover:text-burgundy transition-colors min-h-[48px] min-w-[48px] justify-center"
          >
            <span className="text-[11px] font-sans uppercase tracking-widest font-medium">Cuộn để xem</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-gold-dark" aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  )
}
