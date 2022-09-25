import { Box, Flex, Image, Text, Icon, Link, Button } from "@chakra-ui/react";
import { GrLocation } from "react-icons/gr";
import { BiLink } from "react-icons/bi";
import {
  checkCurrentUserFollowStatus,
  getProfileImage,
  primaryButtonStyleProps,
} from "../../utils";
import EditProfile from "./EditProfile";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getUsersStatus,
  Header,
  unfollowUser,
  Loader,
} from "../index";
import { selectUserById } from "../users/usersSlice";
import { selectCurrentUserId } from "../currentUser/currentUserSlice";
import { Link as RouterLink } from "react-router-dom";

function Profile({ user }) {
  const userStatus = useSelector(getUsersStatus);
  const currentUserId = useSelector(selectCurrentUserId);
  const currentUser = useSelector((state) =>
    selectUserById(state, currentUserId)
  );
  return (
    <>
      {userStatus === "loading" && <Loader />}
      {userStatus === "fulfilled" && (
        <ProfileCard user={user ?? currentUser} currentUserId={currentUserId} />
      )}
    </>
  );
}

function ProfileCard({
  user: {
    id,
    fullname,
    username,
    profile_image_url,
    cover_image_url,
    location,
    bio,
    url,
    followers,
    following,
  },
  currentUserId,
}) {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) =>
    selectUserById(state, currentUserId)
  );

  const followOrUnfollowUser = () => {
    const userId = id;
    isFollowing
      ? dispatch(unfollowUser({ userId }))
      : dispatch(followUser({ userId }));
  };

  const isFollowing = checkCurrentUserFollowStatus(loggedUser, id);

  return (
    <>
      <Header text={`${fullname}`} />
      <Box
        p={{ base: 2, sm: 3 }}
        mt={"1rem"}
        w={{ base: "100%" }}
        borderY={"1px"}
        borderColor={"gray.300"}
      >
        <Flex pb={"30%"} bgColor="gray.100" w="100%">
          <Image loading="lazy" cursor="pointer" src={cover_image_url} />
        </Flex>
        <Flex
          direction="column"
          justify="center"
          w="100%"
          px={{ base: 2, sm: 4 }}
        >
          <Flex justify="space-between" align="flex-end" w="100%">
            <Flex
              direction={"column"}
              mt={{ sm: "-11%" }}
              border={"4px"}
              borderColor="white"
              borderRadius="full"
              w="20%"
              shrink={0}
            >
              <Image
                loading="lazy"
                cursor="pointer"
                borderRadius="full"
                src={getProfileImage(profile_image_url, fullname)}
                alt="Profile"
              />
            </Flex>
            {currentUserId === id ? (
              <EditProfile />
            ) : (
              <Button
                onClick={followOrUnfollowUser}
                {...primaryButtonStyleProps}
                maxW="max-content"
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </Flex>
          <Flex direction="column" w="100%" my={2} wrap="wrap">
            <Text fontWeight={"extrabold"} fontSize={"1.3rem"}>
              {fullname}
            </Text>
            <Text fontSize={"1rem"} color={"gray.600"}>
              @{username}
            </Text>
          </Flex>
          <Flex fontSize="1rem" overflowWrap="break-word">
            {bio}
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
          <RouterLink to={`follow`} state={{ id }}>
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
          </RouterLink>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
}

export default Profile;
