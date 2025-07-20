import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

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
const chartData = [
  { month: "January", expenses: 1826, income: 80 },
  { month: "February", expenses: 3035, income: 2040 },
  { month: "March", expenses: 2317, income: 1220 },
  { month: "Ap", expenses: 733, income: 1940 },
  { month: "May", expenses: 2094, income: 130 },
  { month: "June", expenses: 2143, income: 140 },
  { month: "July", expenses: 2146, income: 140 },
  { month: "August", expenses: 2114, income: 140 },
  { month: "September", expenses: 214, income: 140 },
  { month: "October", expenses: 1214, income: 140 },
  { month: "No", expenses: 4214, income: 140 },
  { month: "December", expenses: 3214, income: 140 },
];

const chartConfig = {
  expenses: {
    label: "Expenses",
    color: "var(--chart-5)",
  },
  income: {
    label: "Income",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function IncomeExpenseCompare() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compared expenses and income. </CardTitle>
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
            <Line
              dataKey="expenses"
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
            {/* <ChartLegend content={<ChartLegendContent payload={} />} /> */}
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Average expenses in this year is - $2120
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total expenses for the year 2025
        </div>
      </CardFooter>
    </Card>
  );
}
