import axiosClient from "../axiosClient";
import { END_POINT_API } from "../endpoint";

const promotionAPI = {
  getPromotion: (name) => {
    return axiosClient.get(
      `${END_POINT_API.PROMOTION}?name=${name}`
    );
  },
};

export default promotionAPI;
