import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';
export const getConversationsById = (
  conversationId,
  pageNo,
  pageSize,
  sortBy,
  sortTypeAsc
) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_BY_CONVERSATION_ID}?conversationId=${conversationId}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortTypeAsc=${sortTypeAsc}`,
    userInfor.token
  );
};
// export const getConversationsById = (
//   ipAddress,
//   searchType,
//   conversationId,
//   pageNo,
//   pageSize,
//   sortBy,
//   sortTypeAsc
// ) => {
//   const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
//   return axiosService.get(
//     `${API_LINK.GET_BY_CONVERSATION_ID}?ipAddress=${ipAddress}&searchType=${searchType}&conversationId=${conversationId}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortTypeAsc=${sortTypeAsc}`,
//     userInfor.token
//   );
// };
