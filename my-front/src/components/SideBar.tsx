import { NavLink } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import ProfileMenuWrapper from "./ProfileMenuWrapper";
import { useState } from "react";

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
  FileUp,
  ShieldUser,
} from "../assets/icons";

export default function SideBar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const user = {
    nombres: "Juan Pérez García",
    email: "juan.perez@correo.uady.mx",
  };

  const [activeRole, setActiveRole] = useState<string | null>("Admin_becas");

  const sections = getSections(activeRole);
  return (
    <>
      {/* Backdrop - Solo en móvil cuando está abierto */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 "
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen bg-primary text-white shadow-2xl
          transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? "w-75" : "w-0 md:w-16"}
        `}
      >
        {/* Header */}
        <div className="h-16 bg-primary flex items-center gap-3 px-2 w-full shadow-lg shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-accent relative "
          >
            <Menu
              className={`w-8 h-8 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isOpen && (
            <span className="font-semibold text-lg animate-in fade-in">
              Menú
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden">
          {sections.map((section) => (
            <div key={section.title} className="w-full">
              <div className="mb-2 flex items-center h-8 px-2">
                <div className="w-full h-[2px] bg-white/20" />
                <span
                  className={`
                  text-sm font-medium uppercase whitespace-nowrap
                  transition-all duration-300 ease-out
                  ${isOpen ? "opacity-100 px-2 max-w-xs" : "opacity-0 px-0 max-w-0"}
                `}
                >
                  {section.title}
                </span>
                <div className="w-full h-[2px] bg-white/20" />
              </div>

              <div className="flex flex-col space-y-2 px-2">
                {section.items.map(({ label, icon: Icon, to }) => (
                  <NavLink
                    key={label}
                    to={to}
                    className={({ isActive }) => `
                      p-2 transition-all duration-300 flex items-center rounded-md
                      ${
                        isActive
                          ? "bg-accent text-white"
                          : "text-white/70 hover:bg-accent/70"
                      }
                    `}
                  >
                    <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                      <Icon className="w-8 h-8" />
                    </div>
                    {isOpen && (
                      <span className="whitespace-nowrap font-medium ml-3">
                        {label}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Profile */}
        <ProfileMenuWrapper menuPosition="right-start">
          <div
            className={`
            mt-auto mb-6 w-full px-2 pb-3
            ${isOpen ? "" : "hidden md:block"}
          `}
          >
            <div className="p-1 flex items-center rounded-lg">
              {/* Contenedor fijo como los iconos del menú */}
              <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                <ProfilePicture />
              </div>

              {/* El texto aparece sin mover el icono */}
              <div
                className={`
                overflow-hidden transition-all duration-300 ease-out
                ${isOpen ? "opacity-100 ml-3 max-w-[220px]" : "opacity-0 ml-0 max-w-0"}
              `}
              >
                {user && (
                  <div className="flex flex-col leading-tight">
                    <p className="text-sm font-medium truncate">
                      {user.nombres}
                    </p>
                    <p className="text-xs text-white/70 truncate">
                      {user.email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ProfileMenuWrapper>
      </aside>
    </>
  );
}

const getSections = (activeRole: string | null) => {
  const baseSections = [
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

  if (activeRole === "Admin_becas") {
    baseSections.push({
      title: "Administración",
      items: [
        { label: "Subir Archivos", icon: FileUp, to: "/admin" },
        { label: "Roles y Permisos", icon: ShieldUser, to: "/coordinacion" },
      ],
    });
  }

  return baseSections;
};
