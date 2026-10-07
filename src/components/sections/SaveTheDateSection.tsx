import React, { useState } from 'react'
import { CalendarDays, Download, ExternalLink, MapPin, Sparkles, Clock, Compass } from 'lucide-react'
import { CoupleInfo } from '../../types/wedding.ts'
import { weddingCouple } from '../../data/weddingData.ts'
import { downloadIcsFile, getGoogleCalendarUrl } from '../../utils/calendar.ts'
import { useWeddingData } from '../../store/WeddingContext.tsx'
import { JourneyDetailModal } from '../ui/JourneyDetailModal.tsx'
import { JourneyTriggerButton } from '../ui/JourneyTriggerButton.tsx'

interface SaveTheDateSectionProps {
  couple?: CoupleInfo
}

export const SaveTheDateSection: React.FC<SaveTheDateSectionProps> = ({
  couple = weddingCouple,
}) => {
  const { state } = useWeddingData()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const receptionEvent = state.events.find((e) => e.type === 'reception') || state.events[2]
  const venue = {
    name: receptionEvent?.locationName || 'Riverside Palace',
    hall: 'Sảnh Grand Ballroom · Tầng 2',
    address: receptionEvent?.address || '360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh',
    mapUrl: receptionEvent?.mapUrl || 'https://maps.google.com/?q=Riverside+Palace+360D+Ben+Van+Don+District+4+Ho+Chi+Minh',
  }

  const calendarParams = {
    title: `Tiệc Cưới & Lễ Thành Hôn: ${couple.groom.shortName} & ${couple.bride.shortName}`,
    description: `Trân trọng kính mời quý khách tới tham dự Lễ thành hôn của ${couple.groom.fullName} và ${couple.bride.fullName}.\nĐón khách: 17:30 • Khai tiệc: 18:30\nĐịa điểm: ${venue.name}, ${venue.address}`,
    location: `${venue.name}, ${venue.address}`,
    startDate: couple.weddingDate || '2026-11-20T17:30:00',
    durationHours: 4,
  }

  return (
    <section
      id="invitation"
      data-journey-chapter="invitation"
      aria-label="Thiệp mời và lịch hôn lễ"
      className="journey-chapter relative min-h-[100svh] flex flex-col justify-end pb-12 sm:pb-16 overflow-hidden"
    >
      {/* Screen Reader Semantic Data */}
      <div className="sr-only">
        <h2>Lễ thành hôn của {couple.groom.fullName} và {couple.bride.fullName}</h2>
        <p>17:30 (Đón khách) • 18:30 (Khai tiệc), Thứ Sáu ngày 20 tháng 11 năm 2026.</p>
        <p>{venue.name}, {venue.hall}, {venue.address}.</p>
      </div>

      {/* Floating Trigger Button: clean and minimal, leaves 3D scene fully unobstructed */}
      <div className="relative z-20 flex justify-center px-4">
        <JourneyTriggerButton
          label="Chi tiết Thiệp Cưới & Lưu Lịch"
          icon={<CalendarDays className="h-4 w-4 text-gold-light" />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Detail Modal displayed only upon click */}
      <JourneyDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Thiệp Mời Hoàng Gia"
        subtitle="Lễ Thành Hôn · Serenity Château"
        icon={<Sparkles className="h-5 w-5 text-gold-light" />}
        maxWidth="2xl"
      >
        <div className="space-y-6 text-center">
          {/* Header */}
          <div>
            <p className="font-serif text-xs italic tracking-widest text-gold-light uppercase">
              Trân trọng kính mời quý khách
            </p>
            <h3 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-white">
              {couple.groom.fullName} <span className="font-script text-gold-light text-2xl sm:text-3xl">&</span> {couple.bride.fullName}
            </h3>
            <p className="mt-2 font-serif text-sm italic text-sky-100/85">
              Tới dự bữa cơm thân mật mừng Lễ Thành Hôn của chúng mình
            </p>
          </div>

          <div className="mx-auto h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent" />

          {/* Time & Venue Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="p-4 rounded-xl border border-gold/40 bg-[#12283e]/80">
              <div className="flex items-center gap-2.5 text-gold-light mb-2">
                <Clock className="w-4 h-4" />
                <span className="font-serif text-xs font-bold uppercase tracking-wider">Thời Gian</span>
              </div>
              <p className="font-serif text-lg font-bold text-white">Thứ Sáu, 20 · 11 · 2026</p>
              <p className="text-xs text-sky-100/80 mt-1">
                <strong>17:30</strong> — Đón khách & Chụp hình lưu niệm
              </p>
              <p className="text-xs text-sky-100/80">
                <strong>18:30</strong> — Khai tiệc & Nghi lễ thành hôn
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gold/40 bg-[#12283e]/80">
              <div className="flex items-center gap-2.5 text-gold-light mb-2">
                <Compass className="w-4 h-4" />
                <span className="font-serif text-xs font-bold uppercase tracking-wider">Địa Điểm</span>
              </div>
              <p className="font-serif text-lg font-bold text-white">{venue.name}</p>
              <p className="text-xs text-gold-light font-medium mt-1">{venue.hall}</p>
              <p className="text-xs text-sky-100/80 mt-1">{venue.address}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="journey-button journey-button--glass min-h-12 w-full sm:w-auto flex-1 border border-gold/50 bg-[#122b44]/80 px-4 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-all hover:bg-gold/25 hover:text-gold-light"
            >
              <MapPin className="h-4 w-4 text-gold-light" aria-hidden="true" />
              <span>Chỉ đường</span>
              <ExternalLink className="h-3 w-3 opacity-70" aria-hidden="true" />
            </a>
            <a
              href={getGoogleCalendarUrl(calendarParams)}
              target="_blank"
              rel="noopener noreferrer"
              className="journey-button journey-button--glass min-h-12 w-full sm:w-auto flex-1 border border-gold/50 bg-[#122b44]/80 px-4 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-all hover:bg-gold/25 hover:text-gold-light"
            >
              <CalendarDays className="h-4 w-4 text-gold-light" aria-hidden="true" />
              <span>Lịch Google</span>
            </a>
            <button
              type="button"
              onClick={() => downloadIcsFile(calendarParams)}
              className="journey-button journey-button--gold min-h-12 w-full sm:w-auto flex-1 px-4 text-xs font-semibold shadow-xl transition-all"
            >
              <Download className="h-4 w-4 text-charcoal" aria-hidden="true" />
              <span>Tải file lịch</span>
            </button>
          </div>
        </div>
      </JourneyDetailModal>
    </section>
  )
}

export default SaveTheDateSection
