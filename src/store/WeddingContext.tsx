import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  CoupleInfo,
  WeddingEvent,
  Milestone,
  GalleryPhoto,
  RsvpEntry,
  GuestWish,
  BankAccount,
  WeddingState,
} from '../types/wedding.ts'
import {
  weddingCouple,
  weddingEvents,
  loveMilestones,
  initialGalleryPhotos,
  initialRsvps,
  initialGuestWishes,
  bankAccounts as initialBankAccounts,
} from '../data/weddingData.ts'

const STORAGE_KEY = 'webdding_store_v1'

const defaultState: WeddingState = {
  couple: weddingCouple,
  events: weddingEvents,
  milestones: loveMilestones,
  gallery: initialGalleryPhotos,
  rsvps: initialRsvps,
  wishes: initialGuestWishes,
  bankAccounts: initialBankAccounts,
}

export interface WeddingContextType {
  state: WeddingState
  updateCouple: (data: Partial<CoupleInfo>) => void
  updateHeroBanners: (banners: string[]) => void
  updateJointImage: (imageUrl: string) => void
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void
  updateGalleryPhoto: (id: string, photo: Partial<GalleryPhoto>) => void
  deleteGalleryPhoto: (id: string) => void
  updateEvent: (id: string, event: Partial<WeddingEvent>) => void
  addRsvp: (entry: Omit<RsvpEntry, 'id' | 'submittedAt'>) => void
  deleteRsvp: (id: string) => void
  addWish: (wish: Omit<GuestWish, 'id' | 'createdAt'>) => void
  deleteWish: (id: string) => void
  updateBankAccounts: (accounts: { groom?: Partial<BankAccount>; bride?: Partial<BankAccount> }) => void
  resetToDefaults: () => void
  exportDataAsJson: () => string
  importDataFromJson: (jsonStr: string) => boolean
  exportRsvpsToCsv: () => void
  compressImageFile: (file: File, maxDimension?: number, quality?: number) => Promise<string>
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined)

/**
 * Client-side Canvas Image Compression
 * Scales image down to maxDimension (e.g. 1200px) and converts to JPEG Base64
 * to preserve localStorage storage budget while keeping high display clarity.
 */
export const compressImageFile = (
  file: File,
  maxDimension: number = 1200,
  quality: number = 0.82
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = (e) => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        let width = img.width
        let height = img.height

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width)
            width = maxDimension
          } else {
            width = Math.round((width * maxDimension) / height)
            height = maxDimension
          }
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(e.target?.result as string)
          return
        }

        // Draw image with smooth bicubic scaling
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, width, height)

        const compressedBase64 = canvas.toDataURL('image/jpeg', quality)
        resolve(compressedBase64)
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  })
}

export const WeddingDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<WeddingState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          ...defaultState,
          ...parsed,
          couple: {
            ...defaultState.couple,
            ...(parsed.couple || {}),
            jointImage: parsed.couple?.jointImage || defaultState.couple.jointImage,
            heroBanners:
              parsed.couple?.heroBanners && parsed.couple.heroBanners.length > 0
                ? parsed.couple.heroBanners
                : defaultState.couple.heroBanners,
          },
          gallery:
            parsed.gallery && parsed.gallery.length > 0
              ? parsed.gallery
              : defaultState.gallery,
        }
      }
    } catch (e) {
      console.warn('Could not read wedding state from localStorage:', e)
    }
    return defaultState
  })

  // Auto-sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.warn('Could not save wedding state to localStorage:', e)
    }
  }, [state])

  const updateCouple = (data: Partial<CoupleInfo>) => {
    setState((prev) => ({
      ...prev,
      couple: {
        ...prev.couple,
        ...data,
      },
    }))
  }

  const updateHeroBanners = (banners: string[]) => {
    setState((prev) => ({
      ...prev,
      couple: {
        ...prev.couple,
        heroBanners: banners,
      },
    }))
  }

  const updateJointImage = (imageUrl: string) => {
    setState((prev) => ({
      ...prev,
      couple: {
        ...prev.couple,
        jointImage: imageUrl,
      },
    }))
  }

  const addGalleryPhoto = (photo: Omit<GalleryPhoto, 'id'>) => {
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: `gal-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    }
    setState((prev) => ({
      ...prev,
      gallery: [newPhoto, ...prev.gallery],
    }))
  }

  const updateGalleryPhoto = (id: string, photo: Partial<GalleryPhoto>) => {
    setState((prev) => ({
      ...prev,
      gallery: prev.gallery.map((p) => (p.id === id ? { ...p, ...photo } : p)),
    }))
  }

  const deleteGalleryPhoto = (id: string) => {
    setState((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((p) => p.id !== id),
    }))
  }

  const updateEvent = (id: string, event: Partial<WeddingEvent>) => {
    setState((prev) => ({
      ...prev,
      events: prev.events.map((ev) => (ev.id === id ? { ...ev, ...event } : ev)),
    }))
  }

  const addRsvp = (entry: Omit<RsvpEntry, 'id' | 'submittedAt'>) => {
    const now = new Date()
    const submittedAt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`

    const newEntry: RsvpEntry = {
      ...entry,
      id: `rsvp-${Date.now()}`,
      submittedAt,
    }

    setState((prev) => ({
      ...prev,
      rsvps: [newEntry, ...prev.rsvps],
    }))
  }

  const deleteRsvp = (id: string) => {
    setState((prev) => ({
      ...prev,
      rsvps: prev.rsvps.filter((r) => r.id !== id),
    }))
  }

  const addWish = (wish: Omit<GuestWish, 'id' | 'createdAt'>) => {
    const newWish: GuestWish = {
      ...wish,
      id: `w-${Date.now()}`,
      createdAt: 'Vừa xong',
    }

    setState((prev) => ({
      ...prev,
      wishes: [newWish, ...prev.wishes],
    }))
  }

  const deleteWish = (id: string) => {
    setState((prev) => ({
      ...prev,
      wishes: prev.wishes.filter((w) => w.id !== id),
    }))
  }

  const updateBankAccounts = (accounts: {
    groom?: Partial<BankAccount>
    bride?: Partial<BankAccount>
  }) => {
    setState((prev) => ({
      ...prev,
      bankAccounts: {
        groom: {
          ...prev.bankAccounts.groom,
          ...(accounts.groom || {}),
        },
        bride: {
          ...prev.bankAccounts.bride,
          ...(accounts.bride || {}),
        },
      },
    }))
  }

  const resetToDefaults = () => {
    setState(defaultState)
    localStorage.removeItem(STORAGE_KEY)
  }

  const exportDataAsJson = (): string => {
    return JSON.stringify(state, null, 2)
  }

  const importDataFromJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr)
      if (!parsed.couple || !parsed.events) {
        throw new Error('Dữ liệu JSON không đúng cấu trúc thiệp cưới')
      }
      setState({
        ...defaultState,
        ...parsed,
      })
      return true
    } catch (e) {
      console.error('Import failed:', e)
      return false
    }
  }

  /**
   * Export RSVPs to CSV with UTF-8 BOM (﻿)
   * Ensures Vietnamese diacritics display properly in MS Excel on Windows & Mac
   */
  const exportRsvpsToCsv = () => {
    const headers = ['Mã khách', 'Họ và tên', 'Số điện thoại', 'Khách của ai', 'Tham dự', 'Số người đi cùng', 'Ghi chú / Chế độ ăn', 'Thời gian đăng ký']

    const rows = state.rsvps.map((r) => [
      `"${r.id}"`,
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.phone.replace(/"/g, '""')}"`,
      `"${r.side === 'groom' ? 'Nhà Trai' : r.side === 'bride' ? 'Nhà Gái' : 'Cả Hai'}"`,
      `"${r.attendance === 'yes' ? 'Có tham dự' : 'Tiếc quá, vắng mặt'}"`,
      `"${r.guestCount}"`,
      `"${(r.dietaryNotes || '').replace(/"/g, '""')}"`,
      `"${r.submittedAt}"`,
    ])

    const csvContent = '﻿' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `danh_sach_khach_rsvp_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <WeddingContext.Provider
      value={{
        state,
        updateCouple,
        updateHeroBanners,
        updateJointImage,
        addGalleryPhoto,
        updateGalleryPhoto,
        deleteGalleryPhoto,
        updateEvent,
        addRsvp,
        deleteRsvp,
        addWish,
        deleteWish,
        updateBankAccounts,
        resetToDefaults,
        exportDataAsJson,
        importDataFromJson,
        exportRsvpsToCsv,
        compressImageFile,
      }}
    >
      {children}
    </WeddingContext.Provider>
  )
}

export const useWeddingData = () => {
  const context = useContext(WeddingContext)
  if (!context) {
    throw new Error('useWeddingData must be used within a WeddingDataProvider')
  }
  return context
}
