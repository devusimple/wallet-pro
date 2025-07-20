"use client";

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTransactionsStore } from "@/lib/store";
import { useEffect } from "react";
import { moneyCalculator } from "@/lib/utils";

export function IncomeExpenseChart() {
  const { fetchTransactions, transactions } = useTransactionsStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Generate monthly data for the current year
  const currentYear = new Date().getFullYear();
  const monthlyData = Array.from({ length: 12 }, (_, index) => {
    const month = index;

    const { income, expenses } = moneyCalculator(transactions);

    return {
      month: new Date(currentYear, month).toLocaleDateString("en-US", {
        month: "short",
      }),
      income,
      expenses,
    };
  });

  return (
    <ChartContainer
      config={{
        income: {
          label: "Income",
          color: "hsl(var(--chart-1))",
        },
        expenses: {
          label: "Expenses",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="income"
            stroke="var(--color-income)"
            strokeWidth={2}
            dot={{ fill: "var(--color-income)" }}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="var(--color-expenses)"
            strokeWidth={2}
            dot={{ fill: "var(--color-expenses)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
