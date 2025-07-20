import TestChart from "@/components/chart";
import { MostExpensesCategory } from "@/components/most-expense-category-chart";
import { TotalTransactions } from "@/components/total-transactios";
import { useTransactionsStore } from "@/lib/store";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AnalysisScreen() {
  const { transactions, error, fetchTransactions } = useTransactionsStore();
  useEffect(() => {
    fetchTransactions();
    if (error) toast.error(error);
  }, [fetchTransactions, error]);

  if (!transactions) return;
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <h1 className="text-lg font-semibold">Analysis</h1>
      </div>

      {/* Expense-Income Chart */}
      <div className="py-3 px-1">
        <TestChart transactions={transactions} />
      </div>
      <div className="py-3 px-1">
        <MostExpensesCategory transactions={transactions} />
      </div>
      <div className="py-3 px-1">
        <TotalTransactions transactions={transactions} />
      </div>
    </div>
  );
}
