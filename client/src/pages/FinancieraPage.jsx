import imagen from "../imgs/jorge.jpg"

const FinancieraPage = () => {

    const menuItems = [
      { title: "Registro Vacunas", items: ["Registro", "Eliminar registro"] },
      "Registro Alimentación",
      "Registro Costos Animal",
      "Registro Producción Animal",
      "Registro Costo Terreno",
    ]
  
    const cards = [
      { title: "VACUNAS ANIMALES" },
      { title: "COSTO ALIMENTACION ANIMALES" },
      { title: "COSTO ANIMAL" },
      { title: "PRODUCCION ANIMAL" },
      { title: "COSTO TERRENO" },
    ]
  
    return (
      <div className="flex h-screen bg-[#e8f3e8]">
        <div className="w-64 bg-[#c5e0b4] p-4">
          <div className="flex items-center mb-6">
            <img src={imagen} alt="Agriwave logo" width={40} height={40} />
            <h1 className="text-2xl font-bold ml-2">AGRIWAVE</h1>
          </div>
          <button className="w-full mb-4 bg-[#a8d08d] text-black hover:bg-[#8bc34a]">
            Nuevo registro... +
          </button>
          <nav>
            {menuItems.map((item, index) => (
              <div key={index} className="mb-2">
                {typeof item === 'string' ? (
                  <button className="w-full justify-start">
                    {item}
                  </button>
                ) : (
                  <>
                    <button className="w-full justify-start">
                      {item.title}
                    </button>
                    <div className="ml-4">
                      {item.items.map((subItem, subIndex) => (
                        <button key={subIndex} className="w-full justify-start text-sm">
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
        <div className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-6">Gestion Financiera</h2>
          <div className="grid grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div key={index} className="bg-[#e2efd9] p-4 rounded shadow">
                <div className="pb-2">
                  <img src={imagen} alt="Agriwave logo" width={40} height={40} />
                </div>
                <div>
                  <h3 className="text-lg mb-4">{card.title}</h3>
                  <div className="flex space-x-2">
                    <button className="bg-gray-300 text-black hover:bg-gray-400 px-4 py-2 rounded">
                      VER REGISTRO
                    </button>
                    <button className="bg-[#a8d08d] text-black hover:bg-[#8bc34a] px-4 py-2 rounded">
                      AGREGAR REGISTRO
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  export default FinancieraPage
  