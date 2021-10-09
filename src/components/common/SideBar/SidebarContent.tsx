import {
  FiCompass,
  FiHome,
  FiSettings,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import { IconType } from "react-icons/lib";

import { CloseButton } from "@chakra-ui/close-button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, BoxProps, Flex, Text } from "@chakra-ui/layout";

import { NavItem } from "./NavItem";

import { RouteProps } from "../../../router";

interface SidebarProps extends BoxProps {
  routes: RouteProps[];
  onClose: () => void;
}

export const SidebarContent: React.FC<SidebarProps> = ({
  routes,
  onClose,
  ...rest
}) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {routes.map((route) => (
        <NavItem key={route.name} icon={route.icon}>
          {route.name}
        </NavItem>
      ))}
    </Box>
  );
};
