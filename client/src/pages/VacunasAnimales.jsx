import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HiSearch, HiFilter, HiPlus, HiDotsVertical, HiTrash, HiChartBar, HiCurrencyDollar, HiCalendar } from 'react-icons/hi';
import FormsDinamicos from './FormsDinamicos';
import axios from 'axios';

const VacunasAnimalesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
    const [vacunas, setVacunas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:8080/vacunas';

    useEffect(() => {
        fetchVacunas();
    }, []);

    const fetchVacunas = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(API_URL);
            setVacunas(response.data);
        } catch (err) {
            setError('Error al cargar las vacunas');
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
            await fetchVacunas();
            handleCloseForm();
        } catch (err) {
            console.error('Error al procesar la operación:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            await fetchVacunas();
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
        totalVacunas: vacunas.length,
        totalGasto: vacunas.reduce((acc, curr) => acc + parseFloat(curr.precio || 0), 0),
        proximasVacunas: vacunas.filter(v => {
            const proxima = new Date(v.proximaVacunacion);
            const hoy = new Date();
            return proxima > hoy && proxima <= new Date(hoy.setDate(hoy.getDate() + 30));
        }).length,
        vacunasEsteMes: vacunas.filter(v => {
            const fecha = new Date(v.fechaVacunacion);
            const hoy = new Date();
            return fecha.getMonth() === hoy.getMonth() && fecha.getFullYear() === hoy.getFullYear();
        }).length
    };

    const formFields = [
        { label: "Nombre", name: "nombre", type: "text", icon: "fa-syringe" },
        { label: "Fecha Vacunación", name: "fechaVacunacion", type: "date", icon: "fa-calendar" },
        { label: "Precio", name: "precio", type: "number", icon: "fa-dollar-sign" },
        { label: "Próxima Vacunación", name: "proximaVacunacion", type: "date", icon: "fa-calendar-plus" }
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

    const filteredVacunas = vacunas.filter((vacuna) =>
        Object.values(vacuna)
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
                        <h1 className="text-3xl font-bold text-[#47624F]">Control de Vacunación</h1>
                        <p className="text-gray-600">Gestión y seguimiento de vacunas</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction('create')}
                        className="bg-[#96BE54] text-white px-6 py-3 rounded-xl hover:bg-[#769F4A] transition-all flex items-center gap-2 shadow-lg"
                    >
                        <HiPlus className="text-xl" />
                        Nueva Vacuna
                    </motion.button>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#96BE54]/10 rounded-lg">
                            <HiChartBar className="text-2xl text-[#96BE54]" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Vacunas</p>
                            <p className="text-2xl font-bold text-[#47624F]">{stats.totalVacunas}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#96BE54]/10 rounded-lg">
                            <HiCurrencyDollar className="text-2xl text-[#96BE54]" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Gastos</p>
                            <p className="text-2xl font-bold text-[#47624F]">${stats.totalGasto}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#96BE54]/10 rounded-lg">
                            <HiCalendar className="text-2xl text-[#96BE54]" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Próximas Vacunas</p>
                            <p className="text-2xl font-bold text-[#47624F]">{stats.proximasVacunas}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#96BE54]/10 rounded-lg">
                            <HiChartBar className="text-2xl text-[#96BE54]" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Vacunas este mes</p>
                            <p className="text-2xl font-bold text-[#47624F]">{stats.vacunasEsteMes}</p>
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
                            placeholder="Buscar vacuna..."
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
                                <th className="py-3 px-6 rounded-tl-xl">Nombre</th>
                                <th className="py-3 px-6">Fecha Vacunación</th>
                                <th className="py-3 px-6">Precio</th>
                                <th className="py-3 px-6">Próxima Vacunación</th>
                                <th className="py-3 px-6 rounded-tr-xl">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVacunas.map((vacuna) => (
                                <tr key={vacuna.id} className="border-b hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">{vacuna.nombre}</td>
                                    <td className="py-4 px-6">{vacuna.fechaVacunacion}</td>
                                    <td className="py-4 px-6">${vacuna.precio}</td>
                                    <td className="py-4 px-6">{vacuna.proximaVacunacion}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleAction('edit', vacuna)}
                                                className="p-2 hover:bg-[#96BE54]/10 rounded-lg transition-all"
                                                title="Editar"
                                            >
                                                <HiDotsVertical className="text-[#96BE54]" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(vacuna.id)}
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
                    action={currentAction}
                    selectedItem={selectedItem}
                />
            )}
        </div>
    );
};

export default VacunasAnimalesPage;
