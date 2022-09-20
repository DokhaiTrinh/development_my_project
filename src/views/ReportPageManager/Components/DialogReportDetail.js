import { Divider, Typography, Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import TextFieldComponent from '../../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';

const DialogReportProject = (props) => {
  const { reportDetail, setReportDetail } = props;
  const [loading, setLoading] = useState('');
  const valideSchema = yup
    .object({
      itemAmount: yup
        .number()
        .typeError('amount is invalide')
        .min(1, 'Số lượng phải lớn hơn 0!')
        .required(),
      itemDesc: yup.string().required(),
      itemPrice: yup
        .number()
        .typeError('Price is invalide')
        .min(1, 'Giá tiền phải lớn hơn 0!')
        .required(),
      itemUnit: yup.string().required('Đơn vị đo lườngf'),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(valideSchema),
  });

  const submitForm = (data) => {
    const detailReport = {
      itemAmount: data.itemAmount,
      itemDesc: data.itemDesc,
      itemPrice: data.itemPrice,
      itemUnit: data.itemUnit,
      reportId: 0,
    };

    setReportDetail((reportDetail) => [...reportDetail, detailReport]);

    props.handleCloseReportDetailDialog();
  };

  return (
    <div className='dialog'>
      <Typography
        variant="h6"
        color="#DD8501"
      >
        BÁO CÁO CHI TIẾT
      </Typography>
      <Divider></Divider>
      <Typography variant="body1" color="#DD8501" fontWeight="bold">
        Thông tin báo cáo chi tiết
      </Typography>
      <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
      <form onSubmit={handleSubmit(submitForm)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2">
              Thông tin báo cáo chi tiết
            </Typography>
            <TextFieldComponent
              register={register}
              name="itemDesc"
              errors={errors.itemDesc}
              variant="outlined"
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              Số lượng
            </Typography>
            <TextFieldComponent
              register={register}
              name="itemAmount"
              errors={errors.itemAmount}
              variant="outlined"
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              Giá tiền
            </Typography>
            <TextFieldComponent
              register={register}
              name="itemPrice"
              label="VNĐ"
              errors={errors.itemPrice}
              variant="outlined"
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              Đơn vị tính
            </Typography>
            <TextFieldComponent
              register={register}
              name="itemUnit"
              errors={errors.itemUnit}
              variant="outlined"
              sx={{ width: '100%' }}
            />
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
                className='submitButton'
              >
                Lưu
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default DialogReportProject;
