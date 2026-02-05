import React from "react";
import { Mail, Phone, CreditCard, Hash, Shield } from "../assets/icons";

interface UserCardProps {
  user: {
    clave_empleado: string;
    rfc: string;
    nombres: string;
    primer_apellido: string;
    segundo_apellido: string;
    email: string;
    telefono: string;
    roles: string[];
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="max-w-md bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Encabezado con Iniciales */}
      <div className="bg-primary p-6 flex items-center space-x-4">
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white text-2xl font-bold border-2 border-accent/30">
          {user.nombres[0]}
          {user.primer_apellido[0]}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white leading-tight">
            {user.nombres} {user.primer_apellido} {user.segundo_apellido}
          </h2>
          <span className="text-blue-100 text-sm flex items-center mt-1">
            <Hash className="w-3 h-3 mr-1" />
            ID: {user.clave_empleado}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3 text-gray-700">
          <CreditCard className="w-5 h-5 text-primary" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-semibold uppercase">
              RFC
            </span>
            <span className="text-sm font-medium uppercase">{user.rfc}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-2 border-t border-gray-50">
          <div className="flex items-center space-x-3 text-gray-700">
            <Mail className="w-5 h-5 text-primary" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-semibold uppercase">
                Email
              </span>
              <span className="text-sm truncate">{user.email}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-gray-700">
            <Phone className="w-5 h-5 text-primary" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-semibold uppercase">
                Teléfono
              </span>
              <span className="text-sm">{user.telefono}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-50 flex flex-col relative">
          <div className="flex items-center mb-2">
            <Shield className="w-4 h-4 text-primary mr-2" />
            <span className="text-xs text-gray-400 font-semibold uppercase italic">
              Roles Asignados
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.roles.map((rol, index) => (
              <span
                key={index}
                className="px-2.5 py-0.5 bg-accent/20 text-accent text-xs font-semibold rounded-full border border-accent/30"
              >
                {rol}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
