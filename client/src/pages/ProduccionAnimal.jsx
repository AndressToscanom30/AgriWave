import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HiSearch, HiFilter, HiPlus, HiDotsVertical, HiChartBar, HiTrash, HiPencil, HiCurrencyDollar, HiCalendar } from 'react-icons/hi';
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
    const [filters, setFilters] = useState({
        tipoAnimal: '',
        tipoProduccion: '',
        cantidadMin: '',
        cantidadMax: '',
        costoMin: '',
        costoMax: ''
    });

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
            if (!data.tipoAnimal || !data.tipoProduccion || !data.cantidadDiariaProduccion || !data.costoProducto) {
                alert('Los campos Tipo Animal, Tipo Producción, Cantidad Diaria y Costo son obligatorios');
                return;
            }

            if (parseFloat(data.cantidadDiariaProduccion) <= 0) {
                alert('La cantidad diaria debe ser mayor a 0');
                return;
            }

            if (parseFloat(data.costoProducto) <= 0) {
                alert('El costo del producto debe ser mayor a 0');
                return;
            }

            const formattedData = {
                ...data,
                cantidadDiariaProduccion: parseFloat(data.cantidadDiariaProduccion),
                costoProducto: parseFloat(data.costoProducto)
            };

            if (currentAction === 'create') {
                await axios.post(API_URL, formattedData);
            } else if (currentAction === 'edit' && selectedItem) {
                await axios.put(`${API_URL}/${selectedItem.id}`, {
                    ...formattedData,
                    id: selectedItem.id
                });
            }

            await fetchProduccion();
            handleCloseForm();
        } catch (err) {
            console.error('Error:', err);
            alert('Error al guardar los datos');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este registro?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                await fetchProduccion();
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

    const handleAction = (action, item = null) => {
        setCurrentAction(action);
        setSelectedItem(item);
        setIsFormOpen(true);
    };

    const stats = {
        totalProduccion: produccion.reduce((acc, curr) => acc + (parseFloat(curr.cantidadDiaria) || 0), 0),
        totalIngresos: produccion.reduce((acc, curr) => acc + (parseFloat(curr.costoProducto) || 0), 0),
        tiposUnicos: new Set(produccion.map(p => p.tipoProduccion)).size,
        produccionMensual: produccion.length
    };

    const formFields = [
        { label: "Tipo Animal", name: "tipoAnimal", type: "text", icon: "fa-cow" },
        { label: "Tipo Producción", name: "tipoProduccion", type: "text", icon: "fa-industry" },
        { label: "Cantidad Diaria", name: "cantidadDiariaProduccion", type: "number", icon: "fa-chart-line" },
        { label: "Costo Producto", name: "costoProducto", type: "number", icon: "fa-dollar-sign" },
        { label: "Tipo Producción Secundaria", name: "tipoProduccionSec", type: "text", icon: "fa-plus-circle" }
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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredProduccion = produccion.filter((item) => {
        const matchesSearch = Object.values(item)
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesTipoAnimal = !filters.tipoAnimal ||
            item.tipoAnimal.toLowerCase().includes(filters.tipoAnimal.toLowerCase());

        const matchesTipoProduccion = !filters.tipoProduccion ||
            item.tipoProduccion.toLowerCase().includes(filters.tipoProduccion.toLowerCase());

        const matchesCantidad = (!filters.cantidadMin || item.cantidadDiariaProduccion >= parseFloat(filters.cantidadMin)) &&
            (!filters.cantidadMax || item.cantidadDiariaProduccion <= parseFloat(filters.cantidadMax));

        const matchesCosto = (!filters.costoMin || item.costoProducto >= parseFloat(filters.costoMin)) &&
            (!filters.costoMax || item.costoProducto <= parseFloat(filters.costoMax));

        return matchesSearch && matchesTipoAnimal && matchesTipoProduccion && matchesCantidad && matchesCosto;
    });

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
                                <p className="text-2xl font-bold text-[#47624F]">{stats.totalProduccion.toFixed(2)}</p>
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
                                <p className="text-sm text-gray-500">Total Registros</p>
                                <p className="text-2xl font-bold text-[#47624F]">{stats.produccionMensual}</p>
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
                {filterOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-4 p-4 bg-white rounded-xl shadow-md"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tipo Animal
                                </label>
                                <input
                                    type="text"
                                    name="tipoAnimal"
                                    value={filters.tipoAnimal}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#96BE54]"
                                    placeholder="Filtrar por tipo animal..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tipo Producción
                                </label>
                                <input
                                    type="text"
                                    name="tipoProduccion"
                                    value={filters.tipoProduccion}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#96BE54]"
                                    placeholder="Filtrar por tipo producción..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cantidad Mínima
                                </label>
                                <input
                                    type="number"
                                    name="cantidadMin"
                                    value={filters.cantidadMin}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#96BE54]"
                                    placeholder="Cantidad mínima..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cantidad Máxima
                                </label>
                                <input
                                    type="number"
                                    name="cantidadMax"
                                    value={filters.cantidadMax}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#96BE54]"
                                    placeholder="Cantidad máxima..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Costo Mínimo
                                </label>
                                <input
                                    type="number"
                                    name="costoMin"
                                    value={filters.costoMin}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#96BE54]"
                                    placeholder="Costo mínimo..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Costo Máximo
                                </label>
                                <input
                                    type="number"
                                    name="costoMax"
                                    value={filters.costoMax}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#96BE54]"
                                    placeholder="Costo máximo..."
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setFilters({
                                    tipoAnimal: '',
                                    tipoProduccion: '',
                                    cantidadMin: '',
                                    cantidadMax: '',
                                    costoMin: '',
                                    costoMax: ''
                                })}
                                className="px-4 py-2 text-sm text-[#96BE54] hover:text-[#769F4A]"
                            >
                                Limpiar Filtros
                            </button>
                        </div>
                    </motion.div>
                )}
                <div className="mt-8 overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-[#96BE54] text-white">
                                <th className="py-3 px-6 rounded-tl-xl text-left w-[15%]">Animal</th>
                                <th className="py-3 px-6 text-left w-[20%]">Tipo Producción</th>
                                <th className="py-3 px-6 text-left w-[15%]">Cantidad Diaria</th>
                                <th className="py-3 px-6 text-left w-[15%]">Costo</th>
                                <th className="py-3 px-6 text-left w-[25%]">Producción Secundaria</th>
                                <th className="py-3 px-6 rounded-tr-xl text-center w-[10%]">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProduccion.map((item) => (
                                <motion.tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50"
                                    whileHover={{ backgroundColor: "#F9FFEF" }}
                                >
                                    <td className="py-4 px-6 text-left whitespace-nowrap">{item.tipoAnimal}</td>
                                    <td className="py-4 px-6 text-left whitespace-nowrap">{item.tipoProduccion}</td>
                                    <td className="py-4 px-6 text-left whitespace-nowrap">{item.cantidadDiariaProduccion}</td>
                                    <td className="py-4 px-6 text-left whitespace-nowrap">₡{item.costoProducto.toLocaleString()}</td>
                                    <td className="py-4 px-6 text-left whitespace-nowrap">{item.tipoProduccionSec}</td>
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
                    title={`${currentAction === 'create' ? 'Nuevo' : 'Editar'} Registro de Producción`}
                    action={currentAction}
                    selectedItem={selectedItem}
                />
            )}
        </div>
    );
};

export default ProduccionAnimal;
