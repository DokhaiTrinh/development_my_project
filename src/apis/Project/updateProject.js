import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const updateProjectApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.put(`${API_LINK.UPDATE_PROJECT}`, data, userInfor.token);
};
export const getProjectByParam = (projectId, searchType) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_BY_PARAM}?searchParam=${projectId}&searchType=${searchType}`,
    userInfor.token
  );
};
