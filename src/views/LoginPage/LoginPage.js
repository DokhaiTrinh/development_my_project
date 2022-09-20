import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  Stack,
} from '@mui/material';
import background from '../../assets/images/background.jpg';
import logo from '../../assets/images/logo.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loginApi } from '../../apis/authentication/login';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const LoginPage = (props) => {
  const history = useHistory();
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const handleClickShowPassword = () => setShowPassword(!showPassword);
  // const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const validationSchema = yup
    .object({
      username: yup
        .string()
        .min(3, 'Tên đăng nhập phải lớn hơn hoặc bằng 6 kí tự')
        .required('Tên đăng nhập không được để trống!'),
      password: yup
        .string()
        .min(3, 'Mật khẩu phải lớn hơn hoặc bằng 6 kí tự')
        .required('Mật khẩu không được để trống!'),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const submitForm = (data) => {
    setLoading(true);
    handleLoginAction(data.username, data.password);
    setLoading(false);
  };

  const handleLoginAction = async (username, password) => {
    try {
      const authenInfor = await loginApi({ password, username });
      if (authenInfor.status === 200) {
        const decodeToken = parseJwt(authenInfor.data.token);
        const userInforObject = {
          token: authenInfor.data.token,
          id: decodeToken.id,
          username: decodeToken.userName,
          email: decodeToken.email,
          phone: decodeToken.phone,
          fullName: decodeToken.fullName,
          avatarLink: decodeToken.avatarLink,
          authorID: decodeToken.role[0].authority,
        };

        await localStorage.setItem(
          'USERINFOR',
          JSON.stringify(userInforObject)
        );
        await Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công!',
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.replace('project');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Đăng nhập thất bại, vui lòng thử lại!!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        paddingTop: '15vh',
      }}
    >
      <Paper
        elevation={10}
        style={{
          height: '70vh',
          width: '60vh',
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form onSubmit={handleSubmit(submitForm)}>
          <Stack
            direction="column"
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <img src={logo} alt="logo" style={{ width: '204px' }} />

            <Box sx={{ flexGrow: 1, width: '400px' }}>
              <Typography variant="h5">Đăng&nbsp;nhập</Typography>
              <TextField
                {...register('username')}
                // error={submitted && !username}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Tên đăng nhập*"
                autoComplete="username"
                autoFocus
                name="username"
                // value={username}
                error={errors.username != null}
                // onChange={handleChange}
                helperText={errors.username?.message}
              />
              <TextField
                {...register('password')}
                error={errors.password != null}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Mật khẩu*"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
              />
              <Stack direction="column" spacing={2}>
                <Button
                  type="submit"
                  variant="contained"
                  className="submitButton"
                >
                  {loading ? (
                    <>
                      <CircularProgress color="white" size={24} /> &nbsp; Đang
                      xử lí...
                    </>
                  ) : (
                    ' Đăng nhập'
                  )}
                </Button>
                <Box style={{ textAlign: 'left' }}>
                  <Link
                    color="#DD8501"
                    variant="body1"
                    onClick={() => {
                      history.push('/OTPByEmail');
                    }}
                  >
                    Quên mật khẩu
                  </Link>
                </Box>
              </Stack>
              {/* <Grid item md={12}>
                    <Box style={{ textAlign: 'right' }}>
                      <Typography color="#DD8501" variant="body1">
                        Sign up for account
                      </Typography>
                    </Box>
                  </Grid> */}
            </Box>
          </Stack>
        </form>
      </Paper>
    </div>
  );
};
export default LoginPage;
