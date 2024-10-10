import { useState } from 'react';

function NavBar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  return (
    <div className="relative z-20"> {/* Asegura que esté por encima de elementos más bajos */}
      <nav className="fixed w-screen h-16 bg-[#F1F7E7] z-30"> {/* Nav con un z-index alto */}
        <ul className="flex justify-between items-center h-full px-6">
          <div className="text-[#6DAD58] font-yeseva text-3xl">
            <a href="/">Agriwave</a>
          </div>
          <div className="flex space-x-4 ">
            <li><a href="/">Inicio</a></li>
            <li><a href="/planes">Planes</a></li>
            <button onClick={openLoginModal} className="border border-solid border-[#6dad58] rounded-lg p-[2px]">Iniciar sesión</button>
            <button className="border rounded-lg p-[3px] bg-[#6DAD58] text-white">Registrarme</button>
          </div>
        </ul>
      </nav>
      <div className="h-16"></div>

      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> {/* Modal con z-index más alto */}
          <div className="bg-white p-6 rounded-md shadow-md w-96 relative z-50">
            <h2 className="text-xl mb-4">Iniciar Sesión</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm mb-2">Correo:</label>
                <input type="email" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Contraseña:</label>
                <input type="password" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Entrar</button>
            </form>
            <button onClick={closeLoginModal} className="mt-4 text-blue-500">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
