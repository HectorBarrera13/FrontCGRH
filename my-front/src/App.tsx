import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/registro/Register";
import Register2 from "./views/registro/Register2";
import Home from "./views/Home";
import Cfdi from "./views/cfdi/cfdi";
import PasswordRecovery from "./views/PasswordRecovery";
import EmailStatus from "./components/EmailStatus";
import Becas from "./views/Becas";
import FondoAhorro from "./views/CajaAhorro";
import FondoRetiro from "./views/FontoRetiro";
import FondoVivienda from "./views/FondoVivienda";
import Exenciones from "./views/exenciones/Exenciones";
import ServicioMedico from "./views/SevicioMédico";
import Reembolsos from "./views/Reembolsos";
import MainContent from "./components/MainContent";

export default function App() {
  return (
    <Routes>
      {/* Rutas sin layout (login, registro, etc.) */}
      <Route path="/login" element={<Login />} />

      <Route path="/registro/paso1" element={<Register />} />

      <Route path="/registro/paso2" element={<Register2 />} />

      <Route path="/registro/email" element={<EmailStatus />} />

      <Route path="/recuperacion-contrasena" element={<PasswordRecovery />} />

      {/* Rutas con layout (sidebar, topbar, maincontent) */}
      <Route
        path="/cfdi"
        element={
          <MainContent>
            <Cfdi />
          </MainContent>
        }
      />

      <Route
        path="/becas"
        element={
          <MainContent>
            <Becas />
          </MainContent>
        }
      />

      <Route
        path="/fondo-ahorro"
        element={
          <MainContent>
            <FondoAhorro />
          </MainContent>
        }
      />

      <Route
        path="/fondo-retiro"
        element={
          <MainContent>
            <FondoRetiro />
          </MainContent>
        }
      />

      <Route
        path="/fondo-vivienda"
        element={
          <MainContent>
            <FondoVivienda />
          </MainContent>
        }
      />

      <Route
        path="/exenciones"
        element={
          <MainContent>
            <Exenciones />
          </MainContent>
        }
      />

      <Route
        path="/servicio-medico"
        element={
          <MainContent>
            <ServicioMedico />
          </MainContent>
        }
      />

      <Route
        path="/reembolsos"
        element={
          <MainContent>
            <Reembolsos />
          </MainContent>
        }
      />

      <Route
        path="/"
        element={
          <MainContent>
            <Home />
          </MainContent>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
