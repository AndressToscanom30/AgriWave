import { useState } from "react";
import imagenAgriwave from "../imgs/agriwave.jpeg";

const InventarioTerreno = () => {
  const [currentView, setCurrentView] = useState("Terreno");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isRebanoFormOpen, setIsRebanoFormOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FFEF]">
      <header className="bg-[#96BE54] p-6 flex justify-between items-center font-sans">
        <div className="flex items-center">
          <img
            src={imagenAgriwave}
            alt="Logo"
            className="h-10 w-30 mr-4 rounded-full"
          />
          <h1 className="text-[#E6E9D9] text-2xl font-semibold">
            Gestión de Terreno y Rebaño
          </h1>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-white md:hidden bg-[#5A8F7B] px-4 py-2 rounded-lg"
        >
          Menú
        </button>
      </header>

      <div className="flex flex-1">
        <aside
          className={`w-1/4 bg-[#F9FFEF] p-4 ${isSidebarOpen ? "block" : "hidden"} md:block`}
        >
          <h2 className="text-xl font-semibold text-[#47624F] mb-4">Terreno</h2>
          <button
            onClick={toggleForm}
            className="bg-[#CDE3A9] text-[#3F523B] py-2 px-4 rounded-md mb-4 w-full hover:bg-[#9AB48D]"
          >
            Nuevo registro terreno...
          </button>
          <ul>
            {["Terreno 001", "Terreno 002", "Terreno 003", "Terreno 004", "Terreno 005"].map((id) => (
              <li key={id} className="mb-2">
                <button
                  onClick={() => handleViewChange(id)}
                  className="bg-[#CDE3A9] text-[#3F523B] py-2 px-4 rounded-md w-full hover:bg-[#9cae7e]"
                >
                  {id}
                </button>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold text-[#47624F] mb-4 mt-6">
            Rebaño
          </h2>
          <button
            onClick={toggleRebanoForm}
            className="bg-[#CDE3A9] text-[#3F523B] py-2 px-4 rounded-md mb-4 w-full hover:bg-[#9AB48D]"
          >
            Nuevo registro rebaño...
          </button>
          <ul>
            {["Rebaño 001", "Rebaño 002", "Rebaño 003", "Rebaño 004"].map((id) => (
              <li key={id} className="mb-2">
                <button
                  onClick={() => handleViewChange(id)}
                  className="bg-[#CDE3A9] text-[#3F523B] py-2 px-4 rounded-md w-full hover:bg-[#9cae7e]"
                >
                  {id}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 bg-white p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {["Terreno 001", "Terreno 002", "Terreno 003", "Terreno 004", "Terreno 005", "Rebaño 001", "Rebaño 002", "Rebaño 003", "Rebaño 004"].map((id) => (
              <div
                key={id}
                className="bg-[#F4F8F4] p-0 rounded-md shadow-md transition hover:shadow-lg"
                style={{ width: "100%", height: "200px" }}
              >
                <div
                  className="flex justify-center items-center rounded-t-md"
                  style={{
                    backgroundColor: "#ECF7D7",
                    height: "75%",
                    padding: "8px",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                >
                  <img
                    src={imagenesPorID[id]}
                    alt={`Imagen para ${id}`}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div
                  className="flex justify-center items-center text-[#3F523B] font-semibold rounded-b-md"
                  style={{
                    backgroundColor: "#FABA66",
                    height: "25%",
                    borderBottomLeftRadius: "12px",
                    borderBottomRightRadius: "12px",
                  }}
                >
                  {id}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg w-11/12 sm:w-1/2 relative">
            <button
              onClick={toggleForm}
              className="absolute top-4 right-4 text-black font-size-6xl"
            >
              X
            </button>
            <h2 className="text-2xl font-semibold text-[#3F523B] mb-4 text-center">
              Registra tu terreno
            </h2>
            <form>
              <div className="grid grid-cols-1 mb-4">
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

      {isRebanoFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg w-11/12 sm:w-1/2 relative">
            <button
              onClick={toggleRebanoForm}
              className="absolute top-4 right-4 text-black font-size-6xl"
            >
              X
            </button>
            <h2 className="text-2xl font-semibold text-[#3F523B] mb-4 text-center">
              Registra tu rebaño
            </h2>
            <form>
              <div className="grid grid-cols-1 mb-4">
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
