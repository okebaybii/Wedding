import React, { useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { GalleryPhoto } from '../../types/wedding.ts'

interface GalleryLightboxModalProps {
  photos: GalleryPhoto[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (newIndex: number) => void
}

export const GalleryLightboxModal: React.FC<GalleryLightboxModalProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const currentPhoto = photos[currentIndex]

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + photos.length) % photos.length)
  }, [currentIndex, photos.length, onNavigate])

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % photos.length)
  }, [currentIndex, photos.length, onNavigate])

  // Keyboard controls: ArrowLeft, ArrowRight, Escape
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, handlePrev, handleNext])

  if (!isOpen || !currentPhoto) return null

  const getCategoryLabel = (cat: GalleryPhoto['category']) => {
    switch (cat) {
      case 'ceremony':
        return 'Nghi Lễ Cưới'
      case 'outdoor':
        return 'Ảnh Ngoại Cảnh'
      case 'moments':
        return 'Khoảnh Khắc Đẹp'
      default:
        return 'Album Cưới'
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh cưới phóng to"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200 select-none"
    >
      {/* Top Bar: Counter & Close button */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 z-30 flex items-center justify-between text-paper-light">
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-gold/40 text-xs font-serif text-gold-light">
            <span>{getCategoryLabel(currentPhoto.category)}</span>
          </div>
          <span className="text-xs sm:text-sm text-paper-light/70 font-sans">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng xem ảnh"
          className="min-h-12 min-w-12 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-paper-light border border-gold/40 flex items-center justify-center transition-all cursor-pointer active:scale-95"
        >
          <X className="w-5 h-5 text-gold-light" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative max-w-5xl max-h-[80vh] sm:max-h-[85vh] w-full flex flex-col items-center justify-center">
        <img
          src={currentPhoto.url}
          alt={currentPhoto.title}
          className="max-h-[72vh] sm:max-h-[78vh] max-w-full object-contain rounded-2xl shadow-2xl border border-gold/40 animate-in zoom-in-95 duration-300"
        />

        {/* Caption Card */}
        <div className="mt-4 text-center max-w-xl px-4">
          <h4 className="font-serif text-lg sm:text-xl text-paper-light font-semibold tracking-wide drop-shadow-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>{currentPhoto.title}</span>
            <Sparkles className="w-4 h-4 text-gold" />
          </h4>
          {currentPhoto.caption && (
            <p className="font-sans text-xs sm:text-sm text-paper-light/80 mt-1 italic font-light">
              "{currentPhoto.caption}"
            </p>
          )}
        </div>
      </div>

      {/* Navigation Arrow Left */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Ảnh trước"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 min-h-12 min-w-12 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/25 text-paper-light border border-gold/50 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
      >
        <ChevronLeft className="w-6 h-6 text-gold-light" />
      </button>

      {/* Navigation Arrow Right */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="Ảnh kế tiếp"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 min-h-12 min-w-12 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/25 text-paper-light border border-gold/50 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
      >
        <ChevronRight className="w-6 h-6 text-gold-light" />
      </button>
    </div>
  )
}

export default GalleryLightboxModal
