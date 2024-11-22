import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HiSearch, HiFilter, HiPlus, HiDotsVertical, HiChartBar, HiTrash, HiPencil } from 'react-icons/hi';
import FormsDinamicos from './FormsDinamicos';
import axios from 'axios';

const ProduccionAnimal = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
    const [produccion, setProduccion] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:8080/produccion-animal';

    useEffect(() => {
        fetchProduccion();
    }, []);

    const fetchProduccion = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(API_URL);
            setProduccion(response.data);
        } catch (err) {
            setError('Error al cargar los datos de producción');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (data) => {
        try {
            if (currentAction === 'create') {
                await axios.post(API_URL, data);
            } else if (currentAction === 'edit' && selectedItem) {
                await axios.put(`${API_URL}/${selectedItem.id}`, data);
            }
            await fetchProduccion();
            handleCloseForm();
        } catch (err) {
            console.error('Error al procesar la operación:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            await fetchProduccion();
        } catch (err) {
            console.error('Error al eliminar:', err);
        }
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedItem(null);
        setCurrentAction(null);
    };

    const handleAction = (action, item = null) => {
        setCurrentAction(action);
        setSelectedItem(item);
        setIsFormOpen(true);
    };

    const stats = {
        totalProduccion: produccion.reduce((acc, curr) => acc + curr.cantidadDiaria, 0),
        promedioCalidad: produccion.reduce((acc, curr) => acc + (curr.calidad === 'Premium' ? 1 : 0), 0) / produccion.length * 100,
        totalIngresos: produccion.reduce((acc, curr) => acc + curr.costoProducto, 0),
        produccionMensual: produccion.filter(p => {
            const fecha = new Date(p.fechaRegistro);
            const hoy = new Date();
            return fecha.getMonth() === hoy.getMonth() && fecha.getFullYear() === hoy.getFullYear();
        }).length
    };

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

    const filteredProduccion = produccion.filter((item) =>
        Object.values(item)
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white p-6 rounded-xl shadow-lg"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#96BE54]/10 rounded-lg">
                                <HiChartBar className="text-2xl text-[#96BE54]" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Producción</p>
                                <p className="text-2xl font-bold text-[#47624F]">{stats.totalProduccion}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Similar cards for other stats */}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-md p-6 mb-8"
            >
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar producción..."
                            className="w-full pl-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#96BE54]"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#96BE54] text-white rounded-xl shadow-lg hover:bg-[#769F4A] transition-all"
                    >
                        <HiFilter className="text-xl" />
                        Filtros
                    </motion.button>
                </div>

                <div className="mt-8 overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-[#96BE54] text-white">
                                <th className="py-3 px-6 rounded-tl-xl">Animal</th>
                                <th className="py-3 px-6">ID</th>
                                <th className="py-3 px-6">Producción</th>
                                <th className="py-3 px-6">Cantidad</th>
                                <th className="py-3 px-6">Calidad</th>
                                <th className="py-3 px-6">Costo</th>
                                <th className="py-3 px-6 rounded-tr-xl">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProduccion.map((item) => (
                                <motion.tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50"
                                    whileHover={{ backgroundColor: "#F9FFEF" }}
                                >
                                    <td className="py-4 px-6">{item.tipoAnimal}</td>
                                    <td className="py-4 px-6">{item.identificacion}</td>
                                    <td className="py-4 px-6">{item.tipoProduccion}</td>
                                    <td className="py-4 px-6">
                                        {item.cantidadDiaria} {item.unidad}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-sm ${item.calidad === 'Premium'
                                                ? 'bg-purple-100 text-purple-800'
                                                : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {item.calidad}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">₡{item.costoProducto}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleAction('edit', item)}
                                                className="p-2 hover:bg-[#96BE54]/10 rounded-lg transition-all"
                                            >
                                                <HiPencil className="text-[#96BE54]" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <HiTrash className="text-red-500" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {isFormOpen && (
                <FormsDinamicos
                    fields={formFields}
                    onSubmit={handleSubmit}
                    onClose={handleCloseForm}
                    action={currentAction}
                    selectedItem={selectedItem}
                />
            )}
        </div>
    );
};

export default ProduccionAnimal;
