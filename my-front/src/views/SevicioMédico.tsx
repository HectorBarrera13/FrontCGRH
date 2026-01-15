import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import PageTitle from "../components/PageTitle";

export default function ServicioMedico() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <PageTitle title="Servicio Médico" />
      </div>
    </div>
  );
}
