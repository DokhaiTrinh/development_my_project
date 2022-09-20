import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';
export const seenMessageAuthenticated = (conversationId) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.post(
    `${API_LINK.SEEN_MEESAGE}?conversationId=${conversationId}`,
    userInfor.token
  );
};
