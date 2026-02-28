/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { CitizenLayout } from "./components/layout/CitizenLayout";
import { CitizenPortal } from "./pages/CitizenPortal";
import { AgentLayout } from "./components/layout/AgentLayout";
import { AgentLogin } from "./pages/AgentLogin";
import { AgentDashboard } from "./pages/AgentDashboard";
import { AdminLayout } from "./components/layout/AdminLayout";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Citizen Portal */}
          <Route path="/" element={<CitizenLayout />}>
            <Route index element={<CitizenPortal />} />
          </Route>

          {/* Agent Interface */}
          <Route path="/agent" element={<AgentLayout />}>
            <Route index element={<Navigate to="/agent/dashboard" replace />} />
            <Route path="login" element={<AgentLogin />} />
            <Route path="dashboard" element={<AgentDashboard />} />
          </Route>

          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            {/* Placeholder routes for sidebar links */}
            <Route
              path="agents"
              element={
                <div className="p-6 text-gray-500">
                  Gestion des agents (À venir)
                </div>
              }
            />
            <Route
              path="lots"
              element={
                <div className="p-6 text-gray-500">
                  Gestion des fourrières (À venir)
                </div>
              }
            />
            <Route
              path="settings"
              element={
                <div className="p-6 text-gray-500">Paramètres (À venir)</div>
              }
            />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
