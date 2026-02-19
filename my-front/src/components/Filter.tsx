import { useEffect, useId, useRef, useState } from "react";
import { ChevronsUpDown } from "./../assets/icons";

type FilterOption = {
  value: string | number;
  label: string;
};

type FilterDef = {
  key: string;
  label: string; // título del filtro
  options: FilterOption[];
};

type FiltersValue = Record<string, string | number | "">;

type FilterPopoverProps = {
  label?: string;
  defs: FilterDef[];
  value?: FiltersValue; // opcional (controlado)
  onChange?: (value: FiltersValue) => void;

  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  align?: "left" | "right";
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;

  className?: string;
  panelClassName?: string;
  buttonClassName?: string;
};

function useControllableState(params: {
  value?: boolean;
  defaultValue: boolean;
  defs: FilterDef[];
  onChange?: (v: boolean) => void;
}) {
  const { value, defaultValue, onChange } = params;
  const [internal, setInternal] = useState(defaultValue);

  const isControlled = value !== undefined;
  const state = isControlled ? value : internal;

  const setState = (next: boolean | ((prev: boolean) => boolean)) => {
    const resolved = typeof next === "function" ? next(state) : next;
    if (!isControlled) setInternal(resolved);
    onChange?.(resolved);
  };

  return [state, setState] as const;
}

export default function FilterPopover({
  label,
  defs,
  value, // 👈 si lo quieres controlado
  onChange,
  defaultOpen = false,
  open,
  onOpenChange,
  align = "right",
  closeOnOutsideClick = true,
  closeOnEsc = true,
  className = "",
  panelClassName = "",
  buttonClassName = "",
}: FilterPopoverProps) {
  const popoverId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [internalSelected, setInternalSelected] = useState<FiltersValue>({});
  const selected = value ?? internalSelected;

  const setSelected = (next: FiltersValue) => {
    if (!value) setInternalSelected(next); // solo si es uncontrolled
    onChange?.(next); // ✅ avisa al padre con objeto
  };

  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    defs: defs,
    onChange: onOpenChange,
  });

  // Click fuera
  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) return;

    const onPointerDown = (e: PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (root.contains(e.target as Node)) return;
      setIsOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen, closeOnOutsideClick, setIsOpen]);

  // ESC
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeOnEsc, setIsOpen]);

  return (
    <div
      ref={rootRef}
      className={`relative inline-block ${className} transition-transform `}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
        aria-controls={popoverId}
        className={`flex items-center gap-1 p-1 rounded transition-colors
          ${isOpen ? "bg-blue-100 text-blue-600" : "hover:bg-gray-200"}
          ${buttonClassName}
        `}
      >
        <span className="text-sm">{label}</span>
        <ChevronsUpDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        id={popoverId}
        className={`
          absolute z-20 mt-2 w-max rounded-xl border border-gray-200 bg-white shadow-xl p-4
          ${align === "right" ? "right-0" : "left-0"}
          transition duration-150 ease-out origin-top
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }
          ${panelClassName}
        `}
      >
        {defs.map((def) => (
          <div key={def.key} className="mb-3 last:mb-0">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {def.label}
            </label>

            <select
              value={selected[def.key] ?? ""}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              onChange={(e) => {
                setSelected({
                  ...selected,
                  [def.key]: e.target.value,
                });
              }}
            >
              <option value="">Todos</option>
              {def.options.map((opt) => (
                <option key={String(opt.label)} value={String(opt.value)}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
