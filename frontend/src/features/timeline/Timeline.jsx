import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Loader } from "../index";
import { Profile, PostListing, NotFound } from "../index";
import { getUsersStatus, selectUserByName } from "../users/usersSlice";

function Timeline() {
  const { username } = useParams();
  const status = useSelector(getUsersStatus);

  return (
    <>
      {status === "loading" && <Loader />}
      {status === "fulfilled" && <TimelineCard username={username} />}
    </>
  );
}

function TimelineCard({ username }) {
  const [user] = useSelector((state) => selectUserByName(state, username));
  if (username && !user) {
    return (
      <>
        <NotFound text={"The user you're looking for doesn't exist"} />
      </>
    );
  }

  return (
    <>
      <Profile user={user} />
      <PostListing user={user} type={"Timeline"} />
    </>
  );
}

export default Timeline;
