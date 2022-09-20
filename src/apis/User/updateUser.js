import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const updateUserApi = (data) => {
  console.log(data);
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.putUpdateUser(
    `${API_LINK.UPDATE_USER_WITH_FILE}`,
    data,
    userInfor.token
  );
};
export const updateUserApi1 = (data) => {
  console.log(data);
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.put(`${API_LINK.UPDATE_USER}`, data, userInfor.token);
};
