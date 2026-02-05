import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import PageTitle from "../components/PageTitle";
import InfoCard from "../components/InfoCard";
import { HouseHeart, PiggyBank, Wallet } from "../assets/icons";

export default function FondoRetiro() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <TopBar />

        <PageTitle title="Fondo de Retiro" />
        <div className="space-y-6 mt-6">
          <InfoCard
            title="Saldo Actual"
            total={25000}
            information={[
              { subtitle: "Total Disponible", amount: "$25,000.00" },
            ]}
            Icon={() => <Wallet className="w-6 h-6" />}
            iconColor="text-red-600"
            borderColor="border-l-red-500"
            iconBgColor="bg-red-100"
          />
          <InfoCard
            title="Aportaciones del Año"
            total={5000}
            information={[
              { subtitle: "Total Aportado", amount: "$5,000.00" },
              { subtitle: "Aportación Mensual", amount: "$416.67" },
            ]}
            Icon={() => <PiggyBank className="w-6 h-6" />}
            iconColor="text-green-600"
            borderColor="border-l-green-500"
            iconBgColor="bg-green-100"
          />
          <InfoCard
            title="Rendimientos"
            total={4500}
            information={[
              {
                subtitle: "Ganancias obtenidas en el último trimestre",
                amount: "$1,200.00",
              },
              { subtitle: "Rendimiento Anual", amount: "4,500" },
            ]}
            Icon={() => <HouseHeart className="w-6 h-6" />}
            iconColor="text-blue-600"
            borderColor="border-l-blue-500"
            iconBgColor="bg-blue-100"
          />
        </div>
      </div>
    </div>
  );
}
