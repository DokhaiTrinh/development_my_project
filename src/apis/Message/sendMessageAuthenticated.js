import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';
export const sendMessageAuthenticated = (conversationId, message) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.postSendMessage(
    `${API_LINK.SEND_MESSAGE_AUTHENTICATED}?conversationId=${conversationId}&message=${message}`,
    '',
    userInfor.token
  );
};
