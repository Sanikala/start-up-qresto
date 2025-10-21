import { Table } from "@/types";

export const mockTables: Table[] = [
  { id: "table-001", number: 1, restaurantId: "rest-001" },
  { id: "table-002", number: 2, restaurantId: "rest-001" },
  { id: "table-003", number: 3, restaurantId: "rest-001" },
  { id: "table-004", number: 4, restaurantId: "rest-001" },
  { id: "table-005", number: 5, restaurantId: "rest-001" },
  { id: "table-006", number: 6, restaurantId: "rest-001" },
  { id: "table-007", number: 7, restaurantId: "rest-001" },
  { id: "table-008", number: 8, restaurantId: "rest-001" },
  { id: "table-009", number: 9, restaurantId: "rest-001" },
  { id: "table-010", number: 10, restaurantId: "rest-001" },
];

export const getTableById = (tableNumber: number): Table | undefined => {
  return mockTables.find((table) => table.number === tableNumber);
};
