import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, Mail } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";

export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Mock login
    setTimeout(() => {
      if (email && password === "admin") {
        localStorage.setItem("adminAuth", "true");
        navigate("/admin/dashboard");
      } else {
        setError("Identifiants incorrects. Mot de passe de test: admin");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F6FA] p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-6 bg-[#1A1A2E] text-white rounded-t-xl">
          <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-[#FFD700]" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Administration
          </CardTitle>
          <p className="text-sm text-gray-400 mt-1">Plateforme FourrièreGN</p>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div role="alert" className="p-3 bg-[#DC3545]/10 border border-[#DC3545]/20 rounded-lg text-sm text-[#DC3545] text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email-input" className="text-sm font-medium text-[#1A1A2E]">
                Email administrateur
              </label>
              <div className="relative">
                <Input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@fourriere.gn"
                  required
                  className="h-12 pl-10"
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password-input" className="text-sm font-medium text-[#1A1A2E]">
                Mot de passe
              </label>
              <div className="relative">
                <Input
                  id="password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-12 pl-10"
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold mt-8 bg-[#1A1A2E] hover:bg-black"
              isLoading={isLoading}
            >
              Connexion au Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
