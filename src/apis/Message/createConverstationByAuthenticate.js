import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';
export const createConversationByAuthenticated = (targetUserId, message) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.postSendMessage(
    `${API_LINK.CREATE_CONVERSATION_BY_AUTHENTICATED}?targetUserId=${targetUserId}&message=${message}`,
    '',
    userInfor.token
  );
};
