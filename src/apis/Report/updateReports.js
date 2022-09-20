import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const updateReportApi = (data) => {
  console.log(data);
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.put(`${API_LINK.UPDATE_REPORT}`, data, userInfor.token);
};
export const updateReportApi1 = (data) => {
  console.log(data);
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
  return axiosService.putUpdateReport(
    `${API_LINK.UPDATE_REPORT_WITH_FILE}`,
    data,
    userInfor.token
  );
};
