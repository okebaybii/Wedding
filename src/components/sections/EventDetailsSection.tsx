import React from 'react'
import { MapPin, Navigation, Clock, Calendar, Sparkles, Building2, Home } from 'lucide-react'
import { WeddingEvent } from '../../types/wedding.ts'
import { weddingEvents } from '../../data/weddingData.ts'
import { ScrollReveal } from '../ui/ScrollReveal.tsx'
import {
  FrenchCornerFlourish,
  FrenchCrestPediment,
  FrenchFlourishDivider,
} from '../ui/FrenchOrnaments.tsx'

interface EventDetailsSectionProps {
  events?: WeddingEvent[]
}

export const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({
  events = weddingEvents,
}) => {
  const getEventBadge = (type: WeddingEvent['type']) => {
    switch (type) {
      case 'reception':
        return {
          label: 'Tiệc Cưới Chính',
          icon: <Sparkles className="w-3.5 h-3.5 text-gold-light" aria-hidden="true" />,
          className: 'french-velvet-ribbon text-paper-light border-gold/50',
        }
      case 'ceremony':
      default:
        return {
          label: 'Nghi Lễ Gia Tiên',
          icon: <Building2 className="w-3.5 h-3.5 text-gold-light" aria-hidden="true" />,
          className: 'bg-gradient-to-r from-emerald-dark to-emerald text-paper-light border-gold/40',
        }
    }
  }

  const getEventIcon = (index: number) => {
    if (index === 0) {
      return <Home className="w-5 h-5 text-burgundy" aria-hidden="true" />
    }
    if (index === 1) {
      return <Home className="w-5 h-5 text-emerald" aria-hidden="true" />
    }
    return <Sparkles className="w-5 h-5 text-gold-dark" aria-hidden="true" />
  }

  return (
    <section
      id="events"
      aria-label="Thông tin sự kiện hôn lễ"
      className="relative py-20 sm:py-28 px-4 bg-paper overflow-hidden"
    >
      {/* Decorative French Background Radiance */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full bg-burgundy/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with French Pediment */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center mb-16 sm:mb-20">
            <FrenchCrestPediment className="mb-2" />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-gold/20 via-paper-light to-gold/20 border border-gold/50 text-gold-dark text-xs uppercase tracking-[0.25em] font-bold mb-3 shadow-xs font-display">
              <Clock className="w-3.5 h-3.5 text-gold-dark" aria-hidden="true" />
              <span>Programme des Cérémonies • Lịch Trình</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-bold tracking-tight">
              Thời Gian & Địa Điểm
            </h2>
            <p className="mt-2 text-charcoal-muted text-sm sm:text-base max-w-lg mx-auto font-serif italic">
              Sự hiện diện của quý quan khách là niềm vinh hạnh to lớn cho gia đình chúng tôi
            </p>
            <FrenchFlourishDivider className="max-w-xs mx-auto" />
          </div>
        </ScrollReveal>

        {/* 3 Events Grid: French Salon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {events.map((event, idx) => {
            const badge = getEventBadge(event.type)
            const isHighlight = event.type === 'reception'

            return (
              <ScrollReveal
                key={event.id}
                direction="up"
                delay={idx * 150}
                className="h-full"
              >
                <article
                  className={`h-full relative flex flex-col justify-between french-card-bg french-triple-frame rounded-[32px] p-6 sm:p-8 transition-all duration-500 border-2 overflow-hidden ${
                    isHighlight
                      ? 'border-gold shadow-2xl md:-translate-y-2.5 ring-2 ring-gold/40'
                      : 'border-gold/50 shadow-lg hover:border-gold hover:shadow-xl'
                  }`}
                >
                  {/* French Damask Pattern Watermark */}
                  <div className="absolute inset-0 french-damask-pattern opacity-25 pointer-events-none" />

                  {/* French Corner Flourishes */}
                  <FrenchCornerFlourish position="top-left" size={44} />
                  <FrenchCornerFlourish position="top-right" size={44} />
                  <FrenchCornerFlourish position="bottom-left" size={44} />
                  <FrenchCornerFlourish position="bottom-right" size={44} />

                  {/* Highlight Ribbon for Reception */}
                  {isHighlight && (
                    <div className="absolute top-0 inset-x-0 flex justify-center z-20">
                      <div className="px-5 py-1 rounded-b-2xl bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-charcoal font-display text-[11px] font-extrabold uppercase tracking-widest shadow-md flex items-center gap-1.5 border-b border-x border-gold-light">
                        <Sparkles className="w-3.5 h-3.5 text-charcoal" />
                        <span>Trọng Tâm Buổi Tiệc</span>
                      </div>
                    </div>
                  )}

                  <div className="relative z-10 pt-3">
                    {/* Top Badge & Heraldic Medal Icon */}
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-serif font-bold border shadow-xs ${badge.className}`}
                      >
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-paper via-paper-light to-gold/20 border-2 border-gold/60 flex items-center justify-center shadow-md">
                        {getEventIcon(idx)}
                      </div>
                    </div>

                    {/* Event Title */}
                    <h3 className="font-serif text-2xl text-charcoal font-bold tracking-tight mb-4">
                      {event.title}
                    </h3>

                    {/* Date & Time Blocks in French Cartouche */}
                    <div className="space-y-3 mb-6 p-4 rounded-2xl bg-paper/70 border border-gold/30 shadow-xs">
                      <div className="flex items-start gap-3 text-sm text-charcoal">
                        <Clock className="w-4 h-4 text-gold-dark mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <span className="font-bold text-burgundy text-lg block font-serif tracking-tight">
                            {event.time}
                          </span>
                          <span className="text-xs text-charcoal-muted font-serif italic">Bắt đầu đón khách & làm lễ</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-sm text-charcoal pt-2 border-t border-gold/20">
                        <Calendar className="w-4 h-4 text-gold-dark mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <span className="font-bold text-charcoal block font-serif">{event.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Location Info */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-burgundy mt-1 shrink-0" aria-hidden="true" />
                        <div>
                          <h4 className="font-serif font-bold text-base text-charcoal">
                            {event.locationName}
                          </h4>
                          <p className="font-sans text-xs sm:text-sm text-charcoal-muted leading-relaxed mt-1">
                            {event.address}
                          </p>
                        </div>
                      </div>

                      {event.notes && (
                        <p className="text-xs italic text-charcoal/80 bg-paper/90 p-3 rounded-xl border border-gold/25 mt-3 font-serif">
                          “{event.notes}”
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action: French Gilded Map Button */}
                  <div className="relative z-10 pt-2">
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full min-h-[48px] px-4 py-3 rounded-full font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] border shadow-md cursor-pointer ${
                        isHighlight
                          ? 'bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-charcoal hover:brightness-105 border-gold-light shadow-gold/20'
                          : 'bg-paper text-charcoal hover:bg-gold/15 border-gold/50 hover:text-burgundy'
                      }`}
                    >
                      <Navigation className="w-4 h-4 text-charcoal" aria-hidden="true" />
                      <span>Xem Chỉ Đường Bản Đồ</span>
                    </a>
                  </div>
                </article>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default EventDetailsSection
