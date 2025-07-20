export interface Record {
  id?: number;
  amount: number;
  type: "Expense" | "Income" | "Transfer";
  method: string;
  category: string;
  date: Date;
  note?: string;
  attachment?: File;
  synced?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
