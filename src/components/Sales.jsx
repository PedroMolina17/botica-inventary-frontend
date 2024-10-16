import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const user = [
  { id: 1, nombre: "Product1", totalCompra: 185 },
  { id: 2, nombre: "product2", totalCompra: 180 },
  { id: 3, nombre: "Product3", totalCompra: 180 },
  { id: 4, nombre: "Product4", totalCompra: 150 },
];
const data = {
  labels: user.map((item) => item.nombre),
  datasets: [
    {
      data: user.map((item) => item.totalCompra),
      backgroundColor: ["#463862", "#7c579e", "#171f2e", "#273040"],
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      onClick: (_, legendItem, legend) => {
        if (legendItem && legend) {
          console.log(`Clic en la leyenda: ${legendItem.text}`);
          console.log(`Índice de la leyenda: ${legendItem.index}`);
          console.log(
            `Estado de la leyenda: ${legendItem.hidden ? "oculto" : "visible"}`
          );
          console.log(`Lista de todas las leyendas:`, legend.legendItems);
        }
      },
    },
  },
};
const Sales = () => {
  return (
    <div className="w-full  text-black col-span-1 grid">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default Sales;
