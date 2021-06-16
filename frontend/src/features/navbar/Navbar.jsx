import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Drawer,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { MobileMenu } from "./MobileMenu";
import { menuList, buttonFocusProps } from "../../utils";
import { CollapseMenu } from "./CollapseMenu";

function Navbar() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [isDesktopMode] = useMediaQuery("(min-width: 648px)");

  return (
    <Box
      position="sticky"
      overflow="hidden"
      top="0"
      zIndex={10}
      boxShadow="md"
      rounded="lg"
    >
      <Flex
        p={"0.5rem 1rem"}
        bg={"white"}
        align={"center"}
        justify={"space-between"}
      >
        <Flex alignItems="center">
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            mt={1}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              {...buttonFocusProps}
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={4} h={4} />
                ) : (
                  <HamburgerIcon w={6} h={6} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex
            fontSize={{ base: "xl", md: "3xl" }}
            fontWeight="semibold"
            justify={{ base: "center", md: "start" }}
            ml={6}
          >
            <Link to="/"> DietGram</Link>
          </Flex>
        </Flex>
        <Flex>
          <CollapseMenu />
        </Flex>
      </Flex>
      <Box>
        <Drawer
          isOpen={isDesktopMode ? false : isOpen}
          placement="left"
          onClose={onClose}
          size="full"
        >
          <MobileMenu menuList={menuList} closeDrawer={onClose} />
        </Drawer>
      </Box>
    </Box>
  );
}

export default Navbar;
