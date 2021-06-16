import {
  Box,
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
  Avatar,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  getCurrentUserStatus,
  selectCurrentUser,
} from "../currentUser/currentUserSlice";

export const CollapseMenu = () => {
  const status = useSelector(getCurrentUserStatus);
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      {status === "fulfilled" && (
        <Menu>
          <MenuButton as={Box}>
            <Avatar
              src={`https://ui-avatars.com/api/?name=${currentUser.fullname}&rounded=true&background=fd7014&color=fff&size=32`}
              alt=""
              size={"sm"}
              borderRadius="full"
            />
          </MenuButton>
          <MenuList>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      )}
    </>
  );
};
