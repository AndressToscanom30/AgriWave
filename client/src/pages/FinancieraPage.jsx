import { motion } from 'framer-motion';
import { HiOutlineCash } from 'react-icons/hi';

const FinancieraPage = () => {
  const cards = [
    {
      title: "VACUNAS ANIMALES",
      icon: "💉",
      description: "Gestiona los registros de vacunación",
      stats: { total: "150", pending: "12" },
      link: "/vacunas"
    },
    {
      title: "COSTO ALIMENTACION",
      icon: "🌾",
      description: "Control de gastos en alimentación",
      stats: { total: "$2,500", month: "+15%" },
      link: "/alimentos"
    },
    {
      title: "COSTO ANIMAL",
      icon: "🐄",
      description: "Seguimiento de costos por animal",
      stats: { total: "$5,200", month: "-8%" },
      link: "/animales"
    },
    {
      title: "PRODUCCION ANIMAL",
      icon: "📊",
      description: "Métricas de producción",
      stats: { total: "1,200L", month: "+22%" },
      link: "/produccion-animal"
    },
    {
      title: "COSTO TERRENO",
      icon: "🌱",
      description: "Gestión de costos de terreno",
      stats: { total: "$12,000", year: "+5%" },
      link: "/terrenos"
    }
  ];

  return (
    <div className="pt-20 p-8 bg-gradient-to-br from-[#F9FFEF] to-white">
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
        </motion.div>

        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <HiOutlineCash className="text-3xl text-[#96BE54] mb-2" />
            <h3 className="text-sm text-gray-500">Total Gastos</h3>
            <p className="text-2xl font-bold text-[#47624F]">$24,500</p>
            <span className="text-xs text-green-500">+12% vs mes anterior</span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl bg-[#F9FFEF] p-3 rounded-lg group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">Total</span>
                  <p className="text-lg font-bold text-[#47624F]">{card.stats.total}</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-[#47624F] mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {card.description}
              </p>

              <div className="flex flex-col space-y-2">
                <a 
                  href={card.link} 
                  className="text-center bg-[#E6E9D9] text-[#3F523B] hover:bg-[#d6d9c9] px-6 py-2 rounded-lg transition-all hover:scale-105 flex items-center justify-center"
                >
                  Ver Registro
                </a>
                <button className="bg-[#96BE54] text-white hover:bg-[#769F4A] px-6 py-2 rounded-lg transition-all hover:scale-105">
                  Agregar Registro
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );

};

export default FinancieraPage