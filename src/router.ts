import { IconType } from "react-icons";
import { RiBookReadLine } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";
import { VscTypeHierarchy } from "react-icons/vsc";
import { FiHome } from "react-icons/fi";

export interface RouteProps {
  name: string;
  icon: IconType;
  to: string;
}

export const routes: RouteProps[] = [
  { name: "Home", icon: FiHome, to: "/" },
  { name: "Sentenças", icon: RiBookReadLine, to: "/hint" },
  { name: "Categorias", icon: MdOutlineCategory, to: "/category" },
  { name: "Temas", icon: VscTypeHierarchy, to: "/theme" },
];
