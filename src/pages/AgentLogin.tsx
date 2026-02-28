import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";

export function AgentLogin() {
  const navigate = useNavigate();
  const [badge, setBadge] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Mock login
    setTimeout(() => {
      if (badge && password === "1234") {
        localStorage.setItem("agentAuth", "true");
        localStorage.setItem("agentBadge", badge);
        navigate("/agent/dashboard");
      } else {
        setError("Identifiants incorrects. Mot de passe de test: 1234");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <Card className="w-full max-w-sm shadow-xl border-t-4 border-t-[#003DA5]">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-[#003DA5]/10 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-[#003DA5]" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#1A1A2E]">
            Connexion Agent
          </CardTitle>
          <p className="text-sm text-[#6B7280]">
            Accès réservé aux forces de l'ordre
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div role="alert" className="p-3 bg-[#DC3545]/10 border border-[#DC3545]/20 rounded-lg text-sm text-[#DC3545] text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="badge-input" className="text-sm font-medium text-[#1A1A2E]">
                Numéro de matricule
              </label>
              <Input
                id="badge-input"
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="Ex: B-1042"
                required
                className="h-12"
              />
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
              className="w-full h-12 text-lg font-semibold mt-6"
              isLoading={isLoading}
            >
              Se connecter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
