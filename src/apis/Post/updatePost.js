import axiosService from '../../axios/axiosService';
import * as API_LINK from '../../contants/ApiLinks/apiLinks';

export const updatePostApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.put(`${API_LINK.UPDATE_POST}`, data, userInfor.token);
};
export const updatePostApi1 = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.putUpdatePost(
    `${API_LINK.UPDATE_POST_WITH_FILE}`,
    data,
    userInfor.token
  );
};
