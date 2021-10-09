import { IconType } from "react-icons";
import { RiBookReadLine } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";
import { VscTypeHierarchy } from "react-icons/vsc";

export interface RouteProps {
  name: string;
  icon: IconType;
  to: string;
}

export const routes: RouteProps[] = [
  { name: "Sentenças", icon: RiBookReadLine, to: "/" },
  { name: "Categorias", icon: MdOutlineCategory, to: "/categorias" },
  { name: "Temas", icon: VscTypeHierarchy, to: "/temas" },
];
