import axiosClient from "../axiosClient";
import { END_POINT_API } from "../endpoint";

const userLoginApi = {
  getUserInfo: (page) => {
    return axiosClient.get(
      `${END_POINT_API.USER}`
    );
  },
};

export default userLoginApi;
