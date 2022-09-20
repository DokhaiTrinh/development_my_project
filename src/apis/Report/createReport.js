import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const createReportApi1 = (data) => {
  console.log(data);
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.postCreateReport(
    `${API_LINK.CREATE_REPORT_WITH_FILE}`,
    data,
    userInfor.token
  );
};
export const createReportApi = (data) => {
  console.log(data);
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.post(`${API_LINK.CREATE_REPORT}`, data, userInfor.token);
};
