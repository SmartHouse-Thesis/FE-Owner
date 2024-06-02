import axiosClient from '../axiosClient';
import { END_POINT_API } from '../endpoint';

const staffAPI = {
  getListStaff: (page) => {
    return axiosClient.get(`${END_POINT_API.STAFF}?status=Active`);
  },
  getLeadStaffById: (surveyDate) => {
    return axiosClient.get(`${END_POINT_API.LEADER_STAFF}?surveyDate=${surveyDate}`)
  },
  getLeadStaffAll: () => {
    return axiosClient.get(`${END_POINT_API.LEADER}`)
  }
  
};
export default staffAPI;
