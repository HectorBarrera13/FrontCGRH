import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveWithExpiry } from "../../utils/storage";
import { isUserEmployeeKeyVaid } from "../../domain/User/UserEmployeeKey";
import { isUserRFCValid } from "../../domain/User/UserRFC";
import { isUserInstitutionalEmailValid } from "../../domain/User/UserInstitutionalEmail";
import { FormField } from "../../components/FormField";
import { useNavigationHelpers } from "../../hooks/useNavigationHelper";
import { FetchEmployee } from "../../api/fetchDirectory";
import { useAuth } from "../../hooks/useAuth";

const initialState = {
  clave_empleado: "",
  rfc: "",
  email: "",
  email_confirmation: "",
};

export default function Register() {
  const navigate = useNavigate();
  const { navigateToLogin } = useNavigationHelpers();
  const [errors, setErrors] = useState(initialState);
  const [form, setForm] = useState(initialState);
  const [isLoadinng, setIsLoading] = useState(false);
  const { setRegister } = useAuth();
  const [touched, setTouched] = useState({
    clave_empleado: false,
    rfc: false,
    email: false,
    email_confirmation: false,
  });

  useEffect(() => {
    const isEmployeeKeyValid = isUserEmployeeKeyVaid(form.clave_empleado);
    const isRFCValid = isUserRFCValid(form.rfc);
    const isInstitutionalEmailValid = isUserInstitutionalEmailValid(form.email);

    setErrors({
      clave_empleado: isEmployeeKeyValid ? "" : "Clave de empleado no válida.",
      rfc: isRFCValid ? "" : "RFC no válido.",
      email: isInstitutionalEmailValid ? "" : "Correo institucional no válido.",
      email_confirmation:
        form.email === form.email_confirmation
          ? ""
          : "La confirmación del correo institucional no coincide.",
    });
  }, [form]);

  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTouched({
      clave_empleado: true,
      rfc: true,
      email: true,
      email_confirmation: true,
    });

    try {
      const data = await FetchEmployee(
        form.clave_empleado,
        form.rfc,
        "Barre870101HDFRRR09",
        form.email
      );
      setRegister(true);
      saveWithExpiry("registro", data, 1000 * 60 * 10); // 10 minutos
      setIsLoading(false);
      navigate("/registro/paso2");
    } catch (error) {
      console.error("Error al validar empleado:", error);
      setIsLoading(false);
    }
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
          minLength={5}
          maxLength={5}
          onChange={(e) => {
            const val = e.target.value;
            //Solo permitir números
            if (/^\d*$/.test(val)) {
              setForm({ ...form, clave_empleado: val });
            }
          }}
          onBlur={() => setTouched({ ...touched, clave_empleado: true })}
          error={errors.clave_empleado}
          touched={touched.clave_empleado}
          placeholder="Clave de 5 dígitos"
        />

        <FormField
          label="RFC:"
          name="rfc"
          value={form.rfc}
          minLength={13}
          maxLength={13}
          onChange={(e) => setForm({ ...form, rfc: e.target.value })}
          onBlur={() => setTouched({ ...touched, rfc: true })}
          error={errors.rfc}
          touched={touched.rfc}
          placeholder="RFC de 13 caracteres"
        />

        <FormField
          label="Correo Institucional:"
          name="email"
          type="email"
          maxLength={150}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          onBlur={() => setTouched({ ...touched, email: true })}
          error={errors.email}
          touched={touched.email}
          placeholder="xxxx@correo.uady.mx"
        />

        <FormField
          label="Confirmación de Correo Institucional:"
          name="institutional_email_confirmation"
          type="email"
          maxLength={150}
          value={form.email_confirmation}
          onChange={(e) =>
            setForm({
              ...form,
              email_confirmation: e.target.value,
            })
          }
          onBlur={() => setTouched({ ...touched, email_confirmation: true })}
          error={errors.email_confirmation}
          touched={touched.email_confirmation}
          placeholder="xxxx@correo.uady.mx"
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-accent transition-colors"
        >
          {isLoadinng ? "Cargando..." : "Continuar"}
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
