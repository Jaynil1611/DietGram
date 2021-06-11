import React from "react";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/all";
import { showBackButton } from "../../utils";

function Header({ text, back }) {
  return (
    <Flex
      mt={"1rem"}
      position={"sticky"}
      align={"center"}
      zIndex={1}
      bg={"white"}
    >
      {showBackButton(back) && (
        <Icon
          ml={5}
          boxSize="1.5rem"
          as={BiArrowBack}
          cursor={"pointer"}
        ></Icon>
      )}
      <Text fontSize={"1.5rem"} fontWeight={"semibold"} ps={6}>
        {text}
      </Text>
    </Flex>
  );
}

export default Header;
