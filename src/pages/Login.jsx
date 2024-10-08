import { useState } from "react";
import { FaUserLarge, FaLock } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gray-900"></div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"
          style={{ clipPath: "polygon(45% 0, 100% 0, 100% 100%, 70% 100%)" }}
        ></div>
        <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center">
          <div className="w-full lg:w-[60%] p-6 lg:p-12 flex flex-col justify-center items-center lg:items-start z-10">
            <h2 className="text-white text-3xl lg:text-4xl mb-4 lg:mb-8">
              Inicio
            </h2>
            <div className="space-y-4 lg:space-y-6 w-full lg:w-2/3 max-w-md">
              <label className="flex justify-between items-center py-2 border-b-2 border-gray-600 focus-within:border-white">
                <input
                  type="text"
                  placeholder="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent text-white border-none focus:outline-none text-lg w-full"
                />
                <FaUserLarge />
              </label>

              <label className="flex justify-between items-center py-2 border-b-2 border-gray-600 focus-within:border-white">
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent text-white border-none focus:outline-none text-lg w-full"
                />
                <FaLock />
              </label>

              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg py-3 rounded-full">
                Iniciar Sesión
              </button>

              <p className="text-gray-400 text-sm">
                ¿No recuerdas tu Contraseña?
                <Link to="/recovery" className="text-blue-400 hover:underline">
                  Recuperar Contraseña
                </Link>
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[40%] flex flex-col justify-center items-center text-white z-10 mt-8 lg:mt-0">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
              BIENVENIDO
            </h1>
            <p className="text-xl lg:text-2xl mb-2 lg:mb-3">
              Gracias por visitarnos
            </p>
            <p className="text-2xl lg:text-3xl">:)</p>
            <p className="mt-4 lg:mt-6 text-lg lg:text-xl">login</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
