# QResto - QR-Based Dining Solution

A modern, mobile-first QR-based dining application built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- **QR Code Table Access**: Scan QR codes to access restaurant menus
- **Interactive Menu**: Browse menu by categories with smooth animations
- **Shopping Cart**: Add/remove items with quantity management
- **Multiple Payment Options**:
  - Pay in Full (QR Payment)
  - Split Bill with friends
  - Cash Payment
- **Bill Splitting**: Even or custom split with real-time progress tracking
- **Mobile-First Design**: Optimized for restaurant table scanning experience

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: Zustand
- **Animations**: Framer Motion
- **QR Generation**: qrcode.react
- **Icons**: Lucide React

### Backend (Future Integration)
- Backend folder structure prepared for API integration
- Ready for Prisma + PostgreSQL
- API routes for order and payment handling

## 📁 Project Structure

```
qresto/
├── app/                      # Next.js 14 App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   ├── table/[id]/          # Dynamic table routes
│   │   └── page.tsx         # Menu page
│   ├── checkout/            # Checkout flow
│   │   └── page.tsx
│   ├── payment/             # Payment options
│   │   └── page.tsx
│   └── split/               # Split bill page
│       └── page.tsx
├── components/              # React components
│   ├── ui/                  # shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── progress.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   └── toaster.tsx
│   ├── CartDrawer.tsx       # Shopping cart drawer
│   └── PaymentQR.tsx        # QR code component
├── data/                    # Mock data
│   ├── menu.ts              # Menu items
│   ├── restaurant.ts        # Restaurant info
│   └── tables.ts            # Table data
├── store/                   # State management
│   └── cartStore.ts         # Zustand cart store
├── types/                   # TypeScript types
│   └── index.ts
├── lib/                     # Utilities
│   └── utils.ts             # Helper functions
├── hooks/                   # Custom hooks
│   └── use-toast.ts         # Toast notifications
├── backend/                 # Future backend integration
│   ├── controllers/         # API logic (future)
│   ├── models/              # Database models (future)
│   └── routes/              # API routes (future)
└── public/                  # Static assets

```

## 🎯 User Flow

### 1. QR Scan Simulation
- Access via `/table/[number]` (e.g., `/table/5`)
- Displays restaurant name and table number

### 2. Menu Page
- Browse items by category (Starters, Mains, Drinks, etc.)
- Add items to cart with + button
- Floating "View Order" button shows cart

### 3. Checkout Page
- Review order summary
- See total amount
- Proceed to payment or return to menu

### 4. Payment Page
Three options:
- **Pay in Full**: Generate payment QR code
- **Split Bill**: Redirect to split page
- **Pay in Cash**: Show cash payment modal

### 5. Split Bill Page
- Display total bill and progress
- Even or custom splits
- Real-time contribution tracking
- Share QR code for others to join

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

### Quick Test Routes
- Home: `/`
- Table 1: `/table/1`
- Table 5: `/table/5`
- Table 10: `/table/10`

## 💡 Future Backend Integration

When adding a backend:

1. **API Routes** (`/backend/routes`)
   - `/api/orders` - Order management
   - `/api/payments` - Payment processing
   - `/api/tables` - Table status

2. **Database Models** (`/backend/models`)
   - Restaurant, Table, MenuItem, Order, Payment

3. **Controllers** (`/backend/controllers`)
   - Business logic for orders, payments, etc.

4. **Frontend Updates**
   - Replace mock data with API calls
   - Use Next.js API routes or external API
   - Implement real payment gateway integration

## 🎨 Key Features

### State Management (Zustand)
- Cart management
- Order tracking
- Split payment coordination

### Animations (Framer Motion)
- Smooth page transitions
- Interactive cart drawer
- Success modals

### Responsive Design
- Mobile-first approach
- Touch-friendly buttons
- Optimized for table scanning

## 📱 Mobile Experience

The app is designed for:
- QR code scanning at restaurant tables
- Easy one-handed operation
- Clear, large touch targets
- Minimal scrolling on mobile devices

## 🔒 Security Considerations (Production)

For production deployment:
- Implement authentication
- Secure payment gateway integration
- Input validation and sanitization
- Rate limiting
- HTTPS only
- Environment variable management

## 📄 License

MIT License - Feel free to use for your projects!

## 🤝 Contributing

Contributions are welcome! This is a simulation project ready for backend integration.

---

Built with ❤️ using Next.js, TypeScript, and shadcn/ui
