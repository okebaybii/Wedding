import React, { useState, useRef } from 'react'
import {
  Users,
  Image as ImageIcon,
  Calendar,
  Heart,
  MessageSquare,
  CreditCard,
  Sliders,
  Save,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  X,
  Search,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { useWeddingData } from '../../store/WeddingContext.tsx'
import { ImageUploadField } from './ImageUploadField.tsx'

interface AdminDashboardProps {
  isOpen: boolean
  onClose: () => void
}

type AdminTab = 'couple' | 'banners' | 'gallery' | 'events' | 'rsvps' | 'wishes' | 'banking'

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const {
    state,
    updateCouple,
    updateHeroBanners,
    updateJointImage,
    addGalleryPhoto,
    deleteGalleryPhoto,
    updateEvent,
    deleteRsvp,
    deleteWish,
    updateBankAccounts,
    resetToDefaults,
    exportDataAsJson,
    importDataFromJson,
    exportRsvpsToCsv,
  } = useWeddingData()

  const [activeTab, setActiveTab] = useState<AdminTab>('couple')
  const [saveToast, setSaveToast] = useState(false)
  const [rsvpSearch, setRsvpSearch] = useState('')
  const [rsvpFilterSide, setRsvpFilterSide] = useState<'all' | 'groom' | 'bride' | 'mutual'>('all')

  // New photo form state
  const [newPhotoTitle, setNewPhotoTitle] = useState('')
  const [newPhotoUrl, setNewPhotoUrl] = useState('')
  const [newPhotoCategory, setNewPhotoCategory] = useState<'ceremony' | 'outdoor' | 'moments'>('ceremony')
  const [newPhotoAspect, setNewPhotoAspect] = useState<'tall' | 'wide' | 'square'>('tall')
  const [newPhotoCaption, setNewPhotoCaption] = useState('')

  // New hero banner state
  const [newBannerUrl, setNewBannerUrl] = useState('')

  const jsonInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleSave = () => {
    setSaveToast(true)
    setTimeout(() => setSaveToast(false), 3000)
  }

  const handleResetDefaults = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục toàn bộ dữ liệu mẫu ban đầu? Những chỉnh sửa chưa lưu sẽ bị xóa.')) {
      resetToDefaults()
      alert('Đã khôi phục dữ liệu mẫu gốc thành công!')
    }
  }

  const handleExportJson = () => {
    const jsonStr = exportDataAsJson()
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sao_luu_thiep_cuoi_${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      if (importDataFromJson(content)) {
        alert('Khôi phục dữ liệu từ file JSON thành công!')
      } else {
        alert('File JSON không hợp lệ!')
      }
    }
    reader.readAsText(file)
  }

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPhotoUrl.trim() || !newPhotoTitle.trim()) {
      alert('Vui lòng chọn hình ảnh và nhập tiêu đề ảnh!')
      return
    }

    addGalleryPhoto({
      title: newPhotoTitle.trim(),
      url: newPhotoUrl.trim(),
      category: newPhotoCategory,
      aspectRatio: newPhotoAspect,
      caption: newPhotoCaption.trim() || undefined,
    })

    // Reset form
    setNewPhotoTitle('')
    setNewPhotoUrl('')
    setNewPhotoCaption('')
    alert('Đã thêm ảnh vào Album thành công!')
  }

  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBannerUrl.trim()) return

    updateHeroBanners([...state.couple.heroBanners, newBannerUrl.trim()])
    setNewBannerUrl('')
    alert('Đã thêm ảnh vào danh sách banner thành công!')
  }

  const handleDeleteBanner = (indexToDelete: number) => {
    if (state.couple.heroBanners.length <= 1) {
      alert('Phải giữ lại ít nhất 1 banner ảnh cưới!')
      return
    }
    const updated = state.couple.heroBanners.filter((_, idx) => idx !== indexToDelete)
    updateHeroBanners(updated)
  }

  // RSVP Stats
  const totalRsvps = state.rsvps.length
  const totalAttending = state.rsvps.filter((r) => r.attendance === 'yes').length
  const totalGuests = state.rsvps
    .filter((r) => r.attendance === 'yes')
    .reduce((acc, curr) => acc + (curr.guestCount || 1), 0)

  const filteredRsvps = state.rsvps.filter((r) => {
    const matchSearch =
      r.fullName.toLowerCase().includes(rsvpSearch.toLowerCase()) ||
      r.phone.includes(rsvpSearch) ||
      (r.dietaryNotes && r.dietaryNotes.toLowerCase().includes(rsvpSearch.toLowerCase()))
    const matchSide = rsvpFilterSide === 'all' || r.side === rsvpFilterSide
    return matchSearch && matchSide
  })

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Bảng quản trị thiệp cưới"
      className="fixed inset-0 z-50 flex flex-col bg-paper text-charcoal select-none overflow-hidden"
    >
      {/* Top Navbar */}
      <header className="w-full bg-paper-light border-b border-gold/40 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-burgundy flex items-center justify-center border border-gold">
            <Sliders className="w-4 h-4 text-paper-light" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-base sm:text-lg text-charcoal">
              Bảng Quản Trị Thiệp Cưới
            </h2>
            <p className="text-[11px] text-charcoal-muted">
              Cấu hình hình ảnh, nội dung hôn lễ & danh sách khách mời
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-emerald hover:bg-emerald-light text-paper-light text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Lưu thay đổi</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-paper hover:bg-paper-dark border border-gold/40 text-charcoal text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <X className="w-4 h-4 text-burgundy" />
            <span>Đóng / Xem web</span>
          </button>
        </div>
      </header>

      {/* Main Body: Tabs Sidebar + Content Panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Tabs Sidebar */}
        <aside className="w-56 sm:w-64 bg-paper-light/60 border-r border-gold/30 p-3 sm:p-4 flex flex-col justify-between shrink-0 overflow-y-auto">
          <nav className="space-y-1.5">
            {[
              { id: 'couple', label: 'Cô Dâu & Chú Rể', icon: Users },
              { id: 'banners', label: 'Banner Trang Đầu', icon: Sparkles },
              { id: 'gallery', label: 'Album Ảnh Cưới', icon: ImageIcon },
              { id: 'events', label: 'Lịch Trình Sự Kiện', icon: Calendar },
              { id: 'rsvps', label: `Khách Mời RSVP (${state.rsvps.length})`, icon: Heart },
              { id: 'wishes', label: `Sổ Lưu Bút (${state.wishes.length})`, icon: MessageSquare },
              { id: 'banking', label: 'Mừng Cưới & VietQR', icon: CreditCard },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-burgundy text-paper-light shadow-sm font-semibold'
                      : 'text-charcoal hover:bg-paper'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gold-light' : 'text-gold-dark'}`} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Backup & Restore Tools in Sidebar Bottom */}
          <div className="pt-4 border-t border-gold/20 space-y-2">
            <span className="text-[10px] font-semibold text-charcoal-muted uppercase tracking-wider block px-1">
              Sao lưu & Khôi phục
            </span>

            <button
              type="button"
              onClick={handleExportJson}
              className="w-full px-3 py-2 rounded-lg bg-paper border border-gold/30 text-charcoal text-[11px] font-medium flex items-center justify-between hover:bg-gold/15 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Download className="w-3 h-3 text-gold-dark" />
                Xuất file sao lưu (JSON)
              </span>
            </button>

            <label className="w-full px-3 py-2 rounded-lg bg-paper border border-gold/30 text-charcoal text-[11px] font-medium flex items-center justify-between hover:bg-gold/15 transition-colors cursor-pointer block">
              <span className="flex items-center gap-1.5">
                <Upload className="w-3 h-3 text-gold-dark" />
                Nhập file khôi phục
              </span>
              <input
                type="file"
                ref={jsonInputRef}
                accept=".json"
                onChange={handleImportJsonFile}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={handleResetDefaults}
              className="w-full px-3 py-2 rounded-lg bg-paper text-burgundy border border-burgundy/20 text-[11px] font-medium flex items-center justify-between hover:bg-burgundy/10 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <RotateCcw className="w-3 h-3" />
                Khôi phục gốc ban đầu
              </span>
            </button>
          </div>
        </aside>

        {/* Right Content Panel */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto bg-paper">
          {/* TAB 1: CÔ DÂU & CHÚ RỂ */}
          {activeTab === 'couple' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                  Thông Tin Cô Dâu & Chú Rể
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Cập nhật họ tên, ảnh chân dung, ảnh cưới chụp chung và câu chuyện tình yêu
                </p>
              </div>

              {/* Master Joint Portrait Image */}
              <div className="bg-paper-light p-6 rounded-2xl border border-gold/40 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <h4 className="font-serif font-bold text-base text-burgundy">
                    Ảnh Cưới Chụp Chung (Giữa Hai Người)
                  </h4>
                </div>
                <ImageUploadField
                  label="Ảnh Cặp Đôi (Joint Portrait Image)"
                  value={state.couple.jointImage}
                  onChange={updateJointImage}
                  helperText="Ảnh cưới chụp chung nghệ thuật hiển thị ở vị trí trung tâm trang trọng giữa Chú rể & Cô dâu."
                  aspectRatioClass="aspect-[4/5]"
                />
              </div>

              {/* Groom & Bride Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Groom Info */}
                <div className="bg-paper-light p-5 sm:p-6 rounded-2xl border border-gold/30 space-y-4">
                  <h4 className="font-serif font-bold text-base text-emerald">Thông Tin Chú Rể</h4>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Họ và tên đầy đủ:
                    </label>
                    <input
                      type="text"
                      value={state.couple.groom.fullName}
                      onChange={(e) =>
                        updateCouple({
                          groom: { ...state.couple.groom, fullName: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Tên thường gọi / xưng hô:
                    </label>
                    <input
                      type="text"
                      value={state.couple.groom.shortName}
                      onChange={(e) =>
                        updateCouple({
                          groom: { ...state.couple.groom, shortName: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Thân phụ & Mẫu thân:
                    </label>
                    <input
                      type="text"
                      value={state.couple.groom.parents}
                      onChange={(e) =>
                        updateCouple({
                          groom: { ...state.couple.groom, parents: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Đôi dòng giới thiệu:
                    </label>
                    <textarea
                      rows={3}
                      value={state.couple.groom.bio}
                      onChange={(e) =>
                        updateCouple({
                          groom: { ...state.couple.groom, bio: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                    />
                  </div>
                  <ImageUploadField
                    label="Ảnh chân dung Chú Rể"
                    value={state.couple.groom.image}
                    onChange={(url) =>
                      updateCouple({
                        groom: { ...state.couple.groom, image: url },
                      })
                    }
                    aspectRatioClass="aspect-[3/4]"
                  />
                </div>

                {/* Bride Info */}
                <div className="bg-paper-light p-5 sm:p-6 rounded-2xl border border-gold/30 space-y-4">
                  <h4 className="font-serif font-bold text-base text-burgundy">Thông Tin Cô Dâu</h4>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Họ và tên đầy đủ:
                    </label>
                    <input
                      type="text"
                      value={state.couple.bride.fullName}
                      onChange={(e) =>
                        updateCouple({
                          bride: { ...state.couple.bride, fullName: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Tên thường gọi / xưng hô:
                    </label>
                    <input
                      type="text"
                      value={state.couple.bride.shortName}
                      onChange={(e) =>
                        updateCouple({
                          bride: { ...state.couple.bride, shortName: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Thân phụ & Mẫu thân:
                    </label>
                    <input
                      type="text"
                      value={state.couple.bride.parents}
                      onChange={(e) =>
                        updateCouple({
                          bride: { ...state.couple.bride, parents: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Đôi dòng giới thiệu:
                    </label>
                    <textarea
                      rows={3}
                      value={state.couple.bride.bio}
                      onChange={(e) =>
                        updateCouple({
                          bride: { ...state.couple.bride, bio: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                    />
                  </div>
                  <ImageUploadField
                    label="Ảnh chân dung Cô Dâu"
                    value={state.couple.bride.image}
                    onChange={(url) =>
                      updateCouple({
                        bride: { ...state.couple.bride, image: url },
                      })
                    }
                    aspectRatioClass="aspect-[3/4]"
                  />
                </div>
              </div>

              {/* General Settings: Monogram, Date, Quote */}
              <div className="bg-paper-light p-6 rounded-2xl border border-gold/30 space-y-4">
                <h4 className="font-serif font-bold text-base text-charcoal">Cài Đặt Chung</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Chữ lồng Monogram (ví dụ: Q & M):
                    </label>
                    <input
                      type="text"
                      value={state.couple.monogram}
                      onChange={(e) => updateCouple({ monogram: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Ngày giờ hôn lễ (ISO YYYY-MM-DDTHH:mm:ss):
                    </label>
                    <input
                      type="text"
                      value={state.couple.weddingDate}
                      onChange={(e) => updateCouple({ weddingDate: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                    Châm ngôn tình yêu (Quote):
                  </label>
                  <textarea
                    rows={2}
                    value={state.couple.quote}
                    onChange={(e) => updateCouple({ quote: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO BANNER TRANG ĐẦU */}
          {activeTab === 'banners' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                  Quản Lý Banner Ảnh Cưới (Trang Đầu)
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Các bức ảnh này sẽ tự động chuyển động lướt trên đầu trang chủ với hiệu ứng sang trọng
                </p>
              </div>

              {/* Form Add Banner */}
              <form
                onSubmit={handleAddBanner}
                className="bg-paper-light p-6 rounded-2xl border border-gold/40 space-y-4"
              >
                <h4 className="font-serif font-bold text-base text-burgundy flex items-center gap-2">
                  <Plus className="w-4 h-4 text-gold-dark" />
                  <span>Thêm Ảnh Banner Mới</span>
                </h4>
                <ImageUploadField
                  label="Chọn ảnh từ máy tính hoặc nhập link"
                  value={newBannerUrl}
                  onChange={setNewBannerUrl}
                  aspectRatioClass="aspect-[16/9]"
                />
                <button
                  type="submit"
                  disabled={!newBannerUrl.trim()}
                  className="px-5 py-2.5 bg-burgundy text-paper-light rounded-xl text-xs font-semibold hover:bg-burgundy-light transition-all disabled:opacity-50 cursor-pointer"
                >
                  Thêm vào danh sách Banner
                </button>
              </form>

              {/* Current Banners Grid */}
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-base text-charcoal">
                  Danh Sách Banner Hiện Tại ({state.couple.heroBanners.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {state.couple.heroBanners.map((url, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-2xl overflow-hidden border border-gold/40 shadow-sm bg-paper-light group"
                    >
                      <div className="aspect-[16/9] w-full overflow-hidden">
                        <img
                          src={url}
                          alt={`Banner ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-black/60 text-paper-light text-[10px] font-bold">
                        Slide {idx + 1}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteBanner(idx)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-burgundy text-paper-light hover:scale-105 transition-all cursor-pointer shadow-md"
                        title="Xóa banner này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ALBUM ẢNH CƯỚI */}
          {activeTab === 'gallery' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                  Quản Lý Album Ảnh Cưới
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Thêm ảnh vào album, phân loại theo Nghi lễ, Ngoại cảnh, Khoảnh khắc
                </p>
              </div>

              {/* Add Photo Form */}
              <form
                onSubmit={handleAddPhoto}
                className="bg-paper-light p-6 rounded-2xl border border-gold/40 space-y-4"
              >
                <h4 className="font-serif font-bold text-base text-burgundy flex items-center gap-2">
                  <Plus className="w-4 h-4 text-gold-dark" />
                  <span>Thêm Ảnh Vào Album</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Tiêu đề bức ảnh:
                    </label>
                    <input
                      type="text"
                      value={newPhotoTitle}
                      onChange={(e) => setNewPhotoTitle(e.target.value)}
                      placeholder="Ví dụ: Nắm Tay Dạo Bước..."
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Phân loại:
                    </label>
                    <select
                      value={newPhotoCategory}
                      onChange={(e) =>
                        setNewPhotoCategory(e.target.value as 'ceremony' | 'outdoor' | 'moments')
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                    >
                      <option value="ceremony">Nghi Lễ</option>
                      <option value="outdoor">Ngoại Cảnh</option>
                      <option value="moments">Khoảnh Khắc</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Lời bình / Chú thích ảnh (tùy chọn):
                    </label>
                    <input
                      type="text"
                      value={newPhotoCaption}
                      onChange={(e) => setNewPhotoCaption(e.target.value)}
                      placeholder="Lời nhắn ngọt ngào cho bức ảnh..."
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Tỷ lệ hiển thị:
                    </label>
                    <select
                      value={newPhotoAspect}
                      onChange={(e) =>
                        setNewPhotoAspect(e.target.value as 'tall' | 'wide' | 'square')
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                    >
                      <option value="tall">Dọc (Tall - 3:4)</option>
                      <option value="wide">Ngang (Wide - 16:10)</option>
                      <option value="square">Vuông (Square - 1:1)</option>
                    </select>
                  </div>
                </div>

                <ImageUploadField
                  label="Chọn tệp ảnh hoặc nhập liên kết"
                  value={newPhotoUrl}
                  onChange={setNewPhotoUrl}
                  aspectRatioClass="aspect-[4/3]"
                />

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-burgundy hover:bg-burgundy-light text-paper-light rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm"
                >
                  Lưu & Thêm Vào Album Cưới
                </button>
              </form>

              {/* Photos List */}
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-base text-charcoal">
                  Danh Sách Ảnh Trong Album ({state.gallery.length})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {state.gallery.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative rounded-2xl overflow-hidden border border-gold/30 bg-paper-light shadow-xs group"
                    >
                      <div className="aspect-square w-full overflow-hidden">
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2 text-left">
                        <p className="font-serif text-xs font-bold text-charcoal truncate">
                          {photo.title}
                        </p>
                        <span className="text-[10px] text-gold-dark font-medium capitalize">
                          {photo.category === 'ceremony'
                            ? 'Nghi lễ'
                            : photo.category === 'outdoor'
                            ? 'Ngoại cảnh'
                            : 'Khoảnh khắc'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteGalleryPhoto(photo.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-burgundy text-paper-light hover:scale-105 transition-all cursor-pointer shadow-md"
                        title="Xóa ảnh này khỏi album"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LỊCH TRÌNH SỰ KIỆN */}
          {activeTab === 'events' && (
            <div className="max-w-4xl space-y-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                  Cấu Hình Lịch Trình Sự Kiện
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Cập nhật thời gian, địa điểm, địa chỉ và đường link chỉ đường Google Maps
                </p>
              </div>

              <div className="space-y-6">
                {state.events.map((ev) => (
                  <div
                    key={ev.id}
                    className="bg-paper-light p-5 sm:p-6 rounded-2xl border border-gold/40 shadow-xs space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-gold/20 pb-3">
                      <h4 className="font-serif font-bold text-base text-burgundy">{ev.title}</h4>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold/20 text-gold-dark font-semibold">
                        {ev.type === 'reception' ? 'Tiệc cưới chính' : 'Lễ gia tiên'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                          Thời gian bắt đầu:
                        </label>
                        <input
                          type="text"
                          value={ev.time}
                          onChange={(e) => updateEvent(ev.id, { time: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                          Ngày tháng diễn ra:
                        </label>
                        <input
                          type="text"
                          value={ev.date}
                          onChange={(e) => updateEvent(ev.id, { date: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                          Tên địa điểm / Trung tâm:
                        </label>
                        <input
                          type="text"
                          value={ev.locationName}
                          onChange={(e) => updateEvent(ev.id, { locationName: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                          Địa chỉ cụ thể:
                        </label>
                        <input
                          type="text"
                          value={ev.address}
                          onChange={(e) => updateEvent(ev.id, { address: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                        Liên kết bản đồ Google Maps (URL):
                      </label>
                      <input
                        type="text"
                        value={ev.mapUrl}
                        onChange={(e) => updateEvent(ev.id, { mapUrl: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: KHÁCH MỜI RSVP */}
          {activeTab === 'rsvps' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                    Quản Lý Khách Mời Phản Hồi (RSVP)
                  </h3>
                  <p className="text-xs text-charcoal-muted">
                    Theo dõi danh sách khách đăng ký tham dự và xuất file Excel
                  </p>
                </div>

                {/* Export CSV Button */}
                <button
                  type="button"
                  onClick={exportRsvpsToCsv}
                  className="px-4 py-2.5 rounded-xl bg-emerald hover:bg-emerald-light text-paper-light text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>Xuất File Excel (CSV)</span>
                </button>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-paper-light border border-gold/30 text-center">
                  <span className="text-xs text-charcoal-muted uppercase">Tổng Lượt Phản Hồi</span>
                  <p className="font-serif text-2xl font-bold text-charcoal mt-1">{totalRsvps}</p>
                </div>
                <div className="p-4 rounded-2xl bg-paper-light border border-gold/30 text-center">
                  <span className="text-xs text-charcoal-muted uppercase">Khách Xác Nhận Đến</span>
                  <p className="font-serif text-2xl font-bold text-emerald mt-1">{totalAttending}</p>
                </div>
                <div className="p-4 rounded-2xl bg-paper-light border border-gold/30 text-center">
                  <span className="text-xs text-charcoal-muted uppercase">Tổng Số Người Dự</span>
                  <p className="font-serif text-2xl font-bold text-burgundy mt-1">{totalGuests}</p>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted" />
                  <input
                    type="text"
                    value={rsvpSearch}
                    onChange={(e) => setRsvpSearch(e.target.value)}
                    placeholder="Tìm theo tên khách, số điện thoại, ghi chú ăn uống..."
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-gold/30 bg-paper-light"
                  />
                </div>
                <div className="flex items-center gap-1 bg-paper-light border border-gold/30 rounded-xl p-1 text-xs">
                  {[
                    { id: 'all', label: 'Tất cả' },
                    { id: 'groom', label: 'Nhà Trai' },
                    { id: 'bride', label: 'Nhà Gái' },
                    { id: 'mutual', label: 'Cả Hai' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setRsvpFilterSide(filter.id as any)}
                      className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors ${
                        rsvpFilterSide === filter.id
                          ? 'bg-burgundy text-paper-light font-semibold'
                          : 'text-charcoal hover:bg-paper'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* RSVPs Table */}
              <div className="bg-paper-light rounded-2xl border border-gold/30 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-charcoal">
                    <thead className="bg-paper border-b border-gold/20 text-charcoal-muted uppercase font-semibold text-[11px]">
                      <tr>
                        <th className="py-3 px-4">Họ và tên</th>
                        <th className="py-3 px-3">Điện thoại</th>
                        <th className="py-3 px-3">Khách của</th>
                        <th className="py-3 px-3">Tham dự</th>
                        <th className="py-3 px-3">Số người</th>
                        <th className="py-3 px-4">Ghi chú</th>
                        <th className="py-3 px-3 text-right">Xóa</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gold/15">
                      {filteredRsvps.map((rsvp) => (
                        <tr key={rsvp.id} className="hover:bg-gold/5 transition-colors">
                          <td className="py-3 px-4 font-semibold text-charcoal font-serif">
                            {rsvp.fullName}
                          </td>
                          <td className="py-3 px-3 font-mono">{rsvp.phone}</td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                rsvp.side === 'groom'
                                  ? 'bg-emerald/15 text-emerald'
                                  : rsvp.side === 'bride'
                                  ? 'bg-burgundy/15 text-burgundy'
                                  : 'bg-gold/20 text-gold-dark'
                              }`}
                            >
                              {rsvp.side === 'groom'
                                ? 'Nhà Trai'
                                : rsvp.side === 'bride'
                                ? 'Nhà Gái'
                                : 'Cả Hai'}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            {rsvp.attendance === 'yes' ? (
                              <span className="text-emerald font-semibold">Có tham dự</span>
                            ) : (
                              <span className="text-charcoal-muted">Vắng mặt</span>
                            )}
                          </td>
                          <td className="py-3 px-3 font-semibold">{rsvp.guestCount}</td>
                          <td className="py-3 px-4 italic text-charcoal-muted">
                            {rsvp.dietaryNotes || '-'}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => deleteRsvp(rsvp.id)}
                              className="p-1 rounded text-burgundy hover:bg-burgundy/10 cursor-pointer"
                              title="Xóa phản hồi"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredRsvps.length === 0 && (
                  <div className="py-12 text-center text-charcoal-muted text-xs">
                    Không tìm thấy dữ liệu phản hồi nào phù hợp.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: SỔ LƯU BÚT */}
          {activeTab === 'wishes' && (
            <div className="max-w-4xl space-y-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                  Quản Lý Sổ Lưu Bút & Lời Chúc
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Xem và kiểm duyệt các lời chúc phúc của người thân, bạn bè gửi tới cặp đôi
                </p>
              </div>

              <div className="space-y-4">
                {state.wishes.map((wish) => (
                  <div
                    key={wish.id}
                    className="p-5 rounded-2xl bg-paper-light border border-gold/30 shadow-xs flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-charcoal">
                          {wish.senderName}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-gold/15 text-gold-dark font-medium">
                          {wish.relationship}
                        </span>
                        <span className="text-[10px] text-charcoal-muted">{wish.createdAt}</span>
                      </div>
                      <p className="font-serif italic text-xs sm:text-sm text-charcoal/90 mt-2 leading-relaxed">
                        "{wish.message}"
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteWish(wish.id)}
                      className="p-1.5 rounded-lg text-burgundy hover:bg-burgundy/10 cursor-pointer"
                      title="Xóa lời chúc này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {state.wishes.length === 0 && (
                  <div className="py-12 text-center text-charcoal-muted text-xs bg-paper-light rounded-2xl">
                    Chưa có lời chúc nào trong sổ lưu bút.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: MỪNG CƯỚI & VIETQR */}
          {activeTab === 'banking' && (
            <div className="max-w-4xl space-y-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                  Cấu Hình Tài Khoản Mừng Cưới & VietQR
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Thiết lập số tài khoản ngân hàng và mã VietQR quét tiện lợi cho quan khách
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Groom Bank */}
                <div className="bg-paper-light p-5 sm:p-6 rounded-2xl border border-gold/30 space-y-4">
                  <h4 className="font-serif font-bold text-base text-emerald">
                    Tài Khoản Chú Rể ({state.couple.groom.shortName})
                  </h4>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Tên ngân hàng:
                    </label>
                    <input
                      type="text"
                      value={state.bankAccounts.groom.bankName}
                      onChange={(e) =>
                        updateBankAccounts({
                          groom: { bankName: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Số tài khoản:
                    </label>
                    <input
                      type="text"
                      value={state.bankAccounts.groom.accountNumber}
                      onChange={(e) =>
                        updateBankAccounts({
                          groom: { accountNumber: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Chủ tài khoản (viết hoa không dấu):
                    </label>
                    <input
                      type="text"
                      value={state.bankAccounts.groom.accountHolder}
                      onChange={(e) =>
                        updateBankAccounts({
                          groom: { accountHolder: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper uppercase"
                    />
                  </div>
                  <ImageUploadField
                    label="Mã QR Chuyển Khoản Chú Rể"
                    value={state.bankAccounts.groom.qrUrl || ''}
                    onChange={(url) =>
                      updateBankAccounts({
                        groom: { qrUrl: url },
                      })
                    }
                    aspectRatioClass="aspect-square"
                  />
                </div>

                {/* Bride Bank */}
                <div className="bg-paper-light p-5 sm:p-6 rounded-2xl border border-gold/30 space-y-4">
                  <h4 className="font-serif font-bold text-base text-burgundy">
                    Tài Khoản Cô Dâu ({state.couple.bride.shortName})
                  </h4>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Tên ngân hàng:
                    </label>
                    <input
                      type="text"
                      value={state.bankAccounts.bride.bankName}
                      onChange={(e) =>
                        updateBankAccounts({
                          bride: { bankName: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Số tài khoản:
                    </label>
                    <input
                      type="text"
                      value={state.bankAccounts.bride.accountNumber}
                      onChange={(e) =>
                        updateBankAccounts({
                          bride: { accountNumber: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-muted mb-1">
                      Chủ tài khoản (viết hoa không dấu):
                    </label>
                    <input
                      type="text"
                      value={state.bankAccounts.bride.accountHolder}
                      onChange={(e) =>
                        updateBankAccounts({
                          bride: { accountHolder: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-gold/30 bg-paper uppercase"
                    />
                  </div>
                  <ImageUploadField
                    label="Mã QR Chuyển Khoản Cô Dâu"
                    value={state.bankAccounts.bride.qrUrl || ''}
                    onChange={(url) =>
                      updateBankAccounts({
                        bride: { qrUrl: url },
                      })
                    }
                    aspectRatioClass="aspect-square"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Save Success Toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald text-paper-light text-xs font-semibold shadow-2xl flex items-center gap-2 border border-gold/40 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-gold-light" />
          <span>Đã lưu toàn bộ cấu hình thiệp cưới vào bộ nhớ trình duyệt!</span>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
