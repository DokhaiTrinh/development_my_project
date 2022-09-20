import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getAllTaskApi = (pageNo, pageSize, sortBy, sortTypeAsc) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  console.log(userInfor.token);
  return axiosService.get(
    `${API_LINK.GET_ALL_TASK}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortTypeAsc=${sortTypeAsc}`,
    userInfor.token
  );
};
export const getTaskByProjectId = (
  projectId,
  searchType,
  pageNo,
  pageSize,
  sortBy,
  sortTypeAsc
) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  console.log(userInfor.token);
  return axiosService.get(
    `${API_LINK.GET_TASK_BY_PROJECT_ID}?searchParam=${projectId}&searchType=${searchType}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortTypeAsc=${sortTypeAsc}`,
    userInfor.token
  );
};
