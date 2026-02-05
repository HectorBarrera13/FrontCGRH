import React, { useState } from "react";
// He usado un SVG simple para la flecha para que no dependas de librerías externas,
// pero puedes cambiarlo por Lucide, FontAwesome, etc.
import { ChevronDown } from "lucide-react";

type DataProps = {
  subtitle: string;
  amount: string | number;
};

type InfoCardProps = {
  title: string;
  total: number;
  information: DataProps[];
  Icon?: React.ElementType;
  iconColor?: string;
  iconBgColor?: string;
  borderColor?: string;
};

const InfoCard = (props: InfoCardProps) => {
  const {
    title,
    total,
    information,
    Icon,
    iconColor = "text-gray-600",
    iconBgColor = "bg-gray-100",
    borderColor = "border-l-transparent",
  } = props;

  // 1. Estado para controlar si el componente está expandido
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`w-[90%] mx-auto bg-white border border-gray-100 border-l-4 ${borderColor} rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-lg cursor-pointer mb-4`}
    >
      {/* SECCIÓN SUPERIOR: Siempre visible */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {Icon && (
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${iconBgColor}`}
            >
              <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
          )}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 leading-tight">
              {title}
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              {isOpen ? "Ocultar detalles" : "Ver detalles"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Total:
            </span>
            <span className="text-4xl font-black text-gray-800 tracking-tight">
              {total}
            </span>
          </div>
          {/* Icono de flecha que rota según el estado */}
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* SECCIÓN DESPLEGABLE: Con animación de altura fluida */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-4"
            : "grid-rows-[0fr] opacity-0 mt-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col items-end gap-2 border-t border-gray-100 pt-4 w-full">
            {information.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 justify-end items-center group"
              >
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  {item.subtitle}:
                </span>
                <span className="text-base font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
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

export default InfoCard;
