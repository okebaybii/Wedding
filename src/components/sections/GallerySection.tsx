import React, { useState, useMemo } from 'react'
import { Image as ImageIcon, ZoomIn, Sparkles, Heart } from 'lucide-react'
import { GalleryPhoto, GalleryCategory } from '../../types/wedding.ts'
import { initialGalleryPhotos } from '../../data/weddingData.ts'
import { ScrollReveal } from '../ui/ScrollReveal.tsx'
import { GalleryLightboxModal } from '../ui/GalleryLightboxModal.tsx'

interface GallerySectionProps {
  photos?: GalleryPhoto[]
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  photos = initialGalleryPhotos,
}) => {
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

  const getAspectClass = (aspect?: GalleryPhoto['aspectRatio']) => {
    switch (aspect) {
      case 'tall':
        return 'aspect-[3/4]'
      case 'wide':
        return 'aspect-[16/10]'
      case 'square':
      default:
        return 'aspect-square'
    }
  }

  return (
    <section
      id="gallery"
      aria-label="Album ảnh cưới"
      className="relative py-20 sm:py-28 px-4 bg-paper-light overflow-hidden"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-burgundy/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper border border-gold/40 text-gold-dark text-xs uppercase tracking-[0.25em] font-medium mb-3 shadow-xs">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Khoảnh Khắc Tình Yêu</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-semibold tracking-tight">
              Album Ảnh Cưới
            </h2>
            <p className="mt-2 text-charcoal-muted text-sm sm:text-base max-w-lg mx-auto font-light">
              Lưu giữ từng ánh mắt nụ cười và dấu mốc tình yêu vĩnh cửu của chúng mình
            </p>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
          </div>
        </ScrollReveal>

        {/* Category Filter Pills */}
        <ScrollReveal direction="up" delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
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
                  className={`min-h-[42px] px-5 py-2 rounded-full text-xs sm:text-sm font-serif font-medium tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                    isActive
                      ? 'bg-burgundy text-paper-light border-gold shadow-md shadow-burgundy/25 scale-105'
                      : 'bg-paper text-charcoal hover:bg-paper-dark/70 border-gold/30 hover:border-gold/60'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-gold text-charcoal font-bold' : 'bg-gold/15 text-gold-dark'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredPhotos.map((photo, index) => (
            <ScrollReveal
              key={photo.id}
              direction="up"
              delay={(index % 4) * 100}
              className="group relative cursor-pointer"
            >
              <div
                onClick={() => openLightbox(index)}
                className={`relative w-full ${getAspectClass(
                  photo.aspectRatio
                )} rounded-2xl overflow-hidden bg-paper border border-gold/30 shadow-md group-hover:shadow-xl group-hover:border-gold transition-all duration-500`}
              >
                {/* Image */}
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Dark Vignette Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-paper-light" />

                {/* Zoom Icon Button Badge on Top Right */}
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-charcoal/60 backdrop-blur-md border border-gold/40 text-paper-light flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  <ZoomIn className="w-4 h-4 text-gold-light" />
                </div>

                {/* Bottom Caption on Hover */}
                <div className="absolute bottom-3 inset-x-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-paper-light">
                  <div className="flex items-center gap-1.5 text-[11px] text-gold-light uppercase tracking-wider font-semibold mb-0.5">
                    <Sparkles className="w-3 h-3 text-gold" />
                    <span>{photo.title}</span>
                  </div>
                  {photo.caption && (
                    <p className="text-[11px] text-paper-light/85 line-clamp-1 italic font-light">
                      {photo.caption}
                    </p>
                  )}
                </div>

                {/* Subtle Inner Gold Foil Border */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/20 pointer-events-none group-hover:ring-gold/60 transition-all" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Empty state if category has no photos */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-16 bg-paper/60 rounded-3xl border border-gold/20">
            <Heart className="w-8 h-8 text-gold-dark mx-auto mb-2 opacity-50" />
            <p className="font-serif text-charcoal text-base">Chưa có ảnh nào trong mục này</p>
            <p className="text-xs text-charcoal-muted mt-1">Vui lòng chọn danh mục khác hoặc tải thêm ảnh từ trang quản trị Admin</p>
          </div>
        )}
      </div>

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
