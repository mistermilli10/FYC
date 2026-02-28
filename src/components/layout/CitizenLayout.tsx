import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ShieldCheck, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export function CitizenLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6FA]">
      <header className="absolute top-0 left-0 right-0 z-20 py-6 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-8 h-8 text-[#003DA5]" />
            </div>
            <span className="font-heading font-bold text-2xl text-white tracking-tight drop-shadow-md">
              Fourrière<span className="text-[#FFD700]">GN</span>
            </span>
          </Link>
          <nav className="hidden sm:flex gap-6 items-center">
            <Link
              to="/agent/login"
              className="text-sm font-bold text-[#1A1A2E] bg-[#FFD700] hover:bg-[#E6C200] px-6 py-2.5 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Accès Agent
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <footer className="bg-[#1A1A2E] text-white pt-20 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <ShieldCheck className="w-8 h-8 text-[#FFD700]" />
                </div>
                <span className="font-heading font-bold text-2xl text-white tracking-tight">
                  Fourrière<span className="text-[#FFD700]">GN</span>
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">
                Plateforme officielle de localisation des véhicules mis en fourrière par la Police Routière de la République de Guinée.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Liens Rapides</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" /> Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/agent/login" className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" /> Espace Agent
                  </Link>
                </li>
                <li>
                  <Link to="/admin/login" className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" /> Administration
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Contact & Urgence</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400 text-sm">
                  <Phone className="w-5 h-5 text-[#FFD700] shrink-0" />
                  <div>
                    <p className="font-bold text-white">117</p>
                    <p>Numéro vert gratuit (Police)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-gray-400 text-sm">
                  <Mail className="w-5 h-5 text-[#FFD700] shrink-0" />
                  <div>
                    <p className="font-bold text-white">contact@fourriere.gov.gn</p>
                    <p>Support technique</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Address */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Direction Centrale</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin className="w-5 h-5 text-[#FFD700] shrink-0" />
                  <p className="leading-relaxed">
                    Direction Centrale de la Police de la Route<br />
                    Conakry, République de Guinée
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} FourrièreGN. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
