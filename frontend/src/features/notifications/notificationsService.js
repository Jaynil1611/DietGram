import axios from "axios";
import { constructURL } from "../../utils";
import { selectAllNotifications } from "./notificationsSlice";

export const getNotificationsService = async (_, { getState }) => {
  const [latestNotification] = selectAllNotifications(getState());
  const latestTimestamp = latestNotification
    ? latestNotification.createdAt
    : getDate();
  const response = await axios.get(
    `${constructURL()}/notifications?since=${latestTimestamp}`
  );
  return response.data;
};

const getDate = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString();
};
