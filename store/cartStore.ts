import { create } from 'zustand';
import { CartItem, Order, SplitPayment } from '@/types';

interface CartStore {
  items: CartItem[];
  tableId: string | null;
  currentOrder: Order | null;
  splitPayment: SplitPayment | null;
  
  setTableId: (tableId: string) => void;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  
  createOrder: () => void;
  updateOrderStatus: (status: Order['status']) => void;
  
  initializeSplitPayment: (orderId: string, totalAmount: number) => void;
  addContribution: (name: string, amount: number) => void;
  clearSplitPayment: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  tableId: null,
  currentOrder: null,
  splitPayment: null,

  setTableId: (tableId) => set({ tableId }),

  addItem: (item) => {
    const items = get().items;
    const existingItem = items.find((i) => i.id === item.id);

    if (existingItem) {
      set({
        items: items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...items, { ...item, quantity: 1 }] });
    }
  },

  removeItem: (itemId) => {
    set({ items: get().items.filter((i) => i.id !== itemId) });
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }
    set({
      items: get().items.map((i) =>
        i.id === itemId ? { ...i, quantity } : i
      ),
    });
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  createOrder: () => {
    const { items, tableId } = get();
    const total = get().getTotal();
    
    const order: Order = {
      id: `order-${Date.now()}`,
      tableId: tableId || 'unknown',
      items: [...items],
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    set({ currentOrder: order });
  },

  updateOrderStatus: (status) => {
    const order = get().currentOrder;
    if (order) {
      set({ currentOrder: { ...order, status } });
    }
  },

  initializeSplitPayment: (orderId, totalAmount) => {
    set({
      splitPayment: {
        orderId,
        totalAmount,
        paidAmount: 0,
        contributions: [],
      },
    });
  },

  addContribution: (name, amount) => {
    const split = get().splitPayment;
    if (!split) return;

    const newContributions = [...split.contributions, { name, amount }];
    const paidAmount = newContributions.reduce((sum, c) => sum + c.amount, 0);

    set({
      splitPayment: {
        ...split,
        contributions: newContributions,
        paidAmount,
      },
    });
  },

  clearSplitPayment: () => set({ splitPayment: null }),
}));
