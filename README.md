# 🍽️ QResto - QR-Based Dining Solution

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

A modern, mobile-first QR-based dining application that makes restaurant experiences convenient and stress-free. Customers can scan QR codes to view menus, place orders, and pay seamlessly.

## ✨ Features

- 📱 **QR Code Scanning**: Access restaurant menus by scanning table QR codes
- 🍔 **Interactive Menu**: Browse dishes by category with smooth animations
- 🛒 **Smart Shopping Cart**: Real-time cart management with quantity controls
- 💳 **Multiple Payment Options**:
  - Pay in Full via QR Payment
  - Split Bill with friends
  - Cash Payment option
- 👥 **Bill Splitting**: Even or custom splits with live progress tracking
- 🎨 **Beautiful UI**: Built with shadcn/ui and Tailwind CSS
- 📱 **Mobile-First**: Optimized for scanning at restaurant tables

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

### Test Routes

Try these routes to see the app in action:
- **Home**: `http://localhost:3000`
- **Table 1**: `http://localhost:3000/table/1`
- **Table 5**: `http://localhost:3000/table/5`
- **Table 10**: `http://localhost:3000/table/10`

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI primitives
- **State Management**: Zustand
- **Animations**: Framer Motion
- **QR Codes**: qrcode.react
- **Icons**: Lucide React

### Backend (Ready for Integration)
- Folder structure prepared for:
  - API Controllers
  - Database Models (Prisma + PostgreSQL)
  - API Routes

## 📱 User Journey

### 1. Scan QR Code
Visit `/table/[number]` to simulate scanning a table QR code

### 2. Browse Menu
- View items organized by category
- Add items to cart with + button
- Adjust quantities

### 3. View Cart
- Floating "View Order" button shows cart drawer
- Review items and totals
- Proceed to checkout

### 4. Checkout
- Review order summary
- See itemized total
- Choose payment method

### 5. Payment Options

**💳 Pay in Full**
- Generate payment QR code
- Simulated payment processing
- Success confirmation

**👥 Split Bill**
- Choose number of people
- Calculate even split
- Track contributions in real-time
- Share QR code for others to contribute

**💵 Pay in Cash**
- Notify server for cash payment
- Demo confirmation button
- Mark order as paid

## 📁 Project Structure

```
qresto/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with Toaster
│   ├── page.tsx           # Home/landing page
│   ├── globals.css        # Global styles + Tailwind
│   ├── table/[id]/        # Dynamic table menu pages
│   ├── checkout/          # Checkout page
│   ├── payment/           # Payment options page
│   └── split/             # Split bill page
│
├── components/            # React components
│   ├── ui/               # shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── progress.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   └── toaster.tsx
│   ├── CartDrawer.tsx    # Shopping cart sidebar
│   └── PaymentQR.tsx     # QR code generator
│
├── data/                 # Mock data (replace with API)
│   ├── menu.ts          # Filipino menu items
│   ├── restaurant.ts    # Restaurant information
│   └── tables.ts        # Table data
│
├── store/               # State management
│   └── cartStore.ts    # Zustand cart store
│
├── types/              # TypeScript definitions
│   └── index.ts
│
├── lib/                # Utility functions
│   └── utils.ts
│
├── hooks/              # Custom React hooks
│   └── use-toast.ts   # Toast notification hook
│
└── backend/            # Future backend integration
    ├── controllers/   # API logic (future)
    ├── models/        # Database models (future)
    └── routes/        # API routes (future)
```

## 🎯 Key Features Explained

### State Management (Zustand)
The cart store manages:
- Cart items with quantities
- Current order tracking
- Split payment coordination
- Order status updates

### Animations (Framer Motion)
- Smooth page transitions
- Animated cart drawer
- Success modal animations
- Menu item fade-ins

### Responsive Design
- Mobile-first approach
- Touch-friendly controls
- Large tap targets
- Optimized for portrait mode

## 🔮 Future Backend Integration

The project is structured for easy backend integration:

### Step 1: Database Setup
```bash
# Install Prisma
npm install prisma @prisma/client

# Initialize Prisma
npx prisma init
```

### Step 2: Define Models
Create schemas in `/backend/models` for:
- Restaurant
- Table
- MenuItem
- Order
- Payment
- SplitPayment

### Step 3: Implement Controllers
Add business logic in `/backend/controllers`:
- Order management
- Payment processing
- Table status

### Step 4: Create API Routes
Use Next.js API routes:
- `POST /api/orders`
- `GET /api/menu`
- `POST /api/payments`
- `POST /api/split-payments`

### Step 5: Update Frontend
Replace mock data imports with API calls using `fetch` or a library like `axios`.

## 🎨 Customization

### Adding Menu Items
Edit `data/menu.ts`:
```typescript
{
  id: "item-new",
  name: "New Dish",
  description: "Delicious new item",
  price: 350,
  category: "Mains",
  available: true,
}
```

### Changing Restaurant Info
Edit `data/restaurant.ts`:
```typescript
export const mockRestaurant: Restaurant = {
  id: "rest-001",
  name: "Your Restaurant Name",
  description: "Your description",
  logo: "🍽️"
};
```

### Adding Tables
Edit `data/tables.ts` to add more table entries.

## 🧪 Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📄 Environment Variables (Future)

Create `.env.local` for production:
```env
DATABASE_URL="postgresql://..."
PAYMENT_API_KEY="..."
NEXT_PUBLIC_API_URL="..."
```

## 🔒 Security Notes

For production deployment:
- ✅ Implement authentication (NextAuth.js)
- ✅ Use environment variables
- ✅ Add input validation
- ✅ Implement rate limiting
- ✅ Use HTTPS only
- ✅ Integrate real payment gateway
- ✅ Add CSRF protection

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Framer Motion](https://www.framer.com/motion/)

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs!

## 📝 License

MIT License - Free to use for personal and commercial projects.

---

**Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and shadcn/ui**

For questions or support, please open an issue on GitHub.