import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchLogin } from "../api/fetchDirectory";
import { useAuth } from "../hooks/useAuth";
import { FormField } from "../components/FormField";
import ReCAPTCHA from "react-google-recaptcha";
import { Eye, EyeOff } from "../assets/icons";
import { Modal } from "../components/Modal";

const initialState = {
  username: "",
  password: "",
};

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [errors, setErrors] = useState(initialState);
  const [loginError, setLoginError] = useState(""); // Nuevo estado para error de credenciales
  const navigate = useNavigate();
  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });

  const { login, setUserData } = useAuth();

  useEffect(() => {
    const isUsernameValid = form.username.length > 0;
    const isPasswordValid = form.password.length >= 8;

    setErrors({
      username: isUsernameValid ? "" : "Usuario no válido.",
      password: isPasswordValid
        ? ""
        : "La contraseña debe tener al menos 8 caracteres.",
    });
  }, [form]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(""); // Limpiar error previo al intentar login
    setIsLoading(true);
    setTouched({
      username: true,
      password: true,
    });
    setIsLoading(false);
    if (errors.username || errors.password) {
      return;
    }
    setIsModalOpen(true);
  };

  const handleFetch = async () => {
    try {
      setIsLoading(true);
      const data = (
        await FetchLogin(form.username, form.password, captchaToken ?? "")
      )?.data;
      setIsLoading(false);
      setIsModalOpen(false);
      const token = data?.access_token ?? data?.token;
      const user = data?.user;

      if (user && token) {
        setUserData(user);
        login(token);
        navigate("/");
        return; // Salir si es exitoso
      }

      // Si no hay token o usuario, mostrar error
      throw new Error("Credenciales incorrectas");
    } catch (err) {
      setIsModalOpen(false);
      setIsLoading(false);

      // Mostrar mensaje de error específico
      if (err instanceof Error && err.message === "Credenciales incorrectas") {
        setLoginError(
          "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo."
        );
      } else {
        setLoginError("Error en el servidor. Por favor, intenta más tarde.");
        console.error("❌ Error en login:", err);
      }

      // Limpiar formulario
      setForm({ username: "", password: "" });
      setCaptchaToken(null);
    }
  };

  const navigateRegister = () => {
    navigate("/registro/paso1");
  };

  // Función para cerrar el modal y resetear captcha
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCaptchaToken(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm"
      >
        <h2 className="text-[36px] font-bold mb-6 text-center text-primary">
          Iniciar sesión
        </h2>

        {/* Mostrar mensaje de error de credenciales */}
        {loginError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{loginError}</p>
          </div>
        )}

        <FormField
          label="Usuario:"
          name="username"
          type="text"
          onBlur={() => setTouched({ ...touched, username: true })}
          value={form.username}
          onChange={(e) => {
            setForm({ ...form, username: e.target.value });
            setLoginError(""); // Limpiar error al empezar a escribir
          }}
          touched={touched.username}
          error={errors.username}
          placeholder="ejemplo@correo.com"
        />

        <FormField
          label="Contraseña:"
          name="password"
          type={isVisible ? "text" : "password"}
          value={form.password}
          onBlur={() => setTouched({ ...touched, password: true })}
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
            setLoginError(""); // Limpiar error al empezar a escribir
          }}
          touched={touched.password}
          error={errors.password}
          placeholder="Tu contraseña"
        >
          <button
            type="button"
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setIsVisible((v) => !v)}
          >
            {isVisible ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </button>
        </FormField>

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          <span>Recordar usuario</span>
        </label>

        <div className="flex items-center justify-between mb-6">
          <a
            href="/recuperacion-contrasena"
            className="text-sm text-accent hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal} // Usar función modificada
          title="Captcha Verification"
        >
          <ReCAPTCHA
            sitekey="6LfSfCwsAAAAAFZP0UYCBlgPVkO1f78NFuZW52Jl"
            onChange={(token: string | null) => {
              setCaptchaToken(token);
            }}
            onExpired={() => setCaptchaToken(null)}
          />

          <button
            type="button"
            className="w-full mt-4 bg-primary text-white py-2 rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleFetch}
            disabled={!captchaToken || isLoading}
          >
            {isLoading ? "Cargando..." : "Verificar y Entrar"}
          </button>
        </Modal>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Iniciar sesión"}
        </button>

        <button
          type="button"
          onClick={navigateRegister}
          className="w-full mt-4 bg-background-secondary text-text py-2 rounded-lg hover:bg-background-focus transition-colors"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
