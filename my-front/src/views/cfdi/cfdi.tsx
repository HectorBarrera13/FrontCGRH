import { useState } from "react";
import { PaginationBar } from "../../components/PaginationBar";
import { Payroll } from "../../domain/payroll/Payroll";
import { PayrollMapper } from "../../domain/payroll/Mapper";
import type { PayrollDto } from "../../domain/payroll/PayrollDto";
import FilterPopover from "../../components/Filter";
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";

// --- DATOS ESTÁTICOS ---
const MOCK_PAYROLL_RESPONSE: {
  data: PayrollDto[];
  total: number;
  current_page: number;
} = {
  current_page: 1,
  total: 24,
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
    {
      id: 9,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "10",
      department: "Fac Enfermeria",
    },
    {
      id: 10,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "09",
      department: "Fac Enfermeria",
    },
    {
      id: 11,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "08",
      department: "Fac Enfermeria",
    },
    {
      id: 12,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "07",
      department: "Fac Enfermeria",
    },
    {
      id: 13,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "06",
      department: "Fac Enfermeria",
    },
    {
      id: 14,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "05",
      department: "Fac Enfermeria",
    },
    {
      id: 15,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "05",
      department: "Fac Enfermeria",
    },
    {
      id: 16,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "05",
      department: "Fac Enfermeria",
    },
    {
      id: 17,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "10",
      department: "Fac Enfermeria",
    },
    {
      id: 18,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "09",
      department: "Fac Enfermeria",
    },
    {
      id: 19,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "08",
      department: "Fac Enfermeria",
    },
    {
      id: 20,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "07",
      department: "Fac Enfermeria",
    },
    {
      id: 21,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "06",
      department: "Fac Enfermeria",
    },
    {
      id: 22,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "05",
      department: "Fac Enfermeria",
    },
    {
      id: 23,
      folio: "202505000100300",
      payment_date: "2025-03-15",
      start_date: "2025-03-01",
      end_date: "2025-03-15",
      paid_days: 15,
      fortnight: "05",
      department: "Fac Enfermeria",
    },
    {
      id: 24,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const itemsPerPage = 10;

  // Mapeo de datos
  const mappedData: Payroll[] = MOCK_PAYROLL_RESPONSE.data.map(
    PayrollMapper.fromDto,
  );

  // Lógica de selección
  const allIds = mappedData.map((row) => row.id);
  const allSelected =
    allIds.length > 0 && allIds.every((id) => selectedIds.has(id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(allIds));
    }
  };

  const toggleOne = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const dateFormatter = (date: Date): string => {
    return date.toLocaleDateString("es-MX");
  };

  const handleDownloadStub = (folio: string) => {
    console.log(`Descargando archivo para el folio: ${folio}`);
  };

  // Definir headers
  const headers = [
    "Folio",
    "Departamento",
    "Quincena",
    <div key="filter-header" className="flex items-center justify-center gap-1">
      <FilterPopover
        label="Fecha de pago"
        align="left"
        defs={filterDefs}
        onChange={(filters) =>
          console.log("Filtros estáticos cambiados:", filters)
        }
      />
    </div>,
    "Periodo pagado",
    "Días",
    "Descargas",
    <div key="actions-header" className="flex justify-center">
      <input
        type="checkbox"
        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer accent-primary"
        checked={allSelected}
        onChange={toggleAll}
      />
    </div>,
  ];

  // Transformar datos para el componente Table
  const tableData = mappedData.map((row) => ({
    folio: <span className="font-mono text-primary">#{row.folio}</span>,
    department: <span className="text-gray-600">{row.department}</span>,
    fortnight: (
      <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-sm font-bold text-gray-600">
        {row.fortnight}
      </span>
    ),
    paymentDate: (
      <span className="text-gray-500">{dateFormatter(row.paymentDate)}</span>
    ),
    period: (
      <span className="text-gray-500">
        <span className="text-xs">{dateFormatter(row.startDate)}</span>
        <span className="mx-1 text-gray-300">|</span>
        <span className="text-xs">{dateFormatter(row.endDate)}</span>
      </span>
    ),
    paidDays: <span className="font-medium">{row.paidDays}</span>,
    actions: (
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
    ),
    select: (
      <input
        type="checkbox"
        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary p-0 m-0 cursor-pointer accent-primary"
        checked={selectedIds.has(row.id)}
        onChange={() => toggleOne(row.id)}
      />
    ),
  }));

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col">
        <PageTitle title="Comprobante Fiscal Digital por Internet (CFDI)" />
        <div className="flex items-center justify-between px-4 py-2 w-[90%] mx-auto">
          <PaginationBar
            page={currentPage}
            totalItems={MOCK_PAYROLL_RESPONSE.total}
            itemsPerPage={itemsPerPage}
            onPageChange={(newPage: number) => setCurrentPage(newPage)}
          />

          <button
            className={`flex items-center gap-2  text-white ${selectedIds.size > 0 ? "bg-primary hover:bg-accent" : "bg-gray-400 cursor-not-allowed"} px-4 py-2 rounded font-medium`}
            onClick={() => {
              selectedIds.forEach((id) => {
                const row = mappedData.find((r) => r.id === id);
                if (row) handleDownloadStub(row.folio);
              });
            }}
          >
            Descargar seleccionados ({selectedIds.size})
          </button>
        </div>
        <Table headers={headers} data={tableData} selectedIndex={-1} />
      </div>
    </div>
  );
}
