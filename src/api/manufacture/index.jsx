import axiosClient from "../axiosClient";
import { END_POINT_API } from "../endpoint";

const manufactureAPI = {
  getManufacture: (name) => {
    return axiosClient.get(
      `${END_POINT_API.MANUFACTURE}?name=${name}&status=Active`
    );
  },
};

export default manufactureAPI;
