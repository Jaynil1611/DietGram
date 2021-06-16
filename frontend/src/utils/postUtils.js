import { parseISO, formatDistanceToNowStrict } from "date-fns";

export const getProfileImage = (url, fullname) => {
  return url && url.length > 0
    ? url
    : `https://ui-avatars.com/api/?name=${fullname}&rounded=true&background=fd7014&color=fff&size=32`;
};

const timeMap = {
  seconds: "s",
  minutes: "m",
  hours: "h",
  days: "d",
  day: "d",
  months: "mo",
  month: "mo",
  year: "y",
  years: "y",
};

export const getTime = (timestamp) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const [time, timeUnit] = formatDistanceToNowStrict(date).split(" ");
    timeAgo = `${time + timeMap[timeUnit]}`;
  }
  return timeAgo;
};

export const getDate = (timestamp) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  };

  if (timestamp) {
    const date = parseISO(timestamp).toLocaleString("en-US", options);
    return date;
  }
};

export const showBackButton = (back) => !(back === false);

export const checkPostAndUserStatus = (state) => {
  const postStatus = state.posts.status;
  const userStatus = state.users.status;
  return postStatus === "fulfilled" && userStatus === "fulfilled"
    ? "fulfilled"
    : postStatus === "loading" || userStatus === "loading"
    ? "loading"
    : "rejected";
};

export const checkLikeStatus = (reactedUsers, userId) => {
  return reactedUsers.find((user) => user.id === userId) ? true : false;
};
