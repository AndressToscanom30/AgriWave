import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
        <footer className="bg-[#F1F7E7] text-gray-500 py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">

                <div className="mb-4 md:mb-0">
                    <h2 className="text-gray-500 fg-black font-semibold">AgriWave</h2>
                    <p className="text-gray-500">Software para gestion ganadera</p>
                </div>

                <div className="flex space-x-4 mb-4 md:mb-0">
                    <a href="/comunidad" className="text-gray-400 hover:text-gray-500 transition">Comunidad</a>
                    <a href="/contacto" className="text-gray-400 hover:text-gray-500 transition">Contacto</a>
                    <a href="/ayuda" className="text-gray-400 hover:text-gray-500 transition">Ayuda</a>
                </div>

                <div className="flex space-x-4">
                    <a href="https://facebook.com" className="text-gray-400 hover:text-gray-500 transition">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com" className="text-gray-400 hover:text-gray-500 transition">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com" className="text-gray-400 hover:text-gray-500 transition">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>

            <div className="mt-8 text-center text-gray-500 text-sm">
                &copy; 2024. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;
