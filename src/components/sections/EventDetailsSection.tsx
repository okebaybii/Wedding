import React from 'react'
import { MapPin, Navigation, Clock, Calendar, Sparkles, Building2, Home } from 'lucide-react'
import { WeddingEvent } from '../../types/wedding.ts'
import { weddingEvents } from '../../data/weddingData.ts'
import { ScrollReveal } from '../ui/ScrollReveal.tsx'

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
          className: 'bg-burgundy text-paper-light border-gold/40',
        }
      case 'ceremony':
      default:
        return {
          label: 'Nghi Lễ Gia Tiên',
          icon: <Building2 className="w-3.5 h-3.5 text-gold-dark" aria-hidden="true" />,
          className: 'bg-emerald text-paper-light border-gold/40',
        }
    }
  }

  const getEventIcon = (index: number) => {
    if (index === 0) {
      return <Home className="w-6 h-6 text-burgundy" aria-hidden="true" />
    }
    if (index === 1) {
      return <Home className="w-6 h-6 text-emerald" aria-hidden="true" />
    }
    return <Sparkles className="w-6 h-6 text-gold-dark" aria-hidden="true" />
  }

  return (
    <section
      id="events"
      aria-label="Thông tin sự kiện hôn lễ"
      className="relative py-20 sm:py-28 px-4 bg-paper overflow-hidden"
    >
      {/* Decorative luxury corners */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper-light border border-gold/40 text-gold-dark text-xs uppercase tracking-[0.25em] font-medium mb-3 shadow-xs">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Lịch Trình Hôn Lễ</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-semibold tracking-tight">
              Thời Gian & Địa Điểm
            </h2>
            <p className="mt-3 text-charcoal-muted text-sm sm:text-base max-w-lg mx-auto font-light">
              Sự hiện diện của quý quan khách là niềm vinh hạnh to lớn cho gia đình chúng tôi
            </p>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
          </div>
        </ScrollReveal>

        {/* 3 Events Grid */}
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
                  className={`h-full relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 border ${
                    isHighlight
                      ? 'bg-paper-light border-gold shadow-lg shadow-gold/10 md:-translate-y-2'
                      : 'bg-paper-light/70 border-gold/30 shadow-sm hover:border-gold/60 hover:shadow-md'
                  }`}
                >
                  {/* Highlight Badge for Reception */}
                  {isHighlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-charcoal font-display text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      <span>Trọng Tâm Buổi Tiệc</span>
                    </div>
                  )}

                  <div>
                    {/* Top Badge & Time */}
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.className}`}
                      >
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                      <div className="w-10 h-10 rounded-full bg-paper border border-gold/30 flex items-center justify-center">
                        {getEventIcon(idx)}
                      </div>
                    </div>

                    {/* Event Title */}
                    <h3 className="font-serif text-2xl text-charcoal font-bold tracking-tight mb-4">
                      {event.title}
                    </h3>

                    {/* Date & Time Blocks */}
                    <div className="space-y-3 mb-6 pb-6 border-b border-gold/20">
                      <div className="flex items-start gap-3 text-sm text-charcoal">
                        <Clock className="w-4 h-4 text-gold-dark mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <span className="font-bold text-burgundy text-base block font-serif">
                            {event.time}
                          </span>
                          <span className="text-xs text-charcoal-muted">Bắt đầu đón khách & làm lễ</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-sm text-charcoal">
                        <Calendar className="w-4 h-4 text-gold-dark mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <span className="font-medium text-charcoal block">{event.date}</span>
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
                        <p className="text-xs italic text-charcoal/70 bg-paper/80 p-3 rounded-xl border border-gold/15 mt-3">
                          {event.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action: Google Maps Button (Min 48px touch target) */}
                  <div className="pt-2">
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full min-h-[48px] px-4 py-3 rounded-xl font-sans text-sm font-semibold tracking-wide flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] border shadow-xs ${
                        isHighlight
                          ? 'bg-emerald text-paper-light hover:bg-emerald-light border-gold/40 shadow-emerald/20'
                          : 'bg-paper text-charcoal hover:bg-paper-dark border-gold/40 hover:text-emerald'
                      }`}
                    >
                      <Navigation className="w-4 h-4 text-gold" aria-hidden="true" />
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
