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
  monogram: string
  weddingDate: string // ISO string or YYYY-MM-DD HH:mm
  quote: string
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
