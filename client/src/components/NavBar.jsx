import { useState } from "react";
import pse from "../imgs/PSE.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

function NavBar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="relative z-20">
      <nav className="fixed w-full backdrop-blur-md bg-[#F1F7E7]/90 shadow-lg z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-20 px-4 lg:px-8">
            <div className="text-[#6DAD58] font-yeseva text-2xl md:text-3xl">
              <a href="/" className="hover:text-green-600 transition-all duration-300 flex items-center">
                <span className="transform hover:scale-105">Agriwave</span>
              </a>
            </div>

            <div className="hidden lg:flex space-x-8 items-center">
              <a href="/" className="text-gray-700 hover:text-[#6DAD58] transition-all duration-300 font-medium">
                Inicio
              </a>
              <a href="/financiera" className="text-gray-700 hover:text-[#6DAD58] transition-all duration-300 font-medium">
                Gestión financiera
              </a>
              <a href="/inventarioterreno" className="text-gray-700 hover:text-[#6DAD58] transition-all duration-300 font-medium">
                Gestión inventario
              </a>
              <button
                onClick={() => setIsPlanModalOpen(true)}
                className="text-gray-700 hover:text-[#6DAD58] transition-all duration-300 font-medium"
              >
                Planes
              </button>

              <div className="flex space-x-4">
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="border-2 border-[#6DAD58] rounded-full px-6 py-2 text-[#6DAD58] hover:bg-[#6DAD58] hover:text-white transition-all duration-300 font-medium transform hover:scale-105"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="bg-[#6DAD58] rounded-full px-6 py-2 text-white hover:bg-green-600 transition-all duration-300 font-medium transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Registrarme
                </button>
              </div>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-[#6DAD58]/10 transition-colors"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl text-[#6DAD58]`}></i>
            </button>
          </div>

          <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} px-4 pb-6 bg-[#F1F7E7]/90 backdrop-blur-md`}>
            <div className="flex flex-col space-y-4">
              <a href="/" className="py-2 text-gray-700 hover:text-[#6DAD58] transition-all duration-300 font-medium">
                Inicio
              </a>
              <a href="/financiera" className="py-2 text-gray-700 hover:text-[#6DAD58] transition-all duration-300 font-medium">
                Gestión financiera
              </a>
              <a href="/inventarioterreno" className="py-2 text-gray-700 hover:text-[#6DAD58] transition-all duration-300 font-medium">
                Gestión inventario
              </a>
              <button
                onClick={() => {
                  setIsPlanModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="py-2 text-left text-gray-700 hover:text-[#6DAD58] transition-all duration-300 font-medium"
              >
                Planes
              </button>

              <button
                onClick={() => {
                  setIsLoginOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 text-[#6DAD58] border-2 border-[#6DAD58] rounded-lg hover:bg-[#6DAD58] hover:text-white transition-all duration-300"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => {
                  setIsRegisterOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-[#6DAD58] text-white rounded-lg hover:bg-green-600 transition-all duration-300"
              >
                Registrarme
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md relative transform transition-all duration-300 scale-100">
            <button
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            <h2 className="text-2xl font-bold text-center text-[#6DAD58] mb-6">
              Iniciar Sesión
            </h2>
            <form className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Correo</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6DAD58] focus:border-transparent transition-all duration-300"
                  placeholder="correo@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6DAD58] focus:border-transparent transition-all duration-300"
                  placeholder="********"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#6DAD58] text-white py-3 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      )}

      {isRegisterOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md relative transform transition-all duration-300 scale-100">
            <button
              onClick={() => setIsRegisterOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            <h2 className="text-2xl font-bold text-center text-[#6DAD58] mb-6">
              Registrarme
            </h2>
            <form className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6DAD58] focus:border-transparent transition-all duration-300"
                  placeholder="Tu nombre"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Correo</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6DAD58] focus:border-transparent transition-all duration-300"
                  placeholder="correo@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6DAD58] focus:border-transparent transition-all duration-300"
                  placeholder="********"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#6DAD58] text-white py-3 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                Registrarme
              </button>
            </form>
          </div>
        </div>
      )}

      {isPlanModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-[#F1F7E7] p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-lg relative transform transition-all duration-300 scale-100">
            <button
              onClick={() => setIsPlanModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-all duration-300"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#6DAD58] mb-6">
              ¡Obtén Agriwave Ahora!
            </h2>
            <p className="text-center text-gray-700 mb-8 leading-relaxed">
              Agriwave cuenta con una licencia única que puedes adquirir desde
              tu cuenta. Accede a todas sus funcionalidades desde múltiples
              dispositivos, brindándote flexibilidad y control en la gestión de
              tu ganadería desde cualquier lugar.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8 transform transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-semibold text-center mb-6 text-[#6DAD58]">
                Método de Pago
              </h3>
              <div className="flex justify-center">
                <img
                  src={pse}
                  alt="PSE Payment Method"
                  className="h-32 md:h-40 transform transition-all duration-300 hover:scale-105"
                />
              </div>
            </div>
            <button
              onClick={() => window.location.href = "https://www.pse.com.co/iniciar-pago"}
              className="bg-[#6DAD58] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full w-full text-center transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
            >
              Comprar Ahora
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
