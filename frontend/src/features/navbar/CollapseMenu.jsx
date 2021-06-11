import {
  Box,
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
  Avatar,
} from "@chakra-ui/react";

export const CollapseMenu = () => {
  return (
    <>
      <Menu>
        <MenuButton as={Box}>
          <Avatar
            src={`https://ui-avatars.com/api/?name=Jaynil+Gaglani&rounded=true&background=fd7014&color=fff&size=32`}
            alt=""
            size={"sm"}
            borderRadius="full"
          />
        </MenuButton>
        <MenuList>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
