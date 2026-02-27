import { useState } from "react";
import DynamicTable from "../components/Table";
import DescriptionCard from "../components/DescriptionCard";
import PageTitle from "../components/PageTitle";
import { Wallet } from "lucide-react";

type FondoRetiroData = {
  id: number;
  employeeKey: string;
  employeeName: string;
  lastReportDate: string;
  initialBalance: number;
  contributions: number;
  withdrawals: number;
  earnings: number;
  finalBalance: number;
  vestedRights: number;
};

export default function FondoRetiroReports() {
  const [selectedItem, setSelectedItem] = useState<FondoRetiroData | null>(
    null,
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // ✅ Mantener render mientras anima salida
  const [renderItem, setRenderItem] = useState<FondoRetiroData | null>(null);
  const [isCardOpen, setIsCardOpen] = useState(false);

  const fondoRetiroData: FondoRetiroData[] = [
    {
      id: 1,
      employeeKey: "EMP001",
      employeeName: "Juan Pérez García",
      lastReportDate: "10/03/2026",
      initialBalance: 50000,
      contributions: 5000,
      withdrawals: 1000,
      earnings: 2500,
      finalBalance: 56500,
      vestedRights: 45000,
    },
    {
      id: 2,
      employeeKey: "EMP001",
      employeeName: "Juan Pérez García",
      lastReportDate: "10/02/2026",
      initialBalance: 75000,
      contributions: 7500,
      withdrawals: 0,
      earnings: 3750,
      finalBalance: 86250,
      vestedRights: 68000,
    },
    {
      id: 3,
      employeeKey: "EMP001",
      employeeName: "Juan Pérez García",
      lastReportDate: "10/01/2026",
      initialBalance: 60000,
      contributions: 6000,
      withdrawals: 500,
      earnings: 3000,
      finalBalance: 68500,
      vestedRights: 55000,
    },
  ];

  const headers = ["Clave", "Nombre", "Último Reporte", "Visualizar"];

  const ANIM_MS = 700;

  const handleRowSelect = (index: number) => {
    if (index === selectedIndex) {
      // ✅ Cerrar: primero anima, luego desmonta contenido
      setIsCardOpen(false);
      setSelectedItem(null);
      setSelectedIndex(null);

      window.setTimeout(() => {
        setRenderItem(null);
      }, ANIM_MS);
    } else {
      // ✅ Abrir
      const item = fondoRetiroData[index];
      setSelectedItem(item);
      setSelectedIndex(index);

      setRenderItem(item);
      setIsCardOpen(true);
    }
  };

  const tableData = fondoRetiroData.map((item) => ({
    employeeKey: <span className="font-semibold">{item.employeeKey}</span>,
    employeeName: <span className="text-gray-700">{item.employeeName}</span>,
    lastReportDate: (
      <span className="text-gray-500">{item.lastReportDate}</span>
    ),
    view: (
      <button
        className="text-white hover:bg-accent bg-primary px-2 py-1 rounded cursor-pointer transition-colors duration-200"
        onClick={(e) => {
          e.stopPropagation();
          const index = fondoRetiroData.findIndex(
            (data) => data.id === item.id,
          );
          handleRowSelect(index);
        }}
      >
        Ver Detalles
      </button>
    ),
  }));

  const handleDownload = () => {
    if (selectedItem) {
      console.log("Descargando reporte para:", selectedItem.employeeKey);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <PageTitle title="Movimientos Fondo de Ahorro para el Retiro" />

      <div className="flex gap-6 flex-1 overflow-hidden">
        {/* Tabla - Transición suave */}
        <div className="transition-all duration-700 ease-out w-full">
          <DynamicTable
            headers={headers}
            data={tableData}
            onRowSelect={handleRowSelect}
            selectedIndex={selectedIndex}
          />
        </div>

        {/* Card - Entrada/salida suave (sin desmontar de golpe) */}
        <div
          className={`
            flex-shrink-0 overflow-hidden
            transition-all duration-700 ease-out
            transform-gpu will-change-transform
            ${
              isCardOpen
                ? "opacity-100 translate-x-0 scale-100 max-w-[420px]"
                : "opacity-0 translate-x-6 scale-95 max-w-0 pointer-events-none"
            }
          `}
        >
          {renderItem && (
            <DescriptionCard
              lastReportDate={renderItem.lastReportDate}
              employeeKey={renderItem.employeeKey}
              employeeName={renderItem.employeeName}
              initialBalance={renderItem.initialBalance}
              contributions={renderItem.contributions}
              withdrawals={renderItem.withdrawals}
              earnings={renderItem.earnings}
              finalBalance={renderItem.finalBalance}
              vestedRights={renderItem.vestedRights}
              onDownload={handleDownload}
              icon={Wallet}
              iconColor="text-blue-600"
              iconBgColor="bg-blue-50"
            />
          )}
        </div>
      </div>
    </div>
  );
}
