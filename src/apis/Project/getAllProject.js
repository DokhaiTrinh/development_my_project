import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getAllProjectApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_ALL_PROJECT}?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&sortTypeAsc=${data.sortTypeAsc}`,
    userInfor.token
  );
};
export const getAllProjectApi1 = (pageNo, pageSize, sortBy, sortTypeAsc) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_ALL_PROJECT}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortTypeAsc=${sortTypeAsc}`,
    userInfor.token
  );
};
export const getAllProjectByManageApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_MANAGER_BY_PROJECT}?pageNo=${data.pageNo}&pageSize=${data.pageSize}&searchParam=${data.searchParam}&searchType=${data.searchType}&sortBy=${data.sortBy}&sortTypeAsc=${data.sortTypeAsc}`,
    userInfor.token
  );
};
