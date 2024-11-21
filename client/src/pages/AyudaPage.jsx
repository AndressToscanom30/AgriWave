import { motion } from "framer-motion";
import imagen from "../imgs/comp1.png";

const FAQItem = ({ question, answer }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#6DAD58]/10"
  >
    <h3 className="text-xl font-semibold bg-gradient-to-r from-[#6DAD58] to-green-600 bg-clip-text text-transparent mb-3">{question}</h3>
    <p className="text-gray-700 leading-relaxed">{answer}</p>
  </motion.div>
);

const AyudaPage = () => {
  const faqs = [
    {
      question: "¿Qué es la ganadería bovina?",
      answer: "Es la cría y manejo de ganado vacuno, especialmente para la producción de carne y leche. Un sector fundamental para la economía agrícola."
    },
    {
      question: "¿Qué es Agriwave?",
      answer: "Es una plataforma innovadora que revoluciona la agricultura combinando tecnología de punta con prácticas agrícolas tradicionales para optimizar la gestión de recursos."
    },
    {
      question: "¿Qué hace Agriwave?",
      answer: "Agriwave transforma la gestión agrícola ofreciendo soluciones tecnológicas avanzadas para monitoreo de cultivos, gestión ganadera y optimización de recursos, todo en tiempo real."
    },
    {
      question: "¿Cómo funciona Agriwave?",
      answer: "Utiliza una combinación de sensores IoT, inteligencia artificial y algoritmos avanzados para analizar datos en tiempo real, permitiendo decisiones precisas y eficientes en la producción."
    }
  ];

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-gray-50 via-[#F1F7E7]/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-20"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-[#6DAD58]/10 rounded-full filter blur-3xl" />
          </div>
          <div className="relative text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-[#6DAD58] to-green-600 bg-clip-text text-transparent">
                Centro de Ayuda
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Descubre todo lo que necesitas saber sobre Agriwave y revoluciona tu manera de gestionar el campo
            </motion.p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <FAQItem {...faq} />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg text-center mt-8 border border-[#6DAD58]/10"
            >
              <p className="text-gray-700 text-lg">
                ¿Necesitas más información? Contáctanos en{' '}
                <a
                  href="https://twitter.com/AgriWaveSoporte"
                  className="relative inline-block group"
                >
                  <span className="bg-gradient-to-r from-[#6DAD58] to-green-600 bg-clip-text text-transparent font-semibold">
                    @AgriWaveSoporte
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#6DAD58] to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </a>
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#6DAD58] to-green-600 rounded-3xl transform rotate-3 opacity-10 group-hover:rotate-6 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#6DAD58] to-green-600 rounded-3xl transform -rotate-3 opacity-10 group-hover:-rotate-6 transition-transform duration-300" />
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              src={imagen}
              alt="Agriculture Illustration"
              className="relative rounded-3xl shadow-2xl w-full object-cover transform hover:translate-y-[-5px] transition-transform duration-300"
            />
            <div className="absolute inset-0 rounded-3xl shadow-lg bg-gradient-to-t from-black/20 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AyudaPage;
