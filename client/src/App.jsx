import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import NavBar from "./components/NavBar";
import ComunidadPage from "./pages/ComunidadPage";
import AyudaPage from "./pages/AyudaPage";
import Footer from "./components/footer";
import Prueba from './pages/prueba';
import PanelTotal from './pages/panelTotal';
import AlimentosPage from "./pages/alimentosPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/comunidad" element={<ComunidadPage />} />
        <Route path="/ayuda" element={<AyudaPage />} />
        <Route path="/panel" element={<PanelTotal />} />
        <Route path="/prueba" element={<Prueba />} />
        <Route path="/alimentos" element={<AlimentosPage />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

