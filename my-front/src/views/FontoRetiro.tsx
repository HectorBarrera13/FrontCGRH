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
  payment: string;
  initialBalance: string;
  contributions: string;
  withdrawals: string;
  earnings: string;
  finalBalance: string;
  vestedRights: string;
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
      payment: "1200.00",
      initialBalance: "50,000.00",
      contributions: "5,000.00",
      withdrawals: "1,000.00",
      earnings: "2,500.00",
      finalBalance: "56,500.00",
      vestedRights: "45,000.00",
    },
    {
      id: 2,
      employeeKey: "EMP001",
      employeeName: "Juan Pérez García",
      lastReportDate: "10/02/2026",
      payment: "1200.00",
      initialBalance: "75,000.00",
      contributions: "7,500.00",
      withdrawals: "0.00",
      earnings: "3,750.00",
      finalBalance: "86,250.00",
      vestedRights: "68,000.00",
    },
    {
      id: 3,
      employeeKey: "EMP001",
      employeeName: "Juan Pérez García",
      lastReportDate: "10/01/2026",
      payment: "1200.00",
      initialBalance: "60,000.00",
      contributions: "6,000.00",
      withdrawals: "500.00",
      earnings: "3,000.00",
      finalBalance: "68,500.00",
      vestedRights: "55,000.00",
    },
  ];

  const headers = [
    "Clave",
    "Nombre",
    "Fecha de Aportación",
    "Abonos",
    "Retiros",
    "Saldo de Ahorro",
    "Visualizar",
  ];

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
    payment: <span className="text-gray-500">{item.earnings}</span>,
    withdrawal: <span className="text-gray-500">{item.withdrawals}</span>,
    finalBalance: (
      <span className="text-gray-700 font-bold">{item.finalBalance}</span>
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

      <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
        {/* Tabla */}
        <div className="transition-all duration-700 ease-out w-full min-w-0">
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
      shrink-0
      transition-all duration-700 ease-out
      transform-gpu will-change-transform
      ${
        isCardOpen
          ? "opacity-100 lg:translate-x-0 translate-y-0 scale-100 lg:max-w-105"
          : "opacity-0 lg:translate-x-6 translate-y-6 scale-95 lg:max-w-0 max-h-0 pointer-events-none"
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
