import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    { icon: "facebook-f", url: "https://facebook.com", color: "#1877F2" },
    { icon: "twitter", url: "https://twitter.com", color: "#1DA1F2" },
    { icon: "instagram", url: "https://instagram.com", color: "#E4405F" },
  ];

  const checkboxOptions = [
    { id: 'vacuno', label: 'Vacuno' },
    { id: 'porcino', label: 'Porcino' },
    { id: 'equino', label: 'Equino' },
    { id: 'avicultor', label: 'Avicultor' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#F1F7E7] to-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-yeseva text-[#6DAD58]">AgriWave</h2>
            <p className="text-gray-600">Software para gestión ganadera</p>
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center group transition-all duration-300"
                >
                  <i
                    className={`fab fa-${social.icon}`}
                    style={{ color: social.color }}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Enlaces rápidos</h3>
            <div className="flex flex-col space-y-2">
              <a href="/comunidad" className="text-gray-600 hover:text-[#6DAD58] transition-colors">
                Comunidad
              </a>
              <button
                onClick={() => setIsOpen(true)}
                className="text-left text-gray-600 hover:text-[#6DAD58] transition-colors"
              >
                Contáctanos
              </button>
              <a href="/ayuda" className="text-gray-600 hover:text-[#6DAD58] transition-colors">
                Ayuda
              </a>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Mantente conectado</h3>
            <p className="text-gray-600">Suscríbete para recibir las últimas actualizaciones</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-2 rounded-l-lg border-2 border-r-0 border-[#6DAD58] focus:outline-none focus:ring-2 focus:ring-[#6DAD58]/50"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 bg-[#6DAD58] text-white rounded-r-lg hover:bg-[#5c9b4a] transition-colors"
              >
                Suscribirse
              </motion.button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} AgriWave. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute -right-2 -top-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <i className="fas fa-times text-gray-500"></i>
                </button>

                <div className="flex items-center mb-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Completa los datos para contactarte
                    </h2>
                  </div>
                  <div className="ml-4">
                    <i className="fas fa-chart-line text-3xl text-[#6DAD58]"></i>
                  </div>
                </div>

                <form className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      placeholder="Nombre"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#6DAD58] focus:outline-none transition-colors"
                    />

                    <input
                      type="text"
                      placeholder="Apellido"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#6DAD58] focus:outline-none transition-colors"
                    />

                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#6DAD58] focus:outline-none transition-colors"
                    />

                    <div className="flex gap-2">
                      <span className="px-4 py-3 bg-gray-100 rounded-lg border-2 border-gray-200 text-gray-600">
                        +57
                      </span>
                      <input
                        type="tel"
                        placeholder="Teléfono"
                        className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#6DAD58] focus:outline-none transition-colors"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Referencia (Facebook, Instagram, etc.)"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#6DAD58] focus:outline-none transition-colors"
                    />

                    <div className="space-y-2">
                      <label className="block text-gray-700 font-medium">
                        Tipo de ganado:
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {checkboxOptions.map((option) => (
                          <label
                            key={option.id}
                            className="flex items-center space-x-2 text-gray-700 hover:text-[#6DAD58] cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox text-[#6DAD58] rounded border-gray-300 focus:ring-[#6DAD58]"
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#6DAD58] text-white py-3 rounded-lg font-medium hover:bg-[#5c9b4a] transition-colors shadow-lg shadow-[#6DAD58]/20"
                  >
                    Quiero que me contacten
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
