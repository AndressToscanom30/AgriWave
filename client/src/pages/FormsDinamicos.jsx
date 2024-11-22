import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const FormsDinamicos = ({ fields, onSubmit, onClose, action, selectedItem, title }) => {
    useEffect(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const middleOfPage = documentHeight / 2;

        window.scrollTo({
            top: middleOfPage - (windowHeight / 2),
            behavior: 'smooth'
        });

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);


    const getFormTitle = () => {
        const actionText = action === 'create' ? 'Nuevo' : 'Editar';
        return title || `${actionText} Registro`;
    };

    const getButtonText = () => {
        const actionText = action === 'create' ? 'Crear' : 'Actualizar';
        return `${actionText} Registro`;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        for (const field of fields) {
            if (field.type === 'number' && data[field.name]) {
                data[field.name] = Number(data[field.name]);
            }
        }

        if (selectedItem) {
            data.id = selectedItem.id;
        }

        onSubmit(data);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[99999]"
                onClick={onClose}
            >
                <div className="w-full max-w-[90%] mx-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-white rounded-3xl shadow-2xl relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="bg-gradient-to-br from-[#96BE54]/10 to-white p-8 rounded-l-3xl">
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onClose}
                                    className="absolute right-4 top-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors md:left-4"
                                >
                                    <i className="fas fa-times text-gray-500" />
                                </motion.button>
                                <div className="text-left mt-8">
                                    <div className="inline-block p-3 bg-[#96BE54]/10 rounded-2xl mb-4">
                                        <i className={`fas ${action === 'create' ? 'fa-plus-circle' : 'fa-edit'} text-3xl text-[#96BE54]`} />
                                    </div>
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-[#96BE54] to-green-600 bg-clip-text text-transparent">
                                        {getFormTitle()}
                                    </h2>
                                    <p className="text-gray-600 mt-2">Complete los datos del registro</p>
                                </div>
                            </div>

                            <div className="md:col-span-3 p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        {fields.map((field) => (
                                            <motion.div
                                                key={field.name}
                                                whileHover={{ scale: 1.02 }}
                                                className={`space-y-2 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}
                                            >
                                                <label className="block text-sm font-medium text-gray-700 ml-1">
                                                    {field.label}
                                                </label>
                                                <div className="relative">
                                                    <i className={`fas ${field.icon} absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400`} />
                                                    {field.type === 'select' ? (
                                                        <select
                                                            name={field.name}
                                                            defaultValue={selectedItem?.[field.name] || ''}
                                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#96BE54] focus:ring-2 focus:ring-[#96BE54]/20 outline-none transition-all duration-300"
                                                        >
                                                            {field.options?.map(option => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <input
                                                            type={field.type}
                                                            name={field.name}
                                                            defaultValue={selectedItem?.[field.name] || ''}
                                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#96BE54] focus:ring-2 focus:ring-[#96BE54]/20 outline-none transition-all duration-300"
                                                            placeholder={field.label}
                                                        />
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 pt-6">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            className="flex-1 bg-gradient-to-r from-[#96BE54] to-green-600 text-white py-3.5 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-[#96BE54]/20 hover:shadow-xl hover:shadow-[#96BE54]/30"
                                        >
                                            {getButtonText()}
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="button"
                                            onClick={onClose}
                                            className="flex-1 border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl font-medium hover:border-[#96BE54] transition-all duration-300"
                                        >
                                            Cancelar
                                        </motion.button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default FormsDinamicos;
