import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getReportByProjectIdApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_REPORT_BY_PROJECT_ID}?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&searchParam=${data.projectId}&searchType=${data.searchType}&sortTypeAsc=${data.sortTypeAsc}`,
    userInfor.token
  );
};
export const getReportById = (reportId, searchType) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_REPORT_BY_PROJECT_ID1}?searchParam=${reportId}&searchType=${searchType}`,
    userInfor.token
  );
};
