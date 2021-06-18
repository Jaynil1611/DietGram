import { Box, Flex, Image, Text, Tag, Link, Button } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router";
import { getProfileImage } from "../../utils";
import { selectCurrentUserId } from "../currentUser/currentUserSlice";
import {
  getUsersStatus,
  selectUserById,
  Loader,
  Header,
  getFollowStatus,
  getFollow,
  clearFollowStatus,
} from "../index";

function Follow() {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectCurrentUserId);
  const id = location?.state?.id ?? currentUserId;
  const status = useSelector(getUsersStatus);
  const followStatus = useSelector(getFollowStatus);
  const user = useSelector((state) => selectUserById(state, id));

  useEffect(() => {
    if (followStatus === "idle") {
      dispatch(getFollow({ userId: id }));
    }
    return () => dispatch(clearFollowStatus());
  }, [dispatch, id]);

  return (
    <>
      {(followStatus === "loading" || status === "loading") && <Loader />}
      {status === "fulfilled" && followStatus === "fulfilled" && id && (
        <FollowTabs {...user} />
      )}
      <Outlet />
    </>
  );
}

const FollowTabs = ({ fullname, following, followers }) => {
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
              <PeopleCard key={followee.id} {...followee} />
            ))}
          </TabPanel>
          <TabPanel>
            {followers.map((follower) => (
              <PeopleCard key={follower.id} {...follower} type="follower" />
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export const PeopleCard = ({ fullname, profile_image_url, username, type }) => {
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
              {type !== "follower" && (
                <Tag me={4} p={1}>
                  Follows you
                </Tag>
              )}
            </Flex>
          </Flex>
          <Flex mx={4} align="center">
            <Button borderRadius="full" p={4}>
              Follow
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default Follow;
