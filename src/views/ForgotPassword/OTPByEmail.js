import React, { useEffect, useState } from 'react';
import { Grid, Paper, Stack } from '@mui/material';
import background from '../../assets/images/background.jpg';
import logo from '../../assets/images/logo.png';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loginApi } from '../../apis/authentication/login';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { getOTPByEmailApi } from './../../apis/Resset/resetPassword';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InputAdornment from '@mui/material/InputAdornment';

const OTPByEmail = (props) => {
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
  const validateSchema = yup
    .object({
      email: yup
        .string()
        .email('Email không hợp lệ')
        .required('Phải điền Email để lấy mã OTP'),
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
    handleGetOTPByEmail(data.email);
  };

  const handleGetOTPByEmail = async (email) => {
    try {
      setLoading(true);
      await getOTPByEmailApi(email);
      setLoading(false);
      localStorage.setItem('email', JSON.stringify(email));
      await Swal.fire({
        icon: 'success',
        text: 'Gửi xác nhận thành công vui lòng nhận mã OTP tại email',
        timer: 3000,
        showConfirmButton: false,
      });

      window.location.replace('/OTPPage');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Gửi email xác nhận không thành công',
        timer: 2000,
        showConfirmButton: false,
      });
      // window.location.reload();
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
      <Paper elevation={10} style={{ height: '70vh', width: '60vh', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <form onSubmit={handleSubmit(submitForm)}>
          <Stack direction='column' spacing={3} justifyContent='center' alignItems='center'>
            <img src={logo} alt="logo" style={{ width: '204px' }} />
            <Stack sx={{ flexGrow: 1, width: '400px' }} spacing={2}>
                <Typography variant="h5">
                  Đặt lại mật khẩu
                </Typography>
                <Stack direction='row' spacing={2} alignItems='center'>
                  <TextField
                    {...register('email')}
                    error={errors.email != null}
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    fullWidth
                    helperText={errors.email?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                  >
                    Gửi&nbsp;OTP
                  </Button>
                </Stack>

              {/* <TextField
                {...register('password')}
                error={errors.password != null}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Mã OTP*"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
              /> */}
              <Stack direction='column' spacing={2}>
                <Button
                  type="submit"
                  variant="contained"
                  className='submitButton'
                >
                  {loading ? (
                    <>
                      <CircularProgress color="white" size={24} /> &nbsp; Đang
                      xử lí...
                    </>
                  ) : (
                    'Tiếp tục'
                  )}
                </Button>
                <Box style={{ textAlign: 'left' }}>

                  <Link
                    color="#DD8501"
                    variant="body1"
                    onClick={() => {
                      history.push('/OTPByPhone');
                    }}
                  >
                    Nhận OTP qua số điện thoại
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
            </Stack>
          </Stack>
        </form>
      </Paper>
    </div>
  );
};
export default OTPByEmail;
