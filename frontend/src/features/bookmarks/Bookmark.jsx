import { Box, Text, VStack } from "@chakra-ui/react";
import { checkCurrentUserStatus } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookmarks,
  getBookmarkStatus,
  Header,
  Loader,
  selectAllBookmarks,
  PostCard,
  selectPostById,
} from "../index";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Bookmark() {
  const dispatch = useDispatch();
  const status = useSelector(checkCurrentUserStatus);
  const bookmarkStatus = useSelector(getBookmarkStatus);
  const bookmarks = useSelector(selectAllBookmarks);

  useEffect(() => {
    if (bookmarkStatus === "idle") {
      dispatch(getBookmarks());
    }
  }, [bookmarkStatus, dispatch]);

  return (
    <>
      <Header text={"Bookmarks"} back={true} />
      {(status === "loading" || bookmarkStatus === "loading") && <Loader />}
      {status === "fulfilled" && bookmarkStatus === "fulfilled" && (
        <>
          {bookmarks.length === 0 && (
            <Text textAlign="center" mt={"2rem"} fontSize="lg">
              You don't have any bookmarks yet
            </Text>
          )}
          {bookmarks.length > 0 && (
            <VStack mt={"1rem"} spacing={1} align="flex-start">
              {bookmarks.map((bookmark) => {
                return <BookmarkCard key={bookmark.id} {...bookmark} />;
              })}
            </VStack>
          )}
        </>
      )}
    </>
  );
}

const BookmarkCard = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));
  return (
    <>
      {post && (
        <Box w="100%">
          <Link to={`/posts/${postId}`}>
            <PostCard {...post} />
          </Link>
        </Box>
      )}
    </>
  );
};

export default Bookmark;
