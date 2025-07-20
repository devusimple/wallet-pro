import { useTransactionDetailsSheetControl } from "@/lib/store";
import { cn, formatCurrency } from "@/lib/utils";
import { Record } from "@/types";
import { format } from "date-fns";
import {
  LucideBookOpen,
  LucideBriefcaseMedical,
  LucideBuilding,
  LucideCandy,
  LucideCar,
  LucideCardSim,
  LucideDollarSign,
  LucideHamburger,
  LucideImage,
  LucideLaptop,
  LucideLightbulb,
  LucideLineSquiggle,
  LucidePlaneTakeoff,
  LucideShoppingBag,
  LucideYoutube,
} from "lucide-react";

export default function TransactionCard({
  transaction,
}: {
  transaction: Record;
}) {
  const { openSheet, setId } = useTransactionDetailsSheetControl();
  return (
    <div
      onClick={() => {
        setId(transaction.id!);
        openSheet();
      }}
      className="flex items-center gap-3 px-3 py-3 hover:bg-neutral-50 cursor-pointer"
    >
      <div className="bg-primary text-accent p-2 rounded-full relative">
        {transaction.category == "Shopping" ? (
          <LucideShoppingBag size={24} color="#fff" />
        ) : transaction.category == "Food and Dinning" ? (
          <LucideHamburger />
        ) : transaction.category == "Freelancing" ? (
          <LucideLaptop />
        ) : transaction.category == "Transportation" ? (
          <LucideCar />
        ) : transaction.category == "Rent/Mortgage" ? (
          <LucideBuilding />
        ) : transaction.category == "Groceries" ? (
          <LucideCandy />
        ) : transaction.category == "Health and Medical" ? (
          <LucideBriefcaseMedical />
        ) : transaction.category == "Entertainment" ? (
          <LucideYoutube />
        ) : transaction.category == "Education" ? (
          <LucideBookOpen />
        ) : transaction.category == "Travel" ? (
          <LucidePlaneTakeoff />
        ) : transaction.category == "Insurance" ? (
          <LucideLineSquiggle />
        ) : transaction.category == "Electric Bills" ? (
          <LucideLightbulb />
        ) : transaction.category == "Mobile Recharge" ? (
          <LucideCardSim />
        ) : (
          <LucideDollarSign />
        )}

        {transaction.attachment && (
          <span className="absolute top-0 right-0 outline-2 outline-white rounded-full bg-white">
            <LucideImage color="#000" size={10} />
          </span>
        )}
      </div>
      <div className="flex items-center justify-between grow">
        <div className="">
          <h2 className="font-medium">{transaction.category}</h2>
          <p className="text-sm">
            {transaction.note!.length > 40
              ? transaction.note?.slice(0, 40)
              : transaction.note!}
          </p>
        </div>
        <div className="">
          <p
            className={cn(
              "text-base font-medium text-end",
              transaction.type == "Expense"
                ? "text-destructive"
                : "text-green-500"
            )}
          >
            {transaction.type == "Expense"
              ? "- "
              : transaction.type == "Income"
              ? "+ "
              : "~ "}
            {formatCurrency(transaction.amount)}
          </p>
          <p className="text-sm font-light text-end">
            {format(transaction.date, "PP")}
          </p>
        </div>
      </div>
    </div>
  );
}
