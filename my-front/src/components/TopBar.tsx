// components/TopBar.tsx

import ProfilePicture from "./ProfilePicture";

export default function TopBar() {
  return (
    <nav className="w-full bg-primary text-white">
      <div className="h-16 flex items-center px-8">
        {/* IZQUIERDA */}
        <span className="text-lg font-semibold">Sistema de Prestaciones</span>

        {/* ESPACIADOR */}
        <div className="flex-1" />

        {/* DERECHA */}
        <ul className="flex items-center gap-6">
          <li className="text-sm font-medium">Bienvenido User</li>
          <li>
            <ProfilePicture menuPosition="bottom-start" />
          </li>
        </ul>
      </div>
    </nav>
  );
}
