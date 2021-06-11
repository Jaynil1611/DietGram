import { Search2Icon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  Box,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

function Search() {
  return (
    <>
      <Box
        mt={"1rem"}
        w={{ base: "100%" }}
        position={"sticky"}
        zIndex={1}
        bg={"white"}
      >
        <Flex>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color="gray.400" />}
            />
            <Input
              borderRadius="full"
              type="text"
              placeholder="Search"
              bgColor="gray.100"
            />
          </InputGroup>
        </Flex>
      </Box>
    </>
  );
}

export default Search;
