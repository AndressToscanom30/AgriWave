import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import pse from "../imgs/PSE.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

function NavBar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -60
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.5,
        bounce: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 60,
      transition: {
        duration: 0.3
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const mobileMenuVariants = {
    hidden: {
      height: 0,
      opacity: 0
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          type: "spring",
          stiffness: 100,
          damping: 15
        },
        opacity: {
          duration: 0.2
        }
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.2
        },
        opacity: {
          duration: 0.1
        }
      }
    }
  };

  return (
    <div className="relative z-20">
      <nav className="mt-[-80px] fixed w-full backdrop-blur-md bg-[#F1F7E7]/90 shadow-lg z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-20 px-4 lg:px-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-[#6DAD58] font-yeseva text-2xl md:text-3xl"
            >
              <a href="/" className="hover:text-green-600 transition-all duration-300">
                Agriwave
              </a>
            </motion.div>

            <div className="hidden lg:flex space-x-8 items-center">
              <a href="/" className="text-gray-700 hover:text-[#6DAD58] transition-all duration-300 font-medium">
                Inicio
              </a>
              <a href="/panel" className="text-gray-700 hover:text-[#6DAD58] transition-all duration-300 font-medium">
                Gestión total final para todas
              </a>
              <button
                onClick={() => setIsPlanModalOpen(true)}
                className="text-gray-700 hover:text-[#6DAD58] transition-all duration-300 font-medium"
              >
                Planes
              </button>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLoginOpen(true)}
                  className="border-2 border-[#6DAD58] rounded-full px-6 py-2 text-[#6DAD58] hover:bg-[#6DAD58] hover:text-white transition-all duration-300 font-medium"
                >
                  Iniciar sesión
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsRegisterOpen(true)}
                  className="bg-[#6DAD58] rounded-full px-6 py-2 text-white hover:bg-green-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                >
                  Registrarme
                </motion.button>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#6DAD58]/10 transition-colors"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl text-[#6DAD58]`} />
            </motion.button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="lg:hidden px-4 pb-6 bg-[#F1F7E7]/90 backdrop-blur-md overflow-hidden"
              >
                <div className="flex flex-col space-y-4">
                  <a href="/" className="py-2 text-gray-700 hover:text-[#6DAD58] transition-all duration-300 font-medium">
                    Inicio
                  </a>
                  <a href="/panel" className="py-2 text-gray-700 hover:text-[#6DAD58] transition-all duration-300 font-medium">
                    Gestión total
                  </a>
                  <button
                    onClick={() => {
                      setIsPlanModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="py-2 text-left text-gray-700 hover:text-[#6DAD58] transition-all duration-300 font-medium"
                  >
                    Planes
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsLoginOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2 text-[#6DAD58] border-2 border-[#6DAD58] rounded-lg hover:bg-[#6DAD58] hover:text-white transition-all duration-300"
                  >
                    Iniciar sesión
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsRegisterOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2 bg-[#6DAD58] text-white rounded-lg hover:bg-green-600 transition-all duration-300"
                  >
                    Registrarme
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <AnimatePresence>
        {isLoginOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setIsLoginOpen(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6DAD58]/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#6DAD58]/20 to-transparent rounded-full blur-3xl" />

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLoginOpen(false)}
                className="absolute right-4 top-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <i className="fas fa-times text-gray-500" />
              </motion.button>

              <div className="relative">
                <div className="text-center mb-8">
                  <div className="inline-block p-3 bg-[#6DAD58]/10 rounded-2xl mb-4">
                    <i className="fas fa-leaf text-3xl text-[#6DAD58]" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-[#6DAD58] to-green-600 bg-clip-text text-transparent">
                    ¡Bienvenido de nuevo!
                  </h2>
                  <p className="text-gray-600 mt-2">Ingresa a tu cuenta de Agriwave</p>
                </div>

                <form className="space-y-6">
                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 ml-1">
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#6DAD58] focus:ring-2 focus:ring-[#6DAD58]/20 outline-none transition-all duration-300"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 ml-1">
                      Contraseña
                    </label>
                    <div className="relative">
                      <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#6DAD58] focus:ring-2 focus:ring-[#6DAD58]/20 outline-none transition-all duration-300"
                        placeholder="••••••••"
                      />
                    </div>
                  </motion.div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <input type="checkbox" className="form-checkbox text-[#6DAD58] rounded border-gray-300 focus:ring-[#6DAD58]" />
                      <span className="text-gray-600 group-hover:text-[#6DAD58] transition-colors">Recordarme</span>
                    </label>
                    <a href="#" className="text-[#6DAD58] hover:text-green-600 transition-colors">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#6DAD58] to-green-600 text-white py-4 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-[#6DAD58]/20 hover:shadow-xl hover:shadow-[#6DAD58]/30"
                  >
                    Iniciar sesión
                  </motion.button>

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">O continúa con</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border-2 border-gray-200 hover:border-[#6DAD58] transition-colors"
                    >
                      <i className="fab fa-google text-red-500" />
                      <span className="text-gray-700">Google</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border-2 border-gray-200 hover:border-[#6DAD58] transition-colors"
                    >
                      <i className="fab fa-facebook text-blue-600" />
                      <span className="text-gray-700">Facebook</span>
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRegisterOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setIsRegisterOpen(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6DAD58]/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#6DAD58]/20 to-transparent rounded-full blur-3xl" />

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsRegisterOpen(false)}
                className="absolute right-4 top-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <i className="fas fa-times text-gray-500" />
              </motion.button>

              <div className="relative">
                <div className="text-center mb-8">
                  <div className="inline-block p-3 bg-[#6DAD58]/10 rounded-2xl mb-4">
                    <i className="fas fa-user-plus text-3xl text-[#6DAD58]" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-[#6DAD58] to-green-600 bg-clip-text text-transparent">
                    Crear cuenta
                  </h2>
                  <p className="text-gray-600 mt-2">Únete a la comunidad Agriwave</p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 ml-1">
                        Nombre
                      </label>
                      <div className="relative">
                        <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#6DAD58] focus:ring-2 focus:ring-[#6DAD58]/20 outline-none transition-all duration-300"
                          placeholder="Yeremy"
                        />
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 ml-1">
                        Apellido
                      </label>
                      <div className="relative">
                        <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#6DAD58] focus:ring-2 focus:ring-[#6DAD58]/20 outline-none transition-all duration-300"
                          placeholder="Silva"
                        />
                      </div>
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 ml-1">
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#6DAD58] focus:ring-2 focus:ring-[#6DAD58]/20 outline-none transition-all duration-300"
                        placeholder="xxxxx@ejemplo.com"
                      />
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 ml-1">
                      Contraseña
                    </label>
                    <div className="relative">
                      <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#6DAD58] focus:ring-2 focus:ring-[#6DAD58]/20 outline-none transition-all duration-300"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <i className="fas fa-eye" />
                      </button>
                    </div>
                  </motion.div>

                  <div className="flex items-start space-x-2">
                    <input type="checkbox" className="mt-1 form-checkbox text-[#6DAD58] rounded border-gray-300 focus:ring-[#6DAD58]" />
                    <span className="text-sm text-gray-600">
                      Acepto los{' '}
                      <a href="#" className="text-[#6DAD58] hover:text-green-600 transition-colors">
                        términos y condiciones
                      </a>
                      {' '}y la{' '}
                      <a href="#" className="text-[#6DAD58] hover:text-green-600 transition-colors">
                        política de privacidad
                      </a>
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#6DAD58] to-green-600 text-white py-4 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-[#6DAD58]/20 hover:shadow-xl hover:shadow-[#6DAD58]/30"
                  >
                    Crear cuenta
                  </motion.button>

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">O regístrate con</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border-2 border-gray-200 hover:border-[#6DAD58] transition-colors"
                    >
                      <i className="fab fa-google text-red-500" />
                      <span className="text-gray-700">Google</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border-2 border-gray-200 hover:border-[#6DAD58] transition-colors"
                    >
                      <i className="fab fa-facebook text-blue-600" />
                      <span className="text-gray-700">Facebook</span>
                    </motion.button>
                  </div>

                  <p className="text-center text-sm text-gray-600">
                    ¿Ya tienes una cuenta?{' '}
                    <button
                      onClick={() => {
                        setIsRegisterOpen(false);
                        setIsLoginOpen(true);
                      }}
                      className="text-[#6DAD58] hover:text-green-600 font-medium transition-colors"
                    >
                      Inicia sesión
                    </button>
                  </p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {isPlanModalOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsPlanModalOpen(false)}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-[#F1F7E7] p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-lg relative"
            onClick={e => e.stopPropagation()}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlanModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl" />
            </motion.button>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#6DAD58] mb-6">
              ¡Obtén Agriwave Ahora!
            </h2>
            <p className="text-center text-gray-700 mb-8 leading-relaxed">
              Agriwave cuenta con una licencia única que puedes adquirir desde
              tu cuenta. Accede a todas sus funcionalidades desde múltiples
              dispositivos, brindándote flexibilidad y control en la gestión de
              tu ganadería desde cualquier lugar.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-6 shadow-lg mb-8"
            >
              <h3 className="text-xl font-semibold text-center mb-6 text-[#6DAD58]">
                Método de Pago
              </h3>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex justify-center"
              >
                <img
                  src={pse}
                  alt="PSE Payment Method"
                  className="h-32 md:h-40"
                />
              </motion.div>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = "https://www.pse.com.co/iniciar-pago"}
              className="bg-[#6DAD58] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full w-full text-center shadow-md hover:shadow-xl transition-all duration-300"
            >
              Comprar Ahora
            </motion.button>
          </motion.div>
        </motion.div>
      )}
      <div className="mt-20"></div>
    </div >
  );
}

export default NavBar;
