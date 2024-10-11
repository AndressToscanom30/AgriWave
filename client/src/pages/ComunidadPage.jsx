import pieri from "../imgs/pieri.jpg";
import stiven from "../imgs/stiven.jpeg";
import jorge from "../imgs/jorge.jpg"
import ashlee from "../imgs/ash.jpeg"

const ComunidadPage = () => {
  return (
    <div className="bg-gray-100 font-['Poppins', sans-serif] p-6">
      <section className="space-y-12">
        <div className="flex flex-row space-x-8 items-center bg-white p-6 rounded-lg shadow-md">
          <div className="w-[200px] h-[220px] bg-[#6DAD58] rounded-br-full shadow-lg"></div>
          <div className="flex flex-col">
            <h2 className="text-[35px] text-[#6DAD58] font-bold mb-2">¿Quiénes somos en Agriwave?</h2>
            <div className="w-[700px]">
              <p className="text-gray-700 text-lg leading-relaxed">
                Somos un equipo apasionado que busca innovar en el sector agrícola y ganadero. Nuestro objetivo es proporcionar herramientas accesibles y eficientes que permitan a los agricultores y ganaderos gestionar sus fincas de manera óptima y mejorar su productividad. Nos enfocamos en entender las necesidades del campo y desarrollar AgriWave como una solución integral que combine tecnología y conocimiento práctico.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-[35px] text-[#6DAD58] font-bold">Nuestra misión</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Facilitar la transformación digital en el sector ganadero proporcionando soluciones tecnológicas integrales que optimicen la gestión de animales, finanzas y terrenos. A través de herramientas intuitivas y avanzadas, ayudamos a los ganaderos a maximizar la productividad, mejorar la toma de decisiones y garantizar una gestión sostenible y eficiente de sus recursos.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-[35px] text-[#6DAD58] font-bold">Nuestro equipo</h2>
          <div className="flex justify-center space-x-8 mt-4">
            <img src={pieri} alt="Pieri" className="w-[150px] h-[150px] rounded-full object-cover border-4 border-[#6DAD58] shadow-lg transition-transform transform hover:scale-105" />
            <img src={stiven} alt="Stiven" className="w-[150px] h-[150px] rounded-full object-cover border-4 border-[#6DAD58] shadow-lg transition-transform transform hover:scale-105" />
            <img src={jorge} alt="Jorge" className="w-[150px] h-[150px] rounded-full object-cover border-4 border-[#6DAD58] shadow-lg transition-transform transform hover:scale-105" />
            <img src={ashlee} alt="Ashlee" className="w-[150px] h-[150px] rounded-full object-cover border-4 border-[#6DAD58] shadow-lg transition-transform transform hover:scale-105" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComunidadPage;
