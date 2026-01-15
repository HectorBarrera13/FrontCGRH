import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register2() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    password: "",
    password_confirmation: "",
  });

  // Simulamos un alias estático que vendría del paso anterior
  const alias = "usuario.prueba@uady.mx";

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-text">
          Registro de Empleado
        </h2>
        <p className="text-center mb-4 text-text-secondary">
          Crea una contraseña para completar tu registro institucional.
        </p>

        <label className="block mb-2 text-sm font-semibold">
          Nombre de usuario:
        </label>
        <p className="text-lg text-primary font-medium mb-4 bg-gray-50 p-2 rounded-lg border border-gray-100">
          {alias}
        </p>

        <label className="block mb-2 text-sm font-semibold">Contraseña:</label>
        <input
          type="text"
          name="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C79316]"
          placeholder="********"
          required
        />

        <label className="block mb-2 text-sm font-semibold">
          Confirmar contraseña:
        </label>
        <input
          type="text"
          name="password_confirmation"
          value={form.password_confirmation}
          onChange={(e) =>
            setForm({ ...form, password_confirmation: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#C79316]"
          placeholder="********"
          required
        />

        <button
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-accent transition-colors"
          onClick={() => navigate("/registro/email?status=enviado")}
        >
          Finalizar Registro
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full mt-4 bg-background-secondary text-text py-2 rounded-lg hover:bg-background-focus transition-colors"
        >
          Volver al login
        </button>
      </form>
    </div>
  );
}
