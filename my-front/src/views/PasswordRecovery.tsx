import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveWithExpiry } from "../utils/storage";
import { isUserInstitutionalEmailValid } from "../domain/User/UserInstitutionalEmail";

const initialState = {
  institutional_email: "",
  institutional_email_confirmation: "",
};

export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(initialState);
  const [form, setForm] = useState(initialState);
  const [touched, setTouched] = useState({
    institutional_email: false,
    institutional_email_confirmation: false,
  });

  useEffect(() => {
    const isInstitutionalEmailValid = isUserInstitutionalEmailValid(
      form.institutional_email
    );

    setErrors({
      institutional_email: isInstitutionalEmailValid
        ? ""
        : "Correo institucional no válido.",
      institutional_email_confirmation:
        form.institutional_email === form.institutional_email_confirmation
          ? ""
          : "La confirmación del correo institucional no coincide.",
    });
  }, [form]);

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({
      institutional_email: true,
      institutional_email_confirmation: true,
    });

    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      console.log("errores", errors);
      return;
    }
    saveWithExpiry("registro", form, 1000 * 60 * 10); // 10 minutos
    navigate("/recuperacion-contrasena/email-enviado");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleNext}
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
          value={form.institutional_email}
          onChange={(e) =>
            setForm({ ...form, institutional_email: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#C79316]"
          placeholder="xxxx@correo.uady.mx"
        />
        {errors.institutional_email && touched.institutional_email && (
          <p className="text-red-500 text-sm">{errors.institutional_email}</p>
        )}

        <label className="block mb-2 text-sm font-semibold">
          Confirmación de Correo Institucional:
        </label>
        <input
          type="email"
          name="institutional_email_confirmation"
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
        {errors.institutional_email_confirmation &&
          touched.institutional_email_confirmation && (
            <p className="text-red-500 text-sm">
              {errors.institutional_email_confirmation}
            </p>
          )}

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
