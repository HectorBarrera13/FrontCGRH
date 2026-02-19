import React from "react";

interface TableProps {
  headers: (string | React.ReactNode)[]; // Ahora acepta strings o componentes React
  data: Record<string, unknown>[];
  onRowSelect?: (index: number) => void; // Nueva prop para manejar selección de fila
  selectedIndex: number | null; // Índice de la fila seleccionada
}

const DynamicTable: React.FC<TableProps> = ({
  headers,
  data,
  onRowSelect,
  selectedIndex,
}) => {
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="w-[90%]  rounded-lg border border-gray-200 shadow-sm mb-4 bg-white">
        <table className="w-full text-sm text-left text-gray-600 border-collapse">
          <thead className=" bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`hover:bg-blue-50/50 transition-colors text-center ${selectedIndex === rowIndex ? "bg-blue-100" : ""}`}
                onClick={() => onRowSelect && onRowSelect(rowIndex)}
              >
                {Object.values(row).map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-mono text-primary sm:pl-6"
                  >
                    {value as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No hay datos disponibles.
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicTable;
