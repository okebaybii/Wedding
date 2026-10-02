export interface CoupleInfo {
  groom: {
    fullName: string
    shortName: string
    title: string
    parents: string
    bio: string
    image: string
  }
  bride: {
    fullName: string
    shortName: string
    title: string
    parents: string
    bio: string
    image: string
  }
  jointImage: string // Ảnh cưới chụp chung gắn kết giữa 2 người
  heroBanners: string[] // Danh sách ảnh trình chiếu banner trang đầu
  monogram: string
  weddingDate: string // ISO string or YYYY-MM-DD HH:mm
  quote: string
}

export type GalleryCategory = 'all' | 'ceremony' | 'outdoor' | 'moments'

export interface GalleryPhoto {
  id: string
  url: string
  title: string
  category: 'ceremony' | 'outdoor' | 'moments'
  aspectRatio?: 'tall' | 'wide' | 'square'
  caption?: string
}

export interface RsvpEntry {
  id: string
  fullName: string
  phone: string
  side: 'groom' | 'bride' | 'mutual'
  attendance: 'yes' | 'no'
  guestCount: number
  dietaryNotes?: string
  submittedAt: string
}

export interface Milestone {
  id: string
  date: string
  title: string
  description: string
  location?: string
  icon?: string
}

export interface WeddingEvent {
  id: string
  title: string
  type: 'ceremony' | 'reception' | 'engagement'
  time: string
  date: string
  locationName: string
  address: string
  mapUrl: string
  notes?: string
}

export interface GuestWish {
  id: string
  senderName: string
  relationship: string
  message: string
  createdAt: string
}

export interface BankAccount {
  bankName: string
  accountNumber: string
  accountHolder: string
  branch?: string
  qrUrl?: string
}

export interface WeddingState {
  couple: CoupleInfo
  events: WeddingEvent[]
  milestones: Milestone[]
  gallery: GalleryPhoto[]
  rsvps: RsvpEntry[]
  wishes: GuestWish[]
  bankAccounts: {
    groom: BankAccount
    bride: BankAccount
  }
}
