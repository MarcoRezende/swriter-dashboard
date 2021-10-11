import React, { ReactNode } from "react";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";

import { MobileNav } from "./MobileNav";
import { SidebarContent } from "./SidebarContent";
import { RouteProps } from "../../../router";

interface MainSideBarProps {
  routes: RouteProps[];
}

export const MainSideBar: React.FC<MainSideBarProps> = ({
  children,
  routes,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box h="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        routes={routes}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent routes={routes} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} h="100%" p="4">
        {children}
      </Box>
    </Box>
  );
};
