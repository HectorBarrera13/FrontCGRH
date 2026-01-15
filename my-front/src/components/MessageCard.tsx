import { type ReactNode } from "react";

type StatusCardProps = {
  icon: ReactNode;
  iconColor?: string;
  title: string;
  mainText: string;
  secondaryText?: string;
  children?: ReactNode;
};

export function StatusCard({
  icon,
  iconColor = "text-green-500",
  title,
  mainText,
  secondaryText,
  children,
}: StatusCardProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm text-center">
        <div className={`flex justify-center mb-6 ${iconColor}`}>{icon}</div>

        <h2 className="text-2xl font-bold mb-2 text-[#002E5F]">{title}</h2>

        <p className="text-gray-600 mb-2">{mainText}</p>

        {secondaryText && (
          <p className="text-gray-500 text-sm mb-6">{secondaryText}</p>
        )}

        {children}
      </div>
    </div>
  );
}
