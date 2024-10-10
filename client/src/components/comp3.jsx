import imagen3 from '../imgs/comp3.png'

const Comp3 = () => {
    return (
        <div>
            <h1 className="mt-6 text-[#6DAD58] text-2xl">MEJORA LA GESTIÓN DE TU PRODUCCIÓN</h1>
            <div className="flex space-x-2 mt-[40px]">
                <div className="w-[50%]">
                    <h1 className="font-yeseva text-[40px]">Gestiona tus cultivos y ganado</h1>
                    <p className="text-lg mt-4 w-[80%]">Monitorear y mejorar el rendimiento de tu finca con información clara.</p>
                    <button  className=" mt-[70px] border border-solid bg-[#6DAD58] rounded-lg text-white p-3 text-xl">Lleva el control de tu finca a otro nivel</button>
                </div>
                <div>
                    <img src={imagen3} />
                </div>
            </div>
        </div>
    )
}

export default Comp3