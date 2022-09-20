import axiosService from '../../axios/axiosService';
import * as API_LINK from '../../contants/ApiLinks/apiLinks';

export const createWorkerApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.post(`${API_LINK.CREATE_WORKER}`, data, userInfor.token);
};
export const createWorkerApi1 = (data) => {
  console.log(data);
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.postCreateWorker(
    `${API_LINK.CREATE_WORKER_WITH_FILE}`,
    data,
    userInfor.token
  );
};
