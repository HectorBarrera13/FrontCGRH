import React from "react";

interface TableProps {
  headers: string[]; // Los títulos de las columnas
  data: Record<string, unknown>[]; // Arreglo de objetos (las filas)
}

const DynamicTable: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="bg-white border-b hover:bg-gray-50 transition-colors"
            >
              {Object.values(row).map((value, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-gray-900"
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
  );
};

export default DynamicTable;
