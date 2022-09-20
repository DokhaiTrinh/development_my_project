import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  Paper,
  Stack,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import { createWorkerApi1 } from './../../apis/Worker/createWorker';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';
import TextFieldComponent from '../../Components/TextField/textfield';
import Dialog from '@mui/material/Dialog';
import { DialogAddress } from './components/DialogAddress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import moment from 'moment';
import RenderImage from '../../Components/Render/RenderImage';
import UploadImage from '../../Components/Upload/UploadImage';

export const CreateWorker = (props) => {
  const [loading, setLoading] = useState(false);
  const [locationDetail, setLocationDetail] = React.useState();
  const [openLocationDialog, setOpenLocationDialog] = useState(false);
  const [valueBirthDate, setValueBirthDate] = React.useState(new Date());
  const citizensExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const socialSecurityCodeExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [filesImage, setFilesImage] = useState([]);
  const [selectedImages, setSelectedImage] = useState([]);
  const validateSchema = yup
    .object({
      fullName: yup
        .string()
        .min(5, 'Tên công nhân phải lớn hoặc hoặc bàng 6 kí tự')
        .required('Tên đăng nhập không được để trống'),
      citizenId: yup
        .string()
        .required('Căn cước công dân không được để trống!')
        .matches(citizensExp, 'Số căn cước công dân không xác thực !')
        .min(12, 'Phải đúng 12 số')
        .max(12, 'Không được quá 12 số'),
      socialSecurityCode: yup
        .string()
        .matches(socialSecurityCodeExp, 'Số bảo hiểm công dân không xác thực !')
        .min(12, 'Phải đúng 12 số')
        .max(12, 'Không được quá 12 số'),
      gender: yup.string(),
      birthPlace: yup.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });

  const submitForm = (data) => {
    const planBirthDate = moment(valueBirthDate).format('YYYY-MM-DD');
    console.log(data);
    handleCreateWorker(
      locationDetail,
      data.citizenId,
      data.fullName,
      data.socialSecurityCode,
      data.gender,
      planBirthDate,
      data.birthPlace,
      filesImage
    );
  };

  const handleCreateWorker = async (
    address,
    citizenId,
    fullName,
    socialSecurityCode,
    gender,
    birthdate,
    birthPlace,
    file
  ) => {
    try {
      setLoading(true);
      await createWorkerApi1({
        address,
        citizenId,
        fullName,
        socialSecurityCode,
        gender,
        birthdate,
        birthPlace,
        file,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Tạo công nhân thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      window.location.replace('/personnel');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error.response.data,
        timer: 2000,
        showConfirmButton: false,
      });
      setLoading(false);
    }
  };
  const handleOpenLocationDialog = () => {
    setOpenLocationDialog(true);
  };
  const handleCloseLocationDialog = () => {
    setOpenLocationDialog(false);
  };
  const gender = [
    {
      value: 'MALE',
      label: 'Nam',
    },
    {
      value: 'FEMALE',
      label: 'Nữ',
    },
  ];
  const handleChangeFile = (e) => {
    setFilesImage(e.target.files);

    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImage((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };
  const handleDeleteImage = (photo, indexImage) => {
    const index = selectedImages.indexOf(photo);
    if (index > -1) {
      selectedImages.splice(index, 1);
      // dispatch({ type: "LOADING", newLoading: !loading });
    }
    const dt = new DataTransfer();
    const input = document.getElementById('files');
    const { files } = input;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (index !== i) dt.items.add(file); // here you exclude the file. thus removing it.
    }
    input.files = dt.files;
    setFilesImage(input.files);
    // dispatch({ type: 'LOADING', newLoading: !loading });
  };
  return (
    <Paper className="bodynonetab">
      <Typography variant="h6" color="#DD8501">
        Tạo mới hồ sơ công nhân
      </Typography>
      <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            paddingLeft: '10px',
            paddingTop: '10px',
            width: '40%',
            marginBottom: '30px',
          }}
        >
          <form onSubmit={handleSubmit(submitForm)}>
            <Typography variant="body1" color="#DD8501" fontWeight="bold">
              Sơ yếu lý lịch
            </Typography>
            <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
            <Grid container spacing={2}>
              <Grid item>
                <Typography variant="body2">
                  Ảnh đại diện
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  {UploadImage(setSelectedImage, setFilesImage)}
                  <div className="result">{RenderImage(selectedImages)}</div>
                </Stack>
                {/* <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <input
                    {...register('files')}
                    type="file"
                    id="files"
                    // multiple
                    onChange={handleChangeFile}
                  />
                  <div className="label-holder">
                    <label htmlFor="file" className="img-upload"></label>
                  </div>

                  <div className="result">{RenderImage(selectedImages)}</div> */}
                {/* <input type="file" multiple {...register("file")} /> */}
                {/* </Box> */}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Họ và tên</Typography>
                <TextFieldComponent
                  register={register}
                  name="fullName"
                  // label="Tên vai trò"
                  errors={errors.fullName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Ngày sinh</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={valueBirthDate}
                    onChange={(newValue) => {
                      setValueBirthDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Giới tính</Typography>
                <TextField
                  {...register('gender')}
                  // error={submitted && !gender}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Giới tính"
                  autoComplete="gender"
                  select
                  name="gender"
                  //defaultValue={accountProfileData.gender}
                  error={errors.gender != null}
                  helperText={errors.gender?.message}
                >
                  {gender.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Nơi sinh</Typography>
                <TextFieldComponent
                  register={register}
                  name="birthPlace"
                  // label="Tên vai trò"
                  errors={errors.birthPlace}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Căn cước công dân</Typography>
                <TextFieldComponent
                  register={register}
                  name="citizenId"
                  // label="Tên vai trò"
                  errors={errors.citizenId}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Số bảo hiểm</Typography>
                <TextFieldComponent
                  register={register}
                  name="socialSecurityCode"
                  // label="Tên vai trò"
                  errors={errors.socialSecurityCode}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item sx={12}>
                <Box
                  sx={{
                    width: '100%',
                    justifyContent: 'left',
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleOpenLocationDialog()}
                  >
                    Địa chỉ
                  </Button>
                </Box>
              </Grid>
              <Grid item container columns={12}>
                {locationDetail ? (
                  <Paper className="tag">
                    <Stack direction="row" spacing={1}>
                      <Typography>{locationDetail.addressNumber},</Typography>
                      <Typography>{locationDetail.street},</Typography>
                      <Typography>{locationDetail.ward},</Typography>
                      <Typography>{locationDetail.district},</Typography>
                      <Typography>{locationDetail.city}</Typography>
                      {/* <Typography>
                        Địa bàn tỉnh: {locationDetail.province}
                      </Typography>
                      <Typography>
                        Quốc gia: {locationDetail.country}
                      </Typography>
                      <Typography>
                        Diện tích: {locationDetail.area}
                      </Typography>
                      <Typography>
                        Điều phối: {locationDetail.coordinate}
                      </Typography> */}
                    </Stack>
                  </Paper>
                ) : (
                  <Grid item sx={12}>
                    <div>Không có dữ liệu!</div>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    className="submitButton"
                  >
                    Lưu
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <Dialog open={openLocationDialog} onClose={handleCloseLocationDialog}>
        <DialogAddress
          handleCloseLocationDialog={handleCloseLocationDialog}
          setLocationDetail={setLocationDetail}
          locationDetail={locationDetail}
        ></DialogAddress>
      </Dialog>
    </Paper>
  );
};

export default CreateWorker;
