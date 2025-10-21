# 🚀 Quick Start Guide

## Installation & Setup

Follow these steps to get QResto running on your machine:

### 1. Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Zustand (state management)
- Framer Motion (animations)
- qrcode.react (QR generation)
- Lucide icons

### 2. Start Development Server

```bash
npm run dev
```

The app will start at: **http://localhost:3000**

### 3. Test the Application

Open your browser and try these routes:

#### Home Page
```
http://localhost:3000
```
- See the landing page with feature overview
- Click "Try Demo (Table 1)" button

#### Table Pages (Menu Simulation)
```
http://localhost:3000/table/1
http://localhost:3000/table/5
http://localhost:3000/table/10
```
- Browse the Filipino menu
- Add items to cart
- Click "View Order" button

#### Complete Flow Test
1. Go to `/table/1`
2. Add several items to cart
3. Click "View Order" floating button
4. Click "Proceed to Checkout"
5. Click "Generate Payment QR"
6. Try different payment options:
   - Pay in Full (auto-completes)
   - Split Bill (track contributions)
   - Pay in Cash (show modal)

## 📱 Mobile Testing

For the best experience (since it's mobile-first):

### Option 1: Browser DevTools
1. Open Chrome DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or similar
4. Refresh the page

### Option 2: Local Network
1. Find your computer's local IP (e.g., 192.168.1.100)
2. On your phone, visit: `http://192.168.1.100:3000`
3. Scan the actual QR codes displayed

## 🎯 Key Interactions to Test

### Cart Management
- ✅ Add items with + button
- ✅ Remove items with - button
- ✅ Delete items with trash icon
- ✅ Clear entire cart

### Payment Flow
- ✅ Pay in Full → See QR → Auto success
- ✅ Split Bill → Set people count → Add contributions
- ✅ Cash Payment → See modal → Confirm

### Split Bill Features
- ✅ Adjust number of people (2-10)
- ✅ See per-person amount
- ✅ Add contributions with names
- ✅ Watch progress bar
- ✅ Share split QR
- ✅ Complete when fully paid

## 🔧 Troubleshooting

### Port 3000 Already in Use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Dependencies Installation Error
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
The initial TypeScript errors you see are normal before dependencies are installed. They will resolve after running `npm install`.

## 📦 Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 🎨 Customization Tips

### Change Restaurant Name
Edit `data/restaurant.ts`

### Modify Menu Items
Edit `data/menu.ts`

### Add More Tables
Edit `data/tables.ts`

### Customize Colors
Edit `app/globals.css` (CSS variables)

## 📚 Project Structure Overview

```
Key Files:
├── app/page.tsx              → Landing page
├── app/table/[id]/page.tsx   → Menu page
├── app/checkout/page.tsx     → Order summary
├── app/payment/page.tsx      → Payment options
├── app/split/page.tsx        → Split bill
├── store/cartStore.ts        → State management
├── data/menu.ts              → Mock menu data
└── components/CartDrawer.tsx → Shopping cart
```

## 🎓 Learning Resources

- **Next.js App Router**: Check `app/` folder structure
- **Zustand Store**: See `store/cartStore.ts`
- **shadcn Components**: Explore `components/ui/`
- **Animations**: Look for `framer-motion` usage
- **Type Safety**: Review `types/index.ts`

## ⚡ Performance Tips

- The app uses Next.js 14 App Router (server components by default)
- Client components are marked with `"use client"`
- Images can be optimized with `next/image`
- Consider adding loading states for better UX

## 🔗 Next Steps

1. ✅ Run the app and test all features
2. ✅ Review the code structure
3. ✅ Customize the menu and restaurant info
4. ✅ Read FLOW.md for detailed documentation
5. ✅ Plan backend integration (see backend/README.md)

## 💡 Feature Ideas to Add

- [ ] User authentication
- [ ] Order history
- [ ] Table reservation
- [ ] Real-time order status
- [ ] Push notifications
- [ ] Multiple restaurants
- [ ] Admin dashboard
- [ ] Analytics

---

**Happy coding! 🎉**

If you encounter any issues, check:
1. Node.js version (18+)
2. All dependencies installed
3. Port 3000 available
4. Browser console for errors
