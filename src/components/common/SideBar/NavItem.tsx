import Icon from "@chakra-ui/icon";
import { Flex, FlexProps, Link } from "@chakra-ui/layout";

import { RouteProps } from "../../../router";

import ReachLink from "next/link";

interface NavItemProps extends FlexProps, Omit<RouteProps, "name"> {}

import { useRouter } from "next/router";

export const NavItem: React.FC<NavItemProps> = ({
  icon,
  to,
  children,
  ...rest
}) => {
  const router = useRouter();
  const isActive = router.pathname === to;

  return (
    <Link as={ReachLink} href={to} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="0.8rem"
        role="group"
        cursor="pointer"
        boxShadow={isActive ? "xl" : ""}
        bg={isActive ? "blue.800" : "transparent"}
        _hover={{
          bg: "blue.800",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
