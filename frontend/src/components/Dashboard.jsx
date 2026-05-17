import { useState } from "react";

import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";

import DashboardHome from "../pages/DashboardHome";

import LocalCustomers from "../pages/LocalCustomers";

import RegularCustomers from "../pages/RegularCustomers";

export default function Dashboard({ handleLogout, loading }) {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div className="flex bg-gradient-to-br from-black via-slate-950 to-gray-900 min-h-screen">
      {/* SIDEBAR */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* MAIN */}
      <div className="flex-1">
        {/* TOPBAR */}
        <Topbar handleLogout={handleLogout} loading={loading} />

        {/* PAGES */}
        {currentPage === "dashboard" && <DashboardHome />}

        {currentPage === "local" && <LocalCustomers />}

        {currentPage === "regular" && <RegularCustomers />}
      </div>
    </div>
  );
}
