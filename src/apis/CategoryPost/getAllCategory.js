import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getAllCategoryApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_ALL_CATEGORY}?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&sortTypeAsc=${data.sortTypeAsc}`,
    userInfor.token
  );
};
export const getAllCategoryApi1 = (pageNo, pageSize, sortBy, sortTypeAsc) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_ALL_CATEGORY}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortTypeAsc=${sortTypeAsc}`,
    userInfor.token
  );
};
export const getCategoryByIdApi = (categoryId, searchType) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_CATEGORY_BY_ID}?searchParam=${categoryId}&searchType=${searchType}`,
    userInfor.token
  );
};
