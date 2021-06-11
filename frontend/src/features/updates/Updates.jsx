import React from "react";
import Search from "./Search";
import {
  Flex,
  Text,
  Heading,
  Image,
  Link,
  Box,
  Button,
  Tag,
} from "@chakra-ui/react";
import { intialState } from "../../database/fakeData";

function Updates() {
  const {
    userId: {
      id,
      firstname,
      lastname,
      username,
      profile_image_url,
      cover_image_url,
      location,
      description,
      url,
      followers,
      following,
    },
  } = intialState.posts[0];
  return (
    <>
      <Search />
      <Flex direction="column" mt="2rem">
        <Heading size="md" fontWeight="extrabold">
          What's happening
        </Heading>
        <Link
          href="https://t.co/tN9j41rm8i?amp=1"
          isExternal={true}
          _focus={{ outline: "none" }}
        >
          <Flex
            grow="1"
            my="2"
            align="center"
            borderY="1px solid"
            borderColor="gray.300"
          >
            <Flex shrink="0">
              <Image
                h="68px"
                w="68px"
                borderRadius="1rem"
                src={
                  "https://pbs.twimg.com/semantic_core_img/1402514691591528456/OdcOvQ2d?format=png&name=240x240"
                }
                alt="News"
              />
            </Flex>
            <Text fontWeight="bold" p={4}>
              El Salvador becomes the first country to adopt Bitcoin as legal
              tender
            </Text>
          </Flex>
        </Link>
      </Flex>
      <Flex direction="column" mt="2rem">
        <Heading mb={4} size="md" fontWeight="extrabold">
          Who to follow
        </Heading>
        <Link to="" _hover={{ textDecoration: "none" }}>
          <Box py={2} borderY="1px solid" borderColor="gray.300">
            <Flex justify="space-around" wrap="wrap">
              <Flex direction="column" shrink="0" basis="48px">
                <Image
                  borderRadius="full"
                  src={profile_image_url}
                  alt="Profile"
                />
              </Flex>
              <Flex direction="column" wrap="wrap">
                <Text
                  fontWeight={"extrabold"}
                  _hover={{ textDecoration: "underline" }}
                >
                  {firstname + " " + lastname}
                </Text>
                <Flex align="center">
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
                  <Tag p={1}>Follows you</Tag>
                </Flex>
              </Flex>
              <Flex align="center">
                <Button borderRadius="full" p={4}>
                  Follow
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Link>
      </Flex>
    </>
  );
}

export default Updates;
