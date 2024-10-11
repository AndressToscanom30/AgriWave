import { BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from './pages/HomePage'
import NavBar from "./components/NavBar"
import ContactoPage from "./pages/contactoPage"
import ComunidadPage from "./pages/ComunidadPage"
import AyudaPage from "./pages/AyudaPage"
import Footer from "./components/footer"
import Terreno from "./pages/inventarioterreno"
import Financiera from "./pages/FinancieraPage"


function App() {

  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/comunidad" element={<ComunidadPage />} />
          <Route path="/ayuda" element={<AyudaPage />} />
          <Route path="/inventarioTerreno" element={<Terreno />} />
          <Route path="/financiera" element={<Financiera />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
