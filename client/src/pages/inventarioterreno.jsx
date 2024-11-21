import React, { useState } from "react";
import { motion } from 'framer-motion';
import { HiOutlinePlus, HiOutlineSearch, HiOutlineFilter, HiOutlineLocationMarker, HiOutlineCube } from 'react-icons/hi';

const InventarioTerreno = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isRebanoFormOpen, setIsRebanoFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const items = {
    terrenos: [
      {
        id: "Terreno 001",
        tipo: "terreno",
        area: "150 hectáreas",
        cultivo: "Maíz",
        estado: "Activo",
        lastUpdate: "Actualizado hace 2 días"
      },
      {
        id: "Terreno 002",
        tipo: "terreno",
        area: "200 hectáreas",
        cultivo: "Soja",
        estado: "En Mantenimiento",
        lastUpdate: "Actualizado hace 5 días"
      },
      {
        id: "Terreno 003",
        tipo: "terreno",
        area: "175 hectáreas",
        cultivo: "Trigo",
        estado: "Activo",
        lastUpdate: "Actualizado hoy"
      }
    ],
    rebanos: [
      {
        id: "Rebaño 001",
        tipo: "rebaño",
        cantidad: "45 cabezas",
        raza: "Holstein",
        estado: "Saludable",
        lastUpdate: "Actualizado hace 1 día"
      },
      {
        id: "Rebaño 002",
        tipo: "rebaño",
        cantidad: "60 cabezas",
        raza: "Jersey",
        estado: "En Revisión",
        lastUpdate: "Actualizado hace 3 días"
      },
      {
        id: "Rebaño 003",
        tipo: "rebaño",
        cantidad: "30 cabezas",
        raza: "Angus",
        estado: "Saludable",
        lastUpdate: "Actualizado hoy"
      }
    ]
  };

  return (
    <div className="pt-20 p-8 bg-gradient-to-br from-[#F9FFEF]/50 to-white/30 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="pt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-4xl font-bold text-[#47624F]">
              Gestión de Terreno y Rebaño
            </h2>
            <p className="text-[#769F4A] mt-2">Control y seguimiento de activos agrícolas</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar activos..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#96BE54] w-full md:w-auto"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
              <HiOutlineFilter className="text-[#47624F]" />
              <span className="text-[#47624F]">Filtrar</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#96BE54]/20 p-3 rounded-lg">
                <HiOutlineLocationMarker className="text-2xl text-[#96BE54]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Terrenos</p>
                <h4 className="text-2xl font-bold text-[#47624F]">525 ha</h4>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#96BE54]/20 p-3 rounded-lg">
                <HiOutlineCube className="text-2xl text-[#96BE54]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Rebaño</p>
                <h4 className="text-2xl font-bold text-[#47624F]">135</h4>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-[#47624F]">Terrenos</h3>
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#96BE54] text-white rounded-lg hover:bg-[#769F4A] transition-all"
                >
                  <HiOutlinePlus />
                  <span>Nuevo Terreno</span>
                </button>
              </div>

              <div className="space-y-4">
                {items.terrenos.map((item, index) => (
                  <TerrenoCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-[#47624F]">Rebaños</h3>
                <button
                  onClick={() => setIsRebanoFormOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#96BE54] text-white rounded-lg hover:bg-[#769F4A] transition-all"
                >
                  <HiOutlinePlus />
                  <span>Nuevo Rebaño</span>
                </button>
              </div>

              <div className="space-y-4">
                {items.rebanos.map((item, index) => (
                  <RebanoCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const TerrenoCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
    className="bg-[#F9FFEF] p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="text-xl font-semibold text-[#47624F]">{item.id}</h4>
        <p className="text-sm text-gray-500">{item.area} • {item.cultivo}</p>
        <p className="text-xs text-gray-400 mt-1">{item.lastUpdate}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm ${item.estado === 'Activo'
        ? 'bg-green-100 text-green-600'
        : 'bg-yellow-100 text-yellow-600'
        }`}>
        {item.estado}
      </span>
    </div>

    <div className="flex space-x-3">
      <button className="flex-1 bg-white text-[#3F523B] hover:bg-[#E6E9D9] py-2 rounded-lg transition-all hover:shadow-md">
        Ver Detalles
      </button>
      <button className="flex-1 bg-[#96BE54] text-white hover:bg-[#769F4A] py-2 rounded-lg transition-all hover:shadow-md">
        Editar
      </button>
    </div>
  </motion.div>
);

const RebanoCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
    className="bg-[#F9FFEF] p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="text-xl font-semibold text-[#47624F]">{item.id}</h4>
        <p className="text-sm text-gray-500">{item.cantidad} • {item.raza}</p>
        <p className="text-xs text-gray-400 mt-1">{item.lastUpdate}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm ${item.estado === 'Saludable'
        ? 'bg-green-100 text-green-600'
        : 'bg-yellow-100 text-yellow-600'
        }`}>
        {item.estado}
      </span>
    </div>

    <div className="flex space-x-3">
      <button className="flex-1 bg-white text-[#3F523B] hover:bg-[#E6E9D9] py-2 rounded-lg transition-all hover:shadow-md">
        Ver Detalles
      </button>
      <button className="flex-1 bg-[#96BE54] text-white hover:bg-[#769F4A] py-2 rounded-lg transition-all hover:shadow-md">
        Editar
      </button>
    </div>
  </motion.div>
);

export default InventarioTerreno;
