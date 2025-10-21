# Backend Structure (Future Integration)

This directory is prepared for backend integration. When you're ready to add backend functionality, implement the following structure:

## Directory Structure

```
backend/
├── controllers/     # Business logic and API handlers
├── models/          # Database models (Prisma, TypeORM, etc.)
└── routes/          # API endpoint definitions
```

## Planned Implementation

### 1. Controllers (`/backend/controllers`)
- `orderController.ts` - Handle order creation, updates, status
- `paymentController.ts` - Process payments, verify transactions
- `tableController.ts` - Manage table status and availability
- `menuController.ts` - Menu CRUD operations

### 2. Models (`/backend/models`)
Database schema for:
- `Restaurant` - Restaurant information
- `Table` - Table details and status
- `MenuItem` - Menu items with pricing
- `Order` - Customer orders
- `Payment` - Payment transactions
- `SplitPayment` - Bill splitting data

### 3. Routes (`/backend/routes`)
API endpoints:
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PATCH /api/orders/:id` - Update order status
- `POST /api/payments` - Process payment
- `POST /api/split-payments` - Handle split payments
- `GET /api/tables/:id` - Get table information
- `GET /api/menu` - Fetch menu items

## Integration Steps

1. **Set up database** (PostgreSQL + Prisma recommended)
2. **Create models** with relationships
3. **Implement controllers** with business logic
4. **Define API routes** using Next.js API routes
5. **Update frontend** to use real API calls
6. **Add authentication** and authorization
7. **Integrate payment gateway** (Stripe, PayMongo, etc.)

## Environment Variables

```env
DATABASE_URL="postgresql://..."
PAYMENT_API_KEY="..."
JWT_SECRET="..."
```

## Notes

- Current frontend uses mock data from `/data` folder
- Replace mock data imports with API calls
- Implement error handling and validation
- Add rate limiting for production
