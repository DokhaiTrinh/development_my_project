import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getProjectByIdApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return (
    axiosService.get(
      `${API_LINK.GET_ALL_BY_ID}?pageNo=${data.pageNo}&pageSize=${data.pageSize}&projectId=${data.projectId}&sortBy=${data.sortBy}&sortTypeAsc=${data.sortTypeAsc}`
    ),
    userInfor.token
  );
};
export const getProjectByParam = (projectId, searchType) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_BY_PARAM}?searchParam=${projectId}&searchType=${searchType}`,
    userInfor.token
  );
};
