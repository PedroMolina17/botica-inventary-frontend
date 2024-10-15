import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BiSolidReport } from "react-icons/bi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiMedicineBottleFill, RiMedicineBottleLine } from "react-icons/ri";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import Cookies from "js-cookie";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      href: "/admin",
      icon: IoHomeOutline,
      icon2: IoHomeSharp,
      label: "Home",
    },
    {
      href: "/admin/products",
      icon: RiMedicineBottleLine,
      icon2: RiMedicineBottleFill,
      label: "Products",
    },
    {
      href: "/admin/category",
      icon: HiOutlineDocumentReport,
      icon2: BiSolidReport,
      label: "Category",
    },
    {
      href: "/admin/users",
      icon: CiUser,
      icon2: FaUserAlt,
      label: "Users",
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    navigate("/");
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 text-white"
      >
        <IoMdMenu className="text-2xl" />
      </button>

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 h-full w-64 bg-[#111827] p-2 gap-2 transition-transform transform lg:translate-x-0 z-40`}
      >
        <p className="text-2xl font-bold text-white mt-8">Pedro Molina</p>
        {navLinks.map((navLink, index) => {
          const isActive =
            pathname === navLink.href ||
            (navLink.href === "/admin/products" &&
              pathname.startsWith("/admin/products"));

          const Icon = isActive ? navLink.icon2 : navLink.icon;

          return (
            <div
              key={index}
              className={`w-full h-14 flex items-center p-2 text-lg rounded-md ${
                isActive
                  ? "text-white bg-[#7c579e]"
                  : "hover:text-white text-[#afafaf] transition-colors"
              }`}
            >
              <li className="flex items-center">
                <NavLink to={navLink.href} className="flex items-center gap-2">
                  <Icon className="text-xl" />
                  <span>{navLink.label}</span>
                </NavLink>
              </li>
            </div>
          );
        })}

        <div
          className="w-full h-14 flex items-center p-2 text-lg rounded-md hover:text-white text-[#afafaf] cursor-pointer transition-colors"
          onClick={handleLogout}
        >
          <FaUserAlt className="text-xl" />
          <span className="ml-2">Cerrar Sesión</span>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
        />
      )}
    </>
  );
};

export default Sidebar;
