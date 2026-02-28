import React from "react";
import { Outlet, Navigate, Link } from "react-router-dom";

export function AgentLayout() {
  // Simple mock auth check
  const isAuthenticated = localStorage.getItem("agentAuth") === "true";

  if (!isAuthenticated && window.location.pathname !== "/agent/login") {
    return <Navigate to="/agent/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex flex-col">
      <header className="bg-[#003DA5] text-white p-4 shadow-md sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="font-heading font-bold text-lg tracking-tight">
            Fourrière<span className="text-[#FFD700]">GN</span>{" "}
            <span className="text-sm font-normal opacity-80 ml-2">| Agent</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-white/80 hover:text-white font-medium">
              Portail Citoyen
            </Link>
            {isAuthenticated && (
              <button
                onClick={() => {
                  localStorage.removeItem("agentAuth");
                  window.location.href = "/agent/login";
                }}
                className="text-sm text-white/80 hover:text-white font-medium"
              >
                Déconnexion
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col w-full max-w-md mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
