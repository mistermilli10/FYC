import React, { useState, useRef } from "react";
import { Camera, Upload, CheckCircle2, AlertCircle, Clock, MapPin, Car, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent } from "../components/ui/Card";

export function AgentDashboard() {
  const { lots, vehicles, addVehicle } = useAppContext();
  const [plate, setPlate] = useState("");
  const [lotId, setLotId] = useState(lots[0]?.id || "");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [sortBy, setSortBy] = useState("date-desc");
  const [showAll, setShowAll] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plate || !lotId) return;

    setIsSubmitting(true);

    // Simulate network request on slow 3G
    setTimeout(() => {
      addVehicle({
        plateNumber: plate.toUpperCase(),
        lotId,
        agentId: "agt-1", // Mock agent ID
        notes,
        photoUrl: photo || undefined,
      });

      setIsSubmitting(false);
      setShowClearConfirm(true);
    }, 2000);
  };

  let displayedVehicles = vehicles.filter((v) => v.agentId === "agt-1" && v.status === "En fourrière");

  displayedVehicles.sort((a, b) => {
    if (sortBy === "date-desc") {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else if (sortBy === "date-asc") {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    } else if (sortBy === "plate-asc") {
      return a.plateNumber.localeCompare(b.plateNumber);
    } else if (sortBy === "lot-asc") {
      const lotA = lots.find(l => l.id === a.lotId)?.name || "";
      const lotB = lots.find(l => l.id === b.lotId)?.name || "";
      return lotA.localeCompare(lotB);
    }
    return 0;
  });

  if (!showAll) {
    displayedVehicles = displayedVehicles.slice(0, 5);
  }

  return (
    <div className="flex-1 flex flex-col pb-8 relative">
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <Card className="w-full max-w-sm shadow-2xl border-0">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-[#28A745]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#28A745]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#1A1A2E] mb-2">Véhicule Enregistré</h3>
              <p className="text-[#6B7280] mb-6">Le véhicule a été mis en fourrière avec succès. Voulez-vous effacer le formulaire pour une nouvelle saisie ?</p>
              <div className="flex gap-3">
                <Button variant="ghost" className="flex-1" onClick={() => setShowClearConfirm(false)}>
                  Conserver
                </Button>
                <Button variant="primary" className="flex-1" onClick={() => {
                  setPlate("");
                  setNotes("");
                  setPhoto(null);
                  setLotId(lots[0]?.id || "");
                  setShowClearConfirm(false);
                }}>
                  Effacer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-[#1A1A2E]">
          Nouvelle Saisie
        </h1>
        <p className="text-sm text-[#6B7280]">
          Enregistrez un véhicule mis en fourrière
        </p>
      </div>

      <Card className="flex-1 shadow-md border-0">
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Plaque */}
            <div className="space-y-2">
              <label htmlFor="plate-input" className="text-sm font-semibold text-[#1A1A2E] flex items-center gap-2">
                Plaque d'immatriculation{" "}
                <span className="text-[#DC3545]" aria-hidden="true">*</span>
              </label>
              <Input
                id="plate-input"
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                placeholder="RC-1234-A"
                required
                aria-required="true"
                className="h-14 text-lg font-heading uppercase"
              />
            </div>

            {/* Fourrière */}
            <div className="space-y-2">
              <label htmlFor="lot-select" className="text-sm font-semibold text-[#1A1A2E] flex items-center gap-2">
                Fourrière de destination{" "}
                <span className="text-[#DC3545]" aria-hidden="true">*</span>
              </label>
              <select
                id="lot-select"
                value={lotId}
                onChange={(e) => setLotId(e.target.value)}
                required
                aria-required="true"
                className="flex h-14 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#003DA5]"
              >
                {lots.map((lot) => (
                  <option key={lot.id} value={lot.id}>
                    {lot.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Photo */}
            <div className="space-y-2">
              <label htmlFor="photo-upload" className="text-sm font-semibold text-[#1A1A2E]">
                Photo du véhicule
              </label>

              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                ref={fileInputRef}
                onChange={handlePhotoCapture}
                aria-label="Prendre une photo du véhicule"
              />

              {photo ? (
                <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 h-48">
                  <img
                    src={photo}
                    alt="Aperçu"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setPhoto(null)}
                    className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    <AlertCircle className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-[#003DA5] hover:text-[#003DA5] transition-colors"
                >
                  <Camera className="w-8 h-8 mb-2" />
                  <span className="text-sm font-medium">Prendre une photo</span>
                </button>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label htmlFor="notes-input" className="text-sm font-semibold text-[#1A1A2E]">
                Notes (Optionnel)
              </label>
              <textarea
                id="notes-input"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Motif de la mise en fourrière, état du véhicule..."
                className="flex w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#003DA5] min-h-[100px] resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-bold shadow-lg mt-8"
              isLoading={isSubmitting}
              disabled={!plate || !lotId}
            >
              <Upload className="w-5 h-5 mr-2" />
              Enregistrer
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Vehicles List Section */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-heading font-bold text-[#1A1A2E]">
            {showAll ? "Toutes mes saisies" : "Dernières Saisies"}
          </h2>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#003DA5]"
              aria-label="Trier par"
            >
              <option value="date-desc">Plus récentes</option>
              <option value="date-asc">Plus anciennes</option>
              <option value="plate-asc">Plaque (A-Z)</option>
              <option value="lot-asc">Fourrière (A-Z)</option>
            </select>
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm font-semibold text-[#003DA5] hover:text-[#002D7A] flex items-center gap-1 shrink-0"
            >
              {showAll ? "Voir moins" : "Voir tout"} 
              <ChevronRight className={`w-4 h-4 transform transition-transform ${showAll ? "rotate-90" : ""}`} />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {displayedVehicles.length > 0 ? (
            displayedVehicles.map((vehicle) => {
              const lot = lots.find((l) => l.id === vehicle.lotId);
              return (
                <Card key={vehicle.id} className="border-0 shadow-sm bg-white overflow-hidden">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#003DA5]/10 rounded-xl flex items-center justify-center shrink-0">
                        <Car className="w-6 h-6 text-[#003DA5]" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-[#1A1A2E] text-lg">
                          {vehicle.plateNumber}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-[#6B7280] mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {format(new Date(vehicle.timestamp), "dd/MM/yyyy HH:mm", { locale: fr })}
                          </span>
                          <span className="flex items-center gap-1 max-w-[120px] sm:max-w-[200px] truncate">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{lot?.name}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          ) : (
            <div className="text-center py-8 bg-white rounded-2xl border border-dashed border-gray-200">
              <Car className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Aucune saisie trouvée</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
