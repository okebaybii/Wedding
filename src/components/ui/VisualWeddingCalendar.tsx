import React, { useState, useEffect } from 'react'
import { Calendar as CalendarIcon, Heart, Clock, Download, ExternalLink, Sparkles, Check } from 'lucide-react'
import { getGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendar.ts'

interface VisualWeddingCalendarProps {
  weddingDateStr?: string
  groomShortName?: string
  brideShortName?: string
  groomFullName?: string
  brideFullName?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export const VisualWeddingCalendar: React.FC<VisualWeddingCalendarProps> = ({
  weddingDateStr = '2026-11-20T18:00:00',
  groomShortName = 'Minh Quân',
  brideShortName = 'Thảo My',
  groomFullName = 'Nguyễn Minh Quân',
  brideFullName = 'Lê Hoàng Thảo My',
}) => {
  const [addedNotice, setAddedNotice] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(weddingDateStr))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingDateStr))
    }, 1000)
    return () => clearInterval(timer)
  }, [weddingDateStr])

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

  // Generate November 2026 days:
  // Week starts on Monday (T2 = 0, T3 = 1, T4 = 2, T5 = 3, T6 = 4, T7 = 5, CN = 6)
  // 2026-11-01 is a Sunday (CN), so 6 padding slots precede day 1.
  const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
  const paddingBefore = 6 // Empty cells for Mon..Sat
  const totalDays = 30 // November has 30 days
  const weddingDay = 20

  const calendarParams = {
    title: `Lễ Cưới ${groomShortName} & ${brideShortName}`,
    description: `Trân trọng kính mời quý khách tới tham dự Lễ thành hôn của ${groomFullName} & ${brideFullName}.`,
    location: 'Riverside Palace, 360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh',
    startDate: weddingDateStr,
    durationHours: 4,
  }

  const handleAddToGoogle = () => {
    const url = getGoogleCalendarUrl(calendarParams)
    window.open(url, '_blank', 'noopener,noreferrer')
    setAddedNotice('Đã mở Google Calendar!')
    setTimeout(() => setAddedNotice(null), 3000)
  }

  const handleDownloadIcs = () => {
    downloadIcsFile(calendarParams)
    setAddedNotice('Đã tải file lịch (.ics)!')
    setTimeout(() => setAddedNotice(null), 3000)
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-12 bg-gradient-to-b from-paper-light via-paper to-paper-dark/40 rounded-3xl p-6 sm:p-10 border-2 border-gold/40 shadow-2xl relative overflow-hidden backdrop-blur-xs">
      {/* Background Royal Watermark / Foil Flourish */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gold/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-burgundy/10 blur-2xl pointer-events-none" />

      {/* Header Tagline */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper-light border border-gold/50 text-gold-dark text-xs uppercase tracking-[0.25em] font-medium shadow-xs mb-3">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Save The Date • Lịch Hôn Lễ</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal font-semibold tracking-tight">
          Tháng 11 Năm 2026
        </h3>
        <p className="text-xs sm:text-sm text-charcoal-muted mt-1 font-light">
          Khoảnh khắc thiêng liêng nhất trong cuộc đời của chúng mình
        </p>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-3" />
      </div>

      {/* 1. Visual Monthly Calendar Grid (Centered, Elegant Table Form) */}
      <div className="w-full max-w-xl mx-auto bg-paper-light/95 rounded-2xl p-5 sm:p-7 border border-gold/30 shadow-md relative z-10">
        {/* Calendar Month Bar */}
        <div className="flex items-center justify-between border-b border-gold/20 pb-3 mb-4">
          <span className="font-serif text-lg font-bold text-burgundy tracking-wide">
            Tháng Mười Một
          </span>
          <span className="font-display text-sm tracking-widest text-gold-dark font-semibold">
            NOVEMBER 2026
          </span>
        </div>

        {/* Weekday Labels */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center">
          {weekDays.map((w, idx) => (
            <div
              key={w}
              className={`py-1.5 text-xs font-semibold ${
                idx === 6 ? 'text-burgundy' : 'text-charcoal-muted'
              }`}
            >
              {w}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
          {/* Empty padding days before Nov 1 */}
          {Array.from({ length: paddingBefore }).map((_, i) => (
            <div key={`pad-${i}`} className="h-9 sm:h-11 rounded-lg" />
          ))}

          {/* Days 1 to 30 */}
          {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
            const isWedding = day === weddingDay
            return (
              <div
                key={`day-${day}`}
                className={`h-9 sm:h-11 rounded-xl flex flex-col items-center justify-center relative transition-all duration-300 ${
                  isWedding
                    ? 'bg-gradient-to-tr from-burgundy via-burgundy-light to-burgundy text-paper-light font-bold shadow-lg shadow-burgundy/30 scale-105 sm:scale-110 z-10 border-2 border-gold ring-2 ring-gold/40 animate-pulse'
                    : 'text-charcoal hover:bg-gold/10 font-medium text-xs sm:text-sm'
                }`}
              >
                <span className={isWedding ? 'text-sm sm:text-base font-serif font-bold text-white' : ''}>
                  {day}
                </span>
                {isWedding && (
                  <div className="absolute -bottom-1 flex items-center justify-center">
                    <Heart className="w-2.5 h-2.5 text-gold-light fill-gold-light" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Wedding Day Legend Footer */}
        <div className="mt-5 pt-3 border-t border-gold/15 flex items-center justify-between text-xs text-charcoal-muted">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-burgundy border border-gold inline-flex items-center justify-center">
              <Heart className="w-2 h-2 text-gold-light fill-gold-light" />
            </span>
            <span className="font-serif font-medium text-burgundy">
              Thứ Sáu, 20/11: Ngày Lễ Thành Hôn
            </span>
          </div>
          <span className="text-[11px] text-gold-dark font-medium">18:00 Khai Tiệc</span>
        </div>
      </div>

      {/* 2. CỤM ĐẾM NGƯỢC ĐƯỢC CHUYỂN XUỐNG PHÍA DƯỚI (Như mũi tên đỏ yêu cầu) */}
      <div className="w-full max-w-xl mx-auto mt-8 relative z-10">
        <div className="bg-paper-light/95 border border-gold/40 rounded-2xl p-5 sm:p-6 shadow-md text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-gold-dark font-medium mb-4 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-gold-dark" />
            <span>Đếm Ngược Đến Giờ Lành</span>
          </div>

          {/* 4 Countdown Digits Grid */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            {[
              { label: 'Ngày', value: timeLeft.days },
              { label: 'Giờ', value: timeLeft.hours },
              { label: 'Phút', value: timeLeft.minutes },
              { label: 'Giây', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-paper border border-gold/35 rounded-xl py-3 px-2 shadow-xs flex flex-col items-center justify-center relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark opacity-70" />
                <span className="font-serif text-2xl sm:text-3xl font-bold text-burgundy tracking-tight">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-charcoal-muted mt-1 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-charcoal-muted mt-4 font-light flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark inline" />
            <span>Chúng mình rất nóng lòng được đón tiếp quý khách!</span>
          </p>
        </div>

        {/* 3. Nút Lưu Lịch Nhắc Nhở Điện Thoại (Đặt dưới cụm đếm ngược) */}
        <div className="mt-6 text-center space-y-3">
          <p className="text-xs font-semibold text-charcoal uppercase tracking-wider">
            Lưu lịch nhắc nhở điện thoại:
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleAddToGoogle}
              className="w-full sm:w-auto min-h-[46px] px-6 py-2.5 rounded-full bg-paper-light hover:bg-paper border border-gold/50 text-charcoal hover:text-emerald text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-gold-dark" />
              <span>Google Calendar</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadIcs}
              className="w-full sm:w-auto min-h-[46px] px-6 py-2.5 rounded-full bg-paper-light hover:bg-paper border border-gold/50 text-charcoal hover:text-burgundy text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-gold-dark" />
              <span>Apple / Outlook (.ics)</span>
            </button>
          </div>

          {addedNotice && (
            <div className="text-center text-xs text-emerald font-medium flex items-center justify-center gap-1.5 animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>{addedNotice}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VisualWeddingCalendar
