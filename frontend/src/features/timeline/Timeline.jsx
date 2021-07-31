import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { checkPostAndUserStatus } from "../../utils";
import {
  Profile,
  PostListing,
  NotFound,
  selectUserByName,
  Loader,
} from "../index";

function Timeline() {
  const { username } = useParams();
  const status = useSelector(checkPostAndUserStatus);

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
