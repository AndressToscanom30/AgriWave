import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <footer className="relative bg-[#F1F7E7] text-gray-500 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-gray-500 font-semibold">AgriWave</h2>
          <p className="text-gray-500">Software para gestión ganadera</p>
        </div>

        <div className="flex space-x-4 mb-4 md:mb-0 mr-40">
          <a href="/comunidad" className="text-gray-400 hover:text-gray-500 transition">Comunidad</a>
          <button
            onClick={toggleModal}
            className="text-gray-400 hover:text-gray-500 transition"
          >
            Contáctanos
          </button>
          <a href="/ayuda" className="text-gray-400 hover:text-gray-500 transition">Ayuda</a>
        </div>

        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            className="text-gray-400 hover:text-gray-500 transition"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            className="text-gray-400 hover:text-gray-500 transition"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            className="text-gray-400 hover:text-gray-500 transition"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; 2024. Todos los derechos reservados.
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <i className="fas fa-times"></i>
            </button>
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold">
                  Completa los datos para contactarte
                </h2>
              </div>
              <div className="ml-4">
                <i className="fas fa-chart-line fa-2x text-green-500"></i>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Nombre"
                />
              </div>

              <div>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Apellido"
                />
              </div>

              <div>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Correo electrónico"
                />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-4 py-2 bg-gray-100 border rounded">
                    +57
                  </span>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border rounded"
                    placeholder="Teléfono"
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Referencia (Facebook, Instagram, etc.)"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Tipo de ganado:
                </label>
                <div className="space-x-4">
                  <label>
                    <input type="checkbox" /> Vacuno
                  </label>
                  <label>
                    <input type="checkbox" /> Porcino
                  </label>
                  <label>
                    <input type="checkbox" /> Equino
                  </label>
                  <label>
                    <input type="checkbox" /> Avicultor
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#5FAD56] text-white py-2 rounded hover:bg-green-600 transition"
              >
                Quiero que me contacten
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
