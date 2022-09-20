import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getAllManagerApi1 = (
  pageNo,
  pageSize,
  roleId,
  searchType,
  sortBy,
  sortTypeAsc
) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_MANAGER}?pageNo=${pageNo}&pageSize=${pageSize}&searchParam=${roleId}&searchType=${searchType}&sortBy=${sortBy}&sortTypeAsc=${sortTypeAsc}`,
    userInfor.token
  );
};
export const getProjectByManagerApi = (
  pageNo,
  pageSize,
  projectId,
  searchType,
  sortBy,
  sortTypeAsc
) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_PROJECT_BY_MANAGER}?pageNo=${pageNo}&pageSize=${pageSize}&searchParam=${projectId}&searchType=${searchType}&sortBy=${sortBy}&sortTypeAsc=${sortTypeAsc}`,
    userInfor.token
  );
};
