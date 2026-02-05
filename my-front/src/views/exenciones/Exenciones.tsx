import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import PageTitle from "../../components/PageTitle";
import UploadCard from "../../components/UploadCard";
import { Upload } from "../../assets/icons";

export default function Exenciones() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <TopBar />

        <PageTitle title="Exenciones" />

        <div className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          <UploadCard
            title="Subir archivo de exenciones"
            accept=".pdf,.doc,.docx"
            onUpload={(file) => {
              console.log("Archivo subido:", file);
            }}
            onRemove={() => {
              console.log("Archivo removido");
            }}
          >
            <Upload className="w-12 h-12 text-gray-400" />
            <p className="text-sm text-gray-600 mt-2">
              Puedes subir documentos en formato PDF o Word.
            </p>
          </UploadCard>
        </div>
      </div>
    </div>
  );
}
