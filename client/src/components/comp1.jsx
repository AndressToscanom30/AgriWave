import imagen1 from '../imgs/comp1.png'

const Comp1 = () => {
    return (
        <div>
            <h1 className="mt-6 text-[#6DAD58] text-2xl">HERRAMIENTA IDEAL PARA MANEJAR TU GRANJA</h1>
            <div className="flex space-x-3 mt-[40px]">
                <div>
                    <h1 className="font-yeseva text-[40px]">Maneja tus datos</h1>
                    <p className="text-xl mt-10">y toma decisiones con precisión.</p>
                    <button className=" mt-[110px] border border-solid bg-[#6DAD58] rounded-lg text-white p-3 text-xl">Descubre los beneficios de AgriWave</button>
                </div>
                <div>
                    <img src={imagen1} />
                </div>
            </div>
        </div>
    )
}

export default Comp1