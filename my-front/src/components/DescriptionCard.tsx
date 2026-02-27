import React from "react";

type DescriptionCardProps = {
  /** Encabezados */
  lastReportDate: string; // "2026-02-10" o "10/02/2026" etc.

  /** Datos Generales */
  employeeKey: string;
  employeeName: string;

  /** Resumen General */
  initialBalance: string | number;
  contributions: string | number;
  withdrawals: string | number;
  earnings: string | number;
  finalBalance: string | number;
  vestedRights: string | number;

  /** Acción */
  onDownload?: () => void;
  downloadDisabled?: boolean;

  /** Icono y estilos (se mantienen) */
  icon: React.ElementType;
  iconColor?: string;
  iconBgColor?: string;
  borderColor?: string;
};

const DescriptionCardCard = ({
  lastReportDate,
  employeeKey,
  employeeName,
  initialBalance,
  contributions,
  withdrawals,
  earnings,
  finalBalance,
  vestedRights,
  onDownload,
  downloadDisabled = false,
  icon: Icon,
  iconColor = "text-blue-600",
  iconBgColor = "bg-blue-50",
  borderColor = "border-gray-100",
}: DescriptionCardProps) => {
  const formatValue = (value: string | number) => {
    if (typeof value === "number") {
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(value);
    }
    return value;
  };

  return (
    <div
      className={`
        flex flex-col p-5 rounded-2xl border-2 bg-white h-fit
        transition-all duration-300 shadow-sm w-[350px]
        ${borderColor}
        select-none
      `}
    >
      {/* Encabezado */}
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl transition-all ${iconBgColor}`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>

          <div className="flex flex-col">
            {/* 1) Fondo de Ahorro para el Retiro */}
            <h3 className="font-bold text-base text-gray-700">
              Fondo de Ahorro para el Retiro
            </h3>

            {/* 2) Reporte de Movimientos */}
            <p className="text-xs font-semibold text-gray-500">
              Reporte de Movimientos
            </p>

            {/* 3) Fecha último reporte */}
            <p className="text-[11px] text-gray-400">
              Último reporte cargado:{" "}
              <span className="font-semibold text-gray-500">
                {lastReportDate}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Contenido (siempre visible porque tus requerimientos no piden acordeón) */}
      <div className="mt-5 border-t border-gray-50 pt-5 flex flex-col gap-5">
        {/* Datos Generales */}
        <div>
          <p className="text-[11px] font-black text-blue-500 uppercase tracking-widest mb-3">
            Datos Generales
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase">
                Clave Empleado
              </span>
              <span className="text-sm font-black text-gray-700">
                {employeeKey}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase">
                Nombre Empleado
              </span>
              <span className="text-sm font-black text-gray-700 text-right">
                {employeeName}
              </span>
            </div>
          </div>
        </div>

        {/* Resumen General */}
        <div>
          <p className="text-[11px] font-black text-blue-500 uppercase tracking-widest mb-3">
            Resumen General
          </p>

          <div className="flex flex-col gap-3 w-full">
            <Row label="Saldo inicial" value={formatValue(initialBalance)} />
            <Row label="Aportaciones" value={formatValue(contributions)} />
            <Row label="Retiros" value={formatValue(withdrawals)} />
            <Row label="Rendimientos" value={formatValue(earnings)} />
            <Row label="Saldo Final" value={formatValue(finalBalance)} />
            <Row
              label="Derechos Adquiridos"
              value={formatValue(vestedRights)}
            />
          </div>
        </div>

        {/* Información Santander */}
        <p className="text-[11px] text-gray-400 leading-4">
          Información proporcionada por Banco Santander (México), S.A.
          Institución de Banca Múltiple Grupo Financiero México.
        </p>

        {/* Descargar Reporte */}
        <button
          type="button"
          disabled={downloadDisabled}
          onClick={onDownload}
          className={`
            w-full py-2.5 rounded-xl font-bold text-sm transition
            ${downloadDisabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}
          `}
        >
          Descargar
        </button>
      </div>
    </div>
  );
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center w-full">
      <span className="text-[10px] font-bold text-gray-400 uppercase">
        {label}
      </span>
      <span className="text-sm font-black text-gray-700">{value}</span>
    </div>
  );
}

export default DescriptionCardCard;
