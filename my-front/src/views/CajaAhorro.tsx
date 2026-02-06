import PageTitle from "../components/PageTitle";
import HorizontalFeatureCard from "../components/HorizontalCard";
import { PiggyBank, HouseHeart, Wallet } from "../assets/icons";

export default function CajaAhorro() {
  return (
    <div className="flex-1 flex flex-col">
      <PageTitle title="Caja de Ahorro" />

      <div className="w-[90%] mx-auto py-8">
        {/* Contenedor Grid: 1 columna en móvil, 3 en pantallas medianas/grandes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <HorizontalFeatureCard
            title="Panel de Control"
            icon={PiggyBank}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-50"
            borderColor="border-blue-100"
            information={[
              { subtitle: "Saldo Actual", amount: "$12,345.67" },
              { subtitle: "Aportación Mensual", amount: "$1,200.00" },
            ]}
          />

          <HorizontalFeatureCard
            title="Seguridad Activa"
            icon={HouseHeart}
            iconColor="text-emerald-600"
            iconBgColor="bg-emerald-50"
            borderColor="border-emerald-100"
            information={[
              { subtitle: "Saldo Actual", amount: "$12,345.67" },
              { subtitle: "Aportación Mensual", amount: "$1,200.00" },
            ]}
          />

          <HorizontalFeatureCard
            title="Optimización"
            icon={Wallet}
            iconColor="text-amber-600"
            iconBgColor="bg-amber-50"
            borderColor="border-amber-100"
            information={[
              { subtitle: "Saldo Actual", amount: "$12,345.67" },
              { subtitle: "Aportación Mensual", amount: "$1,200.00" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
