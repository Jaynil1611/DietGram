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
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  IoMdHeartEmpty,
  IoMdHeart,
  IoBookmarkOutline,
  IoBookmark,
  IoShareSocialOutline,
  BsThreeDots,
} from "react-icons/all";
import {
  checkBookmarkExists,
  checkCurrentUserStatus,
  checkLikeStatus,
  getDate,
  getProfileImage,
} from "../../utils";
import { Outlet, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPostById,
  BeautifyContent,
  Header,
  Loader,
  selectUserById,
  selectCurrentUserId,
  getBookmarkStatus,
  selectAllBookmarks,
  deleteBookmark,
  postBookmark,
} from "../index";
import EditPost from "./EditPost";
import { deletePost, updateLikes } from "./postsSlice";
import { Link } from "react-router-dom";

function PostDetailCard() {
  const { postId } = useParams();
  const status = useSelector(checkCurrentUserStatus);
  const bookmarkStatus = useSelector(getBookmarkStatus);

  return (
    <>
      {status !== "fulfilled" && <Loader />}
      {status === "fulfilled" && bookmarkStatus === "fulfilled" && (
        <PostDetailCardView postId={postId} />
      )}
    </>
  );
}

function PostDetailCardView({ postId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    id,
    userId,
    content,
    createdAt,
    likes: { count, reactedUsers },
  } = useSelector((state) => selectPostById(state, postId));
  const bookmarks = useSelector(selectAllBookmarks);
  const { fullname, username, profile_image_url } = useSelector((state) =>
    selectUserById(state, userId)
  );
  const currentUserId = useSelector(selectCurrentUserId);

  const likeButtonPressed = (e) => {
    e.preventDefault();
    dispatch(updateLikes({ id }));
  };

  const getLikeStatus = () => {
    return checkLikeStatus(reactedUsers, currentUserId)
      ? IoMdHeart
      : IoMdHeartEmpty;
  };

  const removePost = () => {
    dispatch(deletePost({ post: { id } }));
    navigate("/");
  };

  const bookmarkExists = checkBookmarkExists(bookmarks, id);
  const bookmarkButtonPressed = (e) => {
    e.preventDefault();
    bookmarkExists
      ? dispatch(deleteBookmark({ id }))
      : dispatch(postBookmark({ id }));
  };

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
        <Flex direction={"column"}>
          <Flex>
            <Flex direction={"column"} basis={"48px"} mr={3} shrink={0}>
              <Image
                loading="lazy"
                borderRadius="full"
                src={getProfileImage(profile_image_url, fullname)}
                alt="Profile"
              />
            </Flex>
            <Flex direction={"column"} w={"100%"}>
              <Flex justify={"space-between"}>
                <Link to={`/${username}`}>
                  <Flex justify={"center"} direction={"column"}>
                    <Text fontWeight={"bold"} fontSize={"1.2rem"}>
                      {fullname}
                    </Text>
                    <Text fontSize={"1rem"} color={"gray.600"}>
                      @{username}
                    </Text>
                  </Flex>
                </Link>
                {currentUserId === userId && (
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<BsThreeDots />}
                      variant="outline"
                    />
                    <MenuList>
                      <MenuItem closeOnSelect={false}>
                        <EditPost post={{ id, content }} />
                      </MenuItem>
                      <MenuItem color="acccent.700" onClick={removePost}>
                        Delete Post
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </Flex>
            </Flex>
          </Flex>
          <Flex
            my={3}
            className="content"
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
              <Icon
                boxSize="1.5rem"
                onClick={likeButtonPressed}
                color="accent.500"
                as={getLikeStatus()}
                cursor={"pointer"}
              />
              <Text px={2}>{count}</Text>
            </Flex>
            <Icon
              boxSize="1.5rem"
              onClick={bookmarkButtonPressed}
              as={bookmarkExists ? IoBookmark : IoBookmarkOutline}
              cursor={"pointer"}
            />
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
