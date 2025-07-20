import { cn } from "@/lib/utils";
import { Record } from "@/types";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { paymentMethods, transactionCategories } from "@/lib/mock.data";
import { Calendar } from "./ui/calendar";

export default function CreateTransactionForm({
  formData,
  setFormData,
}: {
  formData: Record;
  setFormData: React.Dispatch<React.SetStateAction<Record>>;
}) {
  return (
    <div className="grid w-full h-full items-center gap-3">
      {/* transaction amount */}
      <span className="space-y-1.5">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          className="py-5"
          type="number"
          value={formData.amount}
          placeholder="$0.00"
          onChange={(e) =>
            setFormData({ ...formData, amount: parseInt(e.target.value) })
          }
        />
      </span>
      {/* transaction type */}
      <span className="space-y-1.5">
        <Label htmlFor="transactionType">Transaction Type</Label>
        <RadioGroup
          id="transactionType"
          defaultValue="Expense"
          className="flex items-center justify-between p-2"
          onValueChange={(v: "Expense" | "Income" | "Transfer") =>
            setFormData({ ...formData, type: v })
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Expense" id="expense" />
            <Label htmlFor="expense">Expense</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Income" id="income" />
            <Label htmlFor="income">Income</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Transfer" id="transfer" />
            <Label htmlFor="transfer">Transfer</Label>
          </div>
        </RadioGroup>
      </span>
      {/* transaction method */}
      <span className="space-y-1.5">
        <Label htmlFor="payment-method">Transaction Method</Label>
        <span id="payment-method">
          <Select
            onValueChange={(v) => setFormData({ ...formData, method: v })}
          >
            <SelectTrigger className="w-full py-5">
              <SelectValue placeholder="Select an transaction method" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map((method) => (
                <SelectItem value={method} key={method}>
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </span>
      </span>
      {/* transaction category */}
      <span className="space-y-1.5">
        <Label htmlFor="transaction-category">Transaction Category</Label>
        <span id="transaction-category">
          <Select
            onValueChange={(v) => setFormData({ ...formData, category: v })}
          >
            <SelectTrigger className="w-full py-5">
              <SelectValue placeholder="Select an transaction category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Income</SelectLabel>
                {transactionCategories.Incomes.map((category, index) => (
                  <SelectItem value={category} key={index}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>

              <SelectGroup>
                <SelectLabel>Expense</SelectLabel>
                {transactionCategories.Expenses.map((category, index) => (
                  <SelectItem value={category} key={index}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>

              <SelectGroup>
                <SelectLabel>Transfer</SelectLabel>
                {transactionCategories.Transfers.map((category, index) => (
                  <SelectItem value={category} key={index}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </span>
      </span>
      {/* transaction date */}
      <span className="space-y-1.5">
        <Label htmlFor="date">Transaction Date</Label>
        <span id="date">
          <Popover>
            <PopoverTrigger asChild className="w-full py-5">
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.date && "text-shadow-muted-foreground"
                )}
              >
                <CalendarIcon />
                {formData.date ? (
                  format(formData.date, "PP")
                ) : (
                  <span>Pick a transaction date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                className="w-auto p-0"
                onSelect={(e) => setFormData({ ...formData, date: e! })}
                selected={formData.date}
                mode="single"
              />
            </PopoverContent>
          </Popover>
        </span>
      </span>
      {/* description */}
      <span className="space-y-1.5">
        <Label htmlFor="description">Transaction Note:</Label>
        <Textarea
          onChange={(v) => setFormData({ ...formData, note: v.target.value })}
          className="w-full max-w-sm"
          spellCheck
          id="description"
          placeholder="Write a note that describe the transaction"
        />
      </span>
      {/* attachment */}
      <span className="space-y-1.5">
        <Label htmlFor="attachment">Attachment</Label>
        <Input
          onChange={(e) => {
            if (e.target.files) {
              setFormData({ ...formData, attachment: e.target.files[0] });
            }
          }}
          id="attachment"
          type="file"
        />
      </span>
    </div>
  );
}
