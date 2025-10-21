import { MenuItem } from "@/types";

export const mockMenuItems: MenuItem[] = [
  // Starters
  {
    id: "item-001",
    name: "Lumpia Shanghai",
    description: "Crispy Filipino spring rolls filled with seasoned pork and vegetables",
    price: 180,
    category: "Starters",
    available: true,
  },
  {
    id: "item-002",
    name: "Crispy Calamari",
    description: "Golden fried squid rings served with sweet chili sauce",
    price: 250,
    category: "Starters",
    available: true,
  },
  {
    id: "item-003",
    name: "Tokwa't Baboy",
    description: "Fried tofu and pork in soy-vinegar sauce",
    price: 200,
    category: "Starters",
    available: true,
  },

  // Mains
  {
    id: "item-004",
    name: "Chicken Adobo",
    description: "Classic Filipino dish with tender chicken in soy and vinegar sauce",
    price: 280,
    category: "Mains",
    available: true,
  },
  {
    id: "item-005",
    name: "Sinigang na Baboy",
    description: "Savory pork soup with tamarind and vegetables",
    price: 320,
    category: "Mains",
    available: true,
  },
  {
    id: "item-006",
    name: "Kare-Kare",
    description: "Oxtail stew in rich peanut sauce with vegetables",
    price: 380,
    category: "Mains",
    available: true,
  },
  {
    id: "item-007",
    name: "Crispy Pata",
    description: "Deep-fried pork leg served with spiced vinegar",
    price: 680,
    category: "Mains",
    available: true,
  },
  {
    id: "item-008",
    name: "Beef Caldereta",
    description: "Tender beef stew in tomato sauce with bell peppers",
    price: 350,
    category: "Mains",
    available: true,
  },

  // Rice & Noodles
  {
    id: "item-009",
    name: "Garlic Rice",
    description: "Fragrant rice tossed with garlic",
    price: 60,
    category: "Rice & Noodles",
    available: true,
  },
  {
    id: "item-010",
    name: "Pancit Canton",
    description: "Stir-fried egg noodles with vegetables and meat",
    price: 180,
    category: "Rice & Noodles",
    available: true,
  },
  {
    id: "item-011",
    name: "Java Rice",
    description: "Turmeric-infused yellow rice",
    price: 70,
    category: "Rice & Noodles",
    available: true,
  },

  // Drinks
  {
    id: "item-012",
    name: "Calamansi Juice",
    description: "Fresh Philippine lime juice",
    price: 80,
    category: "Drinks",
    available: true,
  },
  {
    id: "item-013",
    name: "Mango Shake",
    description: "Creamy mango smoothie",
    price: 120,
    category: "Drinks",
    available: true,
  },
  {
    id: "item-014",
    name: "San Miguel Beer",
    description: "Local pilsner (330ml)",
    price: 90,
    category: "Drinks",
    available: true,
  },
  {
    id: "item-015",
    name: "Iced Tea",
    description: "Refreshing cold brewed tea",
    price: 60,
    category: "Drinks",
    available: true,
  },

  // Desserts
  {
    id: "item-016",
    name: "Halo-Halo",
    description: "Filipino shaved ice dessert with mixed fruits and ice cream",
    price: 150,
    category: "Desserts",
    available: true,
  },
  {
    id: "item-017",
    name: "Leche Flan",
    description: "Creamy caramel custard",
    price: 120,
    category: "Desserts",
    available: true,
  },
  {
    id: "item-018",
    name: "Turon",
    description: "Caramelized banana spring roll",
    price: 100,
    category: "Desserts",
    available: true,
  },
];

export const menuCategories = [
  "Starters",
  "Mains",
  "Rice & Noodles",
  "Drinks",
  "Desserts",
];
