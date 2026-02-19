import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField } from "../../components/FormField";

const initialState = {
  clave_empleado: "",
  rfc: "",
  email: "",
  email_confirmation: "",
};

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);

  // Navegación directa al paso 2 sin validaciones de API
  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos capturados (estático):", form);
    navigate("/registro/paso2");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form
        onSubmit={handleNext}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-text">
          Registro de Empleado
        </h2>
        <p className="text-center mb-4 text-text-secondary">
          Sus datos personales son de su credencial del servicio médico. Sólo se
          pueden registrar con los datos del Empleado (NO BENEFICIARIOS)
        </p>

        <FormField
          label="Clave de Empleado:"
          name="clave_empleado"
          value={form.clave_empleado}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) {
              setForm({ ...form, clave_empleado: val });
            }
          }}
          placeholder="Clave de 5 dígitos"
        />

        <FormField
          label="Correo Institucional:"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="xxxx@correo.uady.mx"
        />

        <FormField
          label="Confirmación de Correo Institucional:"
          name="institutional_email_confirmation"
          type="email"
          value={form.email_confirmation}
          onChange={(e) =>
            setForm({
              ...form,
              email_confirmation: e.target.value,
            })
          }
          placeholder="xxxx@correo.uady.mx"
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-accent transition-colors"
        >
          Continuar
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
