import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const createTaskApi1 = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.postCreateTask(
    `${API_LINK.CREATE_TASK_WITH_FILE}`,
    data,
    userInfor.token
  );
};
export const createTaskApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.post(`${API_LINK.CREATE_TASK}`, data, userInfor.token);
};
