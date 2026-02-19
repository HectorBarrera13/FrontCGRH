import { useState } from "react";
import PageTitle from "../components/PageTitle";
import {
  Upload,
  FileText,
  Trash2,
  Search,
  Clock,
  CheckCircle2,
} from "lucide-react";
import UploadCard from "../components/UploadCard";
import Table from "../components/Table";

const LAST_UPLOADS = [
  { name: "CFDI", date: "2025-05-10", status: "success" },
  {
    name: "Fondo de ahorro para retiro",
    date: "2025-04-28",
    status: "success",
  },
  { name: "Caja de ahorro", date: "2025-05-02", status: "success" },
  { name: "Fondo de vivienda", date: "2025-03-15", status: "success" },
];

const MOCK_CFDI_FILES = [
  {
    id: 1,
    folio: "2025050001",
    fecha: "2025-05-12",
    nombre: "Nomina_Mayo_Q1.pdf",
  },
  {
    id: 2,
    folio: "2025050002",
    fecha: "2025-05-12",
    nombre: "Nomina_Mayo_Q1.xml",
  },
];

export default function Admin() {
  const [searchTerm, setSearchTerm] = useState("");

  const headers = ["Folio", "Nombre del Archivo", "Fecha de Carga", "Acciones"];

  const filtered = MOCK_CFDI_FILES.filter(
    (f) =>
      f.folio.includes(searchTerm) ||
      f.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const tableData = filtered.map((file) => {
    return {
      folio: (
        <span className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />
          #{file.folio}
        </span>
      ),
      name: (
        <span className="inline-flex items-center gap-1">
          <span className="text-gray-700 text-sm">{file.nombre}</span>
        </span>
      ),
      date: (
        <span className="inline-flex items-center gap-1.5 text-gray-400 text-sm">
          <Clock size={13} />
          {file.fecha}
        </span>
      ),
      actions: (
        <button
          onClick={() => console.log("Eliminando:", file.id)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500
                     border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300
                     transition-all duration-150"
          title="Eliminar archivo"
        >
          <Trash2 size={13} />
          Eliminar
        </button>
      ),
    };
  });

  return (
    <div className="flex-1 flex flex-col">
      <PageTitle title="Administración" />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
          {/* ── TOP ROW ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* UploadCard directo — sin wrapper, ocupa 2 columnas */}
            <div className="lg:col-span-2 flex">
              <UploadCard
                title="Cargar archivos con nombre específicos"
                accept=".pdf,.doc,.docx"
                onUpload={(file) => console.log("Archivo subido:", file)}
                onRemove={() => console.log("Archivo removido")}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center">
                    <Upload className="text-indigo-500" size={26} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">
                      Arrastra tu archivo aquí
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      PDF o Word · Máx. 10 MB
                    </p>
                  </div>
                </div>
              </UploadCard>
            </div>

            {/* Last Updates — 1/3 */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 pt-5 pb-3 border-b border-gray-50 flex items-center gap-2">
                <FileText size={18} className="text-indigo-500" />
                <h3 className="text-sm font-semibold text-gray-800">
                  Últimas actualizaciones
                </h3>
              </div>
              <div className="p-4 space-y-1 flex-1">
                {LAST_UPLOADS.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2
                        size={15}
                        className="text-emerald-500 shrink-0"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 group-hover:bg-white px-2 py-0.5 rounded-md transition-colors">
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── DIVIDER ── */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Archivos CFDI
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* ── LOWER SECTION ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  Gestionar Archivos CFDI
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {filtered.length} archivo(s) encontrado(s)
                </p>
              </div>
              <div className="relative w-full md:w-64">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                  size={15}
                />
                <input
                  type="text"
                  placeholder="Buscar nombre del archivo..."
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl
                             bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20
                             focus:border-indigo-400 outline-none transition-all placeholder:text-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {filtered.length > 0 ? (
              <Table headers={headers} data={tableData} selectedIndex={-1} />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
                  <Search size={20} className="text-gray-300" />
                </div>
                <p className="text-sm font-medium text-gray-500">
                  Sin resultados
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  Intenta con otro folio o nombre
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
