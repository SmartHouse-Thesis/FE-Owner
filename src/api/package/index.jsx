import axiosClient, { axiosFormClient } from "../axiosClient";
import { END_POINT_API } from "../endpoint";

const packageAPI = {
  getPackageDevices: (name) => {
    return axiosClient.get(
      `${END_POINT_API.DEVICE_PACKAGE}?name=${name}&status=Active`
    );
  },
  getPackageDevicesList: () => {
    return axiosClient.get(
      `${END_POINT_API.DEVICE_PACKAGE}?status=Active&pageSize=200`
    );
  },
  getPackageDevicesListContract: (manuName) => {
    return axiosClient.get(
      `${END_POINT_API.DEVICE_PACKAGE}?manufacturerName=${manuName}&status=Active&pageSize=200`
    );
  },
  getPackageDevicesById: (packageId) => {
    return axiosClient.get(`${END_POINT_API.DEVICE_PACKAGE}/${packageId}`);
   },
   updateDevicePackage: (params, packageId) => axiosFormClient.put(`${END_POINT_API.DEVICE_PACKAGE}/${packageId}`, params)
};

export default packageAPI;
