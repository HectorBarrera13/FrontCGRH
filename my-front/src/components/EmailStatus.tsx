import { useSearchParams } from "react-router-dom";
import { CircleX, CircleCheck } from "./../assets/icons";
import { StatusCard } from "./MessageCard";
import { useNavigate } from "react-router-dom";

export default function EmailStatus() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const navigate = useNavigate();

  if (status === "enviado") {
    return (
      <StatusCard
        title="¡Enviado!"
        mainText="Te hemos enviado un correo para confirmar tu cuenta."
        secondaryText="Revisa también tu bandeja de spam."
        icon={<CircleCheck className="h-16 w-16" />}
        iconColor="text-green-500"
      >
        <button
          type="button"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-accent transition-colors mb-3"
        >
          Reenviar correo
        </button>

        <button
          type="button"
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          onClick={() => navigate("/login")}
        >
          Volver al login
        </button>
      </StatusCard>
    );
  }

  if (status === "verificado") {
    return (
      <StatusCard
        title="¡Verificación exitosa!"
        mainText="Has verificado tu cuenta correctamente."
        secondaryText="Regresa al login e ingresa tu usuario."
        icon={<CircleCheck className="h-16 w-16" />}
        iconColor="text-green-500"
      >
        <button
          type="button"
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          onClick={() => navigate("/login")}
        >
          Volver al login
        </button>
      </StatusCard>
    );
  }

  if (status === "ya_verificado") {
    return (
      <StatusCard
        title="¡Ya estás verificado!"
        mainText="Tu cuenta ya ha sido verificada."
        secondaryText="Regresa al inicio de sesión."
        icon={<CircleCheck className="h-16 w-16" />}
        iconColor="text-green-500"
      >
        <button
          type="button"
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          onClick={() => navigate("/login")}
        >
          Volver al login
        </button>
      </StatusCard>
    );
  }

  if (status === "expirado") {
    return (
      <StatusCard
        title="¡Enlace expirado!"
        mainText="El enlace de verificación ha expirado."
        secondaryText="Realiza el registro nuevamente."
        icon={<CircleX className="h-16 w-16" />}
        iconColor="text-red-500"
      >
        <button
          type="button"
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          onClick={() => navigate("/registro")}
        >
          Volver al Registro
        </button>
      </StatusCard>
    );
  }

  if (status === "hash_invalido") {
    return (
      <StatusCard
        title="¡Enlace inválido!"
        mainText="El enlace de verificación no es válido."
        secondaryText="Regresa al correo que te enviamos."
        icon={<CircleX className="h-16 w-16" />}
        iconColor="text-red-500"
      >
        <button
          type="button"
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          onClick={() => navigate("/registro/paso1")}
        >
          Volver al Registro
        </button>
      </StatusCard>
    );
  }

  if (status === "recovery_instructions_sent") {
    return (
      <StatusCard
        title="¡Instrucciones enviadas!"
        mainText="Te hemos enviado un correo con instrucciones para reiniciar tu contraseña."
        secondaryText="Revisa también tu bandeja de spam."
        icon={<CircleCheck className="h-16 w-16" />}
        iconColor="text-green-500"
      >
        <button
          type="button"
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          onClick={() => navigate("/login")}
        >
          Volver al login
        </button>
      </StatusCard>
    );
  }

  return <p>Estado inválido</p>;
}
