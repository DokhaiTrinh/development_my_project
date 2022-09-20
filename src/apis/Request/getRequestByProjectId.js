import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getRequestByProjectIdApi = (
  pageNo,
  pageSize,
  projectId,
  searchType,
  soryBy,
  sortTypeAsc
) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_REQUEST_BY_PROJECT_ID}?pageNo=${pageNo}&pageSize=${pageSize}&searchParam=${projectId}&searchType=${searchType}&sortBy=${soryBy}&sortTypeAsc=${sortTypeAsc}`,
    userInfor.token
  );
};
export const getRequestIdApi = (requestId, searchType) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_REQUEST_ID}?searchParam=${requestId}&searchType=${searchType}`,
    userInfor.token
  );
};
