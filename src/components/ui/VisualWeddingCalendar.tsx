import React, { useState, useEffect } from 'react'
import { Calendar as CalendarIcon, Heart, Clock, Download, ExternalLink, Sparkles, Check } from 'lucide-react'
import { getGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendar.ts'
import {
  FrenchCornerFlourish,
  FrenchCrestPediment,
  FrenchFlourishDivider,
} from './FrenchOrnaments.tsx'

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
  const paddingBefore = 6
  const totalDays = 30
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
    <div className="w-full max-w-3xl mx-auto my-12 relative px-2 sm:px-0">
      {/* Outer Romantic French Chateau Rose & Gold Aura */}
      <div className="absolute -inset-3 bg-gradient-to-r from-gold/25 via-champagne/35 to-burgundy/15 rounded-[38px] blur-2xl opacity-75 pointer-events-none" />

      {/* Main French Desk Calendar Frame */}
      <div className="relative french-card-bg french-triple-frame rounded-[32px] sm:rounded-[36px] p-6 sm:p-10 border-2 border-gold/70 shadow-2xl overflow-hidden text-charcoal">
        {/* Subtle French Royal Damask Texture Watermark */}
        <div className="absolute inset-0 french-damask-pattern opacity-30 pointer-events-none" />

        {/* French Gilded Corner Flourishes */}
        <FrenchCornerFlourish position="top-left" size={60} />
        <FrenchCornerFlourish position="top-right" size={60} />
        <FrenchCornerFlourish position="bottom-left" size={60} />
        <FrenchCornerFlourish position="bottom-right" size={60} />

        {/* Concentric Gold Hairline Frames */}
        <div className="absolute inset-3 sm:inset-4 border border-gold/40 rounded-[26px] pointer-events-none" />

        {/* Header Tagline with French Baroque Pediment */}
        <div className="text-center mb-7 relative z-10 pt-2">
          <FrenchCrestPediment className="mb-2" />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-gold/20 via-paper-light to-gold/20 border border-gold/50 text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold shadow-xs mb-2">
            <CalendarIcon className="w-3.5 h-3.5 text-gold-dark" />
            <span>Calendrier de Mariage • Lịch Hôn Lễ</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal font-bold tracking-tight">
            Tháng 11 Năm 2026
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-1 font-serif italic">
            Khoảnh khắc thiêng liêng nhất trong cuộc đời của chúng mình
          </p>
          <FrenchFlourishDivider className="max-w-xs mx-auto" />
        </div>

        {/* 1. VISUAL MONTHLY CALENDAR GRID (Styled like a French Chateau Salon Calendar) */}
        <div className="w-full max-w-xl mx-auto bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5EFE3] rounded-2xl p-5 sm:p-7 border-2 border-gold/50 shadow-lg relative z-10">
          {/* Inner dashed gold hairline */}
          <div className="absolute inset-2 border border-dashed border-gold/25 rounded-xl pointer-events-none" />

          {/* Calendar Month Bar */}
          <div className="flex items-center justify-between border-b border-gold/30 pb-3 mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-burgundy" />
              <span className="font-serif text-lg sm:text-xl font-bold text-burgundy tracking-wide">
                Tháng Mười Một
              </span>
            </div>
            <span className="font-display text-xs sm:text-sm tracking-[0.2em] text-gold-dark font-bold uppercase">
              Novembre 2026
            </span>
          </div>

          {/* Weekday Labels in French Vintage Style */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3 text-center relative z-10">
            {weekDays.map((w, idx) => (
              <div
                key={w}
                className={`py-1 text-xs font-bold font-serif uppercase tracking-wider ${
                  idx === 6 ? 'text-burgundy' : 'text-charcoal-muted'
                }`}
              >
                {w}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center relative z-10">
            {/* Empty padding days before Nov 1 */}
            {Array.from({ length: paddingBefore }).map((_, i) => (
              <div key={`pad-${i}`} className="h-9 sm:h-11 rounded-lg opacity-20" />
            ))}

            {/* Days 1 to 30 */}
            {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
              const isWedding = day === weddingDay
              return (
                <div
                  key={`day-${day}`}
                  className={`h-9 sm:h-11 rounded-xl flex flex-col items-center justify-center relative transition-all duration-300 ${
                    isWedding
                      ? 'bg-gradient-to-tr from-burgundy via-[#96383F] to-burgundy text-paper-light font-bold shadow-xl shadow-burgundy/40 scale-105 sm:scale-115 z-10 border-2 border-gold ring-2 ring-gold/50 animate-pulse'
                      : 'text-charcoal hover:bg-gold/15 font-serif text-xs sm:text-sm border border-transparent hover:border-gold/30'
                  }`}
                >
                  <span className={isWedding ? 'text-sm sm:text-base font-serif font-extrabold text-white drop-shadow-sm' : ''}>
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
          <div className="mt-5 pt-3.5 border-t border-gold/25 flex flex-wrap items-center justify-between text-xs text-charcoal-muted relative z-10 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-burgundy border border-gold inline-flex items-center justify-center shadow-xs">
                <Heart className="w-2.5 h-2.5 text-gold-light fill-gold-light" />
              </span>
              <span className="font-serif font-bold text-burgundy text-xs sm:text-sm">
                Thứ Sáu, 20/11: Ngày Lễ Thành Hôn
              </span>
            </div>
            <span className="text-[11px] font-display font-semibold text-gold-dark uppercase tracking-wider">
              18:00 • Riverside Palace
            </span>
          </div>
        </div>

        {/* 2. CỤM ĐẾM NGƯỢC - FRENCH GILDED MANTELPIECE CLOCKS (Đồng Hồ Dát Vàng Cung Điện) */}
        <div className="w-full max-w-xl mx-auto mt-8 relative z-10">
          <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5EFE3] border-2 border-gold/50 rounded-2xl p-5 sm:p-7 shadow-lg text-center">
            {/* Header with French Clock Motif */}
            <div className="text-xs uppercase tracking-[0.25em] text-gold-dark font-bold mb-4 flex items-center justify-center gap-2 font-display">
              <Clock className="w-4 h-4 text-gold-dark" />
              <span>Compte à Rebours • Đếm Ngược Giờ Lành</span>
            </div>

            {/* 4 French Gilded Clock Digit Blocks */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
              {[
                { label: 'Ngày', value: timeLeft.days, sub: 'Jours' },
                { label: 'Giờ', value: timeLeft.hours, sub: 'Heures' },
                { label: 'Phút', value: timeLeft.minutes, sub: 'Minutes' },
                { label: 'Giây', value: timeLeft.seconds, sub: 'Secondes' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-b from-paper-light via-[#FBF8F2] to-[#F4EDE2] border-2 border-gold/50 rounded-xl py-3 px-2 shadow-md flex flex-col items-center justify-center relative overflow-hidden group hover:border-gold transition-colors"
                >
                  {/* Top Gilded Crown Accent */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark" />
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-burgundy tracking-tight gold-foil-text drop-shadow-xs">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-serif uppercase tracking-wider text-charcoal font-bold mt-0.5">
                    {item.label}
                  </span>
                  <span className="text-[8px] font-display uppercase tracking-widest text-gold-dark/80 font-medium">
                    {item.sub}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-charcoal-muted mt-4 font-serif italic flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark inline" />
              <span>“Mỗi giây phút trôi qua đều hướng về ngày chung đôi hạnh phúc!”</span>
            </p>
          </div>

          {/* 3. Nút Lưu Lịch Nhắc Nhở Điện Thoại (French Gilded Wax Styling) */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-xs font-bold text-charcoal uppercase tracking-wider font-display">
              Lưu lịch nhắc nhở vào điện thoại:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleAddToGoogle}
                className="w-full sm:w-auto min-h-[46px] px-6 py-2.5 rounded-full bg-paper hover:bg-gold/15 border-2 border-gold/60 text-charcoal hover:text-emerald text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-gold-dark" />
                <span>Google Calendar</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadIcs}
                className="w-full sm:w-auto min-h-[46px] px-6 py-2.5 rounded-full bg-paper hover:bg-gold/15 border-2 border-gold/60 text-charcoal hover:text-burgundy text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-gold-dark" />
                <span>Apple / Outlook (.ics)</span>
              </button>
            </div>

            {addedNotice && (
              <div className="text-center text-xs text-emerald font-bold flex items-center justify-center gap-1.5 animate-in fade-in">
                <Check className="w-3.5 h-3.5" />
                <span>{addedNotice}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisualWeddingCalendar
