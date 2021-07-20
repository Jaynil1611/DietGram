import {
  Box,
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
  Avatar,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getCurrentUserStatus,
  selectCurrentUser,
} from "../currentUser/currentUserSlice";

export const CollapseMenu = () => {
  const status = useSelector(getCurrentUserStatus);
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  return (
    <>
      {status === "fulfilled" && (
        <Menu placement="auto">
          <MenuButton as={Box}>
            <Avatar
              src={`https://ui-avatars.com/api/?name=${currentUser.fullname}&rounded=true&background=fd7014&color=fff&size=32`}
              alt=""
              size={"sm"}
              borderRadius="full"
            />
          </MenuButton>
          <MenuList zIndex={5}>
            <MenuItem onClick={() => navigate("/logout")}>Logout</MenuItem>
          </MenuList>
        </Menu>
      )}
    </>
  );
};
