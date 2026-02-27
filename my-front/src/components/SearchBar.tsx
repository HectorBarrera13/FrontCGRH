import React from "react";
import { Search } from "./../assets/icons"; // Opcional: para un icono de lupa

interface SearchBarProps {
  value: string;
  placeholder: string;
  onChange: (newValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className="relative w-full max-w-md">
      {/* Icono decorativo */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-600 focus:border-gray-600 outline-none transition-all"
      />
    </div>
  );
};

export default SearchBar;
