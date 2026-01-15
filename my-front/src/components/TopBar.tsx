// components/TopBar.tsx

import ProfilePicture from "./ProfilePicture";

export default function TopBar() {
  return (
    <nav className="w-full bg-primary text-white">
      <div className="mx-auto flex max-w-[95%] h-16 items-center justify-between px-1 py-4">
        <span className="text-lg font-semibold">Sistema de Prestaciones</span>
        <ul className="flex gap-6 text-m font-medium align-center items-center">
          <li>
            <h2>Bienvenido User</h2>
          </li>
          <li>
            <ProfilePicture />
          </li>
        </ul>
      </div>
    </nav>
  );
}
