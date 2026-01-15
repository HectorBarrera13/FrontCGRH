// src/components/FormField.tsx
type Props = {
  label: string;
  name: string;
  value: string;
  type?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  error?: string;
  touched?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  children?: React.ReactNode;
};

export function FormField({
  label,
  name,
  value,
  type = "text",
  placeholder,
  minLength,
  maxLength,
  error,
  touched,
  onChange,
  onBlur,
  children,
}: Props) {
  return (
    <div className="relative mb-4">
      <label className=" mb-2 text-[16px] font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
        placeholder={placeholder}
      />
      {touched && error && <p className="text-red-500 text-sm">{error}</p>}
      {children && (
        <div className="absolute right-3 top-9 flex items-center">
          {children}
        </div>
      )}
    </div>
  );
}
