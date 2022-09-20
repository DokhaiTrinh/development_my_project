import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getAllUserApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_ALL_USER}?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&sortTypeAsc=${data.sortTypeAsc}`,
    userInfor.token
  );
};
export const getAllUserApi1 = (pageNo, pageSize, sortBy, sortTypeAsc) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_ALL_USER}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortTypeAsc=${sortTypeAsc}`,
    userInfor.token
  );
};
export const getUserByIdApi = (userId, searchType) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_BY_ID}?searchParam=${userId}&searchType=${searchType}`,
    userInfor.token
  );
};
export const getUserByRoleApi = (
  searchParam,
  searchType,
  pageNo,
  pageSize,
  sortBy,
  sortTypeAsc
) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_BY_ROLE}?searchParam=${searchParam}&searchType=${searchType}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortTypeAsc=${sortTypeAsc}`,
    userInfor.token
  );
};
