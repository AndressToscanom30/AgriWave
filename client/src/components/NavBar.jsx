function NavBar() {

    return (
        <div>
            <nav className="fixed w-screen h-16 bg-[#F1F7E7]">
                <ul className="flex justify-between items-center h-full px-6">
                    <div className="text-[#6DAD58] font-yeseva text-3xl"><a href="/">Agriwave</a></div>
                    <div className="flex space-x-4 ">
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/planes">Planes</a></li>
                        <li><a href="/contacto">Contacto</a></li>
                        <li><a href="/comunidad">Comunidad</a></li>
                        <li><a href="/ayuda">Ayuda</a></li>
                        <button className="border border-solid border-[#6dad58] rounded-lg p-[2px]">Iniciar sesión</button>
                        <button className="border rounded-lg p-[3px] bg-[#6DAD58] text-white">Registrarme</button>
                    </div>
                </ul>
            </nav>
            <div className="h-16"></div>
        </div>
      
    )
  }
  
export default NavBar