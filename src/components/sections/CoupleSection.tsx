import React, { useState } from 'react'
import { Heart, Sparkles } from 'lucide-react'
import { CoupleInfo } from '../../types/wedding.ts'
import { weddingCouple } from '../../data/weddingData.ts'
import { JourneyDetailModal } from '../ui/JourneyDetailModal.tsx'
import { JourneyTriggerButton } from '../ui/JourneyTriggerButton.tsx'

interface CoupleSectionProps {
  couple?: CoupleInfo
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ couple = weddingCouple }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section
      id="couple"
      data-journey-chapter="couple"
      aria-label="Cô dâu và Chú rể"
      className="journey-chapter relative min-h-[100svh] flex flex-col justify-end pb-12 sm:pb-16 overflow-hidden"
    >
      {/* Screen Reader Semantic Data */}
      <div className="sr-only">
        <h2>Chân dung đôi lứa</h2>
        <p>Chú rể: {couple.groom.fullName} ({couple.groom.parents})</p>
        <p>Cô dâu: {couple.bride.fullName} ({couple.bride.parents})</p>
      </div>

      {/* Floating Trigger Button: 3D scene remains 100% pure like a video */}
      <div className="relative z-20 flex justify-center px-4">
        <JourneyTriggerButton
          label="Thông tin Chú Rể & Cô Dâu"
          icon={<Heart className="h-4 w-4 text-gold-light fill-gold-light/40" />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Detail Modal displayed only upon click */}
      <JourneyDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Chân Dung Đôi Lứa"
        subtitle="Hai tâm hồn · Một hành trình"
        icon={<Sparkles className="h-5 w-5 text-gold-light" />}
        maxWidth="4xl"
      >
        <div className="space-y-7">
          {/* Couple Quote */}
          <div className="text-center">
            <p className="font-serif text-base italic text-sky-100 sm:text-lg">
              “{couple.quote}”
            </p>
            <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          {/* Groom & Bride 2-Column Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Groom */}
            <div className="flex flex-col items-center rounded-2xl border border-gold/45 bg-[#12283e]/85 p-6 text-center shadow-xl">
              <div className="h-48 w-36 overflow-hidden rounded-xl border-2 border-gold/60 shadow-lg mb-4 bg-[#1a3858]">
                <img
                  src={couple.groom.image}
                  alt={couple.groom.fullName}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-serif text-xs italic tracking-wider text-gold-light uppercase">
                {couple.groom.title}
              </span>
              <h3 className="mt-1 font-serif text-2xl font-bold text-white">
                {couple.groom.fullName}
              </h3>
              <div className="my-3 h-px w-14 bg-gold/50" />
              <p className="text-xs text-sky-100/80 leading-relaxed">
                <span className="font-semibold text-gold-light">Thân phụ & Mẫu thân:</span><br />
                {couple.groom.parents}
              </p>
              <p className="mt-3 font-serif text-xs italic text-sky-100/90 leading-relaxed">
                “{couple.groom.bio}”
              </p>
            </div>

            {/* Bride */}
            <div className="flex flex-col items-center rounded-2xl border border-gold/45 bg-[#12283e]/85 p-6 text-center shadow-xl">
              <div className="h-48 w-36 overflow-hidden rounded-xl border-2 border-gold/60 shadow-lg mb-4 bg-[#1a3858]">
                <img
                  src={couple.bride.image}
                  alt={couple.bride.fullName}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-serif text-xs italic tracking-wider text-gold-light uppercase">
                {couple.bride.title}
              </span>
              <h3 className="mt-1 font-serif text-2xl font-bold text-white">
                {couple.bride.fullName}
              </h3>
              <div className="my-3 h-px w-14 bg-gold/50" />
              <p className="text-xs text-sky-100/80 leading-relaxed">
                <span className="font-semibold text-gold-light">Thân phụ & Mẫu thân:</span><br />
                {couple.bride.parents}
              </p>
              <p className="mt-3 font-serif text-xs italic text-sky-100/90 leading-relaxed">
                “{couple.bride.bio}”
              </p>
            </div>
          </div>
        </div>
      </JourneyDetailModal>
    </section>
  )
}

export default CoupleSection
