import { parseISO, formatDistanceToNowStrict } from "date-fns";

export const getProfileImage = (url, firstname, lastname) => {
  return (
    url ??
    `https://ui-avatars.com/api/?name=${firstname}+${lastname}&rounded=true&background=fd7014&color=fff&size=32`
  );
};

const timeMap = {
  seconds: "s",
  minutes: "m",
  hours: "h",
  days: "d",
  months: "mo",
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
