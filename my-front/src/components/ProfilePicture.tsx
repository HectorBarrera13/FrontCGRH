import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  FloatingTree,
  useFloatingNodeId,
  useFloatingTree,
  type Placement,
} from "@floating-ui/react";

type ProfilePictureProps = {
  menuPosition?: Placement;
};

export default function ProfilePicture({
  menuPosition = "bottom-start",
}: ProfilePictureProps) {
  return (
    <FloatingTree>
      <ProfilePictureInner menuPosition={menuPosition} />
    </FloatingTree>
  );
}

function ProfilePictureInner({ menuPosition }: { menuPosition: Placement }) {
  const navigate = useNavigate();

  const user = { nombres: "Usuario", primer_apellido: "Ejemplo", foto_url: "" };
  const initials =
    (user.nombres?.charAt(0) || "") + (user.primer_apellido?.charAt(0) || "");
  const hasImage = Boolean(user.foto_url);

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId(); // nodo raíz
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: menuPosition,
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
  });

  // Cerrar todo el árbol cuando se cierra este menú
  useEffect(() => {
    if (!tree) return;
    const onTreeClick = () => setIsOpen(false);
    tree.events.on("click", onTreeClick);
    return () => {
      tree.events.off("click", onTreeClick);
    };
  }, [tree]);

  const click = useClick(context);
  const dismiss = useDismiss(context); // click fuera + ESC
  const role = useRole(context, { role: "menu" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const roles = useMemo(() => ["Admin", "Doctor", "Recepción"], []);

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="w-10 h-10 rounded-full overflow-hidden bg-accent shadow-md flex items-center justify-center focus:outline-none"
        aria-label="Abrir menú de perfil"
      >
        {hasImage ? (
          <img
            src={user.foto_url}
            alt="Foto de perfil"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white font-medium text-sm select-none">
            {(initials || "U").toUpperCase()}
          </span>
        )}
      </button>

      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="w-44 rounded-lg border border-gray-200 bg-white shadow-lg p-1"
          >
            <RoleSubmenu roles={roles} />

            <button
              onClick={() => {
                // dispara cierre global del árbol:
                tree?.events.emit("click");
                navigate("/login");
              }}
              className="w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-red-50 rounded-md"
              role="menuitem"
            >
              Cerrar sesión
            </button>
          </div>
        </FloatingPortal>
      )}
    </>
  );
}

function RoleSubmenu({ roles }: { roles: string[] }) {
  const tree = useFloatingTree();

  const nodeId = useFloatingNodeId(); // id del submenú

  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    nodeId,

    open,
    onOpenChange: setOpen,
    placement: "right-start", // submenú al lado
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({ mainAxis: 6, alignmentAxis: -4 }),
      flip(), // si no cabe a la derecha, se va a la izquierda
      shift({ padding: 8 }),
    ],
  });

  // Opción A: abrir con click
  const click = useClick(context, { toggle: true });

  // Opción B (opcional): abrir en hover sin que se cierre al mover el mouse
  // const hover = useHover(context, { handleClose: safePolygon() });

  const role = useRole(context, { role: "menu" });

  // Ojo: en submenú normalmente NO pones dismiss global aquí;
  // el padre ya lo hace (click fuera + ESC).
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    // hover,
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
        Rol
        <span className="text-gray-400">{">"}</span>
      </button>

      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="w-44 rounded-lg border border-gray-200 bg-white shadow-lg p-1"
          >
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => {
                  // aquí seleccionas el rol
                  console.log("selected role:", r);

                  // cierra todo (submenú + menú principal)
                  tree?.events.emit("click");
                }}
                className="w-full px-3 py-2 text-sm text-left text-primary hover:bg-gray-100 rounded-md"
                role="menuitem"
              >
                {r}
              </button>
            ))}
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}
