import { useAuth } from "../hooks/useAuth";
import React, { useEffect, useRef } from "react";

export default function ProfilePicture() {
  const { user, logout } = useAuth(); // asumo que tienes logout()
  const [isOpen, setIsOpen] = React.useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const getInitials = (nombre?: string, apellido?: string) => {
    const n = nombre?.charAt(0) || "";
    const a = apellido?.charAt(0) || "";
    return (n + a).toUpperCase() || "U";
  };

  const initials = getInitials(user?.nombres, user?.primer_apellido);

  const hasImage = Boolean(user?.foto_url);

  // 🔹 cerrar al hacer click fuera
  useEffect(() => {
    if (!isOpen) return;

    const onClickOutside = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isOpen]);

  return (
    <div ref={rootRef} className="relative">
      {/* Botón de perfil */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="w-10 h-10 rounded-full overflow-hidden bg-accent shadow-md flex items-center justify-center focus:outline-none"
      >
        {hasImage ? (
          <img
            src={user?.foto_url}
            alt="Foto de perfil"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white font-medium text-sm select-none">
            {initials}
          </span>
        )}
      </button>

      {/* Panel */}
      <div
        className={`
          absolute right-0 mt-2 w-40 rounded-lg border border-gray-200 bg-white shadow-lg
          transition-all duration-150 ease-out origin-top-right
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }
        `}
      >
        <button
          onClick={() => {
            setIsOpen(false);
          }}
          className="w-full px-4 py-2 text-sm text-left text-primary hover:bg-gray-100 rounded-lg"
        >
          Rol
        </button>
        <button
          onClick={() => {
            setIsOpen(false);
            logout();
          }}
          className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 rounded-lg"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
