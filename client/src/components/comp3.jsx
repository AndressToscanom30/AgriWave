import { motion } from 'framer-motion'
import imagen3 from '../imgs/comp3.png'

const Comp3 = () => {
    return (
        <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-white via-green-50 to-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <span className="inline-block bg-[#6DAD58]/10 text-[#6DAD58] text-sm font-semibold px-4 py-2 rounded-full">
                    MEJORA LA GESTIÓN DE TU PRODUCCIÓN
                </span>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-between mt-12 gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 space-y-8"
                >
                    <h1 className="font-yeseva text-5xl leading-tight">
                        Gestiona tus <br />
                        <span className="text-[#6DAD58]">cultivos y ganado</span>
                    </h1>

                    <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                        Monitorea y mejora el rendimiento de tu finca con información clara y precisa en tiempo real.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#6DAD58] text-white px-8 py-4 rounded-xl shadow-lg shadow-[#6DAD58]/20 hover:shadow-xl hover:shadow-[#6DAD58]/30 transition-all duration-300"
                    >
                        Lleva el control de tu finca a otro nivel
                    </motion.button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1"
                >
                    <img
                        src={imagen3}
                        alt="Gestión de cultivos"
                        className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
                    />
                </motion.div>
            </div>
        </div>
    )
}

export default Comp3
