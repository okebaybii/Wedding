import React, { useState, useEffect } from 'react'
import {
  MapPin,
  ExternalLink,
  Heart,
  Sparkles,
  Calendar as CalendarIcon,
  Clock,
  Download,
  Check,
} from 'lucide-react'
import { CoupleInfo } from '../../types/wedding.ts'
import { weddingCouple } from '../../data/weddingData.ts'
import { getGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendar.ts'
import {
  FrenchCornerFlourish,
  FrenchCrestPediment,
  FrenchFlourishDivider,
} from './FrenchOrnaments.tsx'

interface LuxuryWeddingInvitationCardProps {
  couple?: CoupleInfo
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export const LuxuryWeddingInvitationCard: React.FC<LuxuryWeddingInvitationCardProps> = ({
  couple = weddingCouple,
}) => {
  const mapUrl = 'https://maps.google.com/?q=Riverside+Palace+360D+Ben+Van+Don+District+4+Ho+Chi+Minh'
  const weddingDateStr = couple.weddingDate || '2026-11-20T18:00:00'

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
  // Nov 1, 2026 is a Sunday (CN), so 6 padding slots precede day 1 (Mon..Sat).
  const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
  const paddingBefore = 6
  const totalDays = 30
  const weddingDay = 20

  const calendarParams = {
    title: `Lễ Thành Hôn ${couple.groom.shortName} & ${couple.bride.shortName}`,
    description: `Trân trọng kính mời quý khách tới tham dự Lễ thành hôn của ${couple.groom.fullName} & ${couple.bride.fullName}.`,
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
    <div className="w-full max-w-3xl mx-auto mb-12 relative px-2 sm:px-0">
      {/* Outer Romantic French Chateau Rose & Gold Aura */}
      <div className="absolute -inset-3 bg-gradient-to-r from-gold/30 via-champagne/40 to-burgundy/20 rounded-[38px] blur-2xl opacity-80 pointer-events-none" />

      {/* Main French Gilded Chateau Invitation Card */}
      <div className="relative french-card-bg french-triple-frame rounded-[32px] sm:rounded-[36px] p-6 sm:p-12 md:p-14 border-2 border-gold/70 shadow-2xl overflow-hidden text-charcoal">
        {/* Subtle French Royal Damask Texture Watermark */}
        <div className="absolute inset-0 french-damask-pattern opacity-40 pointer-events-none" />

        {/* French Acanthus Leaf Gilded Corner Flourishes (4 Góc Hoa Văn Versailles) */}
        <FrenchCornerFlourish position="top-left" size={68} />
        <FrenchCornerFlourish position="top-right" size={68} />
        <FrenchCornerFlourish position="bottom-left" size={68} />
        <FrenchCornerFlourish position="bottom-right" size={68} />

        {/* Concentric Gold Hairline Frames (Nẹp Chỉ Phào Kép Kiểu Pháp) */}
        <div className="absolute inset-3 sm:inset-5 border border-gold/50 rounded-[26px] pointer-events-none shadow-[inset_0_0_12px_rgba(200,168,107,0.15)]" />
        <div className="absolute inset-5 sm:inset-7 border border-dashed border-gold/30 rounded-[20px] pointer-events-none" />

        {/* 1. TOP FRENCH CARTOUCHE CREST & WAX SEAL */}
        <div className="relative z-10 flex flex-col items-center text-center pt-2 sm:pt-4">
          {/* French Baroque Crown Pediment */}
          <FrenchCrestPediment className="mb-2" />

          {/* Burgundy Royal Wax Seal with Ribbon Tails */}
          <div className="relative mb-3 group mt-1">
            {/* Silk Ribbon Tails Behind Seal */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 flex justify-center gap-1 pointer-events-none">
              <div className="w-3.5 h-6 bg-gradient-to-b from-burgundy-dark to-burgundy rounded-b-sm rotate-[-12deg] shadow-md border-b-2 border-r border-gold/60" />
              <div className="w-3.5 h-6 bg-gradient-to-b from-burgundy to-burgundy-dark rounded-b-sm rotate-[12deg] shadow-md border-b-2 border-l border-gold/60" />
            </div>

            {/* 3D Wax Seal Medallion with Gilded Laurel Rim */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#96383F] via-burgundy to-[#3D0F13] border-2 border-gold p-1 shadow-2xl shadow-burgundy/40 flex items-center justify-center">
              <div className="w-full h-full rounded-full border border-gold/60 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-t from-black/25 via-transparent to-white/20">
                <span className="font-display font-extrabold text-xl sm:text-2xl text-gold-light gold-foil-text tracking-widest drop-shadow-sm">
                  {couple.monogram}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-gold-light/90 font-serif font-semibold -mt-0.5">
                  Wedding
                </span>
              </div>
            </div>

            {/* Radiant Sparkle */}
            <div className="absolute -top-1 -right-1 text-gold">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
          </div>

          {/* Invitation Headline */}
          <span className="text-[11px] sm:text-xs font-display uppercase tracking-[0.35em] text-gold-dark font-bold mt-2">
            Invitation de Mariage
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-burgundy font-bold tracking-tight mt-1 mb-1 drop-shadow-xs">
            THIỆP MỜI THÀNH HÔN
          </h2>

          {/* French Floral Scroll Divider */}
          <FrenchFlourishDivider className="max-w-md w-full" />

          {/* Formal Greeting Line */}
          <p className="font-serif italic text-charcoal/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed px-2">
            Trân trọng kính mời Quý khách cùng gia đình tới tham dự buổi tiệc thân mật mừng Lễ Thành Hôn của chúng tôi
          </p>
        </div>

        {/* 2. FAMILY HERALDIC PANELS: NHÀ TRAI | SONG HỶ MEDALLION | NHÀ GÁI */}
        <div className="relative z-10 my-8 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-paper-light/90 via-champagne/20 to-paper-light/90 border border-gold/40 shadow-sm grid grid-cols-1 md:grid-cols-7 gap-6 items-center text-center">
          {/* Nhà Trai */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end md:text-right p-3 rounded-xl hover:bg-gold/5 transition-colors">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-bold text-emerald mb-1.5 pb-0.5 border-b border-gold/40 font-display">
              <span>Nhà Trai</span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-serif">
              {couple.groom.parents}
            </p>
            <div className="mt-3">
              <span className="text-[11px] uppercase tracking-widest text-charcoal-muted block font-sans font-medium">
                Trưởng Nam
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-burgundy tracking-tight">
                {couple.groom.fullName}
              </h3>
            </div>
          </div>

          {/* Center Medallion: French Rococo Cartouche with Song Hỷ (囍) */}
          <div className="md:col-span-1 flex flex-col items-center justify-center my-2 md:my-0">
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark p-0.5 shadow-lg shadow-gold/30">
              <div className="w-full h-full rounded-full bg-paper flex items-center justify-center border border-gold/50">
                <span className="font-serif font-bold text-2xl text-burgundy select-none">
                  囍
                </span>
              </div>
              <div className="absolute -top-1 text-gold">
                <Heart className="w-3.5 h-3.5 fill-burgundy text-gold" />
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-gold-dark font-bold mt-1.5 font-display">
              Trăm Năm
            </span>
          </div>

          {/* Nhà Gái */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start md:text-left p-3 rounded-xl hover:bg-gold/5 transition-colors">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-bold text-burgundy mb-1.5 pb-0.5 border-b border-gold/40 font-display">
              <span>Nhà Gái</span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-serif">
              {couple.bride.parents}
            </p>
            <div className="mt-3">
              <span className="text-[11px] uppercase tracking-widest text-charcoal-muted block font-sans font-medium">
                Ái Nữ
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-burgundy tracking-tight">
                {couple.bride.fullName}
              </h3>
            </div>
          </div>
        </div>

        {/* 3. KHỐI THAY THẾ THEO HÌNH: THỜI GIAN, QUYỂN LỊCH THÁNG 11/2026, CỤM ĐẾM NGƯỢC & ĐỊA ĐIỂM */}
        <div id="calendar" className="scroll-mt-16 relative z-10 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5EFE3] border-2 border-gold/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-md text-center">
          {/* Subtle Gilded Inner Border */}
          <div className="absolute inset-2 border border-dashed border-gold/30 rounded-xl sm:rounded-2xl pointer-events-none" />

          {/* Ceremony Time Header */}
          <div className="relative z-10 mb-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-bold block mb-1 font-display">
              Hôn lễ được cử hành vào lúc
            </span>
            <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-charcoal tracking-tight">
              18:00 • Thứ Sáu
            </div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-burgundy mt-1">
              Ngày 20 Tháng 11 Năm 2026
            </div>
            <p className="text-xs text-charcoal-muted italic mt-1 font-serif">
              (Nhằm ngày 12 tháng 10 năm Bính Ngọ)
            </p>
          </div>

          {/* 3A. QUYỂN LỊCH THÁNG 11/2026 (NOVEMBER 2026) */}
          <div className="relative z-10 max-w-lg mx-auto bg-paper-light/95 border border-gold/40 rounded-2xl p-4 sm:p-6 shadow-sm my-6">
            {/* Calendar Month Bar */}
            <div className="flex items-center justify-between border-b border-gold/30 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-burgundy" />
                <span className="font-serif text-base sm:text-lg font-bold text-burgundy tracking-wide">
                  Tháng Mười Một
                </span>
              </div>
              <span className="font-display text-xs sm:text-sm tracking-[0.2em] text-gold-dark font-bold uppercase">
                November 2026
              </span>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center">
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
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
              {/* Padding before Nov 1 */}
              {Array.from({ length: paddingBefore }).map((_, i) => (
                <div key={`pad-${i}`} className="h-8 sm:h-10 rounded-lg opacity-20" />
              ))}

              {/* Days 1 to 30 */}
              {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
                const isWedding = day === weddingDay
                return (
                  <div
                    key={`day-${day}`}
                    className={`h-8 sm:h-10 rounded-xl flex flex-col items-center justify-center relative transition-all duration-300 ${
                      isWedding
                        ? 'bg-gradient-to-tr from-burgundy via-[#96383F] to-burgundy text-paper-light font-bold shadow-lg shadow-burgundy/40 scale-105 sm:scale-110 z-10 border-2 border-gold ring-2 ring-gold/40 animate-pulse'
                        : 'text-charcoal hover:bg-gold/15 font-serif text-xs sm:text-sm border border-transparent hover:border-gold/30'
                    }`}
                  >
                    <span className={isWedding ? 'text-sm sm:text-base font-serif font-extrabold text-white drop-shadow-sm' : ''}>
                      {day}
                    </span>
                    {isWedding && (
                      <div className="absolute -bottom-1 flex items-center justify-center">
                        <Heart className="w-2 h-2 text-gold-light fill-gold-light" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-3 border-t border-gold/20 flex flex-wrap items-center justify-between text-xs text-charcoal-muted gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-burgundy border border-gold inline-flex items-center justify-center">
                  <Heart className="w-2 h-2 text-gold-light fill-gold-light" />
                </span>
                <span className="font-serif font-bold text-burgundy text-xs">
                  Thứ Sáu, 20/11: Ngày Lễ Thành Hôn
                </span>
              </div>
              <span className="text-[11px] font-display font-semibold text-gold-dark uppercase tracking-wider">
                18:00 Khai Tiệc
              </span>
            </div>
          </div>

          {/* 3B. CỤM ĐẾM NGƯỢC ĐẾN GIỜ LÀNH (FRENCH GILDED CLOCKS) */}
          <div className="relative z-10 max-w-lg mx-auto mb-6">
            <div className="text-xs uppercase tracking-[0.25em] text-gold-dark font-bold mb-3 flex items-center justify-center gap-2 font-display">
              <Clock className="w-4 h-4 text-gold-dark" />
              <span>Đếm Ngược Đến Giờ Lành</span>
            </div>

            {/* 4 Digit Clock Grid */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto">
              {[
                { label: 'Ngày', value: timeLeft.days },
                { label: 'Giờ', value: timeLeft.hours },
                { label: 'Phút', value: timeLeft.minutes },
                { label: 'Giây', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-paper border-2 border-gold/45 rounded-xl py-2.5 px-2 shadow-sm flex flex-col items-center justify-center relative overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark" />
                  <span className="font-serif text-xl sm:text-2xl font-extrabold text-burgundy tracking-tight gold-foil-text drop-shadow-xs">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-serif uppercase tracking-wider text-charcoal font-bold mt-0.5">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-charcoal-muted mt-3 font-serif italic flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark inline" />
              <span>Chúng mình rất nóng lòng được đón tiếp quý khách!</span>
            </p>
          </div>

          <div className="relative z-10 w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-5" />

          {/* 3C. ĐỊA ĐIỂM ĐÓN TIẾP TIỆC CƯỚI & NÚT CHỈ ĐƯỜNG */}
          <div className="relative z-10 space-y-1.5 max-w-lg mx-auto">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-bold block font-display">
              Địa điểm đón tiếp tiệc cưới
            </span>
            <h4 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-charcoal">
              Trung Tâm Tiệc Cưới Riverside Palace
            </h4>
            <p className="text-xs sm:text-sm text-charcoal/90 font-medium font-serif">
              Sảnh Grand Ballroom (Tầng 2)
            </p>
            <p className="text-xs sm:text-sm text-charcoal-muted">
              360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh
            </p>

            {/* Action Buttons: Google Maps + Lưu Lịch Điện Thoại */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-charcoal hover:brightness-105 border border-gold-light text-xs font-bold uppercase tracking-wider shadow-md shadow-gold/20 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-charcoal" />
                <span>Chỉ Đường (Google Maps)</span>
                <ExternalLink className="w-3.5 h-3.5 text-charcoal opacity-75" />
              </a>

              <button
                type="button"
                onClick={handleAddToGoogle}
                className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 rounded-full bg-paper hover:bg-gold/15 border border-gold/50 text-charcoal hover:text-emerald text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <CalendarIcon className="w-3.5 h-3.5 text-gold-dark" />
                <span>Google Calendar</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadIcs}
                className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 rounded-full bg-paper hover:bg-gold/15 border border-gold/50 text-charcoal hover:text-burgundy text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-gold-dark" />
                <span>Lịch (.ics)</span>
              </button>
            </div>

            {addedNotice && (
              <div className="pt-2 text-center text-xs text-emerald font-bold flex items-center justify-center gap-1.5 animate-in fade-in">
                <Check className="w-3.5 h-3.5" />
                <span>{addedNotice}</span>
              </div>
            )}
          </div>
        </div>

        {/* 4. RESPECTFUL FAMILY CLOSING STATEMENT */}
        <div className="relative z-10 mt-8 text-center space-y-2">
          <p className="font-serif italic text-xs sm:text-sm text-charcoal/90 max-w-lg mx-auto leading-relaxed">
            “Sự hiện diện của Quý khách là niềm vinh hạnh to lớn và là lời chúc phúc quý báu nhất cho gia đình chúng tôi!”
          </p>
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="h-[1.5px] w-10 bg-gradient-to-r from-transparent to-gold" />
            <Heart className="w-3.5 h-3.5 text-burgundy fill-burgundy" />
            <span className="h-[1.5px] w-10 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-gold-dark font-display">
            Rất Hân Hạnh Được Đón Tiếp!
          </p>
        </div>
      </div>
    </div>
  )
}

export default LuxuryWeddingInvitationCard
