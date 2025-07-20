import { db } from "@/db/db";
import { Record } from "@/types";
import React from "react";
import { toast } from "sonner";
import { getMonthYear } from "./utils";

export async function createTransaction({
  formData,
  setLoading,
}: {
  formData: Record;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  setLoading(true);
  try {
    await db.transactions.add(formData);
    toast.success("✅ Created!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
}

export async function getTransactionsByMonth(s_month: string, s_year: number) {
  try {
    const records = await db.transactions
      .orderBy("created_at")
      .filter((x) => {
        const { month, year } = getMonthYear(x.date);
        return month == s_month && year == s_year;
      })
      .toArray();
    return records;
  } catch (error) {
    console.error(error);
  }
}

export const getTransactionById = async (id: number) => {
  try {
    return await db.transactions.filter((obj) => obj.id == id).toArray();
  } catch (error) {
    console.log(error);
  }
};

export const deleteTransaction = async (id: number) => {
  try {
    await db.transactions.delete(id);
  } catch (error) {
    console.log(error);
  }
};
