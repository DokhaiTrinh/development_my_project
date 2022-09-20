import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const createPostApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.post(`${API_LINK.CREATE_POST}`, data, userInfor.token);
};
export const createPostApi1 = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.postCreatePost(`${API_LINK.CREATE_POST_WITH_FILE}`, data, userInfor.token);
};
