import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const updateTaskApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.put(API_LINK.UPDATE_TASK, data, userInfor.token);
};
export const updateTaskApi1 = (data) => {
  console.log(data);
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.putUpdateTask(
    API_LINK.UPDATE_TASK_WITH_FILE,
    data,
    userInfor.token
  );
};
