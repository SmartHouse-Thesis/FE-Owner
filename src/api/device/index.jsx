import axiosClient from "../axiosClient";
import { END_POINT_API } from "../endpoint";

const devicesAPI = {
  getSmartDevice: (name) => {
    return axiosClient.get(
      `${END_POINT_API.SMART_DEVICE}?name=${name}&status=Active&pageSize=60`
    );
  },
  getSmartDeviceByManu: (name) => {
    return axiosClient.get(
      `${END_POINT_API.SMART_DEVICE}?manufacturerName=${name}&status=Active&pageSize=100`
    );
  },
  getSmartDeviceAll: () => {
    return axiosClient.get(
      `${END_POINT_API.SMART_DEVICE}?status=Active&pageSize=60`
    );
  },
  getSmartDeviceById: (deviceId) =>
  axiosClient.get(`${END_POINT_API.SMART_DEVICE}/${deviceId}`),

};

export default devicesAPI;
