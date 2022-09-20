import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getBlueprintByProjectIdApi = (projectId, searchType) => {
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  
  return axiosService.get(
    `${API_LINK.GET_BLUEPRINT_BY_PROJECT_ID}?searchParam=${projectId}&searchType=${searchType}`,
    userInfor.token
  );
};
