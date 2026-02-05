import { Shield, X, Check, ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface Role {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

interface RoleSelectorProps {
  availableRoles: Role[];
  selectedRoles: string[];
  onChange: (selectedRoles: string[]) => void;
  label?: string;
  placeholder?: string;
  maxSelections?: number;
  disabled?: boolean;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  availableRoles,
  selectedRoles,
  onChange,
  label = "Roles",
  placeholder = "Seleccionar roles...",
  maxSelections,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredRoles = availableRoles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleRole = (roleId: string) => {
    if (selectedRoles.includes(roleId)) {
      onChange(selectedRoles.filter((id) => id !== roleId));
    } else {
      if (maxSelections && selectedRoles.length >= maxSelections) {
        return;
      }
      onChange([...selectedRoles, roleId]);
    }
  };

  const removeRole = (roleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedRoles.filter((id) => id !== roleId));
  };

  const getSelectedRoleObjects = () => {
    return availableRoles.filter((role) => selectedRoles.includes(role.id));
  };

  const getRoleColor = (color?: string) => {
    const colors: { [key: string]: string } = {
      blue: "bg-blue-100 text-blue-700 border-blue-300",
      green: "bg-green-100 text-green-700 border-green-300",
      purple: "bg-purple-100 text-purple-700 border-purple-300",
      red: "bg-red-100 text-red-700 border-red-300",
      yellow: "bg-yellow-100 text-yellow-700 border-yellow-300",
      gray: "bg-gray-100 text-gray-700 border-gray-300",
    };
    return colors[color || "blue"] || colors.blue;
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <Shield className="w-4 h-4 inline mr-1" />
          {label}
        </label>
      )}

      {/* Selector principal */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          relative min-h-[42px] w-full px-3 py-2 
          bg-white border border-gray-300 rounded-lg 
          cursor-pointer transition-all
          ${isOpen ? "ring-2 ring-primary/20 border-primary" : "hover:border-gray-400"}
          ${disabled ? "bg-gray-50 cursor-not-allowed opacity-60" : ""}
        `}
      >
        <div className="flex items-center justify-between gap-2">
          {/* Roles seleccionados */}
          <div className="flex flex-wrap gap-1.5 flex-1">
            {getSelectedRoleObjects().length > 0 ? (
              getSelectedRoleObjects().map((role) => (
                <span
                  key={role.id}
                  className={`
                    inline-flex items-center px-2.5 py-1 rounded-full 
                    text-xs font-semibold border
                    ${getRoleColor(role.color)}
                  `}
                >
                  {role.name}
                  {!disabled && (
                    <button
                      onClick={(e) => removeRole(role.id, e)}
                      className="ml-1.5 hover:bg-black/10 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm py-1">{placeholder}</span>
            )}
          </div>

          {/* Icono chevron */}
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-hidden">
          {/* Buscador */}
          <div className="p-2 border-b border-gray-100">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar rol..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Lista de roles */}
          <div className="overflow-y-auto max-h-48">
            {filteredRoles.length > 0 ? (
              filteredRoles.map((role) => {
                const isSelected = selectedRoles.includes(role.id);
                const isDisabled =
                  !isSelected &&
                  maxSelections &&
                  selectedRoles.length >= maxSelections;

                return (
                  <div
                    key={role.id}
                    onClick={() => !isDisabled && toggleRole(role.id)}
                    className={`
                      px-4 py-3 flex items-center justify-between
                      transition-colors cursor-pointer
                      ${isSelected ? "bg-blue-50" : "hover:bg-gray-50"}
                      ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`
                            w-2 h-2 rounded-full
                            ${isSelected ? "bg-primary" : "bg-gray-300"}
                          `}
                        />
                        <span className="font-medium text-sm text-gray-900">
                          {role.name}
                        </span>
                      </div>
                      {role.description && (
                        <p className="text-xs text-gray-500 mt-1 ml-4">
                          {role.description}
                        </p>
                      )}
                    </div>

                    {isSelected && (
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                No se encontraron roles
              </div>
            )}
          </div>

          {/* Footer con contador */}
          {maxSelections && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-600 text-center">
                {selectedRoles.length} de {maxSelections} roles seleccionados
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoleSelector;
