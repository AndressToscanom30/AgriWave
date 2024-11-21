import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiSearch, HiFilter, HiPlus, HiDotsVertical } from 'react-icons/hi';
import FormsDinamicos from './FormsDinamicos';

const VacunasAnimalesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);

    const stats = [
        {
            title: "Vacunas Aplicadas",
            value: "156",
            change: "+12",
            icon: "💉",
            detail: "este mes"
        },
        {
            title: "Próximas Vacunas",
            value: "23",
            change: "Próximos 7 días",
            icon: "📅",
            detail: "programadas"
        },
        {
            title: "Inversión",
            value: "₡850,000",
            change: "+15%",
            icon: "💰",
            detail: "vs mes anterior"
        },
        {
            title: "Cobertura",
            value: "98%",
            change: "↑",
            icon: "🎯",
            detail: "del ganado"
        }
    ];

    const vacunas = [
        {
            id: 1,
            nombreVacuna: "Aftosa",
            tipoAnimal: "Bovino",
            identificacionAnimal: "BOV-001",
            fechaAplicacion: "2024-01-15",
            proximaAplicacion: "2024-07-15",
            veterinario: "Dr. Juan Pérez",
            estado: "Aplicada",
            costo: 25000
        },
        {
            id: 2,
            nombreVacuna: "Brucelosis",
            tipoAnimal: "Bovino",
            identificacionAnimal: "BOV-002",
            fechaAplicacion: "2024-02-01",
            proximaAplicacion: "2024-08-01",
            veterinario: "Dra. María López",
            estado: "Pendiente",
            costo: 30000
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
                        <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, animal..."
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
                                <option value="bovino">Bovino</option>
                                <option value="ovino">Ovino</option>
                                <option value="porcino">Porcino</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Estado</label>
                            <select className="w-full px-4 py-2 rounded-lg border-2 border-gray-200">
                                <option value="">Todos</option>
                                <option value="aplicada">Aplicada</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="cancelada">Cancelada</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Veterinario</label>
                            <select className="w-full px-4 py-2 rounded-lg border-2 border-gray-200">
                                <option value="">Todos</option>
                                <option value="juan">Dr. Juan Pérez</option>
                                <option value="maria">Dra. María López</option>
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
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Vacuna</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Animal</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">ID</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Fecha</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Próxima</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Estado</th>
                            <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {vacunas.map((vacuna) => (
                            <motion.tr
                                key={vacuna.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ backgroundColor: "#F9FFEF" }}
                                className="group"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">{vacuna.nombreVacuna}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{vacuna.tipoAnimal}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{vacuna.identificacionAnimal}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{vacuna.fechaAplicacion}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{vacuna.proximaAplicacion}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 rounded-full text-sm ${vacuna.estado === 'Aplicada'
                                            ? 'bg-green-100 text-green-800'
                                            : vacuna.estado === 'Pendiente'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                        {vacuna.estado}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="relative">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setSelectedItem(vacuna.id === selectedItem ? null : vacuna.id)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <HiDotsVertical className="text-xl" />
                                        </motion.button>

                                        {selectedItem === vacuna.id && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                                            >
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => handleAction('view', vacuna)}
                                                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Ver Detalles
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction('edit', vacuna)}
                                                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction('delete', vacuna)}
                                                        className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                    >
                                                        Eliminar
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction('record', vacuna)}
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
                title={`${currentAction === 'create' ? 'Nueva' : currentAction === 'edit' ? 'Editar' : 'Ver'} Vacuna`}
                fields={formFields}
                onSubmit={handleSubmit}
                initialData={selectedItem}
            />
        </div>
    );
};

export default VacunasAnimalesPage;

