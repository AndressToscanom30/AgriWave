import React, { useState } from "react";
import imagenAgriwave from "../imgs/agriwave.jpeg";

const InventarioTerreno = () => {
  const [currentView, setCurrentView] = useState("Terreno");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isRebanoFormOpen, setIsRebanoFormOpen] = useState(false);

  const imagenesPorID = {
    "Terreno 001": imagenAgriwave,
    "Terreno 002": imagenAgriwave,
    "Terreno 003": imagenAgriwave,
    "Terreno 004": imagenAgriwave,
    "Terreno 005": imagenAgriwave,
    "Rebaño 001": imagenAgriwave,
    "Rebaño 002": imagenAgriwave,
    "Rebaño 003": imagenAgriwave,
    "Rebaño 004": imagenAgriwave,
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const toggleRebanoForm = () => {
    setIsRebanoFormOpen(!isRebanoFormOpen);
  };

  return (
    <div className="flex h-screen bg-[#F9FFEF] overflow-hidden">
      <div className="w-64 bg-[#CDE3A9] p-4 overflow-y-auto">
        <div className="flex items-center mb-6">
          <img src={imagenAgriwave} alt="Agriwave logo" className="w-20 h-10 rounded-full" />
          <h1 className="text-2xl font-bold ml-2 text-[#3F523B]">AGRIWAVE</h1>
        </div>
        
        <h2 className="text-xl font-semibold text-[#47624F] mb-4">Terreno</h2>
        <button
          onClick={toggleForm}
          className="w-full mb-4 bg-[#9AB48D] text-[#3F523B] hover:bg-[#769F4A] py-2 rounded-lg"
        >
          Nuevo registro terreno...
        </button>
        <nav>
          {["Terreno 001", "Terreno 002", "Terreno 003", "Terreno 004", "Terreno 005"].map((id) => (
            <button
              key={id}
              onClick={() => handleViewChange(id)}
              className="w-full text-left bg-[#CDE3A9] text-[#3F523B] py-2 px-4 rounded-md hover:bg-[#9cae7e] mb-2"
            >
              {id}
            </button>
          ))}
        </nav>

        <h2 className="text-xl font-semibold text-[#47624F] mb-4 mt-6">Rebaño</h2>
        <button
          onClick={toggleRebanoForm}
          className="w-full mb-4 bg-[#9AB48D] text-[#3F523B] hover:bg-[#769F4A] py-2 rounded-lg"
        >
          Nuevo registro rebaño...
        </button>
        <nav>
          {["Rebaño 001", "Rebaño 002", "Rebaño 003", "Rebaño 004"].map((id) => (
            <button
              key={id}
              onClick={() => handleViewChange(id)}
              className="w-full text-left bg-[#CDE3A9] text-[#3F523B] py-2 px-4 rounded-md hover:bg-[#9cae7e] mb-2"
            >
              {id}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 p-8 bg-[#F4F8F4] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-[#47624F]">Gestión de Terreno y Rebaño</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(imagenesPorID).map(([id, imagen]) => (
            <div
              key={id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="pb-3">
                <img src={imagen} alt={`Imagen para ${id}`} className="w-27 h-24 mx-auto object-cover rounded-lg" />
              </div>
              <h3 className="text-lg font-semibold text-center text-[#47624F] mb-3">{id}</h3>
              <div className="flex justify-center space-x-2">
                <button className="bg-[#E6E9D9] text-[#3F523B] hover:bg-[#d6d9c9] px-3 py-1 rounded-lg ">
                  VER DETALLES
                </button>
                <button className="bg-[#96BE54] text-white hover:bg-[#769F4A] px-3 py-1 rounded-lg">
                  EDITAR
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Formulario de Terreno */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg w-11/12 sm:w-1/2 relative">
            <button
              onClick={toggleForm}
              className="absolute top-4 right-4 text-black text-xl font-bold"
            >
              X
            </button>
            <h2 className="text-2xl font-semibold text-[#3F523B] mb-4 text-center">
              Registra tu terreno
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-[#3F523B] font-semibold mb-2">
                  Nombre del terreno*
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#96BE54]"
                  placeholder="Nombre del terreno"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[#3F523B] font-semibold mb-2">
                    Ubicación*
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#96BE54]"
                    placeholder="Ubicación"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#3F523B] font-semibold mb-2">
                    Tamaño (hectáreas)*
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#96BE54]"
                    placeholder="Tamaño en hectáreas"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-[#3F523B] font-semibold mb-2">
                  Tipo de cultivo*
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#96BE54]"
                  placeholder="Tipo de cultivo"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#96BE54] text-white py-2 px-4 rounded-lg hover:bg-[#769f4a]"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Formulario de Rebaño */}
      {isRebanoFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg w-11/12 sm:w-1/2 relative">
            <button
              onClick={toggleRebanoForm}
              className="absolute top-4 right-4 text-black text-xl font-bold"
            >
              X
            </button>
            <h2 className="text-2xl font-semibold text-[#3F523B] mb-4 text-center">
              Registra tu rebaño
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-[#3F523B] font-semibold mb-2">
                  Nombre del rebaño*
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#96BE54]"
                  placeholder="Nombre del rebaño"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[#3F523B] font-semibold mb-2">
                    Especie*
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#96BE54]"
                    placeholder="Especie"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#3F523B] font-semibold mb-2">
                    Cantidad de animales*
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#96BE54]"
                    placeholder="Cantidad"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#96BE54] text-white py-2 px-4 rounded-lg hover:bg-[#769f4a]"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventarioTerreno;