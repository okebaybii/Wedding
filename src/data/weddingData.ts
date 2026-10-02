import { CoupleInfo, Milestone, WeddingEvent, GuestWish, BankAccount } from '../types/wedding.ts'

export const weddingCouple: CoupleInfo = {
  groom: {
    fullName: 'Nguyễn Minh Quân',
    shortName: 'Minh Quân',
    title: 'Chú Rể',
    parents: 'Ông Nguyễn Văn Nam & Bà Trần Thị Lan',
    bio: 'Kỹ sư phần mềm đam mê công nghệ và du lịch. Người luôn mang lại nụ cười và sự vững chãi cho Thảo My.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
  },
  bride: {
    fullName: 'Lê Hoàng Thảo My',
    shortName: 'Thảo My',
    title: 'Cô Dâu',
    parents: 'Ông Lê Minh Tuấn & Bà Phạm Hồng Nga',
    bio: 'Nhà thiết kế sáng tạo yêu nghệ thuật và ẩm thực. Người mang ánh nắng ấm áp và sự ngọt ngào vào cuộc sống của Quân.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop'
  },
  monogram: 'Q & M',
  weddingDate: '2026-11-20T18:00:00',
  quote: '“Tình yêu đích thực không phải là tìm kiếm một người hoàn hảo, mà là cùng nhau học cách yêu thương những điều chưa hoàn hảo một cách trọn vẹn nhất.”'
}

export const loveMilestones: Milestone[] = [
  {
    id: '1',
    date: '15 / 10 / 2021',
    title: 'Ngày Đầu Tiên Gặp Gỡ',
    description: 'Một buổi chiều thu dịu mát tại quán cà phê sách góc phố quen, ánh mắt chạm nhau mở đầu cho bản giao hưởng tình yêu.',
    location: 'Hà Nội'
  },
  {
    id: '2',
    date: '24 / 12 / 2021',
    title: 'Lời Tỏ Tình Dưới Đèn Giáng Sinh',
    description: 'Trong không khí se lạnh đêm Noel rực rỡ ánh đèn, cái nắm tay đầu tiên và lời hẹn ước cùng nhau đi qua mọi mùa đông ấm áp.',
    location: 'Hồ Gươm'
  },
  {
    id: '3',
    date: '14 / 02 / 2025',
    title: 'Hoàng Hôn Cầu Hôn Trên Đỉnh Đồi',
    description: 'Chiếc nhẫn đính hôn lấp lánh dưới ánh hoàng hôn rực rỡ Đà Lạt, và câu trả lời "Em đồng ý" làm tim vỡ òa hạnh phúc.',
    location: 'Đà Lạt'
  },
  {
    id: '4',
    date: '20 / 11 / 2026',
    title: 'Ngày Chung Đôi Trọn Vẹn',
    description: 'Chúng mình cùng viết nên chương mới tuyệt đẹp nhất của cuộc đời, tay trong tay bước vào lễ đường dưới sự chúc phúc của gia đình và bạn bè.',
    location: 'Riverside Palace'
  }
]

export const weddingEvents: WeddingEvent[] = [
  {
    id: 'ceremony-bride',
    title: 'Lễ Vu Quy (Nhà Gái)',
    type: 'ceremony',
    time: '08:30 Sáng',
    date: 'Thứ Sáu, 20 / 11 / 2026',
    locationName: 'Tư Gia Nhà Gái',
    address: '128 Đường Nguyễn Đình Chiểu, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh',
    mapUrl: 'https://maps.google.com/?q=128+Nguyen+Dinh+Chieu+District+3+Ho+Chi+Minh',
    notes: 'Kính mời quý quan khách tới dự lễ xuất giá của cô dâu.'
  },
  {
    id: 'ceremony-groom',
    title: 'Lễ Thành Hôn (Nhà Trai)',
    type: 'ceremony',
    time: '10:30 Sáng',
    date: 'Thứ Sáu, 20 / 11 / 2026',
    locationName: 'Tư Gia Nhà Trai',
    address: '45 Đường Nam Kỳ Khởi Nghĩa, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    mapUrl: 'https://maps.google.com/?q=45+Nam+Ky+Khoi+Nghia+District+1+Ho+Chi+Minh',
    notes: 'Kính mời người thân & bạn bè tới dự lễ gia tiên nhà trai.'
  },
  {
    id: 'reception',
    title: 'Tiệc Cưới & Dạ Yến (Reception)',
    type: 'reception',
    time: '18:00 Tối',
    date: 'Thứ Sáu, 20 / 11 / 2026',
    locationName: 'Trung Tâm Tiệc Cưới Riverside Palace',
    address: '360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh',
    mapUrl: 'https://maps.google.com/?q=Riverside+Palace+360D+Ben+Van+Don+District+4+Ho+Chi+Minh',
    notes: 'Đón khách lúc 17:30 - Khai tiệc lúc 18:30 với chương trình âm nhạc và tiệc tối lãng mạn.'
  }
]

export const initialGuestWishes: GuestWish[] = [
  {
    id: 'w-1',
    senderName: 'Anh Tuấn & Phương Linh',
    relationship: 'Bạn thân Đại học',
    message: 'Chúc hai bạn một hành trình mới ngập tràn tiếng cười, hạnh phúc và luôn bao dung, thấu hiểu cho nhau như những ngày đầu!',
    createdAt: 'Hôm nay'
  },
  {
    id: 'w-2',
    senderName: 'Gia đình Bác Hùng',
    relationship: 'Họ hàng nhà trai',
    message: 'Chúc mừng hạnh phúc hai cháu! Chúc hai cháu trăm năm tình viên mãn, đầu bạc răng long, xây dựng gia đình êm ấm thịnh vượng.',
    createdAt: 'Hôm qua'
  },
  {
    id: 'w-3',
    senderName: 'Hội Bạn Cấp 3 Chuyên Toán',
    relationship: 'Bạn cấp 3 chú rể',
    message: 'Cuối cùng thì chàng trai của chúng ta cũng đã rước nàng về dinh. Chúc cặp đôi vàng mãi ngọt ngào và hạnh phúc bền lâu!',
    createdAt: '2 ngày trước'
  }
]

export const bankAccounts: { groom: BankAccount; bride: BankAccount } = {
  groom: {
    bankName: 'MB Bank (Quân Đội)',
    accountNumber: '999988886868',
    accountHolder: 'NGUYEN MINH QUAN',
    branch: 'Chi nhánh Sài Gòn',
    qrUrl: 'https://api.vietqr.io/image/970422-999988886868-compact2.png?amount=0&addInfo=Mung%20Cuoi%20Minh%20Quan%20Thao%20My'
  },
  bride: {
    bankName: 'Vietcombank',
    accountNumber: '0071001234567',
    accountHolder: 'LE HOANG THAO MY',
    branch: 'Chi nhánh Bến Thành',
    qrUrl: 'https://api.vietqr.io/image/970436-0071001234567-compact2.png?amount=0&addInfo=Mung%20Cuoi%20Thao%20My%20Minh%20Quan'
  }
}
