import axiosClient from '../axiosClient';
import { END_POINT_API } from '../endpoint';

const surveyReport = {
  getSurveyReport: (page) => {
    return axiosClient.get(`${END_POINT_API.SURVEY_REPORT}?status=Inprogress`);
  },
  createSurveyReport: (params) => {
    axiosClient.post(END_POINT_API.SURVEY_REPORT, params);
  },
  getSurveyReportById: (surveyId) => {
    return axiosClient.get(`${END_POINT_API.SURVEY_REPORT}/${surveyId}`);
  },
  updateSurveyReport: (contractId, params) => axiosClient.put(`${END_POINT_API.SURVEY_REPORT}/${contractId}`, params)
  
};
export default surveyReport;
