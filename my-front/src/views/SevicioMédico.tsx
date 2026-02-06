import PageTitle from "../components/PageTitle";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import UserCard from "../components/UserCard";
import SimpleRoleSelector from "../components/SimpleRolSelector";
import { useState } from "react";

export default function ServicioMedico() {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["1", "2"]);

  const availableRoles = [
    {
      id: "1",
      name: "Empleado",
      description: "Usuario básico del sistema",
      color: "gray",
    },
    {
      id: "2",
      name: "Administrador",
      description: "Acceso completo al sistema",
      color: "yellow",
    },
    {
      id: "3",
      name: "Contabilidad",
      description: "Acceso a servicios contables",
      color: "blue",
    },
    {
      id: "4",
      name: "RH",
      description: "Personal de recursos humanos",
      color: "green",
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <PageTitle title="Servicio Médico" />

      <div className="p-4">
        <div className="mb-4 justify-end flex">
          <SearchBar value="" placeholder="Buscar..." onChange={() => {}} />
        </div>
        <Table
          headers={["Nombre", "Edad", "Género", "Departamento"]}
          data={[
            {
              Nombre: "Juan Pérez",
              Edad: 30,
              Género: "Masculino",
              Departamento: "Matemáticas",
            },
            {
              Nombre: "María López",
              Edad: 25,
              Género: "Femenino",
              Departamento: "Enfermería",
            },
          ]}
        />
      </div>

      <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* UserCard */}
        <div>
          <UserCard
            user={{
              clave_empleado: "EMP123",
              rfc: "RFC123456",
              nombres: "Carlos",
              primer_apellido: "Gómez",
              segundo_apellido: "Ramírez",
              email: "carlos.gomez@example.com",
              telefono: "555-1234-567",
              roles: ["Empleado", "Administrador"],
            }}
          />
        </div>

        {/* RoleSelector */}
        <div>
          <div className="p-6 max-w-md">
            <SimpleRoleSelector
              availableRoles={availableRoles}
              selectedRoles={selectedRoles}
              onChange={setSelectedRoles}
              label="Asignar Roles"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
