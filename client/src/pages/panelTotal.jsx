import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import imagenAgriwave from "../imgs/agriwave.jpeg";
import FinancieraPage from './FinancieraPage';
import VacunasAnimalesPage from './VacunasAnimales';
import ProduccionAnimalPage from './ProduccionAnimal';
import GestionAlimentacionPage from './GestionAlimento';
import GestionAnimal from './GestionAnimal';
import GestionTerreno from './GestionTerreno';

const MenuItem = ({ icon, title, isActive, onClick }) => (
    <motion.button
        onClick={onClick}
        className={`
          w-full rounded-xl p-3 transition-all duration-300 transform
          ${isActive
                ? 'bg-gradient-to-r from-[#96BE54] to-[#7FAA3B] text-white shadow-lg translate-x-2'
                : 'hover:bg-[#E6E9D9] text-[#3F523B] hover:translate-x-2'
            }
          flex items-center gap-4 group
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
    >
        <span className={`text-2xl group-hover:scale-110 transition-transform duration-300 ${isActive ? 'animate-bounce' : ''}`}>
            {icon}
        </span>
        <span className="font-medium tracking-wide">{title}</span>
    </motion.button>
);

const SubMenuItem = ({ icon, title, isActive, onClick }) => (
    <motion.button
        onClick={onClick}
        className={`
          w-full rounded-xl p-2 pl-12 transition-all duration-300 transform
          ${isActive
                ? 'bg-gradient-to-r from-[#96BE54]/70 to-[#7FAA3B]/70 text-white shadow-lg translate-x-2'
                : 'hover:bg-[#E6E9D9] text-[#3F523B] hover:translate-x-2'
            }
          flex items-center gap-3 group text-sm
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
    >
        <span className={`text-xl group-hover:scale-110 transition-transform duration-300 ${isActive ? 'animate-bounce' : ''}`}>
            {icon}
        </span>
        <span className="font-medium tracking-wide">{title}</span>
    </motion.button>
);

const PanelTotal = () => {
    const [currentView, setCurrentView] = useState('general');
    const [isHovered, setIsHovered] = useState(false);
    const [isFinancieraExpanded, setIsFinancieraExpanded] = useState(false);

    const sidebarVariants = {
        closed: {
            width: "4px",
            transition: {
                duration: 0.4,
                ease: "easeInOut"
            }
        },
        open: {
            width: "320px",
            transition: {
                duration: 0.4,
                ease: "easeInOut"
            }
        }
    };

    const contentVariants = {
        hidden: {
            opacity: 0,
            x: -20
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.2,
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            x: -20,
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F9FFEF] relative">
            <motion.div
                className="fixed h-screen z-[9999]"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                animate={isHovered ? "open" : "closed"}
                initial="closed"
                variants={sidebarVariants}
            >
                <div className="h-full bg-gradient-to-b from-[#96BE54] via-[#CDE3A9] to-[#96BE54] relative shadow-lg">
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="w-80 h-full bg-white/95 backdrop-blur-sm p-8"
                            >
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={contentVariants}
                                >
                                    <div className="flex items-center gap-4 mb-12 bg-[#F9FFEF] p-4 rounded-2xl shadow-md">
                                        <div className="relative">
                                            <motion.img
                                                src={imagenAgriwave}
                                                alt="Agriwave logo"
                                                className="w-14 h-14 rounded-xl shadow-lg"
                                                whileHover={{ rotate: 12, scale: 1.1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#96BE54] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                AG
                                            </div>
                                        </div>
                                        <div>
                                            <motion.h1
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="text-2xl font-bold text-[#3F523B] tracking-tight"
                                            >
                                                AGRIWAVE
                                            </motion.h1>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-sm text-[#769F4A]"
                                            >
                                                Panel de Control
                                            </motion.p>
                                        </div>
                                    </div>

                                    <nav className="space-y-6">
                                        <div className="space-y-2">
                                            <motion.h2
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className="text-sm font-semibold text-[#3F523B] px-3 uppercase tracking-wider"
                                            >
                                                Gestión Principal
                                            </motion.h2>

                                            <div className="space-y-1">
                                                <MenuItem
                                                    icon="📊"
                                                    title="Gestión General"
                                                    isActive={currentView === 'general' || isFinancieraExpanded}
                                                    onClick={() => {
                                                        setCurrentView('general');
                                                        setIsFinancieraExpanded(!isFinancieraExpanded);
                                                    }}
                                                />
                                                <AnimatePresence>
                                                    {isFinancieraExpanded && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="space-y-1 overflow-hidden"
                                                        >
                                                            <SubMenuItem
                                                                icon="💉"
                                                                title="Vacunas Generales"
                                                                isActive={currentView === 'vacunas'}
                                                                onClick={() => setCurrentView('vacunas')}
                                                            />
                                                            <SubMenuItem
                                                                icon="🌾"
                                                                title="Gestión Alimentación"
                                                                isActive={currentView === 'alimentacion'}
                                                                onClick={() => setCurrentView('alimentacion')}
                                                            />
                                                            <SubMenuItem
                                                                icon="🐄"
                                                                title="Gestión Animal"
                                                                isActive={currentView === 'animal'}
                                                                onClick={() => setCurrentView('animal')}
                                                            />
                                                            <SubMenuItem
                                                                icon="🥩"
                                                                title="Producción Animal"
                                                                isActive={currentView === 'produccion'}
                                                                onClick={() => setCurrentView('produccion')}
                                                            />
                                                            <SubMenuItem
                                                                icon="🌳"
                                                                title="Gestión Terreno"
                                                                isActive={currentView === 'terreno'}
                                                                onClick={() => setCurrentView('terreno')}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 }}
                                            className="space-y-2"
                                        >
                                            <h2 className="text-sm font-semibold text-[#3F523B] px-3 uppercase tracking-wider">
                                                Acciones Rápidas
                                            </h2>
                                            <div className="grid grid-cols-2 gap-3 p-3">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="bg-[#F9FFEF] p-3 rounded-xl hover:bg-[#E6E9D9] transition-colors text-center"
                                                >
                                                    <span className="block text-xl mb-1">📊</span>
                                                    <span className="text-xs text-[#3F523B]">Reportes</span>
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="bg-[#F9FFEF] p-3 rounded-xl hover:bg-[#E6E9D9] transition-colors text-center"
                                                >
                                                    <span className="block text-xl mb-1">👤</span>
                                                    <span className="text-xs text-[#3F523B]">Perfil</span>
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    </nav>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            <div className="flex-1 ml-1 md:ml-16 relative z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentView}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentView === 'general' && <FinancieraPage />}
                        {currentView === 'vacunas' && <VacunasAnimalesPage />}
                        {currentView === 'alimentacion' && <GestionAlimentacionPage />}
                        {currentView === 'animal' && <GestionAnimal />}
                        {currentView === 'produccion' && <ProduccionAnimalPage />}
                        {currentView === 'terreno' && <GestionTerreno />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PanelTotal;
