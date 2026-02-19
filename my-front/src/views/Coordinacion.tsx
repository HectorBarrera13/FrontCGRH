import { useMemo, useState } from "react";
import PageTitle from "../components/PageTitle";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import RoleSelector from "../components/RoleSelector";
import DynamicTable from "../components/Table";
import { Search, UserCircle2 } from "lucide-react";

type CoordUser = {
  clave_empleado: string;
  rfc: string;
  nombres: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  telefono: string;
  roles: string[];
};

const ROLE_COLORS: Record<string, { bg: string; text: string }> = {
  Admin_becas: { bg: "bg-indigo-50", text: "text-indigo-600" },
  User_becas: { bg: "bg-emerald-50", text: "text-emerald-600" },
  Viewer_becas: { bg: "bg-amber-50", text: "text-amber-600" },
};

export default function Coordinacion() {
  const activeRole = "admin";

  const users: CoordUser[] = [
    {
      clave_empleado: "EMP001",
      rfc: "PEGJ900101ABC",
      nombres: "Juan",
      primer_apellido: "Pérez",
      segundo_apellido: "García",
      email: "juan.perez@uady.mx",
      telefono: "999-123-4567",
      roles: ["User_becas"],
    },
    {
      clave_empleado: "EMP002",
      rfc: "LORM920202DEF",
      nombres: "María",
      primer_apellido: "López",
      segundo_apellido: "Rodríguez",
      email: "maria.lopez@uady.mx",
      telefono: "999-987-6543",
      roles: ["Viewer_becas"],
    },
  ];

  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    users[0]?.roles ?? [],
  );

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => {
      const fullName =
        `${u.nombres} ${u.primer_apellido} ${u.segundo_apellido}`.toLowerCase();
      return (
        u.clave_empleado.toLowerCase().includes(q) ||
        fullName.includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.rfc.toLowerCase().includes(q)
      );
    });
  }, [search]);

  const selectedUser =
    selectedIndex !== null ? (filteredUsers[selectedIndex] ?? null) : null;

  const headers = ["Clave", "Nombre", "Email", "Roles"];

  const tableData = filteredUsers.map((u) => ({
    clave: (
      <span className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-primary">
        {u.clave_empleado}
      </span>
    ),
    nombre: (
      <span className="text-gray-700 text-sm font-medium">
        {u.nombres} {u.primer_apellido} {u.segundo_apellido}
      </span>
    ),
    email: <span className="text-gray-400 text-sm">{u.email}</span>,
    roles: (
      <span className="flex flex-wrap gap-1">
        {u.roles.length ? (
          u.roles.map((r) => {
            const color = ROLE_COLORS[r] ?? {
              bg: "bg-gray-100",
              text: "text-gray-500",
            };
            return (
              <span
                key={r}
                className={`text-xs font-bold px-1.5 py-0.5 rounded ${color.bg} ${color.text}`}
              >
                {r.replace("_becas", "")}
              </span>
            );
          })
        ) : (
          <span className="text-gray-300 text-xs">—</span>
        )}
      </span>
    ),
  }));

  const handleRowSelect = (index: number) => {
    if (index === selectedIndex) {
      setSelectedIndex(null);
      return;
    }
    setSelectedIndex(index);
    const u = filteredUsers[index];
    if (u) setSelectedRoles(u.roles);
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Coordinación" />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-6 space-y-5">
          {activeRole === "admin" ? (
            <>
              {/* ── SEARCH ── */}
              <SearchBar
                placeholder="Buscar por clave, nombre, RFC o email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {/* ── TABLE CARD ── */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-gray-800">
                      Usuarios registrados
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {filteredUsers.length} usuario
                      {filteredUsers.length !== 1 ? "s" : ""} encontrado
                      {filteredUsers.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                {filteredUsers.length > 0 ? (
                  <DynamicTable
                    headers={headers}
                    data={tableData}
                    onRowSelect={handleRowSelect}
                    selectedIndex={selectedIndex}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-14 text-center">
                    <div className="w-11 h-11 bg-gray-50 rounded-2xl flex items-center justify-center mb-3">
                      <Search size={18} className="text-gray-300" />
                    </div>
                    <p className="text-sm font-medium text-gray-500">
                      Sin resultados
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                      Intenta con otro nombre, clave o RFC
                    </p>
                  </div>
                )}
              </div>

              {/* ── DIVIDER ── */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">
                  Detalle del usuario
                </span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* ── USER DETAIL ── */}
              {selectedUser ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                  {/* User card ocupa 2/3 */}
                  <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-50">
                      <h3 className="text-sm font-bold text-gray-800">
                        Información personal
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Datos del empleado seleccionado
                      </p>
                    </div>
                    <div className="p-6">
                      <UserCard user={selectedUser} />
                    </div>
                  </div>

                  {/* Role selector ocupa 1/3 */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-50">
                      <h3 className="text-sm font-bold text-gray-800">
                        Roles asignados
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Gestiona los permisos del usuario
                      </p>
                    </div>
                    <div className="p-5">
                      <RoleSelector
                        label=""
                        availableRoles={[
                          {
                            id: "Admin_becas",
                            name: "Admin Becas",
                            description:
                              "Acceso completo a la administración de becas",
                          },
                          {
                            id: "User_becas",
                            name: "Usuario Becas",
                            description: "Acceso limitado a funciones de becas",
                          },
                          {
                            id: "Viewer_becas",
                            name: "Visualizador Becas",
                            description: "Solo puede ver información de becas",
                          },
                        ]}
                        selectedRoles={selectedRoles}
                        onChange={(roles) => {
                          setSelectedRoles(roles);
                          console.log(
                            "Roles para",
                            selectedUser.clave_empleado,
                            ":",
                            roles,
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 px-5 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-sm text-gray-400">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                    <UserCircle2 size={18} className="text-gray-300" />
                  </div>
                  Selecciona un usuario en la tabla para ver su información.
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center gap-3 px-5 py-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-700">
              <span className="font-medium">Acceso restringido.</span>
              No tienes permisos para acceder a esta sección.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
