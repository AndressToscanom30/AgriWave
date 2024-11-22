import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HiSearch, HiFilter, HiPlus, HiDotsVertical, HiTrash, HiChartBar, HiCurrencyDollar, HiCalendar } from 'react-icons/hi';
import FormsDinamicos from './FormsDinamicos';
import axios from 'axios';

const GestionAlimento = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
    const [alimentos, setAlimentos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:8080/alimentos';

    useEffect(() => {
        fetchAlimentos();
    }, []);

    const fetchAlimentos = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(API_URL);
            setAlimentos(response.data);
        } catch (err) {
            setError('Error al cargar los alimentos');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (data) => {
        try {
            const formattedData = {
                tipoAlimento: data.tipoAlimento,
                marca: data.marca,
                precio: parseFloat(data.precio),
                cantidad: parseInt(data.cantidad)
            };

            if (currentAction === 'create') {
                await axios.post(API_URL, formattedData);
            } else if (currentAction === 'edit' && selectedItem) {
                await axios.put(`${API_URL}/${selectedItem.id}`, formattedData);
            }

            await fetchAlimentos();
            setIsFormOpen(false);
            setSelectedItem(null);
            setCurrentAction(null);
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            await fetchAlimentos();
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
        totalAlimentos: alimentos.length,
        totalGasto: alimentos.reduce((acc, curr) => acc + (parseFloat(curr.precio) * parseInt(curr.cantidad) || 0), 0),
        tiposUnicos: new Set(alimentos.map(item => item.tipoAlimento)).size,
        totalInventario: alimentos.reduce((acc, curr) => acc + (parseInt(curr.cantidad) || 0), 0)
    };

    const formFields = [
        { label: "Tipo Alimento", name: "tipoAlimento", type: "text", icon: "fa-wheat" },
        { label: "Marca", name: "marca", type: "text", icon: "fa-tag" },
        { label: "Precio", name: "precio", type: "number", icon: "fa-dollar-sign" },
        { label: "Cantidad", name: "cantidad", type: "number", icon: "fa-weight" }
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

    const filteredAlimentos = alimentos.filter((alimento) =>
        Object.values(alimento)
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
                        <h1 className="text-3xl font-bold text-[#47624F]">Control de Alimentación</h1>
                        <p className="text-gray-600">Gestión y seguimiento de alimentos</p>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-6 rounded-xl shadow-lg"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#96BE54]/10 rounded-lg">
                            <HiChartBar className="text-2xl text-[#96BE54]" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Alimentos</p>
                            <p className="text-2xl font-bold text-[#47624F]">{stats.totalAlimentos}</p>
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
                            <p className="text-sm text-gray-500">Valor Total</p>
                            <p className="text-2xl font-bold text-[#47624F]">₡{stats.totalGasto.toLocaleString()}</p>
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
                            <p className="text-sm text-gray-500">Tipos Únicos</p>
                            <p className="text-2xl font-bold text-[#47624F]">{stats.tiposUnicos}</p>
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
                            <p className="text-sm text-gray-500">Total Inventario</p>
                            <p className="text-2xl font-bold text-[#47624F]">{stats.totalInventario}</p>
                        </div>
                    </div>
                </motion.div>
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
                            placeholder="Buscar alimento..."
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
                    <table className="min-w-full table-auto text-left">
                        <thead>
                            <tr className="bg-[#96BE54] text-white">
                                <th className="py-3 px-6 rounded-tl-xl">Tipo</th>
                                <th className="py-3 px-6">Marca</th>
                                <th className="py-3 px-6">Precio</th>
                                <th className="py-3 px-6">Cantidad</th>
                                <th className="py-3 px-6 rounded-tr-xl">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAlimentos.map((alimento) => (
                                <tr key={alimento.id} className="border-b hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">{alimento.tipoAlimento}</td>
                                    <td className="py-4 px-6">{alimento.marca}</td>
                                    <td className="py-4 px-6">₡{parseFloat(alimento.precio).toLocaleString()}</td>
                                    <td className="py-4 px-6">{alimento.cantidad}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleAction('edit', alimento)}
                                                className="p-2 hover:bg-[#96BE54]/10 rounded-lg transition-all"
                                                title="Editar"
                                            >
                                                <HiDotsVertical className="text-[#96BE54]" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(alimento.id)}
                                                className="p-2 hover:bg-red-50 rounded-lg transition-all"
                                                title="Eliminar"
                                            >
                                                <HiTrash className="text-red-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
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
                    title={`${currentAction === 'create' ? 'Nuevo' : 'Editar'} - Alimento`}
                    action={currentAction}
                    selectedItem={selectedItem}
                />
            )}
        </div>
    );
};

export default GestionAlimento;
