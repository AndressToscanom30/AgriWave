import { motion } from 'framer-motion';
import { HiOutlineCash, HiChartBar, HiCurrencyDollar, HiCalendar, HiPlus, HiDotsVertical, HiTrash } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import FormsDinamicos from './FormsDinamicos';
import axios from 'axios';

const FinancieraPage = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [data, setData] = useState({
    vacunas: [],
    alimentacion: [],
    animales: [],
    produccion: [],
    terrenos: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      const [vacunas, alimentacion, animales, produccion, terrenos] = await Promise.all([
        axios.get('http://localhost:8080/vacunas'),
        axios.get('http://localhost:8080/alimentos'),
        axios.get('http://localhost:8080/animales'),
        axios.get('http://localhost:8080/produccion-animal'),
        axios.get('http://localhost:8080/terrenos')
      ]);

      setData({
        vacunas: vacunas.data,
        alimentacion: alimentacion.data,
        animales: animales.data,
        produccion: produccion.data,
        terrenos: terrenos.data
      });
    } catch (err) {
      setError('Error al cargar los datos financieros');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const forms = {
    "VACUNAS ANIMALES": [
      { label: "Nombre", name: "nombre", type: "text", icon: "fa-syringe" },
      { label: "Fecha Vacunación", name: "fechaVacunacion", type: "date", icon: "fa-calendar" },
      { label: "Precio", name: "precio", type: "number", icon: "fa-dollar-sign" },
      { label: "Próxima Vacunación", name: "proximaVacunacion", type: "date", icon: "fa-calendar-plus" }
    ],
    "GESTION ALIMENTACION": [
      { label: "Tipo Alimento", name: "tipoAlimento", type: "text", icon: "fa-wheat" },
      { label: "Marca", name: "Marca", type: "text", icon: "fa-tag" },
      { label: "Precio", name: "precio", type: "number", icon: "fa-dollar-sign" },
      { label: "Cantidad", name: "cantidad", type: "number", icon: "fa-weight" }
    ],
    "GESTION ANIMAL": [
      { label: "Nombre", name: "nombre", type: "text", icon: "fa-tag" },
      { label: "Raza", name: "raza", type: "text", icon: "fa-dna" },
      { label: "Fecha Nacimiento", name: "fechaNacimiento", type: "date", icon: "fa-calendar" },
      { label: "Peso", name: "peso", type: "number", icon: "fa-weight" },
      { label: "Origen", name: "origen", type: "text", icon: "fa-map-marker" },
      { label: "Costo Animal", name: "costoAnimal", type: "number", icon: "fa-dollar-sign" },
      { label: "Fecha Compra", name: "fechaCompra", type: "date", icon: "fa-shopping-cart" },
      { label: "Documentado", name: "documentado", type: "checkbox", icon: "fa-file-alt" },
      { label: "Adicional", name: "adicional", type: "number", icon: "fa-plus-circle" }
    ],
    "PRODUCCION ANIMAL": [
      { label: "Tipo Animal", name: "tipoAnimal", type: "text", icon: "fa-cow" },
      { label: "Tipo Producción", name: "tipoProduccion", type: "text", icon: "fa-industry" },
      { label: "Cantidad Diaria", name: "cantidadDiariaProduccion", type: "number", icon: "fa-chart-line" },
      { label: "Costo Producto", name: "costoProducto", type: "number", icon: "fa-dollar-sign" },
      { label: "Tipo Producción Secundaria", name: "tipoProduccionSec", type: "text", icon: "fa-plus-circle" }
    ],
    "GESTION DE TERRENO": [
      { label: "Tipo", name: "tipo", type: "text", icon: "fa-map" },
      { label: "Hectáreas", name: "hectareas", type: "number", icon: "fa-ruler" },
      { label: "Topografía", name: "topografia", type: "text", icon: "fa-mountain" },
      { label: "Condiciones Ambientales", name: "condicionesAmb", type: "text", icon: "fa-cloud-sun" },
      { label: "Ubicación", name: "ubicacion", type: "text", icon: "fa-location-dot" },
      { label: "Zonificación", name: "zonificacion", type: "text", icon: "fa-map-location" },
      { label: "Costo Terreno", name: "costoTerreno", type: "number", icon: "fa-dollar-sign" },
      { label: "Costo Mantenimiento", name: "costoMantenimiento", type: "number", icon: "fa-tools" },
      { label: "Costo Construcciones", name: "costoConstrucciones", type: "number", icon: "fa-building" },
      { label: "Costo Arriendo", name: "costoArriendo", type: "number", icon: "fa-key" },
      { label: "Adicionales", name: "adicionales", type: "number", icon: "fa-plus-circle" }
    ]
  };

  const calculateStats = () => {
    const totalGastos = {
      vacunas: data.vacunas.reduce((acc, curr) => acc + (curr.precio || 0), 0),
      alimentacion: data.alimentacion.reduce((acc, curr) => acc + (curr.precio || 0), 0),
      animales: data.animales.reduce((acc, curr) => acc + (curr.costoAnimal || 0), 0),
      terrenos: data.terrenos.reduce((acc, curr) => acc + (curr.costoTerreno || 0), 0)
    };

    const totalIngresos = data.produccion.reduce((acc, curr) => acc + (curr.costoProducto || 0), 0);

    return {
      totalGastos: Object.values(totalGastos).reduce((a, b) => a + b, 0),
      totalIngresos,
      balance: totalIngresos - Object.values(totalGastos).reduce((a, b) => a + b, 0),
      desglose: totalGastos
    };
  };

  const cards = [
    {
      title: "VACUNAS ANIMALES",
      icon: "💉",
      description: "Gestiona los registros de vacunación",
      stats: {
        total: data.vacunas.reduce((acc, curr) => acc + (curr.precio || 0), 0),
        count: data.vacunas.length
      },
      link: "/vacunas"
    },
    {
      title: "GESTION ALIMENTACION",
      icon: "🌾",
      description: "Control de gastos en alimentación",
      stats: {
        total: data.alimentacion.reduce((acc, curr) => acc + (curr.precio || 0), 0),
        count: data.alimentacion.length
      },
      link: "/alimento"
    },
    {
      title: "GESTION ANIMAL",
      icon: "🐄",
      description: "Seguimiento de costos por animal",
      stats: {
        total: data.animales.reduce((acc, curr) => acc + (curr.costoAnimal || 0), 0),
        count: data.animales.length
      },
      link: "/animales"
    },
    {
      title: "PRODUCCION ANIMAL",
      icon: "📊",
      description: "Métricas de producción",
      stats: {
        total: data.produccion.reduce((acc, curr) => acc + (curr.costoProducto || 0), 0),
        count: data.produccion.length
      },
      link: "/produccion"
    },
    {
      title: "GESTION DE TERRENO",
      icon: "🌱",
      description: "Gestión de costos de terreno",
      stats: {
        total: data.terrenos.reduce((acc, curr) => acc + (curr.costoTerreno || 0), 0),
        count: data.terrenos.length
      },
      link: "/terrenos"
    }
  ];

  const handleSubmit = async (formData) => {
    try {
      const endpoints = {
        'VACUNAS ANIMALES': 'vacunas',
        'GESTION ALIMENTACION': 'alimentos',
        'GESTION ANIMAL': 'animales',
        'PRODUCCION ANIMAL': 'produccion-animal',
        'GESTION DE TERRENO': 'terrenos'
      };

      const endpoint = endpoints[activeForm];
      if (!endpoint) return;

      await axios.post(`http://localhost:8080/${endpoint}`, formData);
      await fetchAllData();
      setActiveForm(null);
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#96BE54]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  const stats = calculateStats();

  return (
    <div className="p-8 bg-gradient-to-br from-[#F9FFEF] to-white min-h-screen">
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-[#47624F]">Gestión Financiera</h1>
            <p className="text-gray-600">Control y seguimiento de gastos e ingresos</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#96BE54]/10 rounded-lg">
                <HiOutlineCash className="text-2xl text-[#96BE54]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Gastos</p>
                <p className="text-2xl font-bold text-[#47624F]">₡{stats.totalGastos.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#96BE54]/10 rounded-lg">
                <HiCurrencyDollar className="text-2xl text-[#96BE54]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Ingresos</p>
                <p className="text-2xl font-bold text-[#47624F]">₡{stats.totalIngresos.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#96BE54]/10 rounded-lg">
                <HiChartBar className="text-2xl text-[#96BE54]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Balance</p>
                <p className={`text-2xl font-bold ${stats.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₡{stats.balance.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#96BE54]/10 rounded-lg">
                <HiCalendar className="text-2xl text-[#96BE54]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Registros Totales</p>
                <p className="text-2xl font-bold text-[#47624F]">
                  {Object.values(data).reduce((acc, curr) => acc + curr.length, 0)}
                </p>
              </div>
            </div>
          </motion.div>
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
                  <p className="text-lg font-bold text-[#47624F]">₡{card.stats.total.toLocaleString()}</p>
                  <span className="text-xs text-gray-400">{card.stats.count} registros</span>
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
                  Ver Registros
                </a>
                <button
                  onClick={() => setActiveForm(card.title)}
                  className="bg-[#96BE54] text-white hover:bg-[#769F4A] px-6 py-2 rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <HiPlus className="text-xl" />
                  Nuevo Registro
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {activeForm && (
        <FormsDinamicos
          fields={forms[activeForm]}
          onSubmit={handleSubmit}
          onClose={() => setActiveForm(null)}
          title={`Nuevo Registro - ${activeForm}`}
          action="create"
          selectedItem={null}
        />
      )}
    </div>
  );
};

export default FinancieraPage;
