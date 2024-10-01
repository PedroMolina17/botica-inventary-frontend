import { useState } from "react";
import { FaUserLarge, FaLock } from "react-icons/fa6";

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
        <div className="absolute inset-0 flex">
          <div className="w-[60%] p-12 flex flex-col justify-center items-start z-10">
            <h2 className="text-white text-4xl mb-8">Inicio</h2>
            <div className="space-y-6 w-2/3 max-w-md">
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

              <label className="flex justify-between items-center py-2 border-b-2 border-gray-600 focus-within:border-white ">
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
                ¿No tienes cuenta?{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  Por favor, Regístrate
                </a>
              </p>
            </div>
          </div>
          <div className="w-[40%] flex flex-col justify-center items-center text-white z-10">
            <h1 className="text-5xl font-bold mb-6">BIENVENIDO</h1>
            <p className="text-2xl mb-3">Gracias por ver el video</p>
            <p className="text-3xl">:)</p>
            <p className="mt-6 text-xl">login</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
