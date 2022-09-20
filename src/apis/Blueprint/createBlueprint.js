import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const createBlueprintApi = (data) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  console.log(data);
  return axiosService.post3(
    `${API_LINK.CREATE_BLUEPRINT}`,
    data,
    userInfor.token
  );
};
