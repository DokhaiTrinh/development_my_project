import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const deleteProjectApi = (id) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.delete(
    `${API_LINK.DELETE_PROJECT}/${id}`,
    userInfor.token
  );
};
