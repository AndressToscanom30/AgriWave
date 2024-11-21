import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HiSearch, HiFilter, HiPlus, HiDotsVertical } from 'react-icons/hi';
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
    const [statsData, setStatsData] = useState({
        vacunasAplicadas: 0,
        proximasVacunas: 0,
        inversion: 0,
        cobertura: 0
    });

    const API_URL = 'http://localhost:8080/vacunas';

    useEffect(() => {
        fetchVacunas();
    }, []);

    const fetchVacunas = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(API_URL);
            console.log('Response:', response.data); // Verifica el formato de los datos
            setVacunas(response.data);
            calculateStats(response.data);
        } catch (err) {
            setError('Error al cargar las vacunas');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const calculateStats = (data) => {
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

        const aplicadas = data.filter(v => v.estado === 'Aplicada').length;
        const proximas = data.filter(v => {
            const fechaProxima = new Date(v.proximaAplicacion);
            return fechaProxima <= nextWeek && fechaProxima >= today;
        }).length;
        const inversion = data.reduce((sum, v) => sum + (v.estado === 'Aplicada' ? v.costo : 0), 0);
        const totalAnimales = new Set(data.map(v => v.identificacionAnimal)).size;
        const animalesVacunados = new Set(
            data.filter(v => v.estado === 'Aplicada')
                .map(v => v.identificacionAnimal)
        ).size;
        const cobertura = totalAnimales > 0 ? (animalesVacunados / totalAnimales) * 100 : 0;

        setStatsData({
            vacunasAplicadas: aplicadas,
            proximasVacunas: proximas,
            inversion,
            cobertura
        });
    };

    const handleSubmit = async (data) => {
        try {
            if (currentAction === 'create') {
                await axios.post(API_URL, data);
            } else if (currentAction === 'edit' && selectedItem) {
                await axios.put(`${API_URL}/${selectedItem.id}`, data);
            } else if (currentAction === 'delete' && selectedItem) {
                await axios.delete(`${API_URL}/${selectedItem.id}`);
            }
            await fetchVacunas();
            handleCloseForm();
        } catch (err) {
            console.error('Error al procesar la operación:', err);
        }
    };

    const stats = [
        {
            title: "Vacunas Aplicadas",
            value: statsData.vacunasAplicadas.toString(),
            change: "+12",
            icon: "💉",
            detail: "este mes"
        },
        {
            title: "Próximas Vacunas",
            value: statsData.proximasVacunas.toString(),
            change: "Próximos 7 días",
            icon: "📅",
            detail: "programadas"
        },
        {
            title: "Inversión",
            value: `₡${statsData.inversion.toLocaleString()}`,
            change: "+15%",
            icon: "💰",
            detail: "vs mes anterior"
        },
        {
            title: "Cobertura",
            value: `${statsData.cobertura.toFixed(1)}%`,
            change: "↑",
            icon: "🎯",
            detail: "del ganado"
        }
    ];

    const formFields = [
        { label: "Nombre Vacuna", name: "nombreVacuna", type: "text", icon: "fa-syringe" },
        {
            label: "Tipo Animal", name: "tipoAnimal", type: "select", icon: "fa-cow",
            options: ["Bovino", "Ovino", "Porcino", "Caprino"]
        },
        { label: "ID Animal", name: "identificacionAnimal", type: "text", icon: "fa-id-card" },
        { label: "Fecha Aplicación", name: "fechaAplicacion", type: "date", icon: "fa-calendar" },
        { label: "Próxima Aplicación", name: "proximaAplicacion", type: "date", icon: "fa-calendar-plus" },
        { label: "Veterinario", name: "veterinario", type: "text", icon: "fa-user-md" },
        { label: "Costo", name: "costo", type: "number", icon: "fa-dollar-sign" },
        {
            label: "Estado", name: "estado", type: "select", icon: "fa-check-circle",
            options: ["Aplicada", "Pendiente", "Cancelada"]
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
        [vacuna.nombre, vacuna.tipoAnimal, vacuna.identificacionAnimal]
            .some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
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
                                <span className="text-xs text-green-500">{stat.change}</span>
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

                {filterOpen && (
                    <div className="flex gap-4 mt-6">
                        <div className="w-1/4">
                            <label className="block text-gray-700">Estado</label>
                            <select className="w-full py-3 px-4 rounded-xl border border-gray-300">
                                <option>Todos</option>
                                <option>Aplicada</option>
                                <option>Pendiente</option>
                                <option>Cancelada</option>
                            </select>
                        </div>
                        <div className="w-1/4">
                            <label className="block text-gray-700">Tipo Animal</label>
                            <select className="w-full py-3 px-4 rounded-xl border border-gray-300">
                                <option>Todos</option>
                                <option>Bovino</option>
                                <option>Ovino</option>
                                <option>Porcino</option>
                                <option>Caprino</option>
                            </select>
                        </div>
                    </div>
                )}

                <div className="mt-8">
                    <table className="min-w-full table-auto text-left">
                        <thead>
                            <tr className="bg-[#96BE54] text-white">
                                <th className="py-3 px-6">Nombre</th>
                                <th className="py-3 px-6">Fecha Vacunación</th>
                                <th className="py-3 px-6">Precio</th>
                                <th className="py-3 px-6">Próxima Vacunación</th>
                                <th className="py-3 px-6"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVacunas.map((vacuna) => (
                                <tr key={vacuna.id} className="border-b">
                                    <td className="py-4 px-6">{vacuna.nombre}</td>
                                    <td className="py-4 px-6">{vacuna.fechaVacunacion}</td>
                                    <td className="py-4 px-6">{vacuna.precio}</td>
                                    <td className="py-4 px-6">{vacuna.proximaVacunacion}</td>
                                    <td className="py-4 px-6">
                                        <HiDotsVertical
                                            className="cursor-pointer text-xl"
                                            onClick={() => handleAction('edit', vacuna)}
                                        />
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