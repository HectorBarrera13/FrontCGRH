import { NavLink } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
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
      { label: "Fondo de Ahorro", icon: Wallet, to: "/fondo-ahorro" },
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
  const [isOpen, setIsOpen] = useLocalStorage("sidebar_open", true);

  return (
    <aside className="h-auto w-min bg-secondary border-none items-center flex flex-col text-white shadow-lg transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="h-16 flex items-center gap-3 px-2 w-full  text-white shadow-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-accent "
        >
          <Menu
            className={`w-8 h-8 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <span className="font-semibold text-lg ${isOpen ? 'opacity-100' : 'opacity-0'}">
            Menú
          </span>
        )}
      </div>

      {/* Sections */}
      <nav className="flex-1 overflow-y-auto py-2">
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            {/* Section title + divider */}
            <div
              className={`mb-2 flex items-center ${
                isOpen ? "px-4 h-6" : "px-2 h-6 "
              }`}
            >
              {isOpen ? (
                <>
                  <span className="text-lg font-semibold text-accent  whitespace-nowrap">
                    {section.title}
                  </span>
                  <div className="flex-1 h-1 bg-white/40 ml-3 rounded-lg" />
                </>
              ) : (
                <div className="w-full h-1 bg-white/40 mx-auto rounded-lg" />
              )}
            </div>

            {/* Items */}
            <div className="space-y-1">
              {section.items.map(({ label, icon: Icon, to }) => (
                <NavLink
                  key={label}
                  to={to}
                  className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-left text-white hover:bg-accent transition ${
                    isOpen ? "px-4" : "px-2"
                  }`}
                >
                  <Icon className="w-8 h-8 shrink-0" />
                  {isOpen && (
                    <span className="text-m whitespace-nowrap">{label}</span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="mb-4 ">
        <ProfilePicture />
      </div>
    </aside>
  );
}
