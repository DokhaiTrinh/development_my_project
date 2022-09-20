import React, {  useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import background from '../../assets/images/background.jpg';
import logo from '../../assets/images/logo.png';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { resetPasswordApi } from './../../apis/Resset/resetPassword';
const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
const ResetPasswordPage = (props) => {
  // const email = userInfor.email;
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);
  const handleMouseDownPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);
  const validateSchema = yup
    .object({
      email: yup.string().email().required('Mật khẩu không được để trống'),
      password: yup
        .string()
        .min(6, 'Mật khẩu phải lớn hơn 6 kí tự')
        .required('Mật khẩu không được để trống'),
      cpassword: yup
        .string()
        .oneOf(
          [yup.ref('password')],
          'Mật khẩu xác nhận phải trùng với mật khẩu!'
        ),
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
    handleResetPassword(data.password, data.email);
  };

  const handleResetPassword = async (password, email) => {
    console.log('data handle reset pass');
    try {
      await resetPasswordApi({ password, email });
      await Swal.fire({
        icon: 'success',
        text: 'Đặt lại mật khẩu thành công',
        timer: 3000,
        showConfirmButton: false,
      });

      window.location.replace('/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Đặt lại mật khẩu không thành công',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
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
      <Grid align="center">
        <Paper elevation={10}>
          <img src={logo} alt="logo" style={{ width: '204px' }} />

          <Box sx={{ flexGrow: 1, width: '400px' }}>
            <Grid container>
              <Grid>
                <Typography variant="h5" color="#DD8501">
                  Đặt lại mật khẩu
                </Typography>
              </Grid>
            </Grid>
            <form onSubmit={handleSubmit(submitForm)}>
              <TextField
                {...register('email')}
                error={errors.email != null}
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                fullWidth
                helperText={errors.email?.message}
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <EmailOutlinedIcon />
                //     </InputAdornment>
                //   ),
                // }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Mật khẩu mới*"
                autoComplete="username"
                autoFocus
                name="newpass"
                type={showPassword ? 'text' : 'password'}
                // autoComplete="current-password"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="confirm"
                label="Xác nhận mật khẩu mới*"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
              />
              <Grid>
                <Button
                  type="submit"
                  variant="contained"
                  className='submitButton'
                >
                  Hoàn tất
                </Button>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Grid>
    </div>
  );
};
export default ResetPasswordPage;
