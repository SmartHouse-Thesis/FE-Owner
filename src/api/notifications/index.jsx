import axiosClient from "../axiosClient";
import { END_POINT_API } from "../endpoint";

const notificationsAPI = {
  getNotification: () => {
    return axiosClient.get(
      `${END_POINT_API.NOTIFICATION}?&pageSize=20`
    );
  },
  
};

export default notificationsAPI;
