import {
  Divider,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { createUserApi1 } from './../../apis/User/createUser';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { getAllRoleApi1 } from '../../apis/Role/GetAllRole';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextFieldComponent from '../../Components/TextField/textfield';
import RenderImage from '../../Components/Render/RenderImage';
import UploadImage from '../../Components/Upload/UploadImage';
import moment from 'moment';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreatePersonnelPage = (props) => {
  const [dob, setDob] = React.useState(new Date());
  const [joinDate, setJoinDate] = React.useState(new Date());
  const [loading, setLoading] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [allRole, setAllRole] = React.useState([]);
  const [roleSelected, setRoleSelected] = React.useState();
  const [filesImage, setFilesImage] = useState([]);
  const [selectedImages, setSelectedImage] = useState([]);
  const [valueBirthDate, setValueBirthDate] = React.useState(new Date());
  React.useEffect(() => {
    (async () => {
      try {
        const listAllRole = await getAllRoleApi1(0, 15, 'createdAt', true);
        setAllRole(listAllRole.data);
      } catch (error) {
        console.log('Không thể lấy danh sách role');
      }
    })();
  }, []);
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
  const validateSchema = yup
    .object({
      username: yup
        .string()
        .min(5, 'Tên đăng nhập phải lớn hoặc hoặc bàng 6 kí tự')
        .required('Tên đăng nhập không được để trống'),
      phone: yup
        .string()
        .required('Số điện thoại không được để trống!')
        .matches(phoneRegExp, 'Số điện thoại không xác thực !')
        .min(10, 'Phải đúng 10 số')
        .max(10, 'Không được quá 10 số'),
      password: yup
        .string()
        .min(6, 'Mật khẩu phải lớn hơn 6 kí tự')
        .required('Mật khẩu không được để trống'),
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
    resolver: yupResolver(validateSchema),
  });

  const submitForm = (data) => {
    const planBirthDate = moment(valueBirthDate).format('YYYY-MM-DD');
    handleCreateUser(
      data.email,
      data.phone,
      roleSelected,
      data.username,
      data.password,
      data.fullName,
      data.gender,
      planBirthDate,
      filesImage
    );
  };
  const handleCreateUser = async (
    email,
    phone,
    roleId,
    username,
    password,
    fullName,
    gender,
    birthdate,
    file
  ) => {
    try {
      setLoading(true);
      await createUserApi1({
        email,
        phone,
        roleId,
        username,
        password,
        fullName,
        gender,
        birthdate,
        file,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Tạo nhân viên thành công',
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
  const handleChange = (event) => {
    setRoleSelected(event.target.value);
  };
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
    <Paper className="bodynonetab" elevation="none">
      <Typography variant="h6" color="#DD8501">
        Tạo mới hồ sơ nhân viên
      </Typography>
      <Divider></Divider>
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
          {/* <Typography variant="body1" color="#DD8501" fontWeight="bold">
            Ảnh đại diện
          </Typography> */}
          <Typography variant="body1" color="#DD8501" fontWeight="bold">
            Sơ yếu lý lịch
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color="#DD8501"
                  sx={{ marginBottom: '10px' }}
                >
                  Ảnh đại diện
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  {UploadImage(setSelectedImage, setFilesImage)}
                  <div className="result">{RenderImage(selectedImages)}</div>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Tên đăng nhập</Typography>
                <TextFieldComponent
                  register={register}
                  name="username"
                  errors={errors.username}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Mật khẩu</Typography>
                <TextFieldComponent
                  register={register}
                  name="password"
                  errors={errors.password}
                  variant="outlined"
                  sx={{ width: '100%' }}
                  isPassword={true}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Họ và tên</Typography>
                <TextFieldComponent
                  register={register}
                  name="fullName"
                  errors={errors.fullName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
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
                <Typography variant="body2">Điện thoại</Typography>
                <TextFieldComponent
                  register={register}
                  name="phone"
                  // label="Tên vai trò"
                  errors={errors.phone}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Email</Typography>
                <TextFieldComponent
                  register={register}
                  name="email"
                  // label="Tên vai trò"
                  errors={errors.email}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Chức vụ</Typography>
                <FormControl sx={{ width: '100%' }}>
                  <Select
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    value={roleSelected}
                  >
                    {allRole.length > 0 ? (
                      allRole.map((roleType, index) => (
                        <MenuItem value={roleType.roleId} key={index}>
                          {roleType.roleName}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>
                        Không có dữ liệu của danh sách công việc!
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    marginTop: '30px',
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    className="submitButton"
                  >
                    Tạo mới
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Paper>
  );
};

export default CreatePersonnelPage;
