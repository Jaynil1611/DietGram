import React from "react";
import {
  PostListing,
  DesktopNav,
  PostDetailCard,
  Profile,
  NotificationList,
  Updates,
  PrivateRoute,
} from "../index";
import { Routes } from "react-router";
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
        <Box borderX={"1px solid"} borderColor={"gray.300"}>
          <Routes>
            <PrivateRoute path="/posts/:postId" element={<PostDetailCard />} />
            <PrivateRoute path="/" element={<PostListing />} />
            <PrivateRoute path="/profile" element={<Profile />} />
            <PrivateRoute
              path="/notifications"
              element={<NotificationList />}
            />
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
