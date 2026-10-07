import React, { useState, useMemo } from 'react'
import { ZoomIn, Sparkles, Image as ImageIcon } from 'lucide-react'
import { GalleryPhoto, GalleryCategory } from '../../types/wedding.ts'
import { initialGalleryPhotos } from '../../data/weddingData.ts'
import { useWeddingData } from '../../store/WeddingContext.tsx'
import { GalleryLightboxModal } from '../ui/GalleryLightboxModal.tsx'
import { JourneyDetailModal } from '../ui/JourneyDetailModal.tsx'
import { JourneyTriggerButton } from '../ui/JourneyTriggerButton.tsx'

interface GallerySectionProps {
  photos?: GalleryPhoto[]
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  photos = initialGalleryPhotos,
}) => {
  const { state } = useWeddingData()
  const couple = state.couple
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  const categories: { key: GalleryCategory; label: string }[] = [
    { key: 'all', label: 'Tất Cả' },
    { key: 'ceremony', label: 'Nghi Lễ' },
    { key: 'outdoor', label: 'Ngoại Cảnh' },
    { key: 'moments', label: 'Khoảnh Khắc' },
  ]

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return photos
    return photos.filter((p) => p.category === activeCategory)
  }, [photos, activeCategory])

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index)
    setLightboxOpen(true)
  }

  return (
    <section
      id="gallery"
      data-journey-chapter="gallery"
      aria-label="Album ảnh cưới"
      className="journey-chapter relative min-h-[100svh] flex flex-col justify-end pb-12 sm:pb-16 overflow-hidden"
    >
      {/* Screen Reader Semantic Data */}
      <div className="sr-only">
        <h2>Phòng triển lãm ký ức</h2>
        <p>Gồm {photos.length} hình ảnh kỷ niệm của {couple.groom.shortName} và {couple.bride.shortName}.</p>
      </div>

      {/* Floating Trigger Button: 3D gallery corridor remains 100% visible */}
      <div className="relative z-20 flex justify-center px-4">
        <JourneyTriggerButton
          label="Mở Album Ảnh Cưới Đầy Đủ"
          icon={<ImageIcon className="h-4 w-4 text-gold-light" />}
          badge={`${photos.length} ảnh`}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Gallery Modal displayed only upon click */}
      <JourneyDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Phòng Triển Lãm Ký Ức"
        subtitle="Những khung hình còn mãi"
        icon={<Sparkles className="h-5 w-5 text-gold-light" />}
        maxWidth="5xl"
      >
        <div className="space-y-6">
          <p className="text-center font-serif text-sm italic text-sky-100/80">
            Từng ánh mắt, nụ cười và dấu mốc yêu thương được trưng bày như những tác phẩm nghệ thuật.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key
              const count = cat.key === 'all'
                ? photos.length
                : photos.filter((p) => p.category === cat.key).length

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`min-h-[40px] px-4 py-1.5 rounded-full text-xs font-serif font-medium tracking-wide transition-all duration-200 flex items-center gap-2 cursor-pointer border ${
                    isActive
                      ? 'bg-gold text-charcoal font-bold border-gold shadow-md'
                      : 'bg-[#12283e]/80 text-sky-100 hover:bg-[#1a3858] border-gold/40'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-charcoal text-gold-light' : 'bg-gold/20 text-gold-light'
                  }`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {filteredPhotos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => openLightbox(index)}
                aria-label={`Mở ảnh ${photo.title}`}
                className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-gold/45 bg-[#152e48] shadow-md transition-all duration-300 hover:border-gold hover:scale-[1.03] cursor-zoom-in text-left"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-2.5">
                  <p className="text-[11px] font-serif font-semibold text-gold-light truncate">
                    {photo.title}
                  </p>
                  {photo.caption && (
                    <p className="text-[10px] text-sky-100/75 truncate italic">
                      {photo.caption}
                    </p>
                  )}
                </div>

                <div className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-gold-light opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="h-3.5 w-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </JourneyDetailModal>

      {/* Lightbox Modal */}
      <GalleryLightboxModal
        photos={filteredPhotos}
        currentIndex={activePhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setActivePhotoIndex(newIdx)}
      />
    </section>
  )
}

export default GallerySection
