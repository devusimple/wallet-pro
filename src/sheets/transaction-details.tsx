import DetailsContent from "@/components/transactions-details-content";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTransactionDetailsSheetControl } from "@/lib/store";

export default function TransactionDetailsSheet() {
  const { isOpen, closeSheet } = useTransactionDetailsSheetControl();

  return (
    <div className="">
      <Sheet open={isOpen} onOpenChange={(open) => !open && closeSheet()}>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Transaction Details</SheetTitle>
            <SheetDescription>
              show details the selected transaction.
            </SheetDescription>
          </SheetHeader>
          <div className="">
            <DetailsContent />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
