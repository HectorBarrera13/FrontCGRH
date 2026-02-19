import React, { useState, isValidElement, cloneElement } from "react";
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
  children: React.ReactElement;
  menuPosition?: Placement;
};

export default function ProfileMenuWrapper({
  children,
  menuPosition = "bottom-start",
}: ProfileMenuWrapperProps) {
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const user = {
    nombres: "Juan Pérez",
    email: "juan.perez@correo.uady.mx",
    roles: ["Administrador", "Empleado"],
  };

  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: menuPosition,
    whileElementsMounted: autoUpdate,
    middleware: [offset(6), flip(), shift({ padding: 8 })],
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

  const trigger = isValidElement(children)
    ? cloneElement(children, {
        ref: refs.setReference,
        ...getReferenceProps(children.props),
        "aria-label": children.props["aria-label"] ?? "Abrir menú de perfil",
      })
    : children;

  return (
    <>
      {trigger}

      {open && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="w-44 rounded-lg border border-gray-200 bg-white shadow-lg p-1 z-50"
            >
              <RoleSubmenu
                roles={roles}
                activeRole={activeRole ?? null}
                onSelectRole={(r) => {
                  setActiveRole(r);
                  setOpen(false); // cierra menú padre
                }}
              />

              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-red-50 rounded-md"
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

  const click = useClick(context, { toggle: true });
  const dismiss = useDismiss(context, { outsidePress: false });
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
        className="w-full px-3 py-2 text-sm text-left text-primary hover:bg-gray-100 rounded-md flex items-center justify-between"
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span>Cambiar Rol</span>
        <span className="text-gray-400">{">"}</span>
      </button>

      {open && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="w-44 rounded-lg border border-gray-200 bg-white shadow-lg p-1 z-50"
            >
              {roles.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500">Sin roles</div>
              ) : (
                roles.map((r) => {
                  const isActive = activeRole === r;
                  return (
                    <button
                      key={r}
                      onClick={() => {
                        onSelectRole(r); // ✅ rol clickeado
                        setOpen(false); // cierra submenu
                      }}
                      className={`w-full px-3 py-2 text-sm text-left rounded-md hover:bg-gray-100 flex items-center justify-between ${
                        isActive ? "bg-gray-50 font-medium" : "text-primary"
                      }`}
                      role="menuitem"
                    >
                      <span>{r}</span>
                      {isActive && <span className="text-gray-400">✓</span>}
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
