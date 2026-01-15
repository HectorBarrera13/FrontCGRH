import { useState } from "react";
import { Register } from "../../api/fetchDirectory";
import { useNavigate } from "react-router-dom";
import { useNavigationHelpers } from "../../hooks/useNavigationHelper";
import { type User } from "../../domain/User/User";

export default function Register2() {
  const navigate = useNavigate();
  const { navigateToLogin } = useNavigationHelpers();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    userName: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!form.password || !form.password_confirmation) {
      return "completar campos";
    }

    const rawApiData = localStorage.getItem("registro");
    const apiDataStored = rawApiData ? JSON.parse(rawApiData) : null;
    const rawFormData = localStorage.getItem("form");
    const formDataStored = rawFormData ? JSON.parse(rawFormData) : null;

    const newUser: User = {
      clave_empleado: formDataStored?.value?.clave_empleado || "",
      rfc: formDataStored?.value?.rfc || "",
      nombres: apiDataStored?.value?.nombres || "",
      primer_apellido: apiDataStored?.value?.primer_apellido || "",
      segundo_apellido: apiDataStored?.value?.segundo_apellido || "",
      email: formDataStored?.value?.email || "",
      telefono: "9992020402",
    };

    try {
      const data = await Register(
        newUser,
        form.password,
        form.password_confirmation
      );
      console.log("✅ Registro exitoso:", data.data);
      navigate("/registro/email-enviado");
    } catch (err) {
      console.error("❌ Error en registro:", err);
    } finally {
      setIsLoading(false);
      setForm({ userName: "", password: "", password_confirmation: "" });
    }
  };

  const raw = localStorage.getItem("registro");
  console.log("Datos de registro almacenados:", raw);
  const formStored = raw ? JSON.parse(raw) : null;
  console.log("Datos de registro parseados:", formStored.value);
  const data = formStored?.value?.data || "";
  console.log("Correo institucional extraído:", data.username);
  const alias = data.username;

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-text">
          Registro de Empleado
        </h2>
        <p className="text-center mb-4 text-text-secondary">
          Sus datos personales son de su credencial del servicio médico. Sólo se
          pueden registrar con los datos del Empleado (NO BENEFICIARIOS)
        </p>
        <label className="block mb-2 text-sm font-semibold">
          Nombre de usuario:
        </label>
        <p className="text-lg text-text mb-4 ">
          {alias ? `${alias}` : "No hay correo guardado"}
        </p>

        <label className="block mb-2 text-sm font-semibold">Contraseña:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#C79316]"
          placeholder="********"
        />

        <label className="block mb-2 text-sm font-semibold">
          Confirmar contraseña:
        </label>
        <input
          type="password"
          name="password_confirmation"
          value={form.password_confirmation}
          onChange={(e) =>
            setForm({ ...form, password_confirmation: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#C79316]"
          placeholder="********"
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-accent transition-colors"
        >
          {isLoading ? "Cargando..." : "Registrar"}
        </button>

        <button
          type="button"
          onClick={navigateToLogin}
          className="w-full mt-4 bg-background-secondary text-text py-2 rounded-lg hover:bg-background-focus transition-colors"
        >
          Volver al login
        </button>
      </form>
    </div>
  );
}
