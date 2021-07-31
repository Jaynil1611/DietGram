import { Flex, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";
import { buttonFocusProps } from "../../utils";

export const MobileMenu = ({ menuList, closeDrawer }) => (
  <div onClick={closeDrawer}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton {...buttonFocusProps} />
      <DrawerBody>
        <List spacing={4} mt={"3rem"}>
          {menuList.map(({ name, path, icon }) => (
            <ListItem key={name}>
              <NavLink to={path}>
                <Flex align={"center"} p={2} color="gray.900">
                  <ListIcon as={icon} fontSize={"1.5rem"}></ListIcon>
                  <Text px={2} fontSize={"1.1rem"}>
                    {name}
                  </Text>
                </Flex>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </DrawerBody>
    </DrawerContent>
  </div>
);
