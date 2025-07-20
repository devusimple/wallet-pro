import { getAMonthTransaction, moneyCalculator } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import { months } from "@/lib/mock.data";
import { Record } from "@/types";

const chartConfig = {
  income: { label: "Income", color: "var(--chart-2)" },
  expenses: { label: "Expenses", color: "var(--chart-1)" },
  transfer: { label: "Transfer", color: "var(--chart-3)" },
  month: { label: "Month", color: "var(--chart-4)" },
} as ChartConfig;

export default function TestChart({
  transactions,
}: {
  transactions: Record[];
}) {
  const chartData = months.map((month) => ({
    income: moneyCalculator(getAMonthTransaction(transactions, month, 2025))
      .income,
    expense: moneyCalculator(getAMonthTransaction(transactions, month, 2025))
      .expenses,
    transfer: moneyCalculator(getAMonthTransaction(transactions, month, 2025))
      .transfer,
    month: month,
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compared expenses and income </CardTitle>
        <CardDescription>January - May, 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <ChartLegend />
            <Line
              dataKey="expense"
              type="natural"
              stroke="var(--color-expenses)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-expenses)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={9}
              />
            </Line>
            <Line
              dataKey="income"
              type="natural"
              stroke="var(--color-income)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-income)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={9}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
