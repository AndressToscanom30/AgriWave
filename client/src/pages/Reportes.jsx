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
            const [terrenosData, produccionData, vacunasData, alimentacionData] = await Promise.all([
                axios.get('http://localhost:8080/terrenos'),
                axios.get('http://localhost:8080/produccion-animal'),
                axios.get('http://localhost:8080/vacunas'),
                axios.get('http://localhost:8080/alimentos')
            ]);

            setData({
                terrenos: terrenosData.data,
                produccion: produccionData.data,
                vacunas: vacunasData.data,
                alimentacion: alimentacionData.data,
                finanzas: []
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return new Date().toLocaleDateString();
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date)
            ? date.toLocaleDateString()
            : new Date().toLocaleDateString();
    };

    const handleExport = () => {
        const wb = XLSX.utils.book_new();
        wb.Props = {
            Title: "Reporte Completo AgriWave",
            Subject: "Dashboard General",
            Author: "Sistema AgriWave",
            CreatedDate: new Date()
        };

        const styles = {
            header: {
                font: { bold: true, color: { rgb: "FFFFFF" }, sz: 16, name: "Arial" },
                fill: { fgColor: { rgb: "96BE54" } },
                alignment: { horizontal: "center", vertical: "center" },
                border: {
                    top: { style: "medium" },
                    bottom: { style: "medium" },
                    left: { style: "medium" },
                    right: { style: "medium" }
                }
            },
            subHeader: {
                font: { bold: true, sz: 12, name: "Arial" },
                fill: { fgColor: { rgb: "E6EFD9" } },
                alignment: { horizontal: "center" },
                border: { bottom: { style: "thin" } }
            },
            cell: {
                font: { sz: 11, name: "Arial" },
                alignment: { horizontal: "left" },
                border: { bottom: { style: "thin", color: { rgb: "CCCCCC" } } }
            },
            numberCell: {
                font: { sz: 11, name: "Arial" },
                alignment: { horizontal: "right" },
                numFmt: "#,##0.00",
                border: { bottom: { style: "thin", color: { rgb: "CCCCCC" } } }
            }
        };

        const sheets = {
            'Resumen General': [
                {
                    'Categoría': 'Ingresos Totales',
                    'Valor': stats.totalIngresos,
                    'Porcentaje': `${((stats.totalIngresos / (stats.totalIngresos + stats.totalGastos)) * 100).toFixed(2)}%`,
                    'Estado': '✅'
                },
                {
                    'Categoría': 'Gastos Totales',
                    'Valor': stats.totalGastos,
                    'Porcentaje': `${((stats.totalGastos / (stats.totalIngresos + stats.totalGastos)) * 100).toFixed(2)}%`,
                    'Estado': '⚠️'
                },
                {
                    'Categoría': 'Balance Final',
                    'Valor': stats.balance,
                    'Porcentaje': `${((stats.balance / stats.totalIngresos) * 100).toFixed(2)}%`,
                    'Estado': stats.balance > 0 ? '💰' : '❌'
                }
            ],
            'Producción': data.produccion.map(p => ({
                'Tipo': p.tipoProduccion,
                'Cantidad': p.cantidadDiariaProduccion,
                'Valor Unitario': p.costoProducto,
                'Total': p.cantidadDiariaProduccion * p.costoProducto,
                'Fecha': formatDate(p.fecha)
            })),
            'Terrenos': data.terrenos.map(t => ({
                'Tipo': t.tipo,
                'Hectáreas': t.hectareas,
                'Ubicación': t.ubicacion,
                'Costo': t.costoTerreno,
                'Estado': 'Activo'
            }))
        };

        Object.entries(sheets).forEach(([sheetName, sheetData]) => {
            const ws = XLSX.utils.json_to_sheet(sheetData);

            XLSX.utils.sheet_add_aoa(ws, [[
                `Reporte ${sheetName} - AgriWave ${new Date().toLocaleDateString()}`
            ]], { origin: 'A1' });

            ws['!cols'] = Array(Object.keys(sheetData[0]).length).fill({ width: 20 });

            Object.keys(ws).forEach(cell => {
                if (cell[0] === '!') return;

                if (cell.includes('1')) {
                    ws[cell].s = styles.header;
                } else if (cell.includes('2')) {
                    ws[cell].s = styles.subHeader;
                } else {
                    ws[cell].s = cell.match(/[CD]\d+/) ? styles.numberCell : styles.cell;
                }
            });

            XLSX.utils.book_append_sheet(wb, ws, sheetName);
        });

        XLSX.writeFile(wb, `AgriWave_Reporte_${new Date().toLocaleDateString().replace(/\//g, '-')}.xlsx`);
    };

    const calculateStats = () => {
        const totalGastos = {
            vacunas: data.vacunas?.reduce((acc, curr) => acc + (parseFloat(curr.precio) || 0), 0) || 0,
            alimentacion: data.alimentacion?.reduce((acc, curr) => acc + (parseFloat(curr.precio) * parseFloat(curr.cantidad) || 0), 0) || 0,
            animales: data.animales?.reduce((acc, curr) => acc + (parseFloat(curr.costoAnimal) || 0), 0) || 0,
            terrenos: data.terrenos?.reduce((acc, curr) => acc + (parseFloat(curr.costoTerreno) || 0), 0) || 0
        };

        const totalIngresos = data.produccion?.reduce((acc, curr) =>
            acc + ((parseFloat(curr.cantidadDiariaProduccion) || 0) * (parseFloat(curr.costoProducto) || 0)), 0
        ) || 0;

        return {
            totalGastos: Object.values(totalGastos).reduce((a, b) => a + b, 0),
            totalIngresos,
            balance: totalIngresos - Object.values(totalGastos).reduce((a, b) => a + b, 0)
        };
    };

    const stats = calculateStats();

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
                    title="Total Gastos"
                    value={`$${stats.totalGastos}`}
                    subvalue="Gastos totales"
                    icon={<HiLocationMarker />}
                />
                <StatsCard
                    title="Total Ingresos"
                    value={`$${stats.totalIngresos}`}
                    subvalue="Ingresos totales"
                    icon={<HiChartBar />}
                />
                <StatsCard
                    title="Balance"
                    value={`$${stats.balance}`}
                    subvalue="Balance total"
                    icon={<HiCurrencyDollar />}
                />
                <StatsCard
                    title="Margen"
                    value={`${((stats.balance / stats.totalIngresos) * 100).toFixed(2)}%`}
                    subvalue="Rentabilidad"
                    icon={<HiDocumentReport />}
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
                            <Bar dataKey="cantidadDiariaProduccion" fill="#96BE54" />
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
                    title="Últimos Movimientos"
                    data={[
                        ...data.terrenos.map(t => ({
                            fecha: formatDate(t.fecha),
                            concepto: `Terreno: ${t.tipo}`,
                            ingreso: 0,
                            gasto: t.costoTerreno
                        })),
                        ...data.produccion.map(p => ({
                            fecha: formatDate(p.fecha),
                            concepto: `Producción: ${p.tipoProduccion}`,
                            ingreso: p.cantidadDiariaProduccion * (p.costoProducto || 0),
                            gasto: 0
                        })),
                        ...data.vacunas.map(v => ({
                            fecha: formatDate(v.fechaVacunacion),
                            concepto: `Vacuna: ${v.nombre}`,
                            ingreso: 0,
                            gasto: parseFloat(v.precio)
                        }))
                    ].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 5)}
                    columns={[
                        { key: 'fecha', label: 'Fecha' },
                        { key: 'concepto', label: 'Descripción' },
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
