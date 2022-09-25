import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

function Loader() {
  return (
    <>
      <Flex justify="center" height="100%" align="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="accent.400"
          size="lg"
        />
      </Flex>
    </>
  );
}

export default Loader;
