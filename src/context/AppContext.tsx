import React, { createContext, useContext, useState, ReactNode } from "react";
import { ImpoundedVehicle, ImpoundLot, Agent } from "../types";
import { mockVehicles, mockLots, mockAgents } from "../data/mockData";

interface AppContextType {
  vehicles: ImpoundedVehicle[];
  lots: ImpoundLot[];
  agents: Agent[];
  addVehicle: (
    vehicle: Omit<ImpoundedVehicle, "id" | "timestamp" | "status">,
  ) => void;
  updateVehicleStatus: (id: string, status: ImpoundedVehicle["status"]) => void;
  searchVehicle: (plate: string) => ImpoundedVehicle | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehicles] = useState<ImpoundedVehicle[]>(mockVehicles);
  const [lots] = useState<ImpoundLot[]>(mockLots);
  const [agents] = useState<Agent[]>(mockAgents);

  const addVehicle = (
    vehicleData: Omit<ImpoundedVehicle, "id" | "timestamp" | "status">,
  ) => {
    const newVehicle: ImpoundedVehicle = {
      ...vehicleData,
      id: `v-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: "En fourrière",
    };
    setVehicles((prev) => [newVehicle, ...prev]);
  };

  const updateVehicleStatus = (
    id: string,
    status: ImpoundedVehicle["status"],
  ) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v)),
    );
  };

  const searchVehicle = (plate: string) => {
    // Search for the most recent record of this plate
    const normalizedSearch = plate.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    return vehicles.find(
      (v) =>
        v.plateNumber.replace(/[^a-zA-Z0-9]/g, "").toUpperCase() ===
          normalizedSearch && v.status === "En fourrière",
    );
  };

  return (
    <AppContext.Provider
      value={{
        vehicles,
        lots,
        agents,
        addVehicle,
        updateVehicleStatus,
        searchVehicle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
