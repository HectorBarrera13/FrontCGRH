import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import PageTitle from "../components/PageTitle";
import FeatureCard from "../components/FeatureCard";
import { PiggyBank, HouseHeart, Wallet } from "../assets/icons";

export default function FondoVivienda() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <PageTitle title="Fondo de Vivienda" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-6">
          <FeatureCard
            title="Solicitar Préstamo"
            icon={PiggyBank}
            iconBgColor="bg-red-400"
            iconColor="text-red-200"
          />
          <FeatureCard
            title="Historial de Aportaciones"
            icon={HouseHeart}
            iconBgColor="bg-green-300"
            iconColor="text-green-800"
          />
          <FeatureCard
            title="Consultar Saldo"
            icon={Wallet}
            iconBgColor="bg-blue-200"
          />
        </div>
      </div>
    </div>
  );
}
