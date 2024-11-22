import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import emailjs from '@emailjs/browser';

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subscriptionEmail, setSubscriptionEmail] = useState("");
  const SERVICE_ID = "service_ej3ip8q";
  const TEMPLATE_ID = "template_z8o6mgj";
  const PUBLIC_KEY = "7m1Z5u3Yozp0FzGVA";

  emailjs.init(PUBLIC_KEY);

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

  const handleSubscription = async (e) => {
    e.preventDefault();

    const templateParams = {
      to_email: subscriptionEmail,
      message: "¡Gracias por suscribirte a Agriwave! Recibirás todas nuestras actualizaciones y novedades sobre gestión ganadera."
    };

    try {
      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      if (response.status === 200) {
        alert("¡Gracias por suscribirte! Te hemos enviado un correo de confirmación.");
        setSubscriptionEmail("");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Hubo un error al procesar tu suscripción. Por favor intenta nuevamente.");
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#F1F7E7] to-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Mantente conectado</h3>
            <p className="text-gray-600">Suscríbete para recibir las últimas actualizaciones</p>
            <form onSubmit={handleSubscription} className="flex">
              <input
                type="email"
                value={subscriptionEmail}
                onChange={(e) => setSubscriptionEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                required
                className="flex-1 px-4 py-2 rounded-l-lg border-2 border-r-0 border-[#6DAD58] focus:outline-none focus:ring-2 focus:ring-[#6DAD58]/50"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 bg-[#6DAD58] text-white rounded-r-lg hover:bg-[#5c9b4a] transition-colors"
              >
                Suscribirse
              </motion.button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} AgriWave. Todos los derechos reservados.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6DAD58]/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#6DAD58]/20 to-transparent rounded-full blur-3xl" />

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <i className="fas fa-times text-gray-500" />
              </motion.button>

              <div className="relative">
                <div className="flex items-center mb-8">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-[#6DAD58] to-green-600 bg-clip-text text-transparent">
                      ¡Conectemos!
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Completa el formulario y nos pondremos en contacto contigo
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className="w-12 h-12 bg-[#6DAD58]/10 rounded-full flex items-center justify-center">
                      <i className="fas fa-comments text-2xl text-[#6DAD58]" />
                    </div>
                  </div>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div whileHover={{ scale: 1.02 }} className="col-span-1">
                      <input
                        type="text"
                        placeholder="Nombre"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6DAD58] focus:ring-2 focus:ring-[#6DAD58]/20 outline-none transition-all duration-300"
                      />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="col-span-1">
                      <input
                        type="text"
                        placeholder="Apellido"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6DAD58] focus:ring-2 focus:ring-[#6DAD58]/20 outline-none transition-all duration-300"
                      />
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }}>
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6DAD58] focus:ring-2 focus:ring-[#6DAD58]/20 outline-none transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="flex gap-3">
                    <div className="w-20">
                      <select className="w-full px-3 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6DAD58] focus:ring-2 focus:ring-[#6DAD58]/20 outline-none transition-all duration-300 bg-white">
                        <option>+57</option>
                        <option>+1</option>
                        <option>+44</option>
                      </select>
                    </div>
                    <input
                      type="tel"
                      placeholder="Teléfono"
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6DAD58] focus:ring-2 focus:ring-[#6DAD58]/20 outline-none transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }}>
                    <input
                      type="text"
                      placeholder="¿Cómo nos conociste?"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6DAD58] focus:ring-2 focus:ring-[#6DAD58]/20 outline-none transition-all duration-300"
                    />
                  </motion.div>

                  <div className="space-y-3">
                    <label className="block text-gray-700 font-medium">
                      Tipo de ganado que manejas:
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {checkboxOptions.map((option) => (
                        <motion.label
                          key={option.id}
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center space-x-3 bg-white p-3 rounded-xl border-2 border-gray-200 hover:border-[#6DAD58] cursor-pointer transition-all duration-300"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox text-[#6DAD58] rounded-lg border-gray-300 focus:ring-[#6DAD58]"
                          />
                          <span className="text-gray-700">{option.label}</span>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#6DAD58] to-green-600 text-white py-4 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-[#6DAD58]/20 hover:shadow-xl hover:shadow-[#6DAD58]/30"
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
