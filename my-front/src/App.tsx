import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/registro/Register";
import Register2 from "./views/registro/Register2";
import Home from "./views/Home";
import Cfdi from "./views/cfdi/cfdi";
import EmailStatus from "./components/EmailStatus";
import Becas from "./views/Becas";
import FondoAhorro from "./views/FondoAhorro";
import FondoRetiro from "./views/FontoRetiro";
import FondoVivienda from "./views/FondoVivienda";
import Exenciones from "./views/exenciones/Exenciones";
import ServicioMedico from "./views/SevicioMédico";
import Reembolsos from "./views/Reembolsos";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/registro/paso1" element={<Register />} />

      <Route path="/registro/paso2" element={<Register2 />} />

      <Route path="/registro/email" element={<EmailStatus />} />

      <Route
        path="/recuperacion-contrasena"
        element={<Navigate to="/empleados" replace />}
      />

      <Route path="/recuperacion-contrasena" element={<EmailStatus />} />

      <Route path="/cfdi" element={<Cfdi />} />

      <Route path="/becas" element={<Becas />} />

      <Route path="/fondo-ahorro" element={<FondoAhorro />} />

      <Route path="/fondo-retiro" element={<FondoRetiro />} />

      <Route path="/fondo-vivienda" element={<FondoVivienda />} />

      <Route path="/exenciones" element={<Exenciones />} />

      <Route path="/servicio-medico" element={<ServicioMedico />} />

      <Route path="/reembolsos" element={<Reembolsos />} />

      <Route path="/" element={<Home />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
