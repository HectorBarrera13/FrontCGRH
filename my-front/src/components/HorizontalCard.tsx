import React, { useState } from "react";

type DataProps = {
  subtitle: string;
  amount: string | number;
};

type HorizontalFeatureProps = {
  title: string;
  information: DataProps[];
  icon: React.ElementType;
  iconColor?: string;
  iconBgColor?: string;
  borderColor?: string;
};

const HorizontalFeatureCard = ({
  title,
  information,
  icon: Icon,
  iconColor = "text-blue-600",
  iconBgColor = "bg-blue-50",
  borderColor = "border-gray-100",
}: HorizontalFeatureProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Limpiador de moneda
  const totalAmount = information.reduce((acc, item) => {
    if (typeof item.amount === "number") return acc + item.amount;
    const numericValue = parseFloat(item.amount.replace(/[^0-9.-]+/g, "")) || 0;
    return acc + numericValue;
  }, 0);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    /* h-fit es clave para que la tarjeta no se estire si su vecina crece */
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`
        flex flex-col p-5 rounded-2xl border-2 bg-white h-fit
        cursor-pointer transition-all duration-300 shadow-sm
        ${isOpen ? `${borderColor} ring-1 ring-blue-500/10 w-[350px]` : `${borderColor} w-[350px]`}
        select-none
      `}
    >
      {/* Cabecera idéntica a tu diseño */}
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-xl transition-all ${isOpen ? "bg-blue-600 text-white" : iconBgColor}`}
          >
            <Icon className={`w-6 h-6 ${isOpen ? "text-white" : iconColor}`} />
          </div>
          <div>
            <h3
              className={`font-bold text-base ${isOpen ? "text-blue-900" : "text-gray-700"}`}
            >
              {title}
            </h3>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              {isOpen ? "CERRAR" : "MÁS INFORMACIÓN"}
            </span>
          </div>
        </div>

        <div
          className={`mt-2 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-600" : "text-gray-300"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>

      {/* Contenido Desplegable */}
      <div
        className={`
          transition-all duration-500 ease-in-out overflow-hidden
          ${isOpen ? "max-h-[500px] opacity-100 mt-8" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex flex-col items-end w-full border-t border-gray-50 pt-6">
          <div className="flex flex-col items-end mb-6">
            <span className="text-[11px] font-black text-blue-500 uppercase tracking-widest mb-1">
              TOTAL ACUMULADO
            </span>
            <div className="text-5xl font-black text-gray-900 tracking-tighter">
              {formatter.format(totalAmount)}
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            {information.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center w-full"
              >
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  {item.subtitle}
                </span>
                <span className="text-sm font-black text-gray-700">
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalFeatureCard;
