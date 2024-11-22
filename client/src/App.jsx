import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import NavBar from "./components/NavBar";
import ComunidadPage from "./pages/ComunidadPage";
import AyudaPage from "./pages/AyudaPage";
import Footer from "./components/footer";
import PanelTotal from './pages/panelTotal';
import Alimentitos from "./pages/GestionAlimento";
import Vacunitas from "./pages/VacunasAnimales";
import Produccion from "./pages/ProduccionAnimal";
import Animalesssssss from "./pages/GestionAnimal";
import Terrenos from "./pages/GestionTerreno";
import Reportes from "./pages/Reportes";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/comunidad" element={<ComunidadPage />} />
        <Route path="/ayuda" element={<AyudaPage />} />
        <Route path="/panel" element={<PanelTotal />} />
        <Route path="/vacunas" element={<Vacunitas />}></Route>
        <Route path="/produccion" element={<Produccion />}></Route>
        <Route path="/alimento" element={<Alimentitos />}></Route>
        <Route path="/animales" element={<Animalesssssss />}></Route>
        <Route path="/terrenos" element={<Terrenos />}></Route>
        <Route path="/reportes" element={<Reportes />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App