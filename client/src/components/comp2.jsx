import { motion } from 'framer-motion'
import imagen2 from '../imgs/comp2.png'

const Comp2 = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-white to-green-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="inline-block bg-[#6DAD58]/10 text-[#6DAD58] text-sm font-semibold px-4 py-2 rounded-full">
          ADMINISTRA TU GRANJA DE UNA MANERA MÁS ÓPTIMA
        </span>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center justify-between mt-12 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-8"
        >
          <h1 className="font-yeseva text-5xl leading-tight">
            Moderniza tus <br/>
            <span className="text-[#6DAD58]">procesos agrícolas</span>
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Implementa soluciones inteligentes que transformarán la eficiencia de tu granja.
          </p>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#6DAD58] text-white px-8 py-4 rounded-xl shadow-lg shadow-[#6DAD58]/20 hover:shadow-xl hover:shadow-[#6DAD58]/30 transition-all duration-300"
          >
            Transforma tu operación agrícola
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <img 
            src={imagen2} 
            alt="Modernización agrícola"
            className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default Comp2
