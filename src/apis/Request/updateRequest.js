import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const updateRequestApi = (data) => {
  console.log(data);
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.put(`${API_LINK.UPDATE_REQUEST}`, data, userInfor.token);
};
export const updateRequestApi1 = (data) => {
  console.log(data);
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.putUpdateRequest(
    `${API_LINK.UPDATE_REQUEST_WITH_FILE}`,
    data,
    userInfor.token
  );
};
