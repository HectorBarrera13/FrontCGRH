// components/TopBar.tsx;
import ProfilePicture from "./ProfilePicture";

export default function TopBar({ isOpen }: { isOpen: boolean }) {
  const user = {
    nombres: "Juan Pérez",
    email: "",
  };

  return (
    <nav
      className={`
        w-full bg-primary text-white
        transition-all duration-300
        relative z-30
      `}
    >
      <div className=" mx-auto flex max-w-[95%] h-16 items-center justify-between px-1 py-4 pl-16 ">
        <span
          className={`text-lg font-semibold ${isOpen ? "hidden" : "md:block"}`}
        >
          Sistema de Prestaciones
        </span>

        <ul className="flex gap-6 text-m font-medium items-center ml-auto">
          <li className="hidden md:block">
            <h2>Bienvenido {user?.nombres}</h2>
          </li>
          <li>
            <ProfilePicture menuPosition="right-start" />
          </li>
        </ul>
      </div>
    </nav>
  );
}
