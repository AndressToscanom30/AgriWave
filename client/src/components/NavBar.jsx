import { useState } from "react";
import pse from "../imgs/PSE.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

function NavBar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const openRegisterModal = () => setIsRegisterOpen(true);
  const closeRegisterModal = () => setIsRegisterOpen(false);

  const openPlanModal = () => setIsPlanModalOpen(true);
  const closePlanModal = () => setIsPlanModalOpen(false);

  return (
    <div className="relative z-20">
      <nav className="fixed w-full h-16 bg-[#F1F7E7] shadow-lg z-30">
        <ul className="flex justify-between items-center h-full px-8">
          <div className="text-[#6DAD58] font-yeseva text-3xl tracking-wide">
            <a
              href="/"
              className="hover:text-green-600 transition duration-300"
            >
              Agriwave
            </a>
          </div>
          <div className="flex space-x-6 items-center">
            <li>
              <a
                href="/"
                className="text-gray-700 hover:text-[#6DAD58] transition duration-300"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="/financiera"
                className="text-gray-700 hover:text-[#6DAD58] transition duration-300"
              >
                Gestión financiera
              </a>
            </li>
            <li>
              <a
                href="/inventarioterreno"
                className="text-gray-700 hover:text-[#6DAD58] transition duration-300"
              >
                Gestión inventario
              </a>
            </li>
            <li>
              <button onClick={openPlanModal}
                className="text-gray-700 hover:text-[#6DAD58] transition duration-300">
                Planes
              </button>
            </li>
            <button
              onClick={openLoginModal}
              className="border border-[#6DAD58] rounded-lg px-5 py-2 text-[#6DAD58] hover:bg-[#6DAD58] hover:text-white transition duration-300"
            >
              Iniciar sesión
            </button>
            <button
              onClick={openRegisterModal}
              className="bg-[#6DAD58] rounded-lg px-5 py-2 text-white hover:bg-green-600 transition duration-300"
            >
              Registrarme
            </button>
          </div>
        </ul>
      </nav>
      <div className="h-16"></div>

      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={closeLoginModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times"></i>
            </button>
            <h2 className="text-2xl font-bold text-center text-[#6DAD58] mb-4">
              Iniciar Sesión
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700">Correo:</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="correo@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">
                  Contraseña:
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="********"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#6DAD58] text-white py-2 rounded hover:bg-green-600 transition duration-300"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      )}

      {isRegisterOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={closeRegisterModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times"></i>
            </button>
            <h2 className="text-2xl font-bold text-center text-[#6DAD58] mb-4">
              Registrarme
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700">Nombre:</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Correo:</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="correo@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">
                  Contraseña:
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="********"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#6DAD58] text-white py-2 rounded hover:bg-green-600 transition duration-300"
              >
                Registrarme
              </button>
            </form>
          </div>
        </div>
      )}

      {isPlanModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#F1F7E7] p-6 rounded-lg shadow-md w-[90%] max-w-lg relative z-50">
            <button
              onClick={closePlanModal}
              className="absolute top-3 right-4 text-gray-500 text-2xl hover:text-gray-700 transition"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold text-center text-[#6DAD58] mb-4">
              ¡Obtén Agriwave Ahora mismo!
            </h2>
            <p className="text-center text-gray-700 mb-6">
              Agriwave cuenta con una licencia única que puedes adquirir desde
              tu cuenta. Accede a todas sus funcionalidades desde múltiples
              dispositivos, brindándote flexibilidad y control en la gestión de
              tu ganadería desde cualquier lugar.
            </p>
            <div className="bg-white rounded-lg p-4 shadow-inner mb-6">
              <h3 className="text-lg text-center font-medium mb-4">
                Método de Pago
              </h3>
              <div className="flex justify-center space-x-4">
                <img src={pse} alt="Métodos de Pago" className="h-40" />
              </div>
            </div>
            <button
              onClick={() =>
                (window.location.href = "https://www.pse.com.co/iniciar-pago")
              }
              className="bg-[#6DAD58] hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full w-full text-center transition duration-300"
            >
              Comprar Aquí
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
