import { Search2Icon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  Box,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  Text,
  Image,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/popover";
import { useSelector } from "react-redux";
import {
  checkPostAndUserStatus,
  getProfileImage,
  getSearchResults,
} from "../../utils";
import { Loader, selectAllUsers } from "../index";
import { useRef, useState } from "react";

function Search() {
  const status = useSelector(checkPostAndUserStatus);

  return (
    <>
      {status === "loading" && <Loader />}
      {status === "fulfilled" && <SearchResults />}
    </>
  );
}

export const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputSearchRef = useRef(null);
  const users = useSelector(selectAllUsers);
  const results = getSearchResults(users, searchQuery);

  const searchQueryHandler = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const closeSearchResults = () => {
    setSearchQuery("");
    onClose();
  };

  return (
    <>
      <Box
        mt={"1rem"}
        w={{ base: "100%" }}
        position={"sticky"}
        zIndex={1}
        bg={"white"}
      >
        <Popover
          flip={true}
          initialFocusRef={inputSearchRef}
          isOpen={isOpen}
          placement="bottom"
          onClose={closeSearchResults}
        >
          <PopoverTrigger>
            <Flex>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Search2Icon color="gray.400" />}
                />
                <Input
                  ref={inputSearchRef}
                  borderRadius="full"
                  type="text"
                  onClick={onOpen}
                  placeholder="Search"
                  bgColor="gray.100"
                  onChange={searchQueryHandler}
                />
              </InputGroup>
            </Flex>
          </PopoverTrigger>
          <PopoverContent maxH="80vh" overflowY="auto" pr="1rem" pl="1rem">
            <PopoverCloseButton />
            <Flex direction="column">
              {results.length === 0 && searchQuery && (
                <Text>No user found!</Text>
              )}
              {results.length > 0 &&
                results.map((user) => {
                  const { id, username, fullname, profile_image_url } = user;
                  return (
                    <Flex
                      my={4}
                      onClick={closeSearchResults}
                      key={id}
                      align="center"
                      w="100%"
                    >
                      <Flex direction="column" basis="32px">
                        <Image
                          loading="lazy"
                          borderRadius="full"
                          src={getProfileImage(profile_image_url, fullname)}
                          alt="Profile"
                        />
                      </Flex>
                      <Flex direction="column">
                        <Text
                          fontWeight={"extrabold"}
                          _hover={{ textDecoration: "underline" }}
                        >
                          {fullname}
                        </Text>
                        <Text
                          fontSize={"1rem"}
                          color={"gray.600"}
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          w="100px"
                          mr={2}
                        >
                          @{username}
                        </Text>
                      </Flex>
                    </Flex>
                  );
                })}
            </Flex>
          </PopoverContent>
        </Popover>
      </Box>
    </>
  );
};

export default Search;
