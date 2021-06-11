import React from "react";
import { VStack } from "@chakra-ui/react";
import { intialState } from "../../database/fakeData";
import PostCard from "./PostCard";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";

function PostListing() {
  return (
    <>
      <Header text={"Home"} back={false} />
      <VStack mt={"1rem"} spacing={1}>
        {intialState.posts.map((post) => {
          const { id } = post;
          return (
            <Link to={`/posts/${id}`} key={id}>
              <PostCard {...post} />
            </Link>
          );
        })}
      </VStack>
      <Outlet />
    </>
  );
}

export default PostListing;
