import { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Recovery() {
  const [email, setEmail] = useState("");

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
              Recuperar Contraseña
            </h2>
            <div className="space-y-4 lg:space-y-6 w-full lg:w-2/3 max-w-md">
              <label className="flex justify-between items-center py-2 border-b-2 border-gray-600 focus-within:border-white">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-white border-none focus:outline-none text-lg w-full"
                />
                <FaEnvelope />
              </label>

              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg py-3 rounded-full">
                Enviar enlace de recuperación
              </button>

              <p className="text-gray-400 text-sm">
                ¿Recuerdas tu contraseña?{" "}
                <Link to="/" className="text-blue-400 hover:underline">
                  Iniciar Sesión
                </Link>
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[40%] flex flex-col justify-center items-center text-white z-10 mt-8 lg:mt-0">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
              BIENVENIDO DE NUEVO
            </h1>
            <p className="text-xl lg:text-2xl mb-2 lg:mb-3">
              No te preocupes, estamos aquí para ayudarte
            </p>
            <p className="text-2xl lg:text-3xl">:)</p>
            <p className="mt-4 lg:mt-6 text-lg lg:text-xl">Recuperación</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recovery;
