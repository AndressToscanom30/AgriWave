import { motion } from 'framer-motion';
import { HiOutlineCash } from 'react-icons/hi';
import { useState } from 'react';
import FormsDinamicos from './FormsDinamicos';
import axios from 'axios';


const FinancieraPage = () => {
  const [activeForm, setActiveForm] = useState(null);

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
      { label: "Cantidad Diaria Producción", name: "cantidadDiariaProduccion", type: "number", icon: "fa-chart-line" },
      { label: "Costo Producto", name: "costoProducto", type: "number", icon: "fa-dollar-sign" },
      { label: "Tipo Producción Secundaria", name: "tipoProduccionSec", type: "text", icon: "fa-industry" }
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
    ],
    "TAREAS": [
      { label: "Nombre", name: "nombre", type: "text", icon: "fa-tasks" },
      { label: "Completado", name: "completado", type: "checkbox", icon: "fa-check-square" }
    ]
  };

  const cards = [
    {
      title: "VACUNAS ANIMALES",
      icon: "💉",
      description: "Gestiona los registros de vacunación",
      stats: { total: "150", pending: "12" },
      link: "/vacunas"
    },
    {
      title: "GESTION ALIMENTACION",
      icon: "🌾",
      description: "Control de gastos en alimentación",
      stats: { total: "$2,500", month: "+15%" },
      link: "/alimento"
    },
    {
      title: "GESTION ANIMAL",
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
      link: "/produccion"
    },
    {
      title: "GESTION DE TERRENO",
      icon: "🌱",
      description: "Gestión de costos de terreno",
      stats: { total: "$12,000", year: "+5%" },
      link: "/terrenos"
    }
  ];

  const handleSubmit = async (formData) => {
    try {
      let apiUrl = '';
      switch (activeForm) {
        case 'VACUNAS ANIMALES':
          apiUrl = 'http://localhost:8080/vacunas';
          break;
        case 'GESTION ALIMENTACION':
          apiUrl = 'http://localhost:8080/alimentacion';
          break;
        case 'GESTION ANIMAL':
          apiUrl = 'http://localhost:8080/animales';
          break;
        case 'PRODUCCION ANIMAL':
          apiUrl = 'http://localhost:8080/produccion';
          break;
        case 'GESTION DE TERRENO':
          apiUrl = 'http://localhost:8080/terrenos';
          break;
      }

      const response = await axios.post(apiUrl, formData);
      console.log('Data saved successfully:', response.data);
      setActiveForm(null);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };


  return (
    <div className="p-8 bg-gradient-to-br from-[#F9FFEF] to-white">
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
                <button
                  onClick={() => setActiveForm(card.title)}
                  className="bg-[#96BE54] text-white hover:bg-[#769F4A] px-6 py-2 rounded-lg transition-all hover:scale-105"
                >
                  Agregar Registro
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {activeForm && (
        <FormsDinamicos
          fields={forms[activeForm] || []}
          onSubmit={handleSubmit}
          onClose={() => setActiveForm(null)}
          action="create"
          selectedItem={null}
        />
      )}
    </div>
  );
};

export default FinancieraPage;
