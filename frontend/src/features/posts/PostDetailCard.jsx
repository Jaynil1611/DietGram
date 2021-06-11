import React from "react";
import { intialState } from "../../database/fakeData";
import {
  Box,
  Flex,
  Image,
  Text,
  Icon,
  Divider,
  Menu,
  MenuButton,
  IconButton,
} from "@chakra-ui/react";
import {
  IoMdHeartEmpty,
  IoMdHeart,
  IoBookmarkOutline,
  IoBookmark,
  IoShareSocialOutline,
  BsThreeDots,
} from "react-icons/all";
import { getDate, getProfileImage } from "../../utils/postUtils";
import { Outlet } from "react-router";
import Header from "./Header";
import { BeautifyContent } from "../../utils";

function PostDetailCard() {
  const {
    id,
    userId: { firstname, lastname, username, profile_image_url },
    content,
    createdAt,
    likes: { count, reactors },
  } = intialState.posts[0];

  return (
    <>
      <Header text={"Post"} />
      <Box
        key={id}
        p={4}
        mt={"1rem"}
        w={{ base: "100%" }}
        borderY={"1px"}
        borderColor={"gray.300"}
      >
        <Flex direction={"column"} shrink={1}>
          <Flex>
            <Flex direction={"column"} basis={"48px"} mr={3} shrink={0}>
              <Image
                borderRadius="full"
                src={getProfileImage(profile_image_url, firstname, lastname)}
                alt="Profile"
              />
            </Flex>
            <Flex direction={"column"} w={"100%"}>
              <Flex justify={"space-between"}>
                <Flex justify={"center"} direction={"column"}>
                  <Text fontWeight={"bold"} fontSize={"1.2rem"}>
                    {firstname} {lastname}
                  </Text>
                  <Text fontSize={"1rem"} color={"gray.600"}>
                    @{username}
                  </Text>
                </Flex>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<BsThreeDots />}
                    variant="outline"
                  ></MenuButton>
                </Menu>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            my={3}
            className="content"
            justify={"center"}
            fontSize={"1.1rem"}
            overflowWrap={"break-word"}
          >
            <BeautifyContent content={content} />
          </Flex>
          <Divider my={2} orientation={"horizontal"} bgColor={"gray.300"} />
          <Flex>
            <Text color={"gray.500"}>{getDate(createdAt)}</Text>
          </Flex>
          <Divider my={2} orientation={"horizontal"} bgColor={"gray.300"} />
          <Flex
            justify={"space-between"}
            maxW={{ base: "200px", sm: "350px" }}
            align={"center"}
            m={1}
            ml={3}
          >
            <Flex align={"center"}>
              <Icon boxSize="1.5rem" as={IoMdHeartEmpty} cursor={"pointer"} />
              <Text px={2}>{count}</Text>
            </Flex>
            <Icon boxSize="1.5rem" as={IoBookmarkOutline} cursor={"pointer"} />
            <Icon
              boxSize="1.5rem"
              as={IoShareSocialOutline}
              cursor={"pointer"}
            />
          </Flex>
          <Divider my={2} orientation={"horizontal"} bgColor={"gray.300"} />
        </Flex>
        <Outlet />
      </Box>
    </>
  );
}

export default PostDetailCard;
