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
            <PrivateRoute path="posts/:postId" element={<PostDetailCard />} />
            <PrivateRoute path="" element={<PostListing />} />
            <PrivateRoute path="profile" element={<Timeline />} />
            <PrivateRoute path=":username" element={<Timeline />} />
            <PrivateRoute path="notifications" element={<NotificationList />} />
            <PrivateRoute path="profile/follow" element={<Follow />} />
            <PrivateRoute path=":username/follow" element={<Follow />} />
            <PrivateRoute path="/hashtag/:name" element={<Hashtag />} />
            <PrivateRoute path="/bookmarks" element={<Bookmark />} />
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
