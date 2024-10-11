const ComunidadPage = () => {
    return (
        <div>
            <section className="flex flex-col">
                <div className="flex flex-row space-x-8 font-yeseva">
                    <div>
                        <div className="w-[200px] h-[220px] bg-[#6DAD58] rounded-br-full"></div>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-[35px]">¿Quienes somos en Agriwave?</h2>
                        <div className="w-[700px] h-[220px] ">
                            <p>Somos un equipo apasionado que busca innovar en el sector agrícola y ganadero. Nuestro objetivo es proporcionar herramientas accesibles y eficientes que permitan a los agricultores y ganaderos gestionar sus fincas de manera óptima y mejorar su productividad.Nos enfocamos en entender las necesidades del campo y desarrollar AgriWave como una solución integral que combine tecnología y conocimiento práctico.</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-8 font-yeseva">
                     <h2 className="text-[35px] ml-14">Nuestra mision</h2>
                     <p className="ml-14 mr-11">Facilitar la transformación digital en el sector ganadero proporcionando soluciones tecnológicas integrales que optimicen la gestión de animales, finanzas y terrenos. A través de herramientas intuitivas y avanzadas, ayudamos a los ganaderos a maximizar la productividad, mejorar la toma de decisiones y garantizar una gestión sostenible y eficiente de sus recursos.</p>
                </div>
                <div className="flex flex-col space-y-8 font-yeseva">
                    <h2 className="text-[35px] ml-14">Nuestro equipo</h2>
                </div>

                <div className="flex justify-center space-x-8 mt-10">
                    <img src="/imgs/pieri.jpg" alt="Pieri" className="w-[50px] h-[50px] rounded-full object-cover" />
                    <img src="/imgs/stiven.jpeg" alt="Stiven" className="w-[150px] h-[150px] rounded-full object-cover" />
                    <img src="/path/to/image3.jpg" alt="Jorge" className="w-[150px] h-[150px] rounded-full object-cover" />
                    <img src="/path/to/image4.jpg" alt="Ashlee" className="w-[150px] h-[150px] rounded-full object-cover" />
                </div>
                
            </section>
        </div>
    )
}

export default ComunidadPage