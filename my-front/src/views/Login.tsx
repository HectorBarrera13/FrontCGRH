import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField } from "../components/FormField";
import { Eye, EyeOff } from "../assets/icons";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Redirección directa al Home al hacer "Submit"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  // Redirección directa al Registro
  const navigateRegister = () => {
    navigate("/registro/paso1");
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

        <FormField
          label="Usuario:"
          name="username"
          type="text"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          placeholder="ejemplo@correo.com"
        />

        <FormField
          label="Contraseña:"
          name="password"
          type={isVisible ? "text" : "password"}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
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

        <label className="flex items-center gap-2 mb-4">
          <input type="checkbox" />
          <span>Recordar usuario</span>
        </label>

        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => navigate("/recuperacion-contrasena")}
            className="text-sm text-accent hover:underline bg-transparent border-none cursor-pointer"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-accent transition-colors"
        >
          Entrar directamente
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
