const NotFound = () => {
  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900"></div>

      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"
        style={{ clipPath: "polygon(45% 0, 100% 0, 100% 100%, 70% 100%)" }}
      ></div>

      <div className="relative z-10 text-white">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="text-xl mt-4">Página no encontrada</p>
      </div>
    </div>
  );
};

export default NotFound;
