import axiosService from '../../axios/axiosService';
import * as API_LINK from '../../contants/ApiLinks/apiLinks';

export const createUserApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.post(`${API_LINK.CREATE_USER}`, data, userInfor.token);
};
export const createUserApi1 = (data) => {
  console.log(data);
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.postCreateUser(
    `${API_LINK.CREATE_USER_WITH_FILE}`,
    data,
    userInfor.token
  );
};
