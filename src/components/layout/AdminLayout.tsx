import React from "react";
import { Outlet, Navigate, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MapPin,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export function AdminLayout() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("adminAuth") === "true";

  if (!isAuthenticated && window.location.pathname !== "/admin/login") {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAuthenticated) {
    return <Outlet />;
  }

  const navItems = [
    {
      path: "/admin/dashboard",
      icon: LayoutDashboard,
      label: "Tableau de bord",
    },
    { path: "/admin/agents", icon: Users, label: "Agents" },
    { path: "/admin/lots", icon: MapPin, label: "Fourrières" },
    { path: "/admin/settings", icon: Settings, label: "Paramètres" },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1A2E] text-white flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <ShieldCheck className="w-6 h-6 text-[#FFD700] mr-2" />
          <span className="font-heading font-bold text-lg tracking-tight">
            Fourrière<span className="text-[#FFD700]">GN</span>
          </span>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-[#003DA5] text-white font-medium"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <ShieldCheck className="w-5 h-5" />
            Portail Citoyen
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("adminAuth");
              window.location.href = "/admin/login";
            }}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:px-8">
          <h1 className="font-heading font-semibold text-xl text-[#1A1A2E]">
            {navItems.find((item) => item.path === location.pathname)?.label ||
              "Administration"}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-[#003DA5] rounded-full flex items-center justify-center text-white font-bold text-sm">
              AD
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
