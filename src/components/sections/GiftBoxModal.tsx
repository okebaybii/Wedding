import React, { useState, useEffect } from 'react'
import { X, Copy, Check, Gift, Heart, Sparkles, Building2, User, CreditCard } from 'lucide-react'
import { triggerWeddingConfetti } from '../../utils/confetti.ts'
import { useWeddingData } from '../../store/WeddingContext.tsx'

interface GiftBoxModalProps {
  isOpen: boolean
  onClose: () => void
}

type RecipientTab = 'groom' | 'bride'

export const GiftBoxModal: React.FC<GiftBoxModalProps> = ({ isOpen, onClose }) => {
  const { state } = useWeddingData()
  const { bankAccounts, couple } = state
  const [activeTab, setActiveTab] = useState<RecipientTab>('groom')
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const currentAccount = bankAccounts[activeTab]

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }

      setCopiedField(fieldName)
      triggerWeddingConfetti()
      setTimeout(() => setCopiedField(null), 3000)
    } catch {
      setCopiedField(null)
    }
  }

  const defaultTransferMemo = `Mung cuoi ${activeTab === 'groom' ? (couple?.groom?.shortName || 'Minh Quan') : (couple?.bride?.shortName || 'Thao My')}`

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="giftbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-lg bg-paper-light border-2 border-gold/50 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Top Gold Ribbon Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark rounded-t-3xl" />

        {/* Close Button (Min 48px touch target) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng hộp quà"
          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-paper hover:bg-gold/20 text-charcoal flex items-center justify-center border border-gold/30 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 pt-2">
          <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold text-gold-dark flex items-center justify-center mx-auto mb-3">
            <Gift className="w-7 h-7" aria-hidden="true" />
          </div>
          <h2 id="giftbox-title" className="font-serif text-2xl sm:text-3xl text-charcoal font-bold tracking-tight">
            Hộp Mừng Cưới
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-1 max-w-xs mx-auto">
            Gửi gắm món quà chúc phúc và lời chúc yêu thương tới tân lang tân nương
          </p>
        </div>

        {/* Tab Switcher (Chú Rể / Cô Dâu) */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-paper rounded-2xl border border-gold/30 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('groom')}
            className={`min-h-[48px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'groom'
                ? 'bg-emerald text-paper-light shadow-sm'
                : 'text-charcoal hover:text-emerald'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-light" />
            <span>Mừng Chú Rể ({couple?.groom?.shortName || 'Quân'})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bride')}
            className={`min-h-[48px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'bride'
                ? 'bg-burgundy text-paper-light shadow-sm'
                : 'text-charcoal hover:text-burgundy'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-champagne" />
            <span>Mừng Cô Dâu ({couple?.bride?.shortName || 'My'})</span>
          </button>
        </div>

        {/* Bank & VietQR Card */}
        <div className="bg-paper p-5 sm:p-6 rounded-2xl border border-gold/30 mb-6">
          {/* VietQR Image */}
          <div className="flex flex-col items-center mb-5">
            <div className="w-48 h-48 sm:w-52 sm:h-52 bg-white p-2.5 rounded-2xl border-2 border-gold/40 shadow-sm flex items-center justify-center overflow-hidden">
              {currentAccount.qrUrl ? (
                <img
                  src={currentAccount.qrUrl}
                  alt={`Mã QR mừng cưới ${currentAccount.accountHolder}`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              ) : (
                <div className="text-center text-xs text-charcoal-muted">
                  <CreditCard className="w-8 h-8 mx-auto text-gold-dark mb-1" />
                  Mã QR chuyển khoản
                </div>
              )}
            </div>
            <span className="text-[11px] text-charcoal-muted mt-2 font-medium">
              Quét mã bằng ứng dụng ngân hàng bất kỳ
            </span>
          </div>

          {/* Account Details with One-Click Copy */}
          <div className="space-y-3 text-left">
            {/* Bank Name */}
            <div className="flex items-center justify-between text-xs sm:text-sm pb-2 border-b border-gold/20">
              <span className="text-charcoal-muted flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-gold-dark" />
                Ngân hàng:
              </span>
              <span className="font-semibold text-charcoal">{currentAccount.bankName}</span>
            </div>

            {/* Account Holder */}
            <div className="flex items-center justify-between text-xs sm:text-sm pb-2 border-b border-gold/20">
              <span className="text-charcoal-muted flex items-center gap-1.5">
                <User className="w-4 h-4 text-gold-dark" />
                Chủ tài khoản:
              </span>
              <span className="font-bold text-charcoal uppercase">{currentAccount.accountHolder}</span>
            </div>

            {/* Account Number with Copy Button */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="min-w-0">
                <span className="text-xs text-charcoal-muted block">Số tài khoản:</span>
                <span className="font-mono text-base sm:text-lg font-bold text-burgundy tracking-wider block">
                  {currentAccount.accountNumber}
                </span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(currentAccount.accountNumber, 'accountNumber')}
                className="min-h-[48px] px-3.5 py-2 rounded-xl bg-gold/15 hover:bg-gold/30 border border-gold/40 text-charcoal text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedField === 'accountNumber' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald" />
                    <span className="text-emerald">Đã chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gold-dark" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>

            {/* Transfer Memo with Copy Button */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-gold/20">
              <div className="min-w-0">
                <span className="text-xs text-charcoal-muted block">Nội dung chuyển khoản:</span>
                <span className="text-xs font-medium text-charcoal block truncate max-w-[200px]">
                  {defaultTransferMemo}
                </span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(defaultTransferMemo, 'memo')}
                className="min-h-12 px-3 py-1.5 rounded-lg bg-paper-light hover:bg-paper-dark border border-gold/30 text-charcoal text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedField === 'memo' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald" />
                    <span className="text-emerald">Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-charcoal-muted" />
                    <span>Chép lời nhắn</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Thank You Note */}
        <div className="text-center text-xs sm:text-sm text-charcoal-muted italic px-2">
          “Sự hiện diện và lời chúc phúc của quý khách là món quà quý giá và ý nghĩa nhất đối với chúng mình.”
        </div>
      </div>
    </div>
  )
}
