import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';


import {
    HiChartBar,
    HiCurrencyDollar,
    HiLocationMarker,
    HiCalendar,
    HiDocumentReport,
    HiDownload,
    HiFilter,
    HiRefresh
} from 'react-icons/hi';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';


const Reportes = () => {
    const [dateRange, setDateRange] = useState('month');
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({
        terrenos: [],
        produccion: [],
        vacunas: [],
        finanzas: []
    });

    const colors = {
        primary: '#96BE54',
        secondary: '#47624F',
        accent: '#769F4A',
        background: '#F9FFEF'
    };

    useEffect(() => {
        fetchData();
    }, [dateRange]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [terrenosData, produccionData, vacunasData] = await Promise.all([
                axios.get('http://localhost:8080/terrenos'),
                axios.get('http://localhost:8080/produccion-animal'),
                axios.get('http://localhost:8080/vacunas')
            ]);

            setData({
                terrenos: terrenosData.data,
                produccion: produccionData.data,
                vacunas: vacunasData.data,
                finanzas: []
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExport = () => {
        const exportData = {
            Terrenos: data.terrenos.map(t => ({
                'Tipo': t.tipo,
                'Hectáreas': t.hectareas,
                'Ubicación': t.ubicacion,
                'Costo': t.costoTerreno
            })),

            Producción: data.produccion.map(p => ({
                'Tipo Animal': p.tipoAnimal,
                'Producción': p.tipoProduccion,
                'Cantidad Diaria': p.cantidadDiariaProduccion,
                'Costo': p.costoProducto
            })),

            Vacunas: data.vacunas.map(v => ({
                'Nombre': v.nombre,
                'Fecha': v.fechaVacunacion,
                'Próxima': v.proximaVacunacion,
                'Precio': v.precio
            }))
        };

        const wb = XLSX.utils.book_new();

        Object.entries(exportData).forEach(([sheetName, sheetData]) => {
            const ws = XLSX.utils.json_to_sheet(sheetData);
            XLSX.utils.book_append_sheet(wb, ws, sheetName);
        });

        XLSX.writeFile(wb, `Reporte_${new Date().toLocaleDateString()}.xlsx`);
    };

    const stats = {
        totalTerrenos: data.terrenos.length,
        totalHectareas: data.terrenos.reduce((acc, curr) => acc + curr.hectareas, 0),
        produccionTotal: data.produccion.reduce((acc, curr) => acc + curr.cantidadDiaria, 0),
        vacunasProximas: data.vacunas.filter(v => new Date(v.proximaVacunacion) > new Date()).length,
        ingresoTotal: data.finanzas?.reduce((acc, curr) => acc + curr.ingreso, 0) || 0,
        gastoTotal: data.finanzas?.reduce((acc, curr) => acc + curr.gasto, 0) || 0
    };

    const COLORS = ['#96BE54', '#47624F', '#769F4A', '#A8D65C'];

    return (
        <div className="p-8 bg-gradient-to-br from-[#F9FFEF] to-white min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-[#47624F]">
                            Dashboard de Reportes
                        </h1>
                        <p className="text-gray-600">
                            Resumen general del sistema
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#96BE54]"
                        >
                            <option value="week">Esta Semana</option>
                            <option value="month">Este Mes</option>
                            <option value="year">Este Año</option>
                        </select>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => fetchData()}
                            className="flex items-center gap-2 px-4 py-2 bg-[#96BE54] text-white rounded-lg hover:bg-[#769F4A] transition-all"
                        >
                            <HiRefresh className="text-xl" />
                            Actualizar
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-[#47624F] text-white rounded-lg hover:bg-[#364B3C] transition-all"
                        >
                            <HiDownload className="text-xl" />
                            Exportar
                        </motion.button>

                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total Terrenos"
                    value={`${stats.totalTerrenos} terrenos`}
                    subvalue={`${stats.totalHectareas.toFixed(2)} hectáreas`}
                    icon={<HiLocationMarker />}
                />
                <StatsCard
                    title="Producción Total"
                    value={`${stats.produccionTotal.toFixed(2)} unidades`}
                    subvalue="Este período"
                    icon={<HiChartBar />}
                />
                <StatsCard
                    title="Vacunas Próximas"
                    value={`${stats.vacunasProximas} vacunas`}
                    subvalue="Próximos 30 días"
                    icon={<HiCalendar />}
                />
                <StatsCard
                    title="Balance"
                    value={`$${(stats.ingresoTotal - stats.gastoTotal).toLocaleString()}`}
                    subvalue={`${((stats.ingresoTotal - stats.gastoTotal) / stats.ingresoTotal * 100).toFixed(2)}% margen`}
                    icon={<HiCurrencyDollar />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <ChartCard title="Producción por Tipo">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data.produccion}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="tipoProduccion" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="cantidadDiaria" fill="#96BE54" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Distribución de Terrenos">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data.terrenos}
                                dataKey="hectareas"
                                nameKey="tipo"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                            >
                                {data.terrenos.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <TableCard
                    title="Últimas Transacciones"
                    data={data.finanzas?.slice(0, 5) || []}
                    columns={[
                        { key: 'fecha', label: 'Fecha' },
                        { key: 'concepto', label: 'Concepto' },
                        { key: 'ingreso', label: 'Ingreso' },
                        { key: 'gasto', label: 'Gasto' }
                    ]}
                />
            </div>
        </div>
    );
};

const StatsCard = ({ title, value, subvalue, icon }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-xl shadow-lg"
    >
        <div className="flex items-center gap-4">
            <div className="p-3 bg-[#96BE54]/10 rounded-lg">
                {React.cloneElement(icon, { className: "text-2xl text-[#96BE54]" })}
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-[#47624F]">{value}</p>
                <p className="text-sm text-gray-400">{subvalue}</p>
            </div>
        </div>
    </motion.div>
);

const ChartCard = ({ title, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg"
    >
        <h3 className="text-lg font-semibold text-[#47624F] mb-4">{title}</h3>
        {children}
    </motion.div>
);

const TableCard = ({ title, data, columns }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg"
    >
        <h3 className="text-lg font-semibold text-[#47624F] mb-4">{title}</h3>
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr className="bg-[#96BE54] text-white">
                        {columns.map(column => (
                            <th key={column.key} className="py-3 px-6 text-left">
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            {columns.map(column => (
                                <td key={column.key} className="py-4 px-6">
                                    {column.key.includes('ingreso') || column.key.includes('gasto')
                                        ? `$${row[column.key]?.toLocaleString()}`
                                        : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </motion.div>
);

export default Reportes;
