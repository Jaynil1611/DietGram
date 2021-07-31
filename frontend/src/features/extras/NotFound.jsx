import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { primaryButtonStyleProps } from "../../utils/buttonProps";
import { Link } from "react-router-dom";

function NotFound({ text }) {
  return (
    <>
      <Flex
        justify="space-evenly"
        direction="column"
        align="center"
        w="100%"
        h="50%"
      >
        <Text fontSize="lg">
          {text ?? "Hmm... this is the not the web page you're looking for."}
        </Text>
        <Link to={"/"}>
          <Button maxW="max-content" {...primaryButtonStyleProps}>
            Return to Home
          </Button>
        </Link>
      </Flex>
    </>
  );
}

export default NotFound;
