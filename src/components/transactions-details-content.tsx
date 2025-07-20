import {
  LucideCalendar,
  LucideCreditCard,
  LucideDollarSign,
  LucideDownload,
  LucideFileEdit,
  LucideFolder,
  LucideImage,
  LucideLoader2,
  LucideRepeat,
  LucideSaveAll,
  LucideTrash2,
  LucideX,
} from "lucide-react";
import { Button } from "./ui/button";
import { useTransactionDetailsSheetControl } from "@/lib/store";
import { db } from "@/db/db";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { format } from "date-fns";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toPng } from "html-to-image";
import download from "downloadjs";
import { toast } from "sonner";
import { Record } from "@/types";

export default function DetailsContent() {
  const { closeSheet, id } = useTransactionDetailsSheetControl();
  const [data, setData] = useState<Record>();
  const [openModel, setOpenModel] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const downloadImage = async () => {
    setLoading(true);
    try {
      if (ref.current != null) {
        await toPng(ref.current, {
          quality: 0.99,
        }).then((v) => {
          download(v, `image-${Date.now()}.png`);
          toast.success("Image download successful");
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      db.transactions.get(id).then((v) => {
        setData(v);
      });
    }
  }, [id]);

  if (!data) return;

  return (
    <div className="px-6" ref={ref}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Amount */}
        <div className="flex items-center gap-3">
          <LucideDollarSign className="w-5 h-5" />
          <div className="">
            <h1 className="text-sm block">Transaction Amount</h1>
            <p className="text-base font-medium">{data?.amount}</p>
          </div>
        </div>

        {/* Transaction Date */}
        <div className="flex items-center gap-3">
          <LucideCalendar className="w-5 h-5" />
          <div className="">
            <h1 className="text-sm block">Transaction Date</h1>
            <p className="text-base font-medium">
              {format(data!.date, "PPpp")}
            </p>
          </div>
        </div>

        {/* Transaction Type */}
        <div className="flex items-center gap-3">
          <LucideRepeat className="w-5 h-5" />
          <div className="">
            <h1 className="text-sm block">Transaction Type</h1>
            <p className="text-base font-medium">{data?.type}</p>
          </div>
        </div>

        {/* Transaction Category */}
        <div className="flex items-center gap-3">
          <LucideFolder className="w-5 h-5" />
          <div className="">
            <h1 className="text-sm block">Transaction Category</h1>
            <p className="text-base font-medium">{data?.category}</p>
          </div>
        </div>

        {/* Transaction Method */}
        <div className="flex items-center gap-3">
          <LucideCreditCard className="w-5 h-5" />
          <div className="">
            <h1 className="text-sm block">Transaction Method</h1>
            <p className="text-base font-medium">{data?.method}</p>
          </div>
        </div>

        {/* Transaction Note */}
        <div className="mb-2">
          <h1 className="text-lg font-medium">Transaction Note</h1>
          <p className="text-pretty px-2 border-l-2">{data?.note}</p>
        </div>
        {data?.attachment && (
          <div className="space-y-1">
            <h1 className="font-medium flex items-center gap-1">
              <LucideImage size={16} />
              <p>Attachment</p>
            </h1>

            <div className="px-3">
              <Dialog>
                <DialogTrigger asChild>
                  <img
                    src={URL.createObjectURL(data?.attachment)}
                    className="w-16 cursor-pointer h-16 object-cover ring-1 ring-primary rounded-md"
                    alt=""
                  />
                </DialogTrigger>
                <DialogContent className='overflow-y-aut'>
                  <DialogHeader>
                    <DialogTitle>Attachment</DialogTitle>
                    <div className="">
                      <img
                        src={URL.createObjectURL(data?.attachment)}
                        className="rounded w-full h-full"
                        alt=""
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={() => {
                          download(
                            data.attachment!,
                            `${data.id}-${data.category}-${
                              data.type
                            }-${data.date.toDateString().replace(" ", "_")}.png`
                          );
                        }}
                      >
                        <LucideDownload />
                        Save the Attachment
                      </Button>
                    </DialogFooter>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 justify-end py-2 mt-2 border-t">
        {/* delete */}
        <Dialog
          open={openModel}
          onOpenChange={(open) => !open && setOpenModel(false)}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setOpenModel(true)} variant={"destructive"}>
              <LucideTrash2 />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Transaction</DialogTitle>
              <DialogDescription>
                Are you sure to delete this transaction?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setOpenModel(false)}>Cancel</Button>
              <Button
                onClick={async () => {
                  await db.transactions
                    .delete(id)
                    .then(() => setOpenModel(false));
                  closeSheet();
                }}
                variant={"destructive"}
              >
                Yes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* update */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"} onClick={() => {}}>
              <LucideFileEdit />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Transaction</DialogTitle>
              <DialogDescription className="text-left">
                Update your selected transaction to provided an valid info.
              </DialogDescription>
              <div className="">
                <span>
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" placeholder="$00.00" />
                </span>
                <span>
                  <Label htmlFor="type">Amount</Label>
                  <Input id="type" placeholder="$00.00" />
                </span>
              </div>
            </DialogHeader>
            <DialogFooter>
              <Button>
                <LucideSaveAll />
              </Button>
              <Button>
                <LucideX />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* downloading */}
        <Button onClick={downloadImage} className="grow">
          {loading ? (
            <LucideLoader2 className="animate-spin" />
          ) : (
            <>
              Save as Image
              <LucideDownload />
            </>
          )}
        </Button>
        <Button variant={"secondary"} onClick={closeSheet}>
          <LucideX />
        </Button>
      </div>
    </div>
  );
}
