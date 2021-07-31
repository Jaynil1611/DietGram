import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import PostCard from "./PostCard";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import { useSelector } from "react-redux";
import { selectAllPosts, selectCurrentUser } from "../index";
import Loader from "./Loader";
import { checkCurrentUserStatus } from "../../utils";
import { selectPostsByUserId } from "./postsSlice";

function PostListing({ user, type }) {
  const status = useSelector(checkCurrentUserStatus);
  const posts = useSelector(selectAllPosts);
  const currentUser = useSelector(selectCurrentUser);
  const userPosts = useSelector((state) =>
    selectPostsByUserId(state, user ? user.id : currentUser?.id)
  );

  return (
    <>
      {type !== "Timeline" && <Header text={"Home"} back={false} />}
      {status === "loading" && <Loader />}
      {status === "fulfilled" && posts.length === 0 && (
        <Text textAlign="center" mt={7} fontSize="lg">
          Welcome
          <Text as="i" fontWeight="bold">
            {" " + currentUser.fullname}
          </Text>
          , start by adding a post or follow users to view their thoughts!
        </Text>
      )}
      {status === "fulfilled" && (
        <PostListingCard
          posts={type === "Timeline" ? userPosts : posts}
          user={user ?? currentUser}
          type={type}
        />
      )}
      <Outlet />
    </>
  );
}

const PostListingCard = ({ posts, ...rest }) => (
  <VStack mt={"1rem"} spacing={1} align="flex-start">
    {posts.map((post) => {
      const { id } = post;
      return (
        <Box w="100%" key={id}>
          <Link to={`/posts/${id}`}>
            <PostCard {...post} {...rest} />
          </Link>
        </Box>
      );
    })}
  </VStack>
);

export default PostListing;
