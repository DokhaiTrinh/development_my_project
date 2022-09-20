import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';
export const setConsultantForChat = (conversationId, message) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.put(
    `${API_LINK.SET_CONSULTANT_FOR_CHAT}?conversationId=${conversationId}&message=${message}`,
    userInfor.token
  );
};
