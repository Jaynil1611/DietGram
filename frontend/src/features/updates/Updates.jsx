import React from "react";
import {
  Flex,
  Text,
  Heading,
  Image,
  Box,
  Button,
  Tag,
  Link,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserSuggestions, Search } from "../index";
import {
  checkCurrentUserFollowStatus,
  checkPostAndUserStatus,
  getProfileImage,
  primaryButtonStyleProps,
} from "../../utils";
import { followUser, selectUserById } from "../users/usersSlice";
import { selectCurrentUserId } from "../currentUser/currentUserSlice";
import { Link as RouterLink } from "react-router-dom";

function Updates() {
  const status = useSelector(checkPostAndUserStatus);
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
                loading="lazy"
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
        {status === "fulfilled" && <PeopleCard />}
      </Flex>
    </>
  );
}

export const PeopleCard = () => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectCurrentUserId);
  const currentUser = useSelector((state) =>
    selectUserById(state, currentUserId)
  );
  
  const users = useSelector((state) =>
    selectUserSuggestions(state, currentUserId)
  );
  const suggestedUsers = users.sort(() => 0.5 - Math.random()).slice(0, 5);

  const follow = (userId) => {
    dispatch(followUser({ userId }));
  };

  const checkFollowing = (id) => checkCurrentUserFollowStatus(currentUser, id);

  return (
    <>
      {suggestedUsers.map(
        ({ username, fullname, profile_image_url, id, following }) => {
          const isFollowing = checkFollowing(id);
          return (
            <Box key={id}>
              {!isFollowing && (
                <Box my={1} py={2} borderY="1px solid" borderColor="gray.300">
                  <Flex wrap="wrap">
                    <Flex direction="column" shrink="0" basis="48px">
                      <Image
                        loading="lazy"
                        borderRadius="full"
                        src={getProfileImage(profile_image_url, fullname)}
                        alt="Profile"
                      />
                    </Flex>
                    <RouterLink to={`/${username}`}>
                      <Flex ms={4} direction="column" wrap="wrap">
                        <Text
                          fontWeight={"extrabold"}
                          _hover={{ textDecoration: "underline" }}
                        >
                          {fullname}
                        </Text>
                        <Flex align="center">
                          <Text
                            fontSize={"1rem"}
                            color={"gray.600"}
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                            w="90px"
                          >
                            @{username}
                          </Text>
                          {checkCurrentUserFollowStatus(
                            { following },
                            currentUser.id
                          ) && (
                            <Tag p={1} me={4}>
                              Follows you
                            </Tag>
                          )}
                        </Flex>
                      </Flex>
                    </RouterLink>
                    <Flex align="center">
                      <Button
                        {...primaryButtonStyleProps}
                        maxW="max-content"
                        height={"fit-content"}
                        onClick={() => follow(id)}
                        borderRadius="full"
                      >
                        Follow
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              )}
            </Box>
          );
        }
      )}
    </>
  );
};

export default Updates;
