import React, { useState } from "react";
import { format, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Search,
  Download,
  Car,
  MapPin,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useAppContext } from "../context/AppContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";

// Generate mock data for the chart
const generateChartData = () => {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    data.push({
      date: format(subDays(new Date(), i), 'dd MMM', { locale: fr }),
      misesEnFourriere: Math.floor(Math.random() * 20) + 5,
      restitutions: Math.floor(Math.random() * 15) + 2,
    });
  }
  return data;
};

export function AdminDashboard() {
  const { vehicles, lots, agents, updateVehicleStatus } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [lotFilter, setLotFilter] = useState("All");
  const [agentFilter, setAgentFilter] = useState("All");
  const [chartData] = useState(generateChartData());

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch = v.plateNumber
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || v.status === statusFilter;
    const matchesLot = lotFilter === "All" || v.lotId === lotFilter;
    const matchesAgent = agentFilter === "All" || v.agentId === agentFilter;
    return matchesSearch && matchesStatus && matchesLot && matchesAgent;
  });

  const stats = {
    total: vehicles.length,
    active: vehicles.filter((v) => v.status === "En fourrière").length,
    returned: vehicles.filter((v) => v.status === "Restitué").length,
    lots: lots.length,
  };

  const lotData = lots.map(lot => ({
    name: lot.name,
    vehicules: vehicles.filter(v => v.lotId === lot.id && v.status === "En fourrière").length
  }));

  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const monthStr = format(today, 'yyyy-MM');

  const todayImpounds = vehicles.filter(v => format(new Date(v.timestamp), 'yyyy-MM-dd') === todayStr && v.status === "En fourrière").length;
  const monthImpounds = vehicles.filter(v => format(new Date(v.timestamp), 'yyyy-MM') === monthStr && v.status === "En fourrière").length;

  const handleStatusChange = (id: string, currentStatus: string) => {
    const newStatus =
      currentStatus === "En fourrière" ? "Restitué" : "En fourrière";
    updateVehicleStatus(id, newStatus);
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-[#003DA5]/10 rounded-2xl flex items-center justify-center shrink-0">
              <Car className="w-7 h-7 text-[#003DA5]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#6B7280]">
                Mises en fourrière (Aujourd'hui)
              </p>
              <h3 className="text-3xl font-heading font-bold text-[#1A1A2E]">
                {todayImpounds}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-[#DC3545]/10 rounded-2xl flex items-center justify-center shrink-0">
              <Clock className="w-7 h-7 text-[#DC3545]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#6B7280]">Mises en fourrière (Ce mois)</p>
              <h3 className="text-3xl font-heading font-bold text-[#1A1A2E]">
                {monthImpounds}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-[#28A745]/10 rounded-2xl flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7 text-[#28A745]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#6B7280]">Total Restitués</p>
              <h3 className="text-3xl font-heading font-bold text-[#1A1A2E]">
                {stats.returned}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-[#FFD700]/20 rounded-2xl flex items-center justify-center shrink-0">
              <MapPin className="w-7 h-7 text-[#B89600]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#6B7280]">
                Fourrières Actives
              </p>
              <h3 className="text-3xl font-heading font-bold text-[#1A1A2E]">
                {stats.lots}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#003DA5]" />
              Activité des 7 derniers jours
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorMises" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC3545" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#DC3545" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRestitutions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#28A745" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#28A745" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area type="monotone" dataKey="misesEnFourriere" name="Mises en fourrière" stroke="#DC3545" strokeWidth={3} fillOpacity={1} fill="url(#colorMises)" />
                  <Area type="monotone" dataKey="restitutions" name="Restitutions" stroke="#28A745" strokeWidth={3} fillOpacity={1} fill="url(#colorRestitutions)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#003DA5]" />
              Véhicules par fourrière
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={lotData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <Tooltip 
                    cursor={{fill: '#F3F4F6'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="vehicules" name="Véhicules en fourrière" fill="#003DA5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Area */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <CardTitle>Registre des Véhicules</CardTitle>
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" aria-hidden="true" />
              <label htmlFor="search-plate" className="sr-only">Rechercher une plaque</label>
              <Input
                id="search-plate"
                placeholder="Rechercher une plaque..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 pl-9 text-sm bg-gray-50 border-transparent focus:bg-white"
              />
            </div>
            <label htmlFor="status-filter" className="sr-only">Filtrer par statut</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003DA5] focus:bg-white"
            >
              <option value="All">Tous les statuts</option>
              <option value="En fourrière">En fourrière</option>
              <option value="Restitué">Restitué</option>
            </select>
            <label htmlFor="lot-filter" className="sr-only">Filtrer par fourrière</label>
            <select
              id="lot-filter"
              value={lotFilter}
              onChange={(e) => setLotFilter(e.target.value)}
              className="h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003DA5] focus:bg-white"
            >
              <option value="All">Toutes les fourrières</option>
              {lots.map((lot) => (
                <option key={lot.id} value={lot.id}>
                  {lot.name}
                </option>
              ))}
            </select>
            <label htmlFor="agent-filter" className="sr-only">Filtrer par agent</label>
            <select
              id="agent-filter"
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003DA5] focus:bg-white"
            >
              <option value="All">Tous les agents</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
            <Button variant="secondary" size="sm" className="h-10 gap-2 font-semibold">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exporter</span>
            </Button>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#6B7280]" aria-label="Registre des véhicules">
            <thead className="bg-gray-50/80 text-xs uppercase text-[#1A1A2E] font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Plaque</th>
                <th className="px-6 py-4">Date & Heure</th>
                <th className="px-6 py-4">Fourrière</th>
                <th className="px-6 py-4">Agent</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredVehicles.map((vehicle) => {
                const lot = lots.find((l) => l.id === vehicle.lotId);
                const agent = agents.find((a) => a.id === vehicle.agentId);
                const isImpounded = vehicle.status === "En fourrière";

                return (
                  <tr
                    key={vehicle.id}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="px-6 py-4 font-heading font-bold text-[#1A1A2E] text-base">
                      {vehicle.plateNumber}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[#1A1A2E] font-medium">{format(new Date(vehicle.timestamp), "dd/MM/yyyy")}</span>
                        <span className="text-xs text-gray-500">{format(new Date(vehicle.timestamp), "HH:mm")}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 group-hover:text-[#003DA5] transition-colors" />
                        <span
                          className="truncate max-w-[150px] font-medium text-[#1A1A2E]"
                          title={lot?.name}
                        >
                          {lot?.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400 group-hover:text-[#003DA5] transition-colors" />
                        <span className="font-medium text-[#1A1A2E]">{agent?.badgeNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          isImpounded
                            ? "bg-[#DC3545]/10 text-[#DC3545] border border-[#DC3545]/20"
                            : "bg-[#28A745]/10 text-[#28A745] border border-[#28A745]/20"
                        }`}
                      >
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant={isImpounded ? "primary" : "ghost"}
                        size="sm"
                        onClick={() =>
                          handleStatusChange(vehicle.id, vehicle.status)
                        }
                        className={`h-8 px-4 text-xs font-semibold rounded-lg ${!isImpounded && "opacity-50 hover:opacity-100"}`}
                      >
                        {isImpounded ? "Restituer" : "Annuler"}
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {filteredVehicles.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Car className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-lg font-medium text-[#1A1A2E]">Aucun véhicule trouvé</p>
                      <p className="text-sm">Modifiez vos filtres de recherche.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
