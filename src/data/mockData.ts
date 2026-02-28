import { ImpoundLot, Agent, ImpoundedVehicle } from "../types";

export const mockLots: ImpoundLot[] = [
  {
    id: "lot-1",
    name: "Fourrière Centrale de Kaloum",
    address: "Avenue de la République, Kaloum, Conakry",
    contact: "+224 620 00 00 01",
  },
  {
    id: "lot-2",
    name: "Fourrière de Dixinn",
    address: "Route de Donka, Dixinn, Conakry",
    contact: "+224 620 00 00 02",
  },
  {
    id: "lot-3",
    name: "Fourrière de Matoto",
    address: "Marché de Matoto, Conakry",
    contact: "+224 620 00 00 03",
  },
];

export const mockAgents: Agent[] = [
  { id: "agt-1", name: "Mamadou Diallo", badgeNumber: "B-1042" },
  { id: "agt-2", name: "Aissatou Barry", badgeNumber: "B-2055" },
];

export const mockVehicles: ImpoundedVehicle[] = [
  {
    id: "v-1",
    plateNumber: "RC-1234-A",
    lotId: "lot-1",
    agentId: "agt-1",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    photoUrl:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    status: "En fourrière",
    notes: "Stationnement gênant sur passage piéton",
  },
  {
    id: "v-2",
    plateNumber: "RC-5678-B",
    lotId: "lot-2",
    agentId: "agt-2",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    photoUrl:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800",
    status: "Restitué",
    notes: "Défaut de contrôle technique",
  },
  {
    id: "v-3",
    plateNumber: "RC-9999-C",
    lotId: "lot-1",
    agentId: "agt-1",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    photoUrl:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800",
    status: "En fourrière",
  },
];
