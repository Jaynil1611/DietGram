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
  checkLikeStatus,
  checkPostAndUserStatus,
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
} from "../index";
import EditPost from "./EditPost";
import { deletePost } from "./postsSlice";

function PostDetailCard() {
  const { postId } = useParams();
  const status = useSelector(checkPostAndUserStatus);
  return (
    <>
      {status !== "fulfilled" && <Loader />}
      {status === "fulfilled" && <PostDetailCardView postId={postId} />}
    </>
  );
}

function PostDetailCardView({ postId }) {
  const {
    id,
    userId,
    content,
    createdAt,
    likes: { count, reactedUsers },
  } = useSelector((state) => selectPostById(state, postId));

  const { fullname, username, profile_image_url } = useSelector((state) =>
    selectUserById(state, userId)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserId = useSelector(selectCurrentUserId);

  const getLikeStatus = () => {
    return checkLikeStatus(reactedUsers, currentUserId)
      ? IoMdHeart
      : IoMdHeartEmpty;
  };

  const removePost = () => {
    dispatch(deletePost({ post: { id } }));
    navigate("/");
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
                <Flex justify={"center"} direction={"column"}>
                  <Text fontWeight={"bold"} fontSize={"1.2rem"}>
                    {fullname}
                  </Text>
                  <Text fontSize={"1rem"} color={"gray.600"}>
                    @{username}
                  </Text>
                </Flex>
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
                color="accent.500"
                as={getLikeStatus()}
                cursor={"pointer"}
              />
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