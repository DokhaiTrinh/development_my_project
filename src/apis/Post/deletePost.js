import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const deletePostApi = (id) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.delete(`${API_LINK.DELETE_POST}/${id}`, userInfor.token);
};
