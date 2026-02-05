import React from "react";

type FeatureCardProps = {
  title: string;
  icon: React.ElementType;
  iconColor?: string; // Ej: "text-purple-600"
  iconBgColor?: string; // Ej: "bg-purple-100"
  borderColor?: string; // Ej: "border-purple-200"
};

const FeatureCard = (props: FeatureCardProps) => {
  const {
    title,
    icon: Icon,
    iconColor = "text-blue-600",
    iconBgColor = "bg-blue-50",
    borderColor = "border-gray-100",
  } = props;

  return (
    <div
      className={`
        aspect-square w-44 flex flex-col items-center justify-center 
        gap-4 p-6 rounded-3xl border-2 shadow-sm cursor-pointer
        transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-2xl hover:-translate-y-3
        bg-white ${borderColor}
      `}
    >
      {/* Contenedor del Icono circular */}
      <div
        className={`p-4 rounded-2xl shadow-inner transition-transform duration-300 ${iconBgColor}`}
      >
        <Icon className={`w-10 h-10 ${iconColor}`} strokeWidth={2} />
      </div>

      {/* Título */}
      <h3 className="text-center font-bold text-gray-700 text-lg leading-tight">
        {title}
      </h3>
    </div>
  );
};

export default FeatureCard;
