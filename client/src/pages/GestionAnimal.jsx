import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HiSearch, HiFilter, HiPlus, HiChartBar, HiTrash, HiPencil, HiCurrencyDollar, HiCalendar } from 'react-icons/hi';
import FormsDinamicos from './FormsDinamicos';
import axios from 'axios';

const GestionAnimal = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
    const [gestionAnimal, setGestionAnimal] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        nombre: '',
        raza: '',
        pesoMin: '',
        pesoMax: '',
        costoMin: '',
        costoMax: ''
    });

    const API_URL = 'http://localhost:8080/animales';

    useEffect(() => {
        fetchGestionAnimal();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const fetchGestionAnimal = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(API_URL);
            setGestionAnimal(response.data);
        } catch (err) {
            setError(`Error al cargar los datos: ${err.response?.data?.message || err.message}`);
            console.error('Error detallado:', err);
        } finally {
            setIsLoading(false);
        }
    };



    const handleSubmit = async (data) => {
        try {
            if (!data.nombre || !data.raza || !data.fechaNacimiento || !data.peso ||
                !data.origen || !data.costoAnimal || !data.fechaCompra) {
                alert('Todos los campos son obligatorios excepto Adicional');
                return;
            }

            if (parseFloat(data.peso) <= 0 || parseFloat(data.costoAnimal) <= 0) {
                alert('El peso y costo del animal deben ser mayores a 0');
                return;
            }

            const fechaNacimiento = new Date(data.fechaNacimiento);
            const fechaCompra = new Date(data.fechaCompra);
            const today = new Date();

            if (fechaNacimiento > today || fechaCompra > today) {
                alert('Las fechas no pueden ser futuras');
                return;
            }

            if (fechaCompra < fechaNacimiento) {
                alert('La fecha de compra no puede ser anterior a la fecha de nacimiento');
                return;
            }

            const formattedData = {
                ...data,
                peso: parseFloat(data.peso),
                costoAnimal: parseFloat(data.costoAnimal),
                adicional: parseFloat(data.adicional) || 0,
                documentado: Boolean(data.documentado)
            };

            if (currentAction === 'create') {
                await axios.post(API_URL, formattedData);
            } else if (currentAction === 'edit' && selectedItem) {
                await axios.put(`${API_URL}/${selectedItem.id}`, {
                    ...formattedData,
                    id: selectedItem.id
                });
            }

            await fetchGestionAnimal();
            handleCloseForm();
        } catch (err) {
            console.error('Error al procesar la operación:', err);
            alert('Error al guardar los datos');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este registro?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                await fetchGestionAnimal();
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
        totalProduccion: gestionAnimal.reduce((acc, curr) => acc + (parseFloat(curr.cantidadDiariaProduccion) || 0), 0),
        totalIngresos: gestionAnimal.reduce((acc, curr) => acc + (parseFloat(curr.costoProducto) || 0), 0),
        tiposUnicos: new Set(gestionAnimal.map(p => p.tipoProduccion)).size,
        totalRegistros: gestionAnimal.length
    };

    const formFields = [
        { label: "Nombre", name: "nombre", type: "text", icon: "fa-tag", required: true },
        { label: "Raza", name: "raza", type: "text", icon: "fa-dna" },
        { label: "Fecha Nacimiento", name: "fechaNacimiento", type: "date", icon: "fa-calendar" },
        { label: "Peso", name: "peso", type: "number", icon: "fa-weight" },
        { label: "Origen", name: "origen", type: "text", icon: "fa-map-marker" },
        { label: "Costo Animal", name: "costoAnimal", type: "number", icon: "fa-dollar-sign" },
        { label: "Fecha Compra", name: "fechaCompra", type: "date", icon: "fa-shopping-cart" },
        { label: "Documentado", name: "documentado", type: "checkbox", icon: "fa-file-alt" },
        { label: "Adicional", name: "adicional", type: "number", icon: "fa-plus-circle" }
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

    const filteredGestionAnimal = gestionAnimal.filter((item) => {
        const matchesSearch = Object.values(item)
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesNombre = !filters.nombre ||
            item.nombre.toLowerCase().includes(filters.nombre.toLowerCase());

        const matchesRaza = !filters.raza ||
            item.raza.toLowerCase().includes(filters.raza.toLowerCase());

        const matchesPeso = (!filters.pesoMin || item.peso >= parseFloat(filters.pesoMin)) &&
            (!filters.pesoMax || item.peso <= parseFloat(filters.pesoMax));

        const matchesCosto = (!filters.costoMin || item.costoAnimal >= parseFloat(filters.costoMin)) &&
            (!filters.costoMax || item.costoAnimal <= parseFloat(filters.costoMax));

        return matchesSearch && matchesNombre && matchesRaza && matchesPeso && matchesCosto;
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
                        <h1 className="text-3xl font-bold text-[#47624F]">Gestión Animal</h1>
                        <p className="text-gray-600">Control y seguimiento de la gestión animal</p>
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
                    <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-xl shadow-lg">
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

                    <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-xl shadow-lg">
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

                    <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-xl shadow-lg">
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

                    <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#96BE54]/10 rounded-lg">
                                <HiChartBar className="text-2xl text-[#96BE54]" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Registros</p>
                                <p className="text-2xl font-bold text-[#47624F]">{stats.totalRegistros}</p>
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
                            placeholder="Buscar gestión..."
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
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={filters.nombre}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#96BE54]"
                                    placeholder="Filtrar por nombre..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Raza
                                </label>
                                <input
                                    type="text"
                                    name="raza"
                                    value={filters.raza}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#96BE54]"
                                    placeholder="Filtrar por raza..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Peso Mínimo
                                </label>
                                <input
                                    type="number"
                                    name="pesoMin"
                                    value={filters.pesoMin}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#96BE54]"
                                    placeholder="Peso mínimo..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Peso Máximo
                                </label>
                                <input
                                    type="number"
                                    name="pesoMax"
                                    value={filters.pesoMax}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#96BE54]"
                                    placeholder="Peso máximo..."
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
                                    nombre: '',
                                    raza: '',
                                    pesoMin: '',
                                    pesoMax: '',
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
                                <th className="py-3 px-6 rounded-tl-xl text-left">Nombre</th>
                                <th className="py-3 px-6 text-left">Raza</th>
                                <th className="py-3 px-6 text-left">Fecha Nacimiento</th>
                                <th className="py-3 px-6 text-left">Peso</th>
                                <th className="py-3 px-6 text-left">Origen</th>
                                <th className="py-3 px-6 text-left">Costo</th>
                                <th className="py-3 px-6 text-left">Fecha Compra</th>
                                <th className="py-3 px-6 text-left">Documentado</th>
                                <th className="py-3 px-6 text-left">Adicional</th>
                                <th className="py-3 px-6 rounded-tr-xl text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGestionAnimal.map((item) => (
                                <motion.tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50"
                                    whileHover={{ backgroundColor: "#F9FFEF" }}
                                >
                                    <td className="py-4 px-6 text-left whitespace-nowrap">{item.nombre}</td>
                                    <td className="py-4 px-6 text-left whitespace-nowrap">{item.raza}</td>
                                    <td className="py-4 px-6 text-left whitespace-nowrap">{new Date(item.fechaNacimiento).toLocaleDateString()}</td>
                                    <td className="py-4 px-6 text-left whitespace-nowrap">{item.peso} kg</td>
                                    <td className="py-4 px-6 text-left whitespace-nowrap">{item.origen}</td>
                                    <td className="py-4 px-6 text-left whitespace-nowrap">₡{item.costoAnimal.toLocaleString()}</td>
                                    <td className="py-4 px-6 text-left whitespace-nowrap">{new Date(item.fechaCompra).toLocaleDateString()}</td>
                                    <td className="py-4 px-6 text-left whitespace-nowrap">{item.documentado ? 'Sí' : 'No'}</td>
                                    <td className="py-4 px-6 text-left whitespace-nowrap">₡{item.adicional.toLocaleString()}</td>
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
                    title={`${currentAction === 'create' ? 'Nuevo' : 'Editar'} Registro de Gestión Animal`}
                    action={currentAction}
                    selectedItem={selectedItem}
                />
            )}
        </div>
    );
};

export default GestionAnimal;
