import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Record } from "@/types";

export const description = "A donut chart with text";

const chartConfig = {
  visitors: {
    label: "Amount",
  },
  income: {
    label: "Incomes",
    color: "var(--chart-2)",
  },
  expense: {
    label: "Expenses",
    color: "var(--chart-1)",
  },
  transfer: {
    label: "Transfers",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function TotalTransactions({
  transactions,
}: {
  transactions: Record[];
}) {
  const calcAmount = () => {
    let income = 0,
      expense = 0,
      transfer = 0;
    transactions.map((v) => {
      if (v.type == "Expense") {
        expense += v.amount;
      } else if (v.type == "Income") {
        income += v.amount;
      } else if (v.type == "Transfer") {
        transfer += v.amount;
      }
    });
    return { income, expense, transfer };
  };

  const chartData = [
    {
      label: "Incomes",
      amount: calcAmount().income,
      fill: "var(--color-income)",
    },
    {
      label: "Expenses",
      amount: calcAmount().expense,
      fill: "var(--color-expense)",
    },
    {
      label: "Transfers",
      amount: calcAmount().transfer,
      fill: "var(--color-transfer)",
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Transactions</CardTitle>
        <CardDescription>January 2021 - June 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="label"
              innerRadius={60}
              label
            >
              <ChartLegend />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing total transactions.
        </div>
      </CardFooter>
    </Card>
  );
}
