import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { FaUserLarge, FaLock } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { access_token } = response.data;
      Cookies.set("access_token", access_token, { expires: 7 });
      Swal.fire({
        title: "Success!",
        text: "Login completed successfully",
        icon: "success",
        confirmButtonText: "Great!",
      });
      navigate("/admin");
    } catch (error) {
      console.error("Error en el inicio de sesión", error);
      Swal.fire({
        title: "Error!",
        text: "Password or Email incorrect",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 lg:space-y-6 w-full lg:w-2/3 max-w-md"
            >
              <label className="flex justify-between items-center py-2 border-b-2 border-gray-600 focus-within:border-white">
                <input
                  type="text"
                  placeholder="Correo Electrónico"
                  {...register("email", { required: "El correo es requerido" })}
                  className="bg-transparent text-white border-none focus:outline-none text-lg w-full"
                />
                <FaUserLarge />
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <label className="flex justify-between items-center py-2 border-b-2 border-gray-600 focus-within:border-white">
                <input
                  type="password"
                  placeholder="Contraseña"
                  {...register("password", {
                    required: "La contraseña es requerida",
                  })}
                  className="bg-transparent text-white border-none focus:outline-none text-lg w-full"
                />
                <FaLock />
              </label>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg py-3 rounded-full"
              >
                Iniciar Sesión
              </button>
            </form>

            <p className="text-gray-400 text-sm mt-4">
              ¿No recuerdas tu Contraseña?
              <Link to="/recovery" className="text-blue-400 hover:underline">
                Recuperar Contraseña
              </Link>
            </p>
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
