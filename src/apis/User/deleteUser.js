import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const deleteUserkApi = (id) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.delete(`${API_LINK.DELETE_USER}/${id}`, userInfor.token);
};
