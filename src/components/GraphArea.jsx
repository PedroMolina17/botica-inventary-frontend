const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      color: "#ffffff",
    },
    title: {
      display: true,
      text: "2024",

      color: "#ffffff",
    },
  },
  scales: {
    x: {
      type: "category",
      ticks: {
        color: "#ffffff",
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "#ffffff",
      },
    },
  },
};

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const user = [
  { id: 1, nombre: "Enero", totalCompra: 200 },
  { id: 2, nombre: "Febrero", totalCompra: 180 },
  { id: 3, nombre: "Marzo", totalCompra: 180 },
  { id: 4, nombre: "Abril", totalCompra: 140 },
  { id: 5, nombre: "Mayo", totalCompra: 250 },
  { id: 6, nombre: "Junio", totalCompra: 151 },
  { id: 7, nombre: "Julio", totalCompra: 350 },
  { id: 8, nombre: "Agosto", totalCompra: 450 },
  { id: 9, nombre: "Septiembre", totalCompra: 400 },
  { id: 10, nombre: "Octubre", totalCompra: 150 },
  { id: 11, nombre: "Noviembre", totalCompra: 300 },
  { id: 12, nombre: "Diciembre", totalCompra: 150 },
];

const data = {
  labels: user.map((item) => item.nombre),
  datasets: [
    {
      label: "Total de Compra por Mes",
      data: user.map((item) => item.totalCompra),
      backgroundColor: "rgba(124, 87, 158,0.5)",
      borderColor: "rgba(69, 85, 145, 1)",
      borderWidth: 1,
      fill: true,
    },
  ],
};

const GraphArea = () => {
  return (
    <div className=" h-auto  text-white flex items-center justify-center w-full col-span-2 ">
      <Line
        data={data}
        options={options}
        className="bg-[#111827] rounded-xl p-2"
      />
    </div>
  );
};

export default GraphArea;
