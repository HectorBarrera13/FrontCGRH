import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import PageTitle from "../components/PageTitle";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import UserCard from "../components/UserCard";
import ConfirmModal from "../components/ConfirmModal";
import RoleSelector from "../components/RoleSelector";
import SimpleRoleSelector from "../components/SimpleRolSelector";
import { useState } from "react";

export default function ServicioMedico() {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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
    {
      id: "5",
      name: "Técnico",
      description: "Soporte técnico del sistema",
      color: "purple",
    },
    {
      id: "6",
      name: "Supervisor",
      description: "Supervisor de área",
      color: "yellow",
    },
  ];

  const handleDelete = async () => {
    setIsDeleting(true);
    // Tu lógica de eliminación
    // await deleteUser(userId);
    setTimeout(() => {
      setIsDeleting(false);
      setShowModal(false);
    }, 2000);
  };

  const handleRoleChange = (roles: string[]) => {
    setSelectedRoles(roles);
    console.log("Roles actualizados:", roles);
    // Aquí puedes hacer la petición al backend para actualizar los roles
  };

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col overflow-auto">
        <TopBar />
        <PageTitle title="Servicio Médico" />

        <div className="p-4">
          <SearchBar value="" placeholder="Buscar..." onChange={() => {}} />
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
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Gestión de Roles
              </h3>
              <RoleSelector
                availableRoles={availableRoles}
                selectedRoles={selectedRoles}
                onChange={handleRoleChange}
                label="Asignar Roles al Usuario"
                placeholder="Selecciona los roles..."
                maxSelections={4}
              />

              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Eliminar Usuario
                </button>
              </div>
            </div>
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

        <ConfirmModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleDelete}
          title="¿Eliminar usuario?"
          message="Esta acción no se puede deshacer. El usuario será eliminado permanentemente del sistema."
          type="danger"
          confirmText="Eliminar"
          cancelText="Cancelar"
          isLoading={isDeleting}
        />
      </div>
    </div>
  );
}
