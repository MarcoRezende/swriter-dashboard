import { IconType } from "react-icons";
import { FiHome } from "react-icons/fi";

export interface RouteProps {
  name: string;
  icon: IconType;
  to: string;
}

export const routes: RouteProps[] = [{ name: "Home", icon: FiHome, to: "" }];
