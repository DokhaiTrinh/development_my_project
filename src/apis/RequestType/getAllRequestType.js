import axiosService from '../../axios/axiosService';
import * as API_LINK from '../../contants/ApiLinks/apiLinks';

export const getAllRequestTypeApi = (pageNo, pageSize, sortBy, sortTypeAsc) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.get(
    `${API_LINK.GET_ALL_REQUEST_TYPE}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortTypeAsc=${sortTypeAsc}`,
    userInfor.token
  );
};
