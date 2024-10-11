import imagen from "../imgs/comp1.png"

const AyudaPage = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen bg-gray-100 p-8 lg:p-16 space-y-8 lg:space-y-0 lg:space-x-8">
      <div className="p-8 rounded-lg shadow-lg bg-[#F1F7E7] flex-1 space-y-6">
        <h2 className="text-center text-3xl font-bold text-green-700">Preguntas frecuentes</h2>
        <ul className="list-disc pl-5 space-y-4">
          <li className="text-lg text-gray-800">
            <strong>¿Qué es la ganadería bovina?</strong><br/>
            Es la cría y manejo de ganado vacuno, especialmente para la producción de carne y leche. 
          </li>
          <li className="text-lg text-gray-800">
            <strong>¿Qué es Agriwave?</strong><br/>
            Es una plataforma innovadora que combina tecnología y agricultura para optimizar la gestión de recursos agrícolas.
          </li>
          <li className="text-lg text-gray-800">
            <strong>¿Qué hace Agriwave?</strong><br/>
            Agriwave ofrece soluciones tecnológicas para monitorear cultivos y ganado, mejorar la productividad y reducir el impacto ambiental.
          </li>
          <li className="text-lg text-gray-800">
            <strong>¿Cómo funciona Agriwave?</strong><br/>
            Funciona mediante sensores y algoritmos avanzados que analizan datos en tiempo real para tomar decisiones eficientes en la producción agrícola.
          </li>
        </ul>
        <p className="text-base text-center text-gray-600">
          ¿Tienes dudas? ¡Contáctanos en{' '}
          <a href="https://twitter.com/AgriWaveSoporte" className="text-blue-500 underline">
            @AgriWaveSoporte
          </a>{' '}
          y con gusto te ayudamos! 😈😏
        </p>
      </div>
      <div className="flex-1 flex justify-center">
        <img
          src={imagen}
          alt="Agriculture Illustration"
          className="w-[450px] h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  )
}

export default AyudaPage
