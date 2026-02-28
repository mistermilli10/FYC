import React, { useState } from "react";
import {
  Search,
  AlertCircle,
  MapPin,
  Phone,
  Calendar,
  Car,
  ShieldCheck,
  Info,
  FileText,
  CreditCard,
  UserCheck,
  ChevronDown
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";

export function CitizenPortal() {
  const { searchVehicle, lots } = useAppContext();
  const [plate, setPlate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plate.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    setResult(null);

    // Simulate network delay
    setTimeout(() => {
      const vehicle = searchVehicle(plate);
      if (vehicle) {
        const lot = lots.find((l) => l.id === vehicle.lotId);
        setResult({ ...vehicle, lot });
      } else {
        setResult(null);
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Massive Hero Section */}
      <section className="relative w-full bg-[#003DA5] pt-32 pb-24 px-6 overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
        {/* Background Pattern / Overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#003DA5]/90"></div>
        
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-8 backdrop-blur-sm">
              <Info className="w-4 h-4 text-[#FFD700]" />
              Service Officiel de la Police Routière
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 tracking-tight leading-tight">
              Localisez votre <br className="hidden md:block" />
              <span className="text-[#FFD700]">véhicule en fourrière</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light">
              Entrez votre numéro de plaque d'immatriculation pour vérifier instantanément si votre véhicule a été verbalisé et localiser sa fourrière.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSearch}
            className="w-full max-w-2xl mx-auto relative mt-12"
            aria-label="Recherche de véhicule"
          >
            <div className="relative flex flex-col sm:flex-row items-center bg-white p-2 rounded-2xl sm:rounded-full shadow-2xl border-4 border-white/20 focus-within:border-[#FFD700]/50 transition-all">
              <div className="hidden sm:flex pl-5 text-[#003DA5]" aria-hidden="true">
                <Search className="w-6 h-6" />
              </div>
              <label htmlFor="plate-search" className="sr-only">Numéro de plaque d'immatriculation</label>
              <input
                id="plate-search"
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                placeholder="Ex: RC-1234-A"
                className="w-full h-14 sm:h-16 px-4 sm:px-4 text-xl sm:text-2xl font-heading font-bold text-[#1A1A2E] placeholder:text-gray-300 focus:outline-none uppercase bg-transparent text-center sm:text-left"
                aria-required="true"
              />
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 rounded-xl sm:rounded-full text-lg font-bold bg-[#FFD700] text-[#1A1A2E] hover:bg-[#E6C200] shadow-lg mt-2 sm:mt-0 shrink-0"
                disabled={!plate.trim() || isLoading}
              >
                {isLoading ? "Recherche..." : "Rechercher"}
              </Button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Results Section */}
      {(isLoading || hasSearched) && (
        <section 
          className="w-full max-w-4xl mx-auto px-6 py-16"
          aria-live="polite"
          aria-atomic="true"
        >
          {isLoading && (
            <Card className="overflow-hidden shadow-xl border-0 rounded-3xl">
              <div className="h-64 bg-gray-200 animate-pulse" />
              <CardContent className="p-8 space-y-6">
                <Skeleton className="h-10 w-1/3" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-5/6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!isLoading && hasSearched && result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="overflow-hidden border-0 shadow-2xl rounded-3xl bg-white">
                {result.photoUrl ? (
                  <div className="h-72 md:h-96 w-full relative">
                    <img
                      src={result.photoUrl}
                      alt="Véhicule en fourrière"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 right-6 bg-[#DC3545] text-white px-6 py-2 rounded-full font-bold text-lg shadow-xl flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      En fourrière
                    </div>
                  </div>
                ) : (
                  <div className="h-64 w-full bg-[#F4F6FA] flex items-center justify-center border-b border-gray-100">
                    <Car className="w-24 h-24 text-gray-300" />
                  </div>
                )}

                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-8 border-b border-gray-100">
                    <div>
                      <p className="text-[#6B7280] font-medium mb-1 uppercase tracking-wider text-sm">Plaque d'immatriculation</p>
                      <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1A1A2E]">
                        {result.plateNumber}
                      </h2>
                    </div>
                  </div>

                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#003DA5]/10 flex items-center justify-center shrink-0">
                          <MapPin className="w-6 h-6 text-[#003DA5]" />
                        </div>
                        <div>
                          <p className="text-sm text-[#6B7280] font-medium mb-1">Lieu de rétention</p>
                          <p className="font-bold text-xl text-[#1A1A2E]">{result.lot.name}</p>
                          <p className="text-[#6B7280] mt-1">{result.lot.address}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#003DA5]/10 flex items-center justify-center shrink-0">
                          <Phone className="w-6 h-6 text-[#003DA5]" />
                        </div>
                        <div>
                          <p className="text-sm text-[#6B7280] font-medium mb-1">Contact Fourrière</p>
                          <p className="font-bold text-xl text-[#1A1A2E]">{result.lot.contact}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#003DA5]/10 flex items-center justify-center shrink-0">
                          <Calendar className="w-6 h-6 text-[#003DA5]" />
                        </div>
                        <div>
                          <p className="text-sm text-[#6B7280] font-medium mb-1">
                            Date et heure de saisie
                          </p>
                          <p className="font-bold text-xl text-[#1A1A2E] capitalize">
                            {format(
                              new Date(result.timestamp),
                              "EEEE d MMMM yyyy",
                              { locale: fr },
                            )}
                          </p>
                          <p className="text-[#6B7280] mt-1">
                            à {format(new Date(result.timestamp), "HH:mm")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 p-6 bg-[#FFD700]/10 rounded-2xl border border-[#FFD700]/30 flex items-start gap-4">
                    <AlertCircle className="w-8 h-8 text-[#B89600] shrink-0" />
                    <div>
                      <h4 className="font-bold text-[#8A7100] mb-2 text-lg">Procédure de récupération</h4>
                      <p className="text-[#8A7100] leading-relaxed">
                        Veuillez vous présenter à la fourrière muni de votre <strong>carte grise</strong>, <strong>permis de conduire</strong> et <strong>assurance valide</strong>. Des frais de garde et de remorquage s'appliquent et doivent être réglés sur place.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {!isLoading && hasSearched && !result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="border-0 bg-white shadow-2xl rounded-3xl overflow-hidden">
                <div className="h-3 bg-[#28A745]"></div>
                <CardContent className="p-10 text-center flex flex-col items-center">
                  <div className="w-24 h-24 bg-[#28A745]/10 rounded-full flex items-center justify-center mb-6">
                    <ShieldCheck className="w-12 h-12 text-[#28A745]" />
                  </div>
                  <h3 className="text-3xl font-heading font-bold text-[#1A1A2E] mb-4">
                    Véhicule non trouvé
                  </h3>
                  <p className="text-lg text-[#6B7280] mb-8 max-w-md">
                    Bonne nouvelle ! Aucun véhicule correspondant à la plaque <strong className="text-[#1A1A2E] bg-gray-100 px-2 py-1 rounded">{plate}</strong> n'est actuellement enregistré dans nos fourrières.
                  </p>
                  <div className="p-6 bg-[#F4F6FA] rounded-2xl w-full border border-gray-100">
                    <p className="text-[#6B7280] mb-2 font-medium">En cas d'urgence, de vol ou de doute :</p>
                    <p className="text-3xl font-bold text-[#DC3545] flex items-center justify-center gap-3">
                      <Phone className="w-8 h-8" /> 117
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Numéro vert gratuit de la Police Nationale</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </section>
      )}

      {/* Marketing Section: How it works */}
      <section className="w-full bg-white py-24 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#1A1A2E] mb-6">
              Comment ça marche ?
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              FourrièreGN simplifie vos démarches en vous permettant de localiser votre véhicule en quelques secondes, en toute transparence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#003DA5]/10 rounded-2xl flex items-center justify-center mb-6 relative">
                <Search className="w-10 h-10 text-[#003DA5]" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#FFD700] text-[#1A1A2E] rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">Recherchez</h3>
              <p className="text-[#6B7280] leading-relaxed">
                Saisissez simplement le numéro de plaque d'immatriculation de votre véhicule dans la barre de recherche sécurisée.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#003DA5]/10 rounded-2xl flex items-center justify-center mb-6 relative">
                <MapPin className="w-10 h-10 text-[#003DA5]" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#FFD700] text-[#1A1A2E] rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">Localisez</h3>
              <p className="text-[#6B7280] leading-relaxed">
                Découvrez instantanément si votre véhicule a été verbalisé et obtenez l'adresse exacte de la fourrière où il se trouve.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#003DA5]/10 rounded-2xl flex items-center justify-center mb-6 relative">
                <Car className="w-10 h-10 text-[#003DA5]" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#FFD700] text-[#1A1A2E] rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">Récupérez</h3>
              <p className="text-[#6B7280] leading-relaxed">
                Suivez les instructions fournies et présentez-vous avec les documents requis pour récupérer votre véhicule sans tracas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Section: Benefits */}
      <section className="w-full bg-[#F4F6FA] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#1A1A2E] mb-6 leading-tight">
                Une plateforme moderne pour un service public transparent
              </h2>
              <p className="text-lg text-[#6B7280] mb-8">
                Développée pour moderniser la gestion des infractions routières, FourrièreGN offre un accès direct et centralisé à l'information pour tous les citoyens.
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#28A745]/10 flex items-center justify-center shrink-0 mt-1">
                    <ShieldCheck className="w-5 h-5 text-[#28A745]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1A2E] text-lg">Information Officielle</h4>
                    <p className="text-[#6B7280]">Données synchronisées en temps réel avec les services de la Police Routière.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#003DA5]/10 flex items-center justify-center shrink-0 mt-1">
                    <Calendar className="w-5 h-5 text-[#003DA5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1A2E] text-lg">Disponible 24/7</h4>
                    <p className="text-[#6B7280]">Vérifiez le statut de votre véhicule à tout moment, de jour comme de nuit.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center shrink-0 mt-1">
                    <Phone className="w-5 h-5 text-[#B89600]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1A2E] text-lg">Assistance Rapide</h4>
                    <p className="text-[#6B7280]">Accès direct aux contacts des fourrières et numéros d'urgence.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#003DA5] to-[#0052CC] rounded-[3rem] transform rotate-3 scale-105 opacity-20 blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=1000" 
                alt="Véhicules en fourrière" 
                className="relative z-10 rounded-[3rem] shadow-2xl object-cover h-[600px] w-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#1A1A2E] mb-6">
              Questions Fréquentes
            </h2>
            <p className="text-lg text-[#6B7280]">
              Tout ce que vous devez savoir sur la procédure de récupération de votre véhicule.
            </p>
          </div>
          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div 
              className={`border border-gray-100 rounded-3xl overflow-hidden transition-all duration-300 ${openFaq === 0 ? 'bg-[#F4F6FA] shadow-md' : 'bg-white hover:bg-gray-50'}`}
            >
              <button 
                onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === 0 ? 'bg-[#003DA5] text-white' : 'bg-[#003DA5]/10 text-[#003DA5]'}`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-[#1A1A2E]">Quels documents dois-je fournir ?</h4>
                </div>
                <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${openFaq === 0 ? 'rotate-180' : ''}`} />
              </button>
              <div 
                className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === 0 ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-[#6B7280] leading-relaxed pl-16">Pour récupérer votre véhicule, vous devez obligatoirement présenter : votre pièce d'identité, le certificat d'immatriculation (carte grise) du véhicule, et une attestation d'assurance en cours de validité.</p>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div 
              className={`border border-gray-100 rounded-3xl overflow-hidden transition-all duration-300 ${openFaq === 1 ? 'bg-[#F4F6FA] shadow-md' : 'bg-white hover:bg-gray-50'}`}
            >
              <button 
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === 1 ? 'bg-[#003DA5] text-white' : 'bg-[#003DA5]/10 text-[#003DA5]'}`}>
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-[#1A1A2E]">Quels sont les frais à payer ?</h4>
                </div>
                <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${openFaq === 1 ? 'rotate-180' : ''}`} />
              </button>
              <div 
                className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === 1 ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-[#6B7280] leading-relaxed pl-16">Les frais incluent l'amende liée à l'infraction, les frais d'enlèvement (remorquage) et les frais de garde journaliers. Le montant total vous sera communiqué au guichet de la fourrière.</p>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div 
              className={`border border-gray-100 rounded-3xl overflow-hidden transition-all duration-300 ${openFaq === 2 ? 'bg-[#F4F6FA] shadow-md' : 'bg-white hover:bg-gray-50'}`}
            >
              <button 
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === 2 ? 'bg-[#003DA5] text-white' : 'bg-[#003DA5]/10 text-[#003DA5]'}`}>
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-[#1A1A2E]">Puis-je envoyer quelqu'un d'autre récupérer mon véhicule ?</h4>
                </div>
                <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${openFaq === 2 ? 'rotate-180' : ''}`} />
              </button>
              <div 
                className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === 2 ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-[#6B7280] leading-relaxed pl-16">Oui, une tierce personne peut récupérer le véhicule si elle présente une procuration signée de votre part, une copie de votre pièce d'identité, sa propre pièce d'identité, ainsi que les documents du véhicule.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
