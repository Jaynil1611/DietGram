import React from "react";
import { intialState } from "../../database/fakeData";
import { Header } from "../index";
import { Box, Flex, Image, Text, Button, Icon, Link } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { GrLocation, BiLink } from "react-icons/all";
import { getProfileImage } from "../../utils";
import EditProfile from "./EditProfile";
import { Outlet } from "react-router";

function Profile() {
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
      <Header text={`${firstname + " " + lastname}`} />
      <Box
        key={id}
        p={{ base: 2, sm: 3 }}
        mt={"1rem"}
        w={{ base: "100%" }}
        borderY={"1px"}
        borderColor={"gray.300"}
      >
        <Flex>
          <Image cursor="pointer" src={cover_image_url} alt="Cover Pic" />
        </Flex>
        <Flex
          direction="column"
          justify="center"
          w="100%"
          px={{ base: 2, sm: 4 }}
        >
          <Flex justify="space-between" align="center" w="100%">
            <Flex
              direction={"column"}
              mt={{ sm: "-14%" }}
              border={"4px"}
              borderColor="white"
              borderRadius="full"
              w="20%"
              shrink={0}
            >
              <Image
                cursor="pointer"
                borderRadius="full"
                src={getProfileImage(profile_image_url, firstname, lastname)}
                alt="Profile"
              />
            </Flex>
            <EditProfile />
          </Flex>
          <Flex direction="column" w="100%" my={2} wrap="wrap">
            <Text fontWeight={"extrabold"} fontSize={"1.3rem"}>
              {firstname} {lastname}
            </Text>
            <Text fontSize={"1rem"} color={"gray.600"}>
              @{username}
            </Text>
          </Flex>
          <Flex fontSize="1rem" overflowWrap="break-word">
            {description}
          </Flex>
          <Flex wrap="wrap" my={3}>
            {location && (
              <Flex mr={4} mb={1} align="center">
                <Icon boxSize="1.3rem" as={GrLocation} />
                <Text ms={2}>{location}</Text>
              </Flex>
            )}
            {url && (
              <Flex align="center">
                <Icon boxSize="1.3rem" as={BiLink} />
                <Link color="accent.500" href={url} target="_blank">
                  {url}
                </Link>
              </Flex>
            )}
          </Flex>
          <Flex align="center">
            <Text mr={2} fontWeight={"extrabold"} fontSize={"1rem"}>
              {following.length}
            </Text>
            <Text mr={6} color={"gray.600"}>
              Following
            </Text>
            <Text mr={2} fontWeight={"extrabold"} fontSize={"1rem"}>
              {followers.length}
            </Text>
            <Text color={"gray.600"}>Followers</Text>
          </Flex>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
}

export default Profile;
