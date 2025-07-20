import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import BottomTabs from "./components/bottom-tabs";
import { BrowserRouter, Route, Routes } from "react-router";
import HomeScreen from "./screens/home";
import TransactionCreateSheet from "./sheets/transaction-create";
import SettingScreen from "./screens/setting";
import TransactionDetailsSheet from "./sheets/transaction-details";
import { Toaster } from "./components/ui/sonner";
import AnalysisScreen from "./screens/analysis";
import ReportsScreen from "./screens/reports";
import PWABadge from "./PWABadge";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<HomeScreen />} />
        <Route path="reports" element={<ReportsScreen />} />
        <Route path="analysis" element={<AnalysisScreen />} />
        <Route path="setting" element={<SettingScreen />} />
      </Routes>
      <BottomTabs />
      <TransactionCreateSheet />
      <TransactionDetailsSheet />
    </BrowserRouter>
    <PWABadge />
    <Toaster />
  </StrictMode>
);
