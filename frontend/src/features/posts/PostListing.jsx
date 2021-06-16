import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import PostCard from "./PostCard";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import { useSelector } from "react-redux";
import { selectAllPosts, selectCurrentUser } from "../index";
import Loader from "./Loader";
import { checkPostAndUserStatus } from "../../utils";

function PostListing({ user, type }) {
  const posts = useSelector(selectAllPosts);
  const status = useSelector(checkPostAndUserStatus);
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      {type !== "Timeline" && <Header text={"Home"} back={false} />}
      {status === "loading" && <Loader />}
      {status === "fulfilled" && (
        <VStack mt={"1rem"} spacing={1} align="flex-start">
          {posts.map((post) => {
            const { id } = post;
            return (
              <Box w="100%" key={id}>
                <Link to={`/posts/${id}`}>
                  <PostCard {...post} user={user ?? currentUser} type={type} />
                </Link>
              </Box>
            );
          })}
        </VStack>
      )}
      <Outlet />
    </>
  );
}

export default PostListing;
