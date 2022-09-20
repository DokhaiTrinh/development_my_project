import axiosService from '../../axios/axiosService';
import * as API_LINK from './../../contants/ApiLinks/apiLinks';

export const getOTPByEmailApi = (data) => {
  return axiosService.post(`${API_LINK.SEND_EMAIL_GET_OTP}?email=${data}`);
};

export const confirmOTPApi = (data) => {
  return axiosService.post(
    `${API_LINK.VALIDATE_OTP}?email=${data.email}&otp=${data.otp}`
  );
};

export const resetPasswordApi = (data) => {
  return axiosService.post(
    `${API_LINK.RESET_PASSWORD}?email=${data.email}&otp=${data.password}`
  );
};
