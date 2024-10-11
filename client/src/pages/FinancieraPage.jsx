import imagenAgriwave from "../imgs/agriwave.jpeg";

const FinancieraPage = () => {
  const menuItems = [
    { title: "Registro Vacunas", items: ["Registro", "Eliminar registro"] },
    "Registro Alimentación",
    "Registro Costos Animal",
    "Registro Producción Animal",
    "Registro Costo Terreno",
  ];

  const cards = [
    { title: "VACUNAS ANIMALES" },
    { title: "COSTO ALIMENTACION ANIMALES" },
    { title: "COSTO ANIMAL" },
    { title: "PRODUCCION ANIMAL" },
    { title: "COSTO TERRENO" },
  ];

  return (
    <div className="flex h-screen bg-[#F9FFEF]">
      <div className="w-64 bg-[#CDE3A9] p-4">
        <div className="flex items-center mb-6">
          <img src={imagenAgriwave} alt="Agriwave logo" className="w-20 h-10 rounded-full" />
          <h1 className="text-2xl font-bold ml-2 text-[#3F523B]">AGRIWAVE</h1>
        </div>
        <button className="w-full mb-4 bg-[#9AB48D] text-[#3F523B] hover:bg-[#769F4A] py-2 rounded-lg">
          Nuevo registro... +
        </button>
        <nav>
          {menuItems.map((item, index) => (
            <div key={index} className="mb-2 ">
              {typeof item === "string" ? (
                <button className="w-full text-left bg-[#CDE3A9] text-[#3F523B] py-2 px-4 rounded-md hover:bg-[#9cae7e]">
                  {item}
                </button>
              ) : (
                <>
                  <button className="w-full text-left bg-[#CDE3A9] text-[#3F523B] py-2 px-4 rounded-md hover:bg-[#9cae7e] mb-3">
                    {item.title}
                  </button>
                  <div className="ml-4">
                    {item.items.map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        className="w-full text-left bg-[#E6E9D9] text-sm text-[#47624F] py-2 px-4 rounded-md hover:bg-[#d6d9c9] mb-3"
                      >
                        {subItem}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="flex-1 p-8 bg-[#F4F8F4]">
        <h2 className="text-3xl font-bold mb-6 text-[#47624F]">Gestión Financiera</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="pb-4">
                <img src={imagenAgriwave} alt="Agriwave logo" className="w-27 h-24 mx-auto rounded-lg" />
              </div>
              <h3 className="text-xl font-semibold text-center text-[#47624F] mb-4">{card.title}</h3>
              <div className="flex justify-center space-x-2">
                <button className="bg-[#E6E9D9] text-[#3F523B] hover:bg-[#d6d9c9] px-4 py-2 rounded-lg mb">
                  VER REGISTRO
                </button>
                <button className="bg-[#96BE54] text-white hover:bg-[#769F4A] px-4 py-2 rounded-lg">
                  AGREGAR REGISTRO
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancieraPage;
