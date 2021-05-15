import { BiHomeAlt, BiBox } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { CgList } from "react-icons/cg";

export const dashbordData = [
  {
    title: "Dashboard",
    icon: <BiHomeAlt />,
    link: "dashboard",
  },
  {
    title: "Users",
    icon: <FiUsers />,
    link: "users",
  },
  {
    title: "Products",
    icon: <BiBox />,
    link: "products",
  },
  {
    title: "Orders",
    icon: <CgList />,
    link: "orders",
  },
];
