import { BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from './pages/HomePage'
import NavBar from "./components/NavBar"
import PlanesPage from "./pages/PlanesPage"
import ContactoPage from "./pages/contactoPAge"
import ComunidadPage from "./pages/ComunidadPage"
import AyudaPage from "./pages/AyudaPAge"
import Footer from "./components/footer"


function App() {

  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/planes" element={<PlanesPage/>} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/comunidad" element={<ComunidadPage />} />
          <Route path="/ayuda" element={<AyudaPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
