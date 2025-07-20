import PDFDocument from "@/components/pdf-creator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/db/db";
import { useTransactionsStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import { exportData, syncData } from "@/lib/utils";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { User } from "@supabase/supabase-js";
import download from "downloadjs";
import {
  Bell,
  Database,
  LogIn,
  LogOut,
  LucideFacebook,
  LucideFileCheck,
  LucideFileJson2,
  LucideGithub,
  LucideLoader,
  LucideMessageCircle,
  LucideUploadCloud,
  LucideUser,
  Trash2,
  Upload,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function SettingScreen() {
  const [notifications, setNotifications] = useState(true);
  const [currency, setCurrency] = useState("USD");
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uploading, setUploading] = useState(false);
  const { loading, transactions, fetchTransactions } = useTransactionsStore();

  const handleExportData = async () => {
    try {
      const jsonFile = await exportData();
      if (jsonFile) {
        download(jsonFile, `wallet-${new Date().toLocaleString()}.json`);
      }
      toast("Your data has been exported successfully.");
    } catch (error) {
      console.log(error);
      toast("Failed to export data. Please try again.");
    }
  };

  const handleImportData = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // await importData(file)
      toast("Your data has been imported successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to import data. Please check the file format.");
    }
  };

  React.useMemo(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  }, []);

  const handleClearData = async () => {
    try {
      await db.transactions.clear();
      toast.success("All data has been cleared successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to clear data. Please try again.");
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      await syncData().then(() => {
        toast.success("Uploaded Successfully");
      });
    } catch (error) {
      console.log(error);
      toast.error("Uploaded Failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <h1 className="text-lg font-semibold">Settings</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <LucideUser className="h-4 w-4 mr-2" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {user != null ? `${user.email}` : "Guest User"}
                </p>
                <p className="text-sm text-gray-600">Signed in</p>
              </div>
              {user != null ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => {}}>
                      <LogOut className="h-4 w-4 mr-1" />
                      Logout
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Logout</DialogTitle>
                    </DialogHeader>
                    <p>Are sure to logout?</p>
                    <DialogFooter>
                      <Button
                        variant={"destructive"}
                        onClick={async () => {
                          await supabase.auth.signOut();
                          toast("Successfully logout user!");
                        }}
                      >
                        Yes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => {}}>
                      <LogIn className="h-4 w-4 mr-1" />
                      Login
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Authentication</DialogTitle>
                    </DialogHeader>
                    <div>
                      <Tabs defaultValue="login">
                        <TabsList className="w-full">
                          <TabsTrigger value="login">Login</TabsTrigger>
                          <TabsTrigger value="register">Register</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login" className="space-y-3 mt-3">
                          <span className="grid gap-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              onChange={(e) => setEmail(e.target.value)}
                              type="email"
                              placeholder="example@gmail.com"
                            />
                          </span>
                          <span className="grid gap-1">
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="password"
                              onChange={(e) => setPassword(e.target.value)}
                              type="password"
                              placeholder="e.g #8!jdGs8i#"
                            />
                          </span>
                          <span className="grid gap-1">
                            <Button
                              onClick={async () => {
                                try {
                                  if (
                                    email.trim() == "" &&
                                    password.trim() == ""
                                  ) {
                                    toast.error("Input field can't be empty!");
                                    return;
                                  }
                                  await supabase.auth.signInWithPassword({
                                    email,
                                    password,
                                  });
                                  toast.success("Login successful!");
                                } catch (error) {
                                  console.log(error);
                                  toast.error("Failed to login!");
                                }
                              }}
                            >
                              Login
                            </Button>
                          </span>
                          <p className="underline font-medium">
                            Forgot Password?
                          </p>
                        </TabsContent>
                        <TabsContent
                          value="register"
                          className="space-y-3 mt-3"
                        >
                          <span className="grid gap-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              required
                              type="email"
                              placeholder="example@gmail.com"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </span>
                          <span className="grid gap-1">
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="password"
                              required
                              onChange={(e) => setPassword(e.target.value)}
                              type="password"
                              placeholder="e.g #8!jdGs8i#"
                            />
                          </span>
                          <span className="grid gap-1">
                            <Button
                              onClick={async () => {
                                try {
                                  if (
                                    email.trim() == "" &&
                                    password.trim() == ""
                                  ) {
                                    toast.error("Input field can't be empty!");
                                    return;
                                  }
                                  await supabase.auth.signUp({
                                    email,
                                    password,
                                  });
                                  toast.success("Create successful!");
                                } catch (error) {
                                  console.log(error);
                                  toast.error("Failed to create!");
                                }
                              }}
                            >
                              Create
                            </Button>
                          </span>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-gray-600">
                  Receive transaction reminders
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Currency</label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="BDT">BDT (৳)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Theme</label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Database className="h-4 w-4 mr-2" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full justify-start"
              onClick={async () => {
                await fetchTransactions();
              }}
            >
              <PDFDownloadLink
                document={
                  <PDFDocument
                    title="Transactions All Time"
                    transactions={transactions}
                  />
                }
                fileName="Transaction-All"
                className="flex items-center"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <LucideLoader className="animate-spin" />
                  </span>
                ) : (
                  <>
                    <LucideFileCheck className="h-4 w-4 mr-2" />
                    Export Data As PDF
                  </>
                )}
              </PDFDownloadLink>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
              onClick={handleExportData}
            >
              <LucideFileJson2 className="h-4 w-4 mr-2" />
              Export Data As JSON
            </Button>

            <div>
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
                id="import-file"
              />
              <Button
                className="w-full justify-start bg-blue-400"
                onClick={() => document.getElementById("import-file")?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Import Data
              </Button>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full justify-start">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  <p className="text-destructive">
                    Before proceed make sure to backup your data otherwise maybe
                    lost your data permanently.
                  </p>
                </DialogDescription>
                <DialogFooter>
                  <DialogTrigger>
                    <Button onClick={handleClearData} variant={"destructive"}>
                      Proceed to Delete
                    </Button>
                  </DialogTrigger>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog
              open={uploading}
              onOpenChange={(open) => !open && setUploading(false)}
            >
              <DialogTrigger asChild>
                <Button
                  onClick={handleUpload}
                  className="w-full bg-green-400 justify-start"
                >
                  <LucideUploadCloud className="h-4 w-4 mr-2" />
                  Upload in Server
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload</DialogTitle>
                  <DialogDescription>
                    Maybe take some time to uploaded data on server. Please keep
                    wait until upload finished.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center">
                  <LucideLoader className="animate-spin" />
                  <p>Uploading</p>
                </div>
                <DialogFooter>
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      setUploading(false);
                      window.location.reload();
                    }}
                  >
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-sm text-gray-600">
              <p>Wallet Pro v1.0.0</p>
              <p>Built with React.js & PWA</p>
            </div>
            <CardFooter className="flex items-center justify-center">
              <a href={"https://www.facebook.com/huzzat77"} target="_blink">
              <Button size={"icon"} variant={"link"}>
                <LucideFacebook />
              </Button>
              </a>
                <a href={"https://www.github.com/devusimple"} target="_blink">
              <Button size={"icon"} variant={"link"}>
                <LucideGithub />
              </Button>
              </a>
                <a href={"https://wa.me/8801310289950"} target="_blink">
              <Button size={"icon"} variant={"link"}>
                <LucideMessageCircle />
              </Button>
              </a>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
