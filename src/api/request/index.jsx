import axiosClient from '../axiosClient';
import { END_POINT_API } from '../endpoint';


const surveyAPI = {
  getSurveyList: (page, name) => {
    return axiosClient.get(`${END_POINT_API.REQUEST_SURVEY}?status=Pending&name=${name}`);
  },
  getSurveyListProgress: (page) => {
    return axiosClient.get(`${END_POINT_API.SURVEY_REPORT}?status=Pending`);
  },
  createSurveyList: (params) =>
    axiosClient.post(END_POINT_API.REQUEST_SURVEY, params),
  getSurveyById: (surveyId) => {
    return axiosClient.get(`${END_POINT_API.REQUEST_SURVEY}/${surveyId}`);
  },
  updateSurveyRequest: (params, surveyId) => 
    axiosClient.put(`${END_POINT_API.REQUEST_SURVEY}/${surveyId}`, params),
  
  
  
};

export default surveyAPI;
