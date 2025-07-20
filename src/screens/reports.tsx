import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, FileText, Calendar } from "lucide-react";
import { getTransactionsByMonth } from "@/lib/transactions";
import { format } from "date-fns";
import { cn, formatCurrency, moneyCalculator } from "@/lib/utils";
import { Record } from "@/types";
import { Link } from "react-router";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "@/components/pdf-creator";

export default function ReportsScreen() {
  const [selectedMonth, setSelectedMonth] = useState(
    format(new Date(), "MMMM")
  );
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [transactions, setTransactions] = useState<Record[]>([]);
  const { balance, expenses, income } = moneyCalculator(transactions);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );

  useEffect(() => {
    getTransactionsByMonth(selectedMonth, parseInt(selectedYear)).then((v) => {
      if (v != undefined) {
        setTransactions(v);
      }
    });
  }, [selectedMonth, selectedYear]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <h1 className="text-lg font-semibold">Reports</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Date Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Select Period
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Month</label>
                <Select
                  defaultValue={new Date().getMonth().toLocaleString()}
                  value={selectedMonth}
                  onValueChange={setSelectedMonth}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month, index) => (
                      <SelectItem key={index} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Year</label>
                <Select
                  value={selectedYear.toString()}
                  onValueChange={setSelectedYear}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Report Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-xs text-gray-600">Income</p>
                <p className="text-sm font-semibold text-green-600">
                  {formatCurrency(income)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600">Expenses</p>
                <p className="text-sm font-semibold text-red-600">
                  {formatCurrency(expenses)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600">Net</p>
                <p
                  className={cn(
                    "text-sm font-semibold text-blue-600",
                    balance < 0 && "text-red-600"
                  )}
                >
                  {formatCurrency(balance)}
                </p>
              </div>
            </div>
            <Button className="w-full">
              <PDFDownloadLink
                className="flex items-center"
                fileName={`transaction-${selectedMonth}-${selectedYear}-reports`}
                document={
                  <PDFDocument
                    title={`Transaction ${selectedMonth}-${selectedYear}`}
                    transactions={transactions}
                  />
                }
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF Report
              </PDFDownloadLink>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
            >
              <Link to={"/pdf"}>
                <FileText className="h-4 w-4 mr-2" />
                Current Month Summary
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
            >
              <FileText className="h-4 w-4 mr-2" />
              Last 3 Months Comparison
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
            >
              <FileText className="h-4 w-4 mr-2" />
              Yearly Overview
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
