import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { primaryButtonStyleProps } from "../../utils";
import { Link } from "react-router-dom";

function Hashtag() {
  return (
    <>
      {" "}
      <Flex
        justify="space-evenly"
        direction="column"
        align="center"
        w="100%"
        h="50%"
      >
        <Text fontSize="lg">"Hmm... this feature is work in progress!"</Text>
        <Link to={"/"}>
          <Button maxW="max-content" {...primaryButtonStyleProps}>
            Return to Home
          </Button>
        </Link>
      </Flex>
    </>
  );
}

export default Hashtag;
