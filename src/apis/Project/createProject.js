import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const createProjectApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.post(`${API_LINK.CREATE_PROJECT}`, data, userInfor.token);
};
export const createProjectApi1 = (data) => {
  console.log(data);
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.postCreateProject(
    `${API_LINK.CREATE_PROJECT_WITH_FILE}`,
    data,
    userInfor.token
  );
};
