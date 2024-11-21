import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiSearch, HiFilter, HiPlus, HiDotsVertical, HiChartBar } from 'react-icons/hi';
import FormsDinamicos from './FormsDinamicos';

const GestionAlimento = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);

    const alimentos = [
        {
            id: 1,
            tipoAlimento: "Concentrado Premium",
            marca: "NutriMax",
            precio: 75000,
            cantidad: 50,
            unidad: "kg",
            fechaCompra: "2024-01-15",
            stockMinimo: 20,
            estado: "Disponible"
        },
        {
            id: 2,
            tipoAlimento: "Forraje Natural",
            marca: "EcoFeed",
            precio: 45000,
            cantidad: 100,
            unidad: "kg",
            fechaCompra: "2024-02-01",
            stockMinimo: 30,
            estado: "Bajo Stock"
        }
    ];

    const formFields = [
        { label: "Tipo Alimento", name: "tipoAlimento", type: "text", icon: "fa-wheat" },
        { label: "Marca", name: "marca", type: "text", icon: "fa-tag" },
        { label: "Precio", name: "precio", type: "number", icon: "fa-dollar-sign" },
        { label: "Cantidad", name: "cantidad", type: "number", icon: "fa-weight" },
        { label: "Unidad", name: "unidad", type: "select", icon: "fa-balance-scale",
          options: ["kg", "g", "L", "mL"] },
        { label: "Fecha Compra", name: "fechaCompra", type: "date", icon: "fa-calendar" },
        { label: "Stock Mínimo", name: "stockMinimo", type: "number", icon: "fa-warehouse" }
    ];

    const stats = [
        { title: "Total Inventario", value: "₡1,250,000", change: "+12%", icon: "💰" },
        { title: "Tipos de Alimento", value: "15", change: "+3", icon: "🌾" },
        { title: "Stock Bajo", value: "3", change: "-2", icon: "⚠️" }
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
                        <h1 className="text-3xl font-bold text-[#47624F]">Gestión de Alimentación</h1>
                        <p className="text-gray-600">Control y seguimiento de inventario alimenticio</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction('create')}
                        className="bg-[#96BE54] text-white px-6 py-3 rounded-xl hover:bg-[#769F4A] transition-all flex items-center gap-2 shadow-lg"
                    >
                        <HiPlus className="text-xl" />
                        Nuevo Alimento
                    </motion.button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-6 rounded-xl shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-3xl">{stat.icon}</span>
                                <span className={`text-xs ${
                                    stat.change.includes('+') ? 'text-green-500' : 'text-red-500'
                                }`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-sm text-gray-500 mt-4">{stat.title}</h3>
                            <p className="text-2xl font-bold text-[#47624F]">{stat.value}</p>
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
                            placeholder="Buscar por tipo, marca..."
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
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
                    >
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Marca</label>
                            <select className="w-full px-4 py-2 rounded-lg border-2 border-gray-200">
                                <option value="">Todas</option>
                                <option value="nutrimax">NutriMax</option>
                                <option value="ecofeed">EcoFeed</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Estado</label>
                            <select className="w-full px-4 py-2 rounded-lg border-2 border-gray-200">
                                <option value="">Todos</option>
                                <option value="disponible">Disponible</option>
                                <option value="bajo">Bajo Stock</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Rango de Precio</label>
                            <div className="flex gap-2">
                                <input type="number" placeholder="Min" className="w-1/2 px-4 py-2 rounded-lg border-2 border-gray-200" />
                                <input type="number" placeholder="Max" className="w-1/2 px-4 py-2 rounded-lg border-2 border-gray-200" />
                            </div>
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
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Tipo</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Marca</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Precio</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Cantidad</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Estado</th>
                            <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {alimentos.map((alimento) => (
                            <motion.tr
                                key={alimento.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ backgroundColor: "#F9FFEF" }}
                                className="group"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">{alimento.tipoAlimento}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{alimento.marca}</td>
                                <td className="px-6 py-4 whitespace-nowrap">₡{alimento.precio.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{alimento.cantidad} {alimento.unidad}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        alimento.estado === 'Disponible' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {alimento.estado}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="relative">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setSelectedItem(alimento.id === selectedItem ? null : alimento.id)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <HiDotsVertical className="text-xl" />
                                        </motion.button>
                                        
                                        {selectedItem === alimento.id && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                                            >
                                                <div className="py-1">
                                                    <button 
                                                        onClick={() => handleAction('view', alimento)}
                                                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Ver Detalles
                                                    </button>
                                                    <button 
                                                        onClick={() => handleAction('edit', alimento)}
                                                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button 
                                                        onClick={() => handleAction('delete', alimento)}
                                                        className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                    >
                                                        Eliminar
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
                title={`${currentAction === 'create' ? 'Nuevo' : currentAction === 'edit' ? 'Editar' : 'Ver'} Alimento`}
                fields={formFields}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default GestionAlimento;
