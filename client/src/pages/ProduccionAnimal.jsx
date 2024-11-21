import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiSearch, HiFilter, HiPlus, HiDotsVertical, HiChartBar } from 'react-icons/hi';
import FormsDinamicos from './FormsDinamicos';

const ProduccionAnimal = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);

    const produccion = [
        {
            id: 1,
            tipoAnimal: "Vaca Lechera",
            identificacion: "VL-001",
            tipoProduccion: "Leche",
            cantidadDiaria: 28,
            unidad: "L",
            costoProducto: 800,
            calidad: "Premium",
            fechaRegistro: "2024-01-15",
            tipoProduccionSec: "Queso"
        },
        {
            id: 2,
            tipoAnimal: "Oveja",
            identificacion: "OV-003",
            tipoProduccion: "Lana",
            cantidadDiaria: 2.5,
            unidad: "kg",
            costoProducto: 1200,
            calidad: "Alta",
            fechaRegistro: "2024-02-01",
            tipoProduccionSec: "Leche"
        }
    ];

    const formFields = [
        { label: "Tipo Animal", name: "tipoAnimal", type: "text", icon: "fa-cow" },
        { label: "Identificación", name: "identificacion", type: "text", icon: "fa-id-card" },
        { label: "Tipo Producción", name: "tipoProduccion", type: "text", icon: "fa-industry" },
        { label: "Cantidad Diaria", name: "cantidadDiaria", type: "number", icon: "fa-chart-line" },
        {
            label: "Unidad", name: "unidad", type: "select", icon: "fa-ruler",
            options: ["L", "kg", "g", "unidades"]
        },
        { label: "Costo Producto", name: "costoProducto", type: "number", icon: "fa-dollar-sign" },
        {
            label: "Calidad", name: "calidad", type: "select", icon: "fa-star",
            options: ["Premium", "Alta", "Media", "Baja"]
        },
        { label: "Producción Secundaria", name: "tipoProduccionSec", type: "text", icon: "fa-plus-circle" }
    ];

    const stats = [
        {
            title: "Producción Total",
            value: "2,500 L",
            change: "+15%",
            icon: "📊",
            detail: "vs. mes anterior"
        },
        {
            title: "Ingresos",
            value: "₡1,850,000",
            change: "+8%",
            icon: "💰",
            detail: "este mes"
        },
        {
            title: "Eficiencia",
            value: "92%",
            change: "+3%",
            icon: "⚡",
            detail: "rendimiento"
        },
        {
            title: "Calidad",
            value: "Premium",
            change: "↑",
            icon: "⭐",
            detail: "promedio"
        }
    ];

    const handleAction = (action, item = null) => {
        setCurrentAction(action);
        setSelectedItem(item);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedItem(null);
        setCurrentAction(null);
    };

    const handleSubmit = (data) => {
        console.log('Form submitted:', data);
        handleCloseForm();
    };

    return (
        <div className="p-8 bg-gradient-to-br from-[#F9FFEF] to-white min-h-screen">
            <div className="mb-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-[#47624F]">Producción Animal</h1>
                        <p className="text-gray-600">Control y seguimiento de la producción</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction('create')}
                        className="bg-[#96BE54] text-white px-6 py-3 rounded-xl hover:bg-[#769F4A] transition-all flex items-center gap-2 shadow-lg"
                    >
                        <HiPlus className="text-xl" />
                        Nuevo Registro
                    </motion.button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-6 rounded-xl shadow-md"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-3xl">{stat.icon}</span>
                                <span className={`text-xs ${stat.change.includes('+') ? 'text-green-500' : 'text-blue-500'
                                    }`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-sm text-gray-500">{stat.title}</h3>
                            <p className="text-2xl font-bold text-[#47624F]">{stat.value}</p>
                            <span className="text-xs text-gray-400">{stat.detail}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-md p-6 mb-8"
            >
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="text"
                            placeholder="Buscar por tipo, identificación..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#96BE54] focus:ring-2 focus:ring-[#96BE54]/20 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-[#96BE54] transition-all"
                    >
                        <HiFilter className="text-xl" />
                        Filtros
                    </motion.button>
                </div>

                {filterOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4"
                    >
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Tipo Animal</label>
                            <select className="w-full px-4 py-2 rounded-lg border-2 border-gray-200">
                                <option value="">Todos</option>
                                <option value="vaca">Vaca</option>
                                <option value="oveja">Oveja</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Tipo Producción</label>
                            <select className="w-full px-4 py-2 rounded-lg border-2 border-gray-200">
                                <option value="">Todos</option>
                                <option value="leche">Leche</option>
                                <option value="lana">Lana</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Calidad</label>
                            <select className="w-full px-4 py-2 rounded-lg border-2 border-gray-200">
                                <option value="">Todas</option>
                                <option value="premium">Premium</option>
                                <option value="alta">Alta</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Fecha</label>
                            <input type="date" className="w-full px-4 py-2 rounded-lg border-2 border-gray-200" />
                        </div>
                    </motion.div>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Animal</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">ID</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Producción</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Cantidad</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Calidad</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Costo</th>
                            <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {produccion.map((item) => (
                            <motion.tr
                                key={item.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ backgroundColor: "#F9FFEF" }}
                                className="group"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">{item.tipoAnimal}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.identificacion}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.tipoProduccion}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.cantidadDiaria} {item.unidad}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 rounded-full text-sm ${item.calidad === 'Premium'
                                            ? 'bg-purple-100 text-purple-800'
                                            : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {item.calidad}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    ₡{item.costoProducto.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="relative">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setSelectedItem(item.id === selectedItem ? null : item.id)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <HiDotsVertical className="text-xl" />
                                        </motion.button>

                                        {selectedItem === item.id && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                                            >
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => handleAction('view', item)}
                                                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Ver Detalles
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction('edit', item)}
                                                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction('delete', item)}
                                                        className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                    >
                                                        Eliminar
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction('history', item)}
                                                        className="block w-full px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                                                    >
                                                        Historial
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            <FormsDinamicos
                isOpen={isFormOpen}
                onClose={handleCloseForm}
                title={`${currentAction === 'create' ? 'Nuevo' : currentAction === 'edit' ? 'Editar' : 'Ver'} Registro de Producción`}
                fields={formFields}
                onSubmit={handleSubmit}
                initialData={selectedItem}
            />
        </div>
    );
};

export default ProduccionAnimal;