import CardsHome from "../components/CardsHome";
import { RiAdminFill } from "react-icons/ri";
import {
  useCountProducts,
  useCountProductsLower,
  useCountUsers,
} from "../hooks/useProduct";
import { useEffect } from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import GraphArea from "../components/GraphArea";
import Sales from "../components/Sales";

const AdminHome = () => {
  const { data: DataProducts } = useCountProducts();
  const { data: DataProductsLower } = useCountProductsLower();
  const { data: DataUsers } = useCountUsers();
  useEffect(() => {
    console.log(DataProducts && DataProducts);
  });

  return (
    <div className="grid grid-cols-3 gap-3 gap-y-8 py-4">
      <CardsHome
        title={"Productos bajo stock"}
        subtitle={"Productos"}
        color={"from-[#111827] to-[#293242]"}
        subtotal={DataProductsLower}
        total={DataProducts}
        image={<MdProductionQuantityLimits />}
      />
      <CardsHome
        title={"Usuarios"}
        subtitle={"Usuarios"}
        color={"from-[#111827] to-[#293242]"}
        subtotal={DataUsers}
        total={DataUsers}
        image={<RiAdminFill />}
      />
      <CardsHome
        title={"Total de ventas"}
        subtitle={"Ventas"}
        color={"from-[#111827] to-[#293242]"}
        subtotal={12}
        total={41}
        image={<RiAdminFill />}
      />
      <GraphArea />
      <Sales />
    </div>
  );
};

export default AdminHome;
