import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';
export const getUserConversations = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.post(
    `${API_LINK.GET_USER_CONVERSATIONS}`,
    data,
    userInfor.token
  );
};
