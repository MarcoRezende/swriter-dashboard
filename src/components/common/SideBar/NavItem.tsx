import Icon from "@chakra-ui/icon";
import { Flex, FlexProps, Link } from "@chakra-ui/layout";

import { RouteProps } from "../../../router";

interface NavItemProps extends FlexProps, Omit<RouteProps, "name"> {}

export const NavItem: React.FC<NavItemProps> = ({
  icon,
  to,
  children,
  ...rest
}) => {
  return (
    <Link href={to} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
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
