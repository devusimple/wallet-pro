import CreateTransactionForm from "@/components/create-transaction-form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTransactionCreateSheetControl } from "@/lib/store";
import { createTransaction } from "@/lib/transactions";
import { Record } from "@/types";
import { LucideLoader, LucideSave, LucideX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function TransactionCreateSheet() {
  const { isOpen, closeSheet } = useTransactionCreateSheetControl();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record>({
    amount: 0,
    type: "Expense",
    method: "",
    category: "",
    date: new Date(),
    note: "",
    attachment: undefined,
    synced: false,
    created_at: new Date(),
    updated_at: new Date(),
  });

  function save() {
    if (
      formData.amount != 0 &&
      formData.method.trim() != "" &&
      formData.category.trim() != ""
    ) {
      createTransaction({ formData, setLoading }).then(() => {
        closeSheet();
        window.location.reload();
      });
    } else {
      toast.error("All Input field should not be empty!");
    }
  }

  return (
    <div className="">
      <Sheet open={isOpen} onOpenChange={(open) => !open && closeSheet()}>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Create new transaction</SheetTitle>
          </SheetHeader>

          <div className="p-3">
            <CreateTransactionForm
              formData={formData}
              setFormData={setFormData}
            />
          </div>

          <SheetFooter className="flex flex-row items-center justify-end">
            <Button
              className="flex-1 cursor-pointer disabled:cursor-not-allowed"
              onClick={save}
              disabled={
                formData.amount == 0 &&
                formData.method == "" &&
                formData.category == ""
              }
            >
              {loading ? (
                <LucideLoader />
              ) : (
                <>
                  <LucideSave />
                  <p>Save</p>
                </>
              )}
            </Button>
            <Button onClick={closeSheet} size={"icon"} variant={"destructive"}>
              <LucideX />
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
