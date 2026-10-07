import React, { useState } from 'react'
import { Calendar, Clock, MapPin, Navigation, Sparkles } from 'lucide-react'
import { WeddingEvent } from '../../types/wedding.ts'
import { weddingEvents } from '../../data/weddingData.ts'
import { JourneyDetailModal } from '../ui/JourneyDetailModal.tsx'
import { JourneyTriggerButton } from '../ui/JourneyTriggerButton.tsx'

interface EventDetailsSectionProps {
  events?: WeddingEvent[]
}

export const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({
  events = weddingEvents,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section
      id="events"
      data-journey-chapter="events"
      aria-label="Thông tin sự kiện hôn lễ"
      className="journey-chapter relative min-h-[100svh] flex flex-col justify-end pb-12 sm:pb-16 overflow-hidden"
    >
      {/* Screen Reader Semantic Data */}
      <div className="sr-only">
        <h2>Lịch trình hôn lễ</h2>
        {events.map((e) => (
          <p key={e.id}>{e.title}: {e.date} {e.time} tại {e.locationName}, {e.address}</p>
        ))}
      </div>

      {/* Floating Trigger Button: leaves 3D pedestals & aisle completely visible */}
      <div className="relative z-20 flex justify-center px-4">
        <JourneyTriggerButton
          label="Xem chi tiết Lịch trình & Chỉ đường"
          icon={<Navigation className="h-4 w-4 text-gold-light" />}
          badge={events.length}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Detail Modal displayed only upon click */}
      <JourneyDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Lịch Trình Hôn Lễ"
        subtitle="Những điểm hẹn trong ngày trọng đại"
        icon={<Sparkles className="h-5 w-5 text-gold-light" />}
        maxWidth="4xl"
      >
        <div className="space-y-6">
          <p className="text-center font-serif text-sm italic text-sky-100/80">
            Sự hiện diện của quý quan khách là niềm vinh hạnh và lời chúc phúc quý giá cho hai gia đình.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`relative flex flex-col rounded-2xl border p-5 shadow-xl bg-[#12283e]/90 ${
                  event.type === 'reception'
                    ? 'border-gold shadow-[0_10px_35px_rgba(204,169,104,0.18)]'
                    : 'border-gold/40'
                }`}
              >
                {/* Station Badge */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 bg-gold/20 font-display text-xs font-bold text-gold-light">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-serif text-xs italic text-gold-light">
                    {event.type === 'reception' ? 'Tiệc cưới chính' : 'Nghi lễ gia tiên'}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-white mb-3">
                  {event.title}
                </h3>

                <div className="space-y-3 text-xs text-sky-100/90 mb-4">
                  <div className="flex items-start gap-2.5">
                    <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-light" />
                    <div>
                      <strong className="block text-sm font-bold text-gold-light">{event.time}</strong>
                      <span className="text-[11px] text-sky-100/70">
                        {event.type === 'reception'
                          ? 'Đón khách: 17:30 • Khai tiệc: 18:30'
                          : 'Đón khách & bắt đầu nghi lễ'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 border-t border-gold/20 pt-2.5">
                    <Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-light" />
                    <span className="font-semibold text-white">{event.date}</span>
                  </div>

                  <div className="flex items-start gap-2.5 border-t border-gold/20 pt-2.5">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-light" />
                    <div>
                      <strong className="text-white block">{event.locationName}</strong>
                      <p className="mt-0.5 leading-relaxed text-sky-100/75">{event.address}</p>
                    </div>
                  </div>
                </div>

                {event.notes && (
                  <p className="mb-4 border-l-2 border-gold/50 pl-2.5 font-serif text-[11px] italic text-sky-100/80">
                    “{event.notes}”
                  </p>
                )}

                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto journey-button journey-button--gold min-h-[44px] w-full px-3 py-2 text-xs font-semibold"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Xem chỉ đường</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </JourneyDetailModal>
    </section>
  )
}

export default EventDetailsSection
