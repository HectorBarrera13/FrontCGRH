import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { useState } from "react";
import { PaginationBar } from "../../components/PaginationBar";
import { Payroll } from "../../domain/payroll/Payroll";
import { PayrollMapper } from "../../domain/payroll/Mapper";
import type { PayrollDto } from "../../domain/payroll/PayrollDto";
import { FilterPopover } from "../../components/Filter";
import PageTitle from "../../components/PageTitle";

// --- DATOS ESTÁTICOS ---
const MOCK_PAYROLL_RESPONSE: {
  data: PayrollDto[];
  total: number;
  current_page: number;
} = {
  current_page: 1,
  total: 1,
  data: [
    {
      id: 1,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "10",
      department: "Fac Enfermeria",
    },
    {
      id: 2,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "09",
      department: "Fac Enfermeria",
    },
    {
      id: 3,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "08",
      department: "Fac Enfermeria",
    },
    {
      id: 4,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "07",
      department: "Fac Enfermeria",
    },
    {
      id: 5,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "06",
      department: "Fac Enfermeria",
    },
    {
      id: 6,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "05",
      department: "Fac Enfermeria",
    },
    {
      id: 7,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "05",
      department: "Fac Enfermeria",
    },
    {
      id: 8,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "05",
      department: "Fac Enfermeria",
    },
  ],
};

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const YEARS = [2022, 2023, 2024, 2025, 2026];

const filterDefs = [
  {
    key: "year",
    label: "Año",
    options: YEARS.map((y) => ({ value: y, label: String(y) })),
  },
  {
    key: "month",
    label: "Mes",
    options: MONTHS.map((m, i) => ({ value: i, label: m })),
  },
];

export default function Cfdi() {
  // Estados simplificados (sin fetch)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Mapeo de datos estáticos
  const mappedData: Payroll[] = MOCK_PAYROLL_RESPONSE.data.map(
    PayrollMapper.fromDto,
  );

  const dateFormatter = (date: Date): string => {
    return date.toLocaleDateString("es-MX");
  };

  const handleDownloadStub = (folio: string) => {
    console.log(`Descargando archivo para el folio: ${folio}`);
  };

  const handleDownloadAll = () => {
    console.log("Descargando todos los documentos mostrados");
    // Aquí puedes implementar la lógica para descargar todos los documentos
  };

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <TopBar />

        <PageTitle title="Nóminas CFDI" />

        <div className="flex flex-col items-center justify-start">
          <div className="w-[90%] rounded-lg border border-gray-200 shadow-sm mb-4 bg-white">
            <table className="w-full border-separate border-spacing-0">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Folio
                  </th>
                  <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Departamento
                  </th>
                  <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Quincena
                  </th>
                  <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    <div className="flex items-center justify-center gap-1">
                      <FilterPopover
                        label="Fecha de pago"
                        align="left"
                        defs={filterDefs}
                        onChange={(filters) =>
                          console.log("Filtros cambiados:", filters)
                        }
                      />
                    </div>
                  </th>
                  <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Periodo pagado
                  </th>
                  <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Días
                  </th>
                  <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Descargas
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {mappedData.map((row) => (
                  <tr
                    key={row.folio}
                    className="hover:bg-blue-50/50 transition-colors text-center"
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-mono text-primary sm:pl-6">
                      #{row.folio}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                      {row.department}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                      <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-sm font-bold text-gray-600">
                        {row.fortnight}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                      {dateFormatter(row.paymentDate)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                      <span className="text-xs">
                        {dateFormatter(row.startDate)}
                      </span>
                      <span className="mx-1 text-gray-300">|</span>
                      <span className="text-xs">
                        {dateFormatter(row.endDate)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center font-medium">
                      {row.paidDays}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-center text-sm font-medium sm:pr-6">
                      <div className="flex justify-center gap-3">
                        <button
                          className="text-white hover:bg-accent bg-primary px-2 py-1 rounded"
                          onClick={() => handleDownloadStub(row.folio)}
                        >
                          PDF
                        </button>
                        <button
                          className="text-white hover:bg-accent bg-primary px-2 py-1 rounded"
                          onClick={() => handleDownloadStub(row.folio)}
                        >
                          XML
                        </button>
                      </div>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => toggleRow(row.id)}
                        className="w-5 h-5 rounded border-gray-300 text-[#0f3057] focus:ring-[#0f3057] cursor-pointer accent-[#0f3057]"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-[90%] flex justify-end mb-4">
            <button
              onClick={handleDownloadAll}
              className="bg-primary hover:bg-accent text-white px-4 py-2 rounded font-medium transition-colors"
            >
              Descargar todos
            </button>
          </div>

          <PaginationBar
            page={currentPage}
            totalItems={MOCK_PAYROLL_RESPONSE.total}
            itemsPerPage={itemsPerPage}
            onPageChange={(newPage: number) => setCurrentPage(newPage)}
          />
        </div>
      </div>
    </div>
  );
}
