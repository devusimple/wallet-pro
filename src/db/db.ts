import { Record } from "@/types";
import Dexie, { Table } from "dexie";

class AppDataBase extends Dexie {
  transactions!: Table<Record>;
  constructor() {
    super("money-34401-database", {});
    this.version(1).stores({
      transactions:
        "++id, amount, type, method, category, date, note, attachment, synced, created_at, updated_at",
    });
  }
}

export const db = new AppDataBase();
