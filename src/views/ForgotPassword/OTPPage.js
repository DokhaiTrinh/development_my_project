import React, { useState } from 'react';
import { Paper } from '@mui/material';
import { Avatar, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { useLocation, withRouter } from 'react-router';
import { withStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { confirmOTPApi } from './../../apis/Resset/resetPassword';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './Styles';
import Stack from '@mui/material/Stack';

const OTPPage = (props) => {
  const classes = styles();
  const validateSchema = yup
    .object({
      otp: yup
        .number()
        .typeError('Mã otp phải là chữ số')
        .required('Cần nhập mã OTP để xác nhận'),
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
    // console.log(data);
    handleConfirmOTP(data.otp);
  };

  const handleConfirmOTP = async (otp) => {
    var pass = 'nothing';
    try {
      //   await confirmOTPApi({ email, otp, pass });
      await Swal.fire({
        icon: 'success',
        text: 'Xác nhận thành công OTP',
        timer: 2000,
        showConfirmButton: false,
      });
      window.location.replace('/resetpassword');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'OTP xác nhận không thành công',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <Grid>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Link to="/getotp">
              <Avatar className={classes.avatar}>
                <KeyboardReturnIcon />
              </Avatar>
            </Link>
          </Grid>
          <Grid item xs={8} align="center">
            <h2>Mã OTP</h2>
            <Typography variant="caption" align="center">
              Xin vui lòng nhập mã OTP để Reset password!
            </Typography>
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit(submitForm)}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <TextField
              {...register('otp')}
              error={errors.otp != null}
              label="Mã OTP"
              autoFocus
              fullWidth
              name="otp"
              helperText={errors.otp?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              // className={classes.submit}
            >
              Xác nhận
            </Button>
          </Stack>
        </form>
      </Paper>
    </Grid>
  );
};

export default OTPPage;
