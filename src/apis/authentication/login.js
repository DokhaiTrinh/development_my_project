import axiosService from './../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const loginApi = (data) => {
  return axiosService.post(API_LINK.CHECK_LOGIN, data);
};

