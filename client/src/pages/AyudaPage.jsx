const AyudaPage = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F8EE]">
        <div className="bg-[#F5F8EE] p-5 rounded-lg shadow-md">
          <h2 className="text-2xl mb-5">Preguntas frecuentes?</h2>
          <ul className="list-none p-0">
            <li className="text-lg mb-2">¿Qué es la ganadería bovina?</li>
            <li className="text-lg mb-2">¿Qué es Agriwave?</li>
            <li className="text-lg mb-2">¿Qué hace Agriwave?</li>
            <li className="text-lg mb-2">¿Cómo funciona Agriwave?</li>
          </ul>
          <p className="text-base text-black">
            ¿Tienes dudas? ¡Contáctanos en{' '}
            <a href="https://twitter.com/AgriWaveSoporte" className="text-blue-500">
              @AgriWaveSoporte
            </a>{' '}
            y con gusto te ayudamos!
          </p>
        </div>
        <div className="ml-12">
          <img
            src="https://path_to_image.png" // Replace with the actual image path
            alt="Agriculture Illustration"
            className="w-[400px] h-auto"
          />
        </div>
      </div>
    )
  }
  
  export default AyudaPage