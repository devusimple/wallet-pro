import { db } from "@/db/db";
import { Record } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabase } from "./supabase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMonthYear(date: Date) {
  return {
    month: date.toLocaleString("default", { month: "long" }),
    year: date.getFullYear(),
  };
}

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export const moneyCalculator = (transactions: Record[]) => {
  let income = 0;
  let expenses = 0;
  let transfer = 0;
  transactions?.map((t) => {
    if (t.type == "Expense") {
      expenses += t.amount;
    } else if (t.type == "Income") {
      income += t.amount;
    } else if (t.type == "Transfer") {
      transfer += t.amount;
    }
  });
  return {
    income,
    balance: income - expenses,
    expenses,
    transfer,
  };
};

export const getAMonthTransaction = (
  transactions: Record[],
  month: string,
  year: number
) =>
  transactions.filter((val) => {
    return (
      getMonthYear(val.date).month == month &&
      (getMonthYear(val.date).year == year || 2025)
    );
  });

export const categoryAmountCal = (c: string, transactions: Record[]) => {
  let amount = 0;
  const ca = transactions.filter((t) => t.category == c);
  ca.map((v) => {
    amount += v.amount;
  });
  return amount;
};

/** 
export const syncData = async () => {
  const unSyncedTransactions = await db.transactions
    .filter((obj) => obj.synced == false)
    .toArray();
  unSyncedTransactions.map(async (t) => {
    if (t.attachment) {
      await supabase.storage
        .from("attachments")
        .upload(`user-uploads/${t.attachment.name}`, t.attachment);
    }
    await supabase
      .from("transactions")
      .insert([
        {
          id: t.id,
          amount: t.amount,
          type: t.type,
          category: t.category,
          method: t.method,
          date: t.date,
          note: t.note,
          synced: true,
          attachment: t.attachment
            ? supabase.storage
                .from("attachments")
                .getPublicUrl(`user-uploads/${t.attachment?.name}`).data
                .publicUrl
            : undefined,
          created_at: t.created_at,
          updated_at: t.updated_at,
        },
      ])
      .then(async () => {
        await db.transactions
          .where(":id")
          .equals(t.id!)
          .modify({ synced: true });
      });
  });
};
*/

export const syncData = async () => {
  const unSyncedTransactions = await db.transactions
    .filter((obj) => obj.synced === false)
    .toArray();
  
  const uploadedData = [];
  
  for (const t of unSyncedTransactions) {
    let publicUrl;
    if (t.attachment) {
      const path = `user-uploads/${t.attachment.name}`;
      await supabase.storage.from("attachments").upload(path, t.attachment);
      publicUrl = supabase.storage.from("attachments").getPublicUrl(path).data.publicUrl;
    }
    
    uploadedData.push({
      id: t.id,
      amount: t.amount,
      type: t.type,
      category: t.category,
      method: t.method,
      date: t.date,
      note: t.note,
      synced: true,
      attachment: publicUrl,
      created_at: t.created_at,
      updated_at: t.updated_at,
    });
  }
  
  if (uploadedData.length > 0) {
    const { error } = await supabase.from("transactions").insert(uploadedData);
    if (!error) {
      await db.transactions.bulkPut(
        unSyncedTransactions.map((t) => ({ ...t, synced: true }))
      );
    } else {
      console.error("Sync insert error:", error);
    }
  }
};

export const exportData = async () => {
  const transactions = await db.transactions.toArray();
  const blob = new Blob([JSON.stringify({ transactions })], {
    type: "application/json",
  });
  const jsonFile = new File([blob], `database-${Date.now()}.db`, {
    type: "application/json",
  });
  return jsonFile;
};
