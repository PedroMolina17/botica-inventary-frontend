import CardsHome from "../components/CardsHome";
import { RiAdminFill } from "react-icons/ri";
import { useCountUsers } from "../hooks/useProduct";

const Home = () => {
  const { data: DataUser } = useCountUsers();

  return (
    <div>
      <CardsHome
        title={"Admins"}
        color={"from-[#4e42d3] to-[#6456f9]"}
        subtotal={DataUser}
        total={DataUser}
        image={<RiAdminFill />}
      />
    </div>
  );
};

export default Home;
