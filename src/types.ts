export type VehicleStatus = "En fourrière" | "Restitué";

export interface ImpoundLot {
  id: string;
  name: string;
  address: string;
  contact: string;
}

export interface Agent {
  id: string;
  name: string;
  badgeNumber: string;
}

export interface ImpoundedVehicle {
  id: string;
  plateNumber: string;
  lotId: string;
  agentId: string;
  timestamp: string; // ISO string
  photoUrl?: string;
  notes?: string;
  status: VehicleStatus;
}
