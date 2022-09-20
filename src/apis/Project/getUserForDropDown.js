import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getUserForDropDownApi = (data) => {
  return axiosService.get(`${API_LINK.GET_USER_FOR_DROP_DOWN}`, data);
};
