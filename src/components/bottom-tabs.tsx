import { cn } from "@/lib/utils";
import { BarChart3, FileText, Settings, FolderClock } from "lucide-react";

import { NavLink } from "react-router";

export default function BottomTabs() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-500 dark:border-gray-400">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            cn(
              "cursor-pointer inline-flex flex-col items-center justify-center px-5 text-gray-600",
              isActive && "text-teal-400 border-t-2 border-green-500"
            )
          }
        >
          <FolderClock className="w-5 h-5" />
          <span className="text-xs font-medium">Transactions</span>
        </NavLink>

        <NavLink
          to={"/reports"}
          className={({ isActive }) =>
            cn(
              "cursor-pointer inline-flex flex-col items-center justify-center px-5 text-gray-600",
              isActive && "text-teal-400 border-t-2 border-green-500"
            )
          }
        >
          <FileText className="w-5 h-5" />
          <span className="text-xs font-medium">Reports</span>
        </NavLink>

        <NavLink
          to={"/analysis"}
          className={({ isActive }) =>
            cn(
              "cursor-pointer inline-flex flex-col items-center justify-center px-5 text-gray-600",
              isActive && "text-teal-400 border-t-2 border-green-500"
            )
          }
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-xs font-medium">Analysis</span>
        </NavLink>
        <NavLink
          to={"/setting"}
          className={({ isActive }) =>
            cn(
              "cursor-pointer inline-flex flex-col items-center justify-center px-5 text-gray-600",
              isActive && "text-teal-400 border-t-2 border-green-500"
            )
          }
        >
          <Settings className="w-5 h-5" />
          <span className="text-xs font-medium">Setting</span>
        </NavLink>
      </div>
    </div>
  );
}
