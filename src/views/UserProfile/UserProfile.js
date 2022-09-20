import React from 'react';
import {
  Paper,
  Divider,
  Stack,
  Typography,
  Grid,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { getUserByIdApi } from '../../apis/User/getAllUser';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TextFieldComponent from '../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import moment from 'moment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import '../../Components/Tab/Tab.css';
import Badge from '@mui/material/Badge';
import CancelIcon from '@mui/icons-material/Cancel';
import { updateUserApi } from '../../apis/User/updateUser';
import { updateUserApi1 } from '../../apis/User/updateUser';
const UserProfile = (props) => {
  const { id } = useParams();
  const idN = parseFloat(id);
  const [userId, setUserId] = React.useState();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [valueBirthDate, setValueBirthDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(false);
  const [filesImage, setFilesImage] = React.useState([]);
  const [selectedImages, setSelectedImage] = React.useState([]);
  const [userName, setUserName] = React.useState();
  const [roleId, setRoleId] = React.useState();
  const [password, setPassword] = React.useState();
  React.useEffect(() => {
    (async () => {
      try {
        const listUser = await getUserByIdApi(id, 'BY_ID');
        setUserId(listUser.data);
        setValueBirthDate(listUser.data.birthdate);
        setUserName(listUser.data.username);
        setRoleId(listUser.data.role.roleId);
        setPassword(listUser.data.password);
      } catch (error) {
        console.log('Không thể lấy danh sách người dùng');
      }
    })();
  }, []);
  console.log(userName);
  console.log(roleId);
  console.log(userId);
  const submitForm = (data) => {
    const planBirthDate = moment(valueBirthDate).format('YYYY-MM-DD');
    Swal.fire({
      title: 'Cập nhật yêu cầu ?',
      target: document.getElementById('form-modal12'),
      text: 'Lưu ý cập nhật sẽ thay đổi dữ liệu của yêu cầu!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#25723F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'CẬP NHẬT',
      cancelButtonText: 'KHÔNG CẬP NHẬT',
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdateUser(
          idN,
          userName,
          roleId,
          // password,
          data.email,
          data.phone,
          data.fullName,
          data.gender,
          planBirthDate,
          filesImage
        );
      }
    });
  };
  const handleUpdateUser = async (
    userId,
    username,
    roleId,
    // password,
    email,
    phone,
    fullName,
    gender,
    birthdate,
    file
  ) => {
    try {
      setLoading(true);
      await updateUserApi({
        userId,
        username,
        roleId,
        // password,
        email,
        phone,
        fullName,
        gender,
        birthdate,
        file,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Cập nhật hồ sơ thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      // window.location.replace('/personnel');
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
  const valideSchema = yup
    .object({
      phone: yup
        .string()
        .required('Số điện thoại không được để trống!')
        .matches(phoneRegExp, 'Số điện thoại không xác thực !')
        .min(10, 'Phải đúng 10 số')
        .max(10, 'Không được quá 10 số'),
      fullName: yup
        .string()
        .min(6, 'Tên người dùng phải lớn hơn 6 kí tự')
        .required('Tên người dùng không được để trống'),
      email: yup.string().email('Email không chính xác'),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(valideSchema),
  });
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
  const renderPhotos = (src) => {
    return src.map((photo, index) => {
      return (
        <Badge
          badgeContent={<CancelIcon />}
          onClick={() => handleDeleteImage(photo, index)}
        >
          <img
            style={{
              width: '150px',
              height: '150px',
              // borderRadius: "50%",
              marginRight: '5px',
              marginBottom: '5px',
            }}
            src={photo}
            key={index}
          />
        </Badge>
      );
    });
  };
  return (
    <div>
      <Tabs>
        <Paper sx={{ width: 'min-content', borderRadius: '10px 10px 0 0' }}>
          <TabList>
            <Stack direction="row">
              <Tab>Hồ sơ</Tab>
              <Tab>Mật khẩu</Tab>
            </Stack>
          </TabList>
        </Paper>
        <Paper
          sx={{
            width: '100%',
            // top: '205px',
            padding: '32px',
            borderRadius: '0',
          }}
        >
          <TabPanel>
            <Typography variant="h6" sx={{ marginBottom: '20px' }}>
              Chỉnh sửa hồ sơ
            </Typography>
            <Divider sx={{ marginBottom: '20px' }}></Divider>
            {userId ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <form onSubmit={handleSubmit(submitForm)}>
                  <Box sx={{ width: '500px' }}>
                    <Stack direction="column" spacing={2}>
                      <Stack direction="column">
                        <Grid item xs={6}>
                          <input
                            {...register('files')}
                            type="file"
                            id="files"
                            accept="image/*"
                            onChange={handleChangeFile}
                          />
                          <div className="label-holder">
                            <label htmlFor="file" className="img-upload">
                              Chọn hình
                            </label>
                          </div>

                          <div className="result">
                            {renderPhotos(selectedImages)}
                          </div>
                          {/* <input type="file" multiple {...register("file")} /> */}
                        </Grid>
                        <Typography variant="body2">Họ và tên</Typography>
                        <TextFieldComponent
                          register={register}
                          name="fullName"
                          defaultValue={userId.fullName}
                          errors={errors.fullName}
                          variant="outlined"
                          sx={{ width: '100%' }}
                        />
                      </Stack>
                      <Stack item xs={12}>
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
                      </Stack>
                      <Stack direction="column">
                        <Typography variant="body2">Email</Typography>
                        <TextFieldComponent
                          register={register}
                          name="email"
                          defaultValue={userId.email}
                          errors={errors.email}
                          variant="outlined"
                          sx={{ width: '100%' }}
                        />
                      </Stack>
                      <Stack direction="column">
                        <Typography variant="body2">Số điện thoại</Typography>
                        <TextFieldComponent
                          register={register}
                          name="phone"
                          defaultValue={userId.phone}
                          errors={errors.phone}
                          variant="outlined"
                          sx={{ width: '100%' }}
                        />
                      </Stack>
                      <Stack direction="column">
                        <Typography variant="body2">Giới tính</Typography>
                        <TextField
                          {...register('gender')}
                          // error={submitted && !gender}
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          // label="Giới tính"
                          autoComplete="gender"
                          select
                          name="gender"
                          defaultValue={userId.gender}
                          error={errors.gender != null}
                          helperText={errors.gender?.message}
                        >
                          {gender.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                      <Stack justifyContent="center">
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Button
                            type="submit"
                            variant="contain"
                            className="submitButton"
                          >
                            Cập nhật
                          </Button>
                        </Box>
                      </Stack>
                    </Stack>
                  </Box>
                </form>
              </Box>
            ) : (
              <div>Không có dữ liệu của yêu cầu!!</div>
            )}
          </TabPanel>
          <TabPanel>
            <Typography variant="h6" sx={{ marginBottom: '20px' }}>
              Đặt lại mật khẩu
            </Typography>
            <Divider sx={{ marginBottom: '20px' }}></Divider>
            {userId ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ width: '500px' }}>
                  <Stack direction="column" spacing={2}>
                    <Stack direction="column">
                      <Typography variant="body2">Mật khẩu cũ</Typography>
                      <TextField
                        type="password"
                        sx={{ width: '100%' }}
                        variant="outlined"
                      />
                    </Stack>
                    <Stack direction="column">
                      <Typography variant="body2">Mật khẩu mới</Typography>
                      <TextField
                        type="password"
                        sx={{ width: '100%' }}
                        variant="outlined"
                      />
                    </Stack>
                    <Stack direction="column">
                      <Typography variant="body2">
                        Xác nhận mật khẩu mới
                      </Typography>
                      <TextField
                        type="password"
                        sx={{ width: '100%' }}
                        variant="outlined"
                      />
                    </Stack>
                    <Stack justifyContent="center">
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Button variant="contain" className="submitButton">
                          Lưu
                        </Button>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            ) : (
              <div>Không có dữ liệu của yêu cầu!!</div>
            )}
          </TabPanel>
        </Paper>
      </Tabs>
    </div>
  );
};

export default UserProfile;
