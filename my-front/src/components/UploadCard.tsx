import React, { useRef } from "react";

type UploadCardProps = {
  title?: string;
  onUpload?: (file: File) => void;
  onRemove?: () => void;
  onChange?: () => void;
  disabled?: boolean;
  accept?: string;
  children: React.ReactNode;
};

export default function UploadCard({
  title = "Archivo",
  onUpload,
  onRemove,
  onChange,
  disabled = false,
  accept = "*",
  children,
}: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handlePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUpload?.(file);
    e.target.value = "";
  };

  return (
    <div className="w-full flex-1 mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex flex-col mb-4">
        {/* Título estilizado como las etiquetas del login */}
        <span className="text-[15px] font-bold text-[#0a1f44] mb-3">
          {title}:
        </span>

        <div className="flex items-center gap-2 mb-4">
          <button
            type="button"
            onClick={openPicker}
            disabled={disabled}
            className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg bg-[#0f3057] text-white hover:bg-[#164273] transition-colors disabled:opacity-50"
          >
            Subir
          </button>

          {onChange && (
            <button
              type="button"
              onClick={onChange}
              disabled={disabled}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#e8eaf0] text-[#0a1f44] hover:bg-[#dadddefault] transition-colors disabled:opacity-50"
            >
              Cambiar
            </button>
          )}

          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              disabled={disabled}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
            >
              Quitar
            </button>
          )}
        </div>
      </div>

      {/* Área de Drop/Visualización */}
      <div
        className="w-full h-44 rounded-xl border-2 border-dashed border-gray-200 bg-[#f8f9fb] flex flex-col items-center justify-center cursor-pointer hover:border-[#0f3057] hover:bg-[#f0f2f5] transition-all overflow-hidden group"
        onClick={openPicker}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && openPicker()}
      >
        <div className="text-gray-400 group-hover:text-[#0f3057] transition-colors align-middle justify-center flex flex-col items-center">
          {children}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handlePick}
        className="hidden"
      />
    </div>
  );
}
