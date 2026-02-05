import { NavLink } from "react-router-dom";
import React from "react";
import ProfilePicture from "./ProfilePicture";

import {
  Tag,
  Stethoscope,
  GraduationCap,
  Receipt,
  FileText,
  PiggyBank,
  Wallet,
  HouseHeart,
  Menu,
} from "../assets/icons";

const sections = [
  {
    title: "Nómina Digital",
    items: [
      { label: "CFDI", icon: FileText, to: "/cfdi" },
      {
        label: "Fondo de Ahorro para el Retiro",
        icon: PiggyBank,
        to: "/fondo-retiro",
      },
      { label: "Caja de Ahorro", icon: Wallet, to: "/caja-ahorro" },
      { label: "Fondo de Vivienda", icon: HouseHeart, to: "/fondo-vivienda" },
    ],
  },
  {
    title: "Prestaciones",
    items: [
      { label: "Exenciones", icon: Tag, to: "/exenciones" },
      {
        label: "Vigencia del Servicio Médico",
        icon: Stethoscope,
        to: "/servicio-medico",
      },
      { label: "Becas", icon: GraduationCap, to: "/becas" },
      { label: "Reembolsos", icon: Receipt, to: "/reembolsos" },
    ],
  },
];

export default function SideBar() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <aside
      className={`
        ${isOpen ? "w-min" : "w-16"}
        h-screen bg-secondary flex flex-col text-white shadow-lg
        transition-all duration-300 ease-in-out
      `}
    >
      {/* Header */}
      <div className="h-16 flex items-center gap-3 px-2 w-full shadow-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-accent"
        >
          <Menu
            className={`w-8 h-8 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && <span className="font-semibold text-lg">Menú</span>}
      </div>

      {/* Sections */}
      <nav className="flex-1 overflow-y-auto py-2 w-full overflow-x-hidden">
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            <div
              className={`mb-2 flex items-center h-8 ${
                isOpen ? "px-4" : "px-2"
              }`}
            >
              {isOpen ? (
                <>
                  <span className="text-lg font-semibold text-accent whitespace-nowrap leading-none">
                    {section.title}
                  </span>
                  <div className="flex-1 h-1 bg-white/40 ml-3 rounded-lg self-center" />
                </>
              ) : (
                <div className="w-full h-1 bg-white/40 rounded-lg self-center" />
              )}
            </div>

            <div className="space-y-1">
              {section.items.map(({ label, icon: Icon, to }) => (
                <NavLink
                  key={label}
                  to={to}
                  className={`w-full flex items-center gap-3 py-2 rounded-md hover:bg-accent transition-all ${
                    isOpen ? "px-4" : "px-2 justify-center"
                  }`}
                >
                  <Icon className="w-8 h-8 shrink-0" />
                  {isOpen && <span className="whitespace-nowrap">{label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Profile */}
      <div
        className={`mb-6 w-full flex ${
          isOpen ? "justify-start px-4" : "justify-center"
        }`}
      >
        <ProfilePicture menuPosition="right-start" />
      </div>
    </aside>
  );
}
