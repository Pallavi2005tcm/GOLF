import Header from "../components/Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header Top */}
      <Header />

      {/* Below Header → Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar Left */}
        <div className="h-full w-64 bg-gradient-to-b from-white to-[rgb(209,216,190)] shadow-md flex-shrink-0">
          <Sidebar />
        </div>

        {/* Content Right */}
        <main className="flex-1 bg-white overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}