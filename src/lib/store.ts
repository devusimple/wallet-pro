import { Record } from "@/types";
import { create } from "zustand";
import { getTransactionById } from "./transactions";
import { db } from "@/db/db";

type SheetState = {
  isOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
  toggleSheet: () => void;
};

export const useTransactionCreateSheetControl = create<SheetState>((set) => ({
  isOpen: false,
  openSheet() {
    return set({ isOpen: true });
  },
  closeSheet: () => set({ isOpen: false }),
  toggleSheet: () => set((state) => ({ isOpen: state.isOpen })),
}));

export const useTransactionDetailsSheetControl = create<
  SheetState & {
    id: number | undefined;
    setId: (id: number) => void;
    data: Record | null;
    getData: (id: number) => void;
  }
>((set) => ({
  isOpen: false,
  openSheet() {
    return set({ isOpen: true });
  },
  closeSheet: () => set({ isOpen: false }),
  toggleSheet: () => set((state) => ({ isOpen: state.isOpen })),
  id: undefined,
  setId: (id) => set({ id }),
  data: null,
  getData: async (id: number) => {
    const d = await getTransactionById(id);
    if (d) {
      set({ data: d![0] });
    } else {
      console.log("something went wrong");
    }
  },
}));

interface TransactionsStoreState {
  transactions: Record[];
  loading: boolean;
  error: string | null;
  fetchTransactions: () => Promise<void>;
}

// fetch all transactions
export const useTransactionsStore = create<TransactionsStoreState>((set) => ({
  loading: false,
  transactions: [],
  error: null,
  fetchTransactions: async () => {
    set({ loading: true, error: null });
    try {
      const response = await db.transactions.toArray();
      set({ transactions: response, loading: false });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ error: error.message, loading: false });
    } finally {
      set({ loading: false });
    }
  },
}));

interface FormActions {
  onSubmit: () => Promise<void>;
  setFormData: (data: Record) => void;
}

type FormState = {
  formAction: FormActions;
  formField: Record;
};

// form controls;
export const useForm = create<FormState>((set) => ({
  formField: {
    amount: 0,
    category: "",
    type: "Expense",
    method: "",
    date: new Date(),
    attachment: undefined,
    note: "",
    synced: false,
    created_at: new Date(),
    updated_at: undefined,
  },
  formAction: {
    onSubmit: async () => {
      console.log("submit");
    },
    setFormData: (data) => {
      set({ formField: { ...data } });
    },
  },
}));

interface DialogState {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  toggleDialog?: () => void;
}

export const useDeleteDialog = create<DialogState>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
}));
