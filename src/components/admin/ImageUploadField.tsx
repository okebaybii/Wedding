import React, { useState, useRef } from 'react'
import { Trash2, CheckCircle2, Image as ImageIcon } from 'lucide-react'
import { compressImageFile } from '../../store/WeddingContext.tsx'

interface ImageUploadFieldProps {
  label: string
  value: string
  onChange: (url: string) => void
  helperText?: string
  aspectRatioClass?: string
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  helperText,
  aspectRatioClass = 'aspect-[4/3]',
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'url'>('upload')
  const [urlInput, setUrlInput] = useState(value)
  const [isCompressing, setIsCompressing] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsCompressing(true)
      setStatusMessage('Đang nén & xử lý ảnh...')
      const compressedBase64 = await compressImageFile(file, 1200, 0.82)
      onChange(compressedBase64)
      setStatusMessage('Đã tải lên và nén thành công!')
      setTimeout(() => setStatusMessage(null), 3000)
    } catch (err) {
      console.error('Lỗi tải ảnh:', err)
      setStatusMessage('Lỗi nén ảnh, vui lòng thử lại!')
    } finally {
      setIsCompressing(false)
    }
  }

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim())
      setStatusMessage('Đã cập nhật liên kết ảnh!')
      setTimeout(() => setStatusMessage(null), 3000)
    }
  }

  const handleClear = () => {
    onChange('')
    setUrlInput('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-paper border border-gold/30 rounded-lg p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setActiveMode('upload')}
            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
              activeMode === 'upload' ? 'bg-gold text-charcoal font-bold' : 'text-charcoal-muted'
            }`}
          >
            Tải tệp từ máy
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('url')}
            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
              activeMode === 'url' ? 'bg-gold text-charcoal font-bold' : 'text-charcoal-muted'
            }`}
          >
            Nhập link URL
          </button>
        </div>
      </div>

      {/* Input controls based on mode */}
      {activeMode === 'upload' ? (
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            disabled={isCompressing}
            className="block w-full text-xs text-charcoal file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-paper file:text-charcoal hover:file:bg-gold/20 file:cursor-pointer border border-gold/40 rounded-xl bg-paper-light p-1.5 focus:outline-none"
          />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="flex-1 text-xs border border-gold/40 rounded-xl bg-paper-light px-3 py-2 text-charcoal focus:outline-none focus:border-gold"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-3 py-2 bg-emerald text-paper-light rounded-xl text-xs font-semibold hover:bg-emerald-light transition-colors cursor-pointer shrink-0"
          >
            Áp dụng
          </button>
        </div>
      )}

      {/* Status notice */}
      {statusMessage && (
        <p className="text-[11px] text-emerald font-medium flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          <span>{statusMessage}</span>
        </p>
      )}

      {/* Image Preview Area */}
      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-gold/40 bg-paper max-w-sm mt-2 shadow-sm">
          <div className={`w-full ${aspectRatioClass} overflow-hidden bg-black/5`}>
            <img src={value} alt="Xem trước ảnh" className="w-full h-full object-cover object-center" />
          </div>
          <div className="absolute top-2 right-2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleClear}
              title="Xóa ảnh này"
              className="p-1.5 rounded-full bg-black/60 hover:bg-burgundy text-paper-light backdrop-blur-xs transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`w-full max-w-sm ${aspectRatioClass} rounded-xl border-2 border-dashed border-gold/40 bg-paper/50 flex flex-col items-center justify-center text-charcoal-muted p-4 text-center`}
        >
          <ImageIcon className="w-6 h-6 text-gold-dark mb-1 opacity-60" />
          <span className="text-[11px]">Chưa có hình ảnh nào được chọn</span>
        </div>
      )}

      {helperText && <p className="text-[11px] text-charcoal-muted font-light">{helperText}</p>}
    </div>
  )
}

export default ImageUploadField
