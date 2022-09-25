import { Box, Flex, Image, Text, Icon } from "@chakra-ui/react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import {
  IoBookmarkOutline,
  IoBookmark,
  IoShareSocialOutline,
} from "react-icons/io5";
import {
  BeautifyContent,
  selectCurrentUserId,
  selectUserById,
  selectAllBookmarks,
} from "../index";
import {
  checkBookmarkExists,
  checkLikeStatus,
  getProfileImage,
  getTime,
} from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { updateLikes } from "./postsSlice";
import { Link } from "react-router-dom";
import { deleteBookmark, postBookmark } from "../bookmarks/bookmarkSlice";
import { showToast } from "../toasts/Toast";

function PostCard({
  id,
  userId,
  user: timelineUser,
  content,
  createdAt,
  likes: { count, reactedUsers },
  type,
}) {
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectCurrentUserId);
  const user = useSelector((state) => selectUserById(state, userId));
  const bookmarks = useSelector(selectAllBookmarks);
  const { fullname, username, profile_image_url } =
    type === "Timeline" ? timelineUser : user;

  const likeButtonPressed = (e) => {
    e.preventDefault();
    dispatch(updateLikes({ id }));
  };

  const getLikeStatus = () => {
    return checkLikeStatus(reactedUsers, currentUserId)
      ? IoMdHeart
      : IoMdHeartEmpty;
  };

  const bookmarkExists = checkBookmarkExists(bookmarks, id);

  const bookmarkButtonPressed = (e) => {
    e.preventDefault();
    bookmarkExists
      ? dispatch(deleteBookmark({ id }))
      : dispatch(postBookmark({ id }));
  };

  const getPostShareLink = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(`${window.location.hostname}/posts/${id}`);
    showToast("Link copied to clipboard", "success");
  };

  return (
    <Box key={id} p={3} w={"100%"} borderY={"1px"} borderColor={"gray.300"}>
      <Flex direction={"column"}>
        <Flex w="100%">
          <Flex direction={"column"} basis={"48px"} mr={3} shrink={0}>
            <Image
              loading="lazy"
              borderRadius="full"
              src={getProfileImage(profile_image_url, fullname)}
              alt="Profile"
            />
          </Flex>
          <Flex direction={"column"} w="100%">
            <Flex justify={"space-between"} w={"100%"}>
              <Link to={`/${username}`}>
                <Flex align={"center"} wrap={"wrap"}>
                  <Text fontWeight={"bold"} textTransform="capitalize">
                    {fullname}
                  </Text>
                  <Text ms={1} fontSize={"0.9rem"} color={"gray.600"}>
                    @{username}
                  </Text>
                  <Text ms={{ sm: 2 }} fontSize={"0.9rem"} color={"gray.600"}>
                    {getTime(createdAt)}
                  </Text>
                </Flex>
              </Link>
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
                <Icon
                  onClick={likeButtonPressed}
                  boxSize="1.3rem"
                  color="accent.500"
                  as={getLikeStatus()}
                />
                <Text px={2}>{count}</Text>
              </Flex>
              <Icon
                onClick={bookmarkButtonPressed}
                boxSize="1.3rem"
                as={bookmarkExists ? IoBookmark : IoBookmarkOutline}
              />
              <Icon
                boxSize="1.3rem"
                onClick={getPostShareLink}
                as={IoShareSocialOutline}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default PostCard;
