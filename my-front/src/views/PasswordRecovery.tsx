import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // Estado simplificado solo para controlar los inputs
  const [form, setForm] = useState({
    institutional_email: "",
    institutional_email_confirmation: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes redirigir a donde desees después de "enviar" el correo
    // Por ejemplo, de vuelta al login o a una pantalla de éxito
    alert("Si el correo es válido, recibirás instrucciones pronto.");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-text">
          ¿Olvidaste tu contraseña?
        </h2>
        <p className="text-center mb-4 text-text-secondary">
          Proporciona tu correo electrónico institucional, se te enviará una
          confirmación para reiniciar contraseña
        </p>

        <label className="block mb-2 text-sm font-semibold">
          Correo Institucional:
        </label>
        <input
          type="email"
          name="institutional_email"
          required
          value={form.institutional_email}
          onChange={(e) =>
            setForm({ ...form, institutional_email: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#C79316]"
          placeholder="xxxx@correo.uady.mx"
        />

        <label className="block mb-2 text-sm font-semibold">
          Confirmación de Correo Institucional:
        </label>
        <input
          type="email"
          name="institutional_email_confirmation"
          required
          value={form.institutional_email_confirmation}
          onChange={(e) =>
            setForm({
              ...form,
              institutional_email_confirmation: e.target.value,
            })
          }
          className="w-full border rounded-lg px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-background-focus"
          placeholder="xxxx@correo.uady.mx"
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-accent transition-colors"
        >
          Enviar
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
