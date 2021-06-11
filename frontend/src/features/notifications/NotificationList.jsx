import { Box, Flex, Image, Text, Icon } from "@chakra-ui/react";
import { Header } from "../index";
import { intialState } from "../../database/fakeData";
import {
  IoMdHeartEmpty,
  IoMdHeart,
  IoBookmarkOutline,
  IoBookmark,
  IoShareSocialOutline,
  BsThreeDots,
} from "react-icons/all";
import { BeautifyContent, getProfileImage } from "../../utils";
import { Outlet } from "react-router";

function NotificationList() {
  const {
    content,
    likes: { count, reactors },
  } = intialState.posts[0];
  const { firstname, lastname, username, profile_image_url } = reactors[0];
  return (
    <>
      <Header text={"Notifications"} />
      <Box
        mt="1rem"
        w={{ base: "100%" }}
        borderY={"1px"}
        borderColor={"gray.300"}
      >
        <Flex direction="column" justify="center">
          <Flex p={4}>
            <Flex
              direction={"column"}
              basis={"48px"}
              mr={3}
              shrink={0}
              align="center"
            >
              <Icon boxSize="2.2rem" as={IoMdHeart} color="accent.600" />
            </Flex>
            <Flex direction="column" w="100%">
              <Flex mb={2}>
                <Image
                  boxSize="2.5rem"
                  borderRadius="full"
                  src={getProfileImage(profile_image_url, firstname, lastname)}
                  alt="Profile"
                />
              </Flex>
              <Flex>
                <Text mr={1} fontWeight="semibold">
                  {firstname + " " + lastname}
                </Text>
                <Text>liked your post</Text>
              </Flex>
              <Flex mt={2} className="content">
                <BeautifyContent content={content} />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
}

export default NotificationList;
