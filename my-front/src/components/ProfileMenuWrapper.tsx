import React, { useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingFocusManager,
  type Placement,
} from "@floating-ui/react";
import { useNavigate } from "react-router-dom";

type ProfileMenuWrapperProps = {
  children: React.ReactNode; // Cambiado a ReactNode para mayor flexibilidad
  menuPosition?: Placement;
};

export default function ProfileMenuWrapper({
  children,
  menuPosition = "bottom-start",
}: ProfileMenuWrapperProps) {
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = {
    nombres: "Juan Pérez",
    email: "juan.perez@correo.uady.mx",
    roles: ["Administrador", "Empleado"],
  };

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: menuPosition,
    whileElementsMounted: autoUpdate,
    middleware: [offset(10), flip(), shift({ padding: 0 })],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const roles: string[] = user?.roles ?? [];

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className="cursor-pointer inline-block outline-none"
      >
        {children}
      </div>

      {open && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
          >
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles, zIndex: 9999 }} // Aseguramos el z-index
              {...getFloatingProps()}
              className="w-40 rounded-lg border border-gray-200 bg-white shadow-xl p-1 outline-none"
            >
              <RoleSubmenu
                roles={roles}
                activeRole={activeRole ?? null}
                onSelectRole={(r) => {
                  setActiveRole(r);
                  setOpen(false);
                }}
              />

              <div className="my-1 border-t border-gray-100" />

              <button
                onClick={() => navigate("/login")}
                className="w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-red-50 rounded-md transition-colors"
                role="menuitem"
              >
                Cerrar sesión
              </button>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}

function RoleSubmenu({
  roles,
  activeRole,
  onSelectRole,
}: {
  roles: string[];
  activeRole: string | null;
  onSelectRole: (role: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "right-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({ mainAxis: 8, alignmentAxis: -4 }),
      flip(),
      shift({ padding: 8 }),
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <div className="relative">
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className=" py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100 rounded-md flex items-center justify-between outline-none"
        role="menuitem"
      >
        <span>Cambiar Rol</span>
        <span className="text-gray-400 text-xs">▶</span>
      </button>

      {open && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
          >
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles, zIndex: 10000 }}
              {...getFloatingProps()}
              className="w-44 rounded-lg border border-gray-200 bg-white shadow-xl p-1 outline-none"
            >
              {roles.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500 italic">
                  Sin roles
                </div>
              ) : (
                roles.map((r) => {
                  const isActive = activeRole === r;
                  return (
                    <button
                      key={r}
                      onClick={() => {
                        onSelectRole(r);
                        setOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-sm text-left rounded-md hover:bg-gray-100 flex items-center justify-between transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-700 font-semibold"
                          : "text-gray-700"
                      }`}
                      role="menuitem"
                    >
                      <span>{r}</span>
                      {isActive && (
                        <span className="text-blue-500 text-xs">✓</span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  );
}
