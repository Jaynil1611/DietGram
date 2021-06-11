import { Box, Flex, Image, Text, Icon } from "@chakra-ui/react";
import {
  IoMdHeartEmpty,
  IoMdHeart,
  IoBookmarkOutline,
  IoBookmark,
  IoShareSocialOutline,
} from "react-icons/all";
import { BeautifyContent } from "../../utils";
import { getProfileImage, getTime } from "../../utils/postUtils";

function PostCard({
  id,
  userId: { firstname, lastname, username, profile_image_url },
  content,
  createdAt,
  likes: { count, reactors },
}) {
  return (
    <Box
      key={id}
      p={3}
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
          <Flex direction={"column"}>
            <Flex justify={"space-between"} w={"100%"}>
              <Flex align={"center"} wrap={"wrap"}>
                <Text fontWeight={"bold"} fontSize={"1rem"}>
                  {firstname} {lastname}
                </Text>
                <Text ms={1} fontSize={"0.9rem"} color={"gray.600"}>
                  @{username}
                </Text>
                <Text ms={{ sm: 2 }} fontSize={"0.9rem"} color={"gray.600"}>
                  {getTime(createdAt)}
                </Text>
              </Flex>
            </Flex>
            <Flex my={1} className="content" overflowWrap={"break-word"}>
              <BeautifyContent content={content} />
            </Flex>
            <Flex
              justify={"space-between"}
              maxW={{ base: "200px", sm: "300px" }}
              align={"center"}
              mt={1}
            >
              <Flex align={"center"}>
                <Icon boxSize="1.3rem" as={IoMdHeartEmpty} />
                <Text px={2}>{count}</Text>
              </Flex>
              <Icon boxSize="1.3rem" as={IoBookmarkOutline} />
              <Icon boxSize="1.3rem" as={IoShareSocialOutline} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default PostCard;
