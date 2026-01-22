import { useNavigate } from "react-router-dom";

export default function PasswordRecovery() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 2. ¡Esto es vital! Detiene la recarga de la página

    navigate("/registro/email?status=recovery_instructions_sent");
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
          type="text"
          name="institutional_email"
          className="w-full border rounded-lg px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#C79316]"
          placeholder="xxxx@correo.uady.mx"
        />

        <label className="block mb-2 text-sm font-semibold">
          Confirmación de Correo Institucional:
        </label>
        <input
          type="text"
          name="institutional_email_confirmation"
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
