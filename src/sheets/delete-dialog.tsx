import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDeleteDialog } from "@/lib/store";

export default function DeleteDialog() {
  const { isOpen } = useDeleteDialog();
  return (
    <Dialog open={isOpen}>
      <DialogContent>Are you sure?</DialogContent>
    </Dialog>
  );
}
