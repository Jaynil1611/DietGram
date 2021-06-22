import axios from "axios";
import { constructURL, getPastDate } from "../../utils";
import { selectAllNotifications } from "./notificationsSlice";

export const getNotificationsService = async (_, { getState }) => {
  const [latestNotification] = selectAllNotifications(getState());
  const latestTimestamp = latestNotification
    ? latestNotification.createdAt
    : getPastDate();
  const response = await axios.get(
    `${constructURL()}/notifications?since=${latestTimestamp}`
  );
  return response.data;
};
