import { Shield } from "lucide-react";
import React from "react";

interface Role {
  id: string;
  name: string;
  description?: string;
}

interface SimpleRoleSelectorProps {
  availableRoles: Role[];
  selectedRoles: string[];
  onChange: (selectedRoles: string[]) => void;
  label?: string;
  disabled?: boolean;
}

const SimpleRoleSelector: React.FC<SimpleRoleSelectorProps> = ({
  availableRoles,
  selectedRoles,
  onChange,
  label = "Roles",
  disabled = false,
}) => {
  const toggleRole = (roleId: string) => {
    if (selectedRoles.includes(roleId)) {
      onChange(selectedRoles.filter((id) => id !== roleId));
    } else {
      onChange([...selectedRoles, roleId]);
    }
  };

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <Shield className="w-4 h-4 inline mr-1" />
          {label}
        </label>
      )}

      {/* Lista de roles con checkboxes */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-100">
        {availableRoles.map((role) => {
          const isSelected = selectedRoles.includes(role.id);

          return (
            <div
              key={role.id}
              className={`
                p-4 flex items-center gap-3 transition-colors
                ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 cursor-pointer"}
              `}
              onClick={() => !disabled && toggleRole(role.id)}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => !disabled && toggleRole(role.id)}
                disabled={disabled}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer accent-primary"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Información del rol */}
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-900">
                  {role.name}
                </div>
                {role.description && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {role.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {availableRoles.length === 0 && (
          <div className="p-8 text-center text-gray-500 text-sm">
            No hay roles disponibles
          </div>
        )}
      </div>

      {/* Contador de seleccionados */}
      <div className="mt-2 text-xs text-gray-500">
        {selectedRoles.length}{" "}
        {selectedRoles.length === 1
          ? "rol seleccionado"
          : "roles seleccionados"}
      </div>
    </div>
  );
};

export default SimpleRoleSelector;
