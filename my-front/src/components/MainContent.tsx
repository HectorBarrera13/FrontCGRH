// components/MainContent.tsx
import React, { type ReactNode } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <main className="h-screen bg-gray-100 overflow-hidden">
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <TopBar isOpen={isSidebarOpen} />

      {/* CONTENEDOR BLANCO REAL    ${isSidebarOpen ? "left-75" : "left-16"}*/}
      <section
        className={`
          fixed
          top-16
          right-0
          transition-all duration-300
          left-16
        `}
      >
        {/* Scroll SOLO aquí */}
        <div className="h-full overflow-y-auto">
          <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </div>
      </section>
    </main>
  );
}
