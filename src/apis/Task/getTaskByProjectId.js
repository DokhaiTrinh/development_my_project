import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getTaskByProjectIdApi = (
  pageNo,
  pageSize,
  projectId,
  searchType,
  soryBy,
  sortTypeAsc
) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_TASK_BY_PROJECT_ID}?pageNo=${pageNo}&pageSize=${pageSize}&searchParam=${projectId}&searchType=${searchType}&sortBy=${soryBy}&sortTypeAsc=${sortTypeAsc}`,
    userInfor.token
  );
};

export const getTaskByIdApi = (taskId, searchType) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_TASK_BY_ID}?searchParam=${taskId}&searchType=${searchType}`,
    userInfor.token
  );
};
