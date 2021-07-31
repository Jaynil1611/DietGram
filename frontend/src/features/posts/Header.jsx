import React from "react";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/all";
import { showBackButton } from "../../utils";
import { useNavigate } from "react-router";

function Header({ text, back }) {
  const navigate = useNavigate();
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
          onClick={() => navigate(-1)}
        ></Icon>
      )}
      <Text fontSize={"1.5rem"} fontWeight={"semibold"} ps={6}>
        {text}
      </Text>
    </Flex>
  );
}

export default Header;
