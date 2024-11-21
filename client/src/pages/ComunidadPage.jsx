import { useEffect } from 'react';
import pieri from "../imgs/pieri.jpg";
import stiven from "../imgs/stiven.jpeg";
import jorge from "../imgs/jorge.jpg";
import ashlee from "../imgs/ash.jpeg";
import logo from "../imgs/AgriWave.jpeg"; // Ajusta la ruta según donde tengas el logo


const TeamMember = ({ image, name, role }) => (
  <div className="group relative">
    <div className="relative overflow-hidden rounded-2xl">
      <img
        src={image}
        alt={name}
        className="w-64 h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#6DAD58] via-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm">{role}</p>
      </div>
    </div>
  </div>
);

const ComunidadPage = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const teamMembers = [
    { image: pieri, name: "Pierina", role: "Desarrolladora Frontend" },
    { image: stiven, name: "Stiven", role: "Desarrollador Backend" },
    { image: jorge, name: "Jorge", role: "Diseñador UI/UX" },
    { image: ashlee, name: "Ashlee", role: "Project Manager" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden bg-white rounded-3xl shadow-xl mb-16">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#6DAD58]/10" />
          <div className="relative z-10 flex items-center p-12">
            <div className="w-2/3 pr-12">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                <span className="text-[#6DAD58]">Agriwave:</span> Innovación en el Campo
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Transformamos la agricultura y ganadería con tecnología inteligente y soluciones innovadoras. Nuestra pasión es hacer el campo más eficiente y sostenible.
              </p>
            </div>
            <div className="w-1/3">
              <div className="relative aspect-square rounded-full bg-white shadow-2xl p-6 overflow-hidden group hover:shadow-[#6DAD58]/30 transition-all duration-500">
                <img
                  src={logo}
                  alt="AgriWave Logo"
                  className="w-full h-full object-contain transform transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6DAD58]/10 to-transparent rounded-full" />
              </div>
            </div>

          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-12 mb-16">
          <h2 className="text-4xl font-bold text-[#6DAD58] mb-8">Nuestra Misión</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#6DAD58]/10 rounded-full">
                  <svg className="w-6 h-6 text-[#6DAD58]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-gray-700">Transformación digital del sector ganadero</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#6DAD58]/10 rounded-full">
                  <svg className="w-6 h-6 text-[#6DAD58]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-lg text-gray-700">Optimización de recursos y productividad</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#6DAD58]/10 rounded-full">
                  <svg className="w-6 h-6 text-[#6DAD58]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-lg text-gray-700">Soluciones tecnológicas integrales</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#6DAD58]/10 rounded-full">
                  <svg className="w-6 h-6 text-[#6DAD58]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-lg text-gray-700">Gestión eficiente y sostenible</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-12">
          <h2 className="text-4xl font-bold text-[#6DAD58] mb-12 text-center">Nuestro Equipo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComunidadPage