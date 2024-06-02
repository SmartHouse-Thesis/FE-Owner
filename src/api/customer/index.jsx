import axiosClient from '../axiosClient';
import { END_POINT_API } from '../endpoint';

const customerAPI = {
  getCustomer: (page) => {
    return axiosClient.get(`${END_POINT_API.CUSTOMER}?status=Active`);
  },
  getCustomerbyId: (customerId) => {
    return axiosClient.get(`${END_POINT_API.CUSTOMER}/${customerId}`)
  }
  
};
export default customerAPI;
