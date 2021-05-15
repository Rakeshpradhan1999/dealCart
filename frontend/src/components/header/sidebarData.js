import { BiHomeAlt, BiBox } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { CgList } from "react-icons/cg";

export const dashbordData = [
  {
    title: "Home",
    icon: <BiHomeAlt />,
    link: "home",
    selected: true,
  },
  {
    title: "Users",
    icon: <FiUsers />,
    link: "users",
    selected: false,
  },
  {
    title: "Products",
    icon: <BiBox />,
    link: "products",
    selected: false,
  },
  {
    title: "Orders",
    icon: <CgList />,
    link: "orders",
    selected: false,
  },
];
