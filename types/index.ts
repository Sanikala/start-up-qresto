export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  logo?: string;
}

export interface Table {
  id: string;
  number: number;
  restaurantId: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  tableId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'paid';
  createdAt: string;
}

export interface SplitPayment {
  orderId: string;
  totalAmount: number;
  paidAmount: number;
  contributions: {
    name: string;
    amount: number;
  }[];
}
