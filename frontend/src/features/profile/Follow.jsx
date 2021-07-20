import { Box, Flex, Image, Text, Tag, Link, Button } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router";
import {
  checkCurrentUserFollowerStatus,
  checkCurrentUserStatus,
  getProfileImage,
  primaryButtonStyleProps,
} from "../../utils";
import {
  selectUserById,
  Loader,
  Header,
  getFollowStatus,
  getFollow,
  clearFollowStatus,
  followUser,
  unfollowUser,
  selectCurrentUser,
} from "../index";
import { Link as RouterLink } from "react-router-dom";

function Follow() {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUserLogged = useSelector(selectCurrentUser);
  const id = location?.state?.id ?? currentUserLogged?.id;
  const status = useSelector(checkCurrentUserStatus);
  const followStatus = useSelector(getFollowStatus);
  const user = useSelector((state) => selectUserById(state, id));
  const currentUser = useSelector((state) =>
    selectUserById(state, currentUserLogged?.id)
  );

  useEffect(() => {
    if (followStatus === "idle") {
      return dispatch(getFollow({ userId: id }));
    }
  }, [dispatch, followStatus]);

  useEffect(() => {
    dispatch(clearFollowStatus());
  }, [dispatch, id]);

  return (
    <>
      {(followStatus === "loading" || status === "loading") && <Loader />}
      {status === "fulfilled" && followStatus === "fulfilled" && id && (
        <FollowTabs {...user} currentUser={currentUser} />
      )}
      <Outlet />
    </>
  );
}

const FollowTabs = ({ fullname, following, followers, currentUser }) => {
  return (
    <>
      <Header text={`${fullname}`} />
      <Tabs mt={6} p={2} variant="solid-rounded" isFitted w="100%">
        <TabList>
          <Tab
            _selected={{ bgColor: "accent.400" }}
            _focus={{ outline: "none" }}
          >
            Following
          </Tab>
          <Tab
            _selected={{ bgColor: "accent.400" }}
            _focus={{ outline: "none" }}
          >
            Followers
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {following.map((followee) => (
              <PeopleCard
                key={followee.id}
                {...followee}
                isFollower={checkCurrentUserFollowerStatus(
                  currentUser.followers,
                  followee.id
                )}
              />
            ))}
          </TabPanel>
          <TabPanel>
            {followers.map((follower) => (
              <PeopleCard
                key={follower.id}
                {...follower}
                type={"followers"}
                isFollower={checkCurrentUserFollowerStatus(
                  currentUser.following,
                  follower.id
                )}
              />
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export const PeopleCard = ({
  id,
  fullname,
  profile_image_url,
  username,
  isFollower,
  type,
}) => {
  const dispatch = useDispatch();

  const follow = (userId) => {
    isFollower
      ? dispatch(unfollowUser({ userId }))
      : dispatch(followUser({ userId }));
  };

  return (
    <Link to="" _hover={{ textDecoration: "none" }}>
      <Box py={2} borderY="1px solid" borderColor="gray.300">
        <Flex wrap="wrap">
          <Flex mx={4} direction="column" shrink="0" basis="48px">
            <Image
              loading="lazy"
              borderRadius="full"
              src={getProfileImage(profile_image_url, fullname)}
              alt="Profile"
            />
          </Flex>
          <RouterLink to={`/${username}`}>
            <Flex direction="column" wrap="wrap">
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
                  w="100px"
                >
                  @{username}
                </Text>
                {isFollower && !type && (
                  <Tag me={4} p={1}>
                    Follows you
                  </Tag>
                )}
              </Flex>
            </Flex>
          </RouterLink>
          <Flex justify="flex-end" grow={1} mx={4}>
            <Button
              {...primaryButtonStyleProps}
              maxW="max-content"
              onClick={() => follow(id)}
              height={"fit-content"}
            >
              {isFollower ? "Unfollow" : "Follow"}
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default Follow;
