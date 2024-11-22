import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HiSearch, HiFilter, HiPlus, HiChartBar, HiTrash, HiPencil, HiCurrencyDollar, HiLocationMarker } from 'react-icons/hi';
import FormsDinamicos from './FormsDinamicos';
import axios from 'axios';

const GestionTerreno = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
    const [terrenos, setTerrenos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:8080/terrenos';

    const formFields = [
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
    ];

    useEffect(() => {
        fetchTerrenos();
    }, []);

    const fetchTerrenos = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(API_URL);
            setTerrenos(response.data);
        } catch (err) {
            setError('Error al cargar los datos de terrenos');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (data) => {
        try {
            const formattedData = {
                ...data,
                hectareas: parseFloat(data.hectareas),
                costoTerreno: parseFloat(data.costoTerreno),
                costoMantenimiento: parseFloat(data.costoMantenimiento),
                costoConstrucciones: parseFloat(data.costoConstrucciones),
                costoArriendo: parseFloat(data.costoArriendo),
                adicionales: parseFloat(data.adicionales)
            };

            if (currentAction === 'create') {
                await axios.post(API_URL, formattedData);
            } else if (currentAction === 'edit' && selectedItem) {
                await axios.put(`${API_URL}/${selectedItem.id}`, {
                    ...formattedData,
                    id: selectedItem.id
                });
            }

            await fetchTerrenos();
            handleCloseForm();
        } catch (err) {
            console.error('Error al procesar la operación:', err);
        }
    };

    const stats = {
        totalHectareas: terrenos.reduce((acc, curr) => acc + (parseFloat(curr.hectareas) || 0), 0),
        totalInversion: terrenos.reduce((acc, curr) =>
            acc + (parseFloat(curr.costoTerreno) || 0) +
            (parseFloat(curr.costoConstrucciones) || 0), 0),
        costoMantenimiento: terrenos.reduce((acc, curr) => acc + (parseFloat(curr.costoMantenimiento) || 0), 0),
        totalTerrenos: terrenos.length
    };

    const handleAction = (action, item = null) => {
        setCurrentAction(action);
        setSelectedItem(item);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este terreno?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                await fetchTerrenos();
            } catch (err) {
                console.error('Error al eliminar:', err);
            }
        }
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedItem(null);
        setCurrentAction(null);
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
                        <h1 className="text-3xl font-bold text-[#47624F]">Gestión de Terrenos</h1>
                        <p className="text-gray-600">Administración y control de terrenos</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction('create')}
                        className="bg-[#96BE54] text-white px-6 py-3 rounded-xl hover:bg-[#769F4A] transition-all flex items-center gap-2 shadow-lg"
                    >
                        <HiPlus className="text-xl" />
                        Nuevo Terreno
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
                                <p className="text-sm text-gray-500">Total Hectáreas</p>
                                <p className="text-2xl font-bold text-[#47624F]">{stats.totalHectareas.toFixed(2)} ha</p>
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
                                <p className="text-sm text-gray-500">Inversión Total</p>
                                <p className="text-2xl font-bold text-[#47624F]">₡{stats.totalInversion.toLocaleString()}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white p-6 rounded-xl shadow-lg"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#96BE54]/10 rounded-lg">
                                <HiLocationMarker className="text-2xl text-[#96BE54]" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Costo Mantenimiento</p>
                                <p className="text-2xl font-bold text-[#47624F]">₡{stats.costoMantenimiento.toLocaleString()}</p>
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
                                <p className="text-sm text-gray-500">Total Terrenos</p>
                                <p className="text-2xl font-bold text-[#47624F]">{stats.totalTerrenos}</p>
                            </div>
                        </div>
                    </motion.div>
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
                            placeholder="Buscar terreno..."
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
                                <th className="py-3 px-6 rounded-tl-xl text-left">Tipo</th>
                                <th className="py-3 px-6 text-left">Hectáreas</th>
                                <th className="py-3 px-6 text-left">Topografía</th>
                                <th className="py-3 px-6 text-left">Condiciones Amb.</th>
                                <th className="py-3 px-6 text-left">Ubicación</th>
                                <th className="py-3 px-6 text-left">Zonificación</th>
                                <th className="py-3 px-6 text-left">Costo Terreno</th>
                                <th className="py-3 px-6 text-left">Mantenimiento</th>
                                <th className="py-3 px-6 text-left">Construcciones</th>
                                <th className="py-3 px-6 text-left">Arriendo</th>
                                <th className="py-3 px-6 text-left">Adicionales</th>
                                <th className="py-3 px-6 rounded-tr-xl text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {terrenos
                                .filter(item =>
                                    Object.values(item)
                                        .join(' ')
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )
                                .map((item) => (
                                    <motion.tr
                                        key={item.id}
                                        className="border-b hover:bg-gray-50"
                                        whileHover={{ backgroundColor: "#F9FFEF" }}
                                    >
                                        <td className="py-4 px-6 text-left whitespace-nowrap">{item.tipo}</td>
                                        <td className="py-4 px-6 text-left whitespace-nowrap">{item.hectareas} ha</td>
                                        <td className="py-4 px-6 text-left whitespace-nowrap">{item.topografia}</td>
                                        <td className="py-4 px-6 text-left whitespace-nowrap">{item.condicionesAmb}</td>
                                        <td className="py-4 px-6 text-left whitespace-nowrap">{item.ubicacion}</td>
                                        <td className="py-4 px-6 text-left whitespace-nowrap">{item.zonificacion}</td>
                                        <td className="py-4 px-6 text-left whitespace-nowrap">₡{item.costoTerreno.toLocaleString()}</td>
                                        <td className="py-4 px-6 text-left whitespace-nowrap">₡{item.costoMantenimiento.toLocaleString()}</td>
                                        <td className="py-4 px-6 text-left whitespace-nowrap">₡{item.costoConstrucciones.toLocaleString()}</td>
                                        <td className="py-4 px-6 text-left whitespace-nowrap">₡{item.costoArriendo.toLocaleString()}</td>
                                        <td className="py-4 px-6 text-left whitespace-nowrap">₡{item.adicionales.toLocaleString()}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-center gap-2">
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
                    title={`${currentAction === 'create' ? 'Nuevo' : 'Editar'} Terreno`}
                    action={currentAction}
                    selectedItem={selectedItem}
                />
            )}
        </div>
    );
};

export default GestionTerreno;
