import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { transactionCategories } from "@/lib/mock.data";
import { Record } from "@/types";
import { categoryAmountCal } from "@/lib/utils";

export const description = "A horizontal bar chart";

const chartConfig = {
  expense: {
    label: "Expense",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function MostExpensesCategory({
  transactions,
}: {
  transactions: Record[];
}) {
  const data = transactionCategories.Expenses.map((c) => ({
    category: c,
    expense: categoryAmountCal(c, transactions),
  }));

  const chartData = data.filter((v) => v.expense != 0);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Most Expense Category </CardTitle>
        <CardDescription>January - December 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 36,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="expense" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="expense" fill="var(--color-expense)" radius={4}>
              <LabelList
                dataKey="category"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="expense"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing total most expenses for the last 12 months.
        </div>
      </CardFooter>
    </Card>
  );
}
