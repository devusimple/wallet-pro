import MonthSwitcher from "@/components/month-switcher";
import TransactionCard from "@/components/transaction-card";
import { Button } from "@/components/ui/button";
import { useTransactionCreateSheetControl } from "@/lib/store";
import { getTransactionsByMonth } from "@/lib/transactions";
import { cn, formatCurrency, getMonthYear } from "@/lib/utils";
import { Record } from "@/types";
import { LucidePlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { openSheet } = useTransactionCreateSheetControl();
  const [transactions, setTransactions] = useState<Record[] | undefined>([]);

  useEffect(() => {
    const { month, year } = getMonthYear(selectedDate);
    getTransactionsByMonth(month, year).then((v) => {
      setTransactions(v);
    });
  }, [selectedDate]);

  const monyCalculator = () => {
    let income = 0;
    let expenses = 0;
    transactions?.map((t) => {
      if (t.type == "Expense") {
        expenses += t.amount;
      } else if (t.type == "Income") {
        income += t.amount;
      }
    });
    return {
      income,
      balance: income - expenses,
      expenses,
    };
  };

  return (
    <main className="min-h-screen">
      <div className="sticky top-0 bg-white pb-2">
        <MonthSwitcher setSelectDate={setSelectedDate} />

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-2 mt-3 px-3">
          <div className="text-center p-3 bg-white rounded-md shadow">
            <p className="text-sm text-gray-600 mb-1">Expenses</p>
            <p className="text-base font-medium text-red-600">
              {formatCurrency(monyCalculator().expenses)}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-md shadow">
            <p className="text-sm text-gray-600 mb-1">Income</p>
            <p className="text-base font-medium text-green-600">
              {formatCurrency(Math.abs(monyCalculator().income))}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-md shadow">
            <p className="text-sm text-gray-600 mb-1">Balance</p>
            <p
              className={cn(
                "text-base font-medium text-green-600",
                monyCalculator().balance < 0 && "text-destructive"
              )}
            >
              {formatCurrency(monyCalculator().balance)}
            </p>
          </div>
        </div>

        {/* Add Transaction */}
        <div className="flex items-center justify-between p-3">
          <h2 className="font-semibold">Recent Transactions</h2>
          <Button className="cursor-pointer" onClick={() => openSheet()}>
            <LucidePlus />
            Add
          </Button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="overflow-y-auto mb-24">
        {transactions?.length == 0 ? (
          <p className="text-center">No transaction found!</p>
        ) : (
          transactions?.map((transaction) => (
            <TransactionCard
              transaction={transaction}
              key={transaction.created_at?.toString()}
            />
          ))
        )}
      </div>
    </main>
  );
}
