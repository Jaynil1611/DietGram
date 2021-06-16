import { Box, Flex, Image, Text, Icon, Button } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import {
  Header,
  BeautifyContent,
  Loader,
  selectUserById,
  selectPostById,
} from "../index";
import {
  checkPostAndUserStatus,
  getColor,
  getIcon,
  getProfileImage,
  getText,
  primaryButtonStyleProps,
} from "../../utils";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  getNotificationsStatus,
  refreshNotifications,
  selectAllNotifications,
} from "./notificationsSlice";
import { Link } from "react-router-dom";

function NotificationList() {
  const dispatch = useDispatch();
  const notificationStatus = useSelector(getNotificationsStatus);
  const notifications = useSelector(selectAllNotifications);
  const combinedStatus = useSelector(checkPostAndUserStatus);

  const handleRefresh = () => {
    dispatch(refreshNotifications());
  };

  useEffect(() => {
    if (notificationStatus === "idle") dispatch(getNotifications());
  }, [dispatch, notificationStatus]);

  return (
    <>
      <Header text={"Notifications"} />
      {notificationStatus === "loading" && <Loader />}
      {notificationStatus === "fulfilled" && notifications.length === 0 && (
        <Text textAlign="center" mt={7}>
          You're all caught up
        </Text>
      )}
      <Box textAlign="center">
        <Button
          mt={4}
          maxW="max-content"
          {...primaryButtonStyleProps}
          leftIcon={<RepeatIcon />}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </Box>
      {notificationStatus === "fulfilled" &&
        combinedStatus === "fulfilled" &&
        notifications.length > 0 && (
          <>
            <Box
              mt="1rem"
              w={{ base: "100%" }}
              borderY={"1px"}
              borderColor={"gray.300"}
            >
              <Flex direction="column" justify="center">
                {notifications.map((notification) => {
                  const { id, type } = notification;
                  return (
                    <Flex key={id} p={4}>
                      <Flex
                        direction={"column"}
                        basis={"48px"}
                        mr={3}
                        shrink={0}
                        align="center"
                      >
                        <Icon
                          boxSize="2.2rem"
                          as={getIcon(type)}
                          color={getColor(type)}
                        />
                      </Flex>
                      <NotificationDisplay {...notification} />
                    </Flex>
                  );
                })}
              </Flex>
            </Box>
          </>
        )}
      <Outlet />
    </>
  );
}

const NotificationDisplay = ({ postId, originUser, type }) => {
  const { profile_image_url, fullname } = useSelector((state) =>
    selectUserById(state, originUser)
  );
  const { content } = useSelector((state) => selectPostById(state, postId));

  return (
    <Link to={`/posts/${postId}`} w="100%">
      <Flex direction="column" w="100%">
        <Flex mb={2}>
          <Image
            loading="lazy"
            boxSize="2.5rem"
            borderRadius="full"
            src={getProfileImage(profile_image_url, fullname)}
            alt="Profile"
          />
        </Flex>
        <Flex>
          <Text mr={1} fontWeight="semibold">
            {fullname}
          </Text>
          <Text>{getText(type)}</Text>
        </Flex>
        <Flex mt={2} className="content">
          <BeautifyContent content={content} />
        </Flex>
      </Flex>
    </Link>
  );
};

export default NotificationList;