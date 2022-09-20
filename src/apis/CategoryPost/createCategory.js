import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const createCategoryApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.post(
    `${API_LINK.CREATE_CATEGORY}/${data}`,
    userInfor.token
  );
};
