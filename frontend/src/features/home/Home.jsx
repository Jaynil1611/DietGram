import {
  PostListing,
  DesktopNav,
  PostDetailCard,
  NotificationList,
  Updates,
  PrivateRoute,
  Follow,
  Timeline,
  NotFound,
  Bookmark,
  Hashtag,
} from "../index";
import { Route, Routes } from "react-router";
import { Box, SimpleGrid } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";

function Home() {
  const [isDesktopMode, showUpdates] = useMediaQuery([
    "(min-width: 30em)",
    "(min-width: 62em)",
  ]);
  return (
    <>
      {isDesktopMode && (
        <Box>
          <DesktopNav />
        </Box>
      )}
      <SimpleGrid
        gap={"1rem"}
        templateColumns={{ lg: "2fr 1fr", md: "1fr" }}
        ml={{ lg: "320px", md: "250px", sm: "200px" }}
      >
        <Box borderX={"1px solid"} minH="91.5vh" borderColor={"gray.300"}>
          <Routes>
            <Route
              path="posts/:postId"
              element={
                <PrivateRoute path="posts/:postId">
                  <PostDetailCard />
                </PrivateRoute>
              }
            />
            <Route
              path=""
              element={
                <PrivateRoute path="">
                  <PostListing />
                </PrivateRoute>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateRoute path="profile">
                  <Timeline />
                </PrivateRoute>
              }
            />
            <Route
              path=":username"
              element={
                <PrivateRoute path=":username">
                  <Timeline />
                </PrivateRoute>
              }
            />
            <Route
              path="notifications"
              element={
                <PrivateRoute path="notifications">
                  <NotificationList />
                </PrivateRoute>
              }
            />
            <Route
              path="profile/follow"
              element={
                <PrivateRoute path="profile/follow">
                  <Follow />
                </PrivateRoute>
              }
            />
            <Route
              path=":username/follow"
              element={
                <PrivateRoute path=":username/follow">
                  <Follow />
                </PrivateRoute>
              }
            />
            <Route
              path="/hashtag/:name"
              element={
                <PrivateRoute path="/hashtag/:name">
                  <Hashtag />
                </PrivateRoute>
              }
            />
            <Route
              path="/bookmarks"
              element={
                <PrivateRoute path="/bookmarks">
                  <Bookmark />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
        {showUpdates && (
          <Box display={isDesktopMode ? "block" : "none"} ps={3} pe={7}>
            <Updates />
          </Box>
        )}
      </SimpleGrid>
    </>
  );
}

export default Home;
