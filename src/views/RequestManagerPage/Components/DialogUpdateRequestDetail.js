import { Divider, Typography, Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import TextFieldComponent from '../../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import moment from 'moment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-datepicker/dist/react-datepicker.css';

const DialogUpdateRequestDetail = (props) => {
  const {
    requestDetail,
    setRequestDetail,
    actionUpdateRequest,
    itemDetailRequestUpdate,
    idN,
  } = props;
  const [loading, setLoading] = useState('');
  console.log(requestDetail);
  const valideSchema = yup
    .object({
      itemAmount: yup
        .number()
        .typeError('Amount is invalide')
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
    const createDetailRequest = {
      itemAmount: data.itemAmount,
      itemDesc: data.itemDesc,
      itemPrice: data.itemPrice,
      itemUnit: data.itemUnit,
      requestDetailId: 0,
    };
    if (!requestDetail) {
      if (actionUpdateRequest === 'CreateNewRequest') {
        setRequestDetail([createDetailRequest]);
      }
    } else {
      if (actionUpdateRequest === 'CreateNewRequest') {
        setRequestDetail((requestDetail) => [
          ...requestDetail,
          createDetailRequest,
        ]);
      } else {
        let updateListRequest = [...requestDetail];
        updateListRequest = updateListRequest.map((u) =>
          u.requestDetailId === itemDetailRequestUpdate.requestDetailId
            ? (u = {
                ...u,
                itemAmount: data.itemAmount,
                itemDesc: data.itemDesc,
                itemPrice: data.itemPrice,
                itemUnit: data.itemUnit,
              })
            : u
        );
        setRequestDetail(updateListRequest);
      }
    }
    // setRequestDetail((requestDetail) => [...requestDetail, detailRequest]);
    props.handleCloseUpdateRequestDetailDialog();
  };

  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        YÊU CẦU CHI TIẾT
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
          <Typography variant="body1" color="#DD8501" fontWeight="bold">
            Thông tin yêu cầu chi tiết
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Thông tin yêu cầu chi tiết
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="itemDesc"
                  defaultValue={
                    itemDetailRequestUpdate
                      ? itemDetailRequestUpdate.itemDesc
                      : null
                  }
                  errors={errors.itemDesc}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Số lượng</Typography>
                <TextFieldComponent
                  register={register}
                  name="itemAmount"
                  defaultValue={
                    itemDetailRequestUpdate
                      ? itemDetailRequestUpdate.itemAmount
                      : null
                  }
                  errors={errors.itemAmount}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Giá tiền</Typography>
                <TextFieldComponent
                  register={register}
                  name="itemPrice"
                  label="Giá tiền (VNĐ)"
                  defaultValue={
                    itemDetailRequestUpdate
                      ? itemDetailRequestUpdate.itemPrice
                      : null
                  }
                  errors={errors.itemPrice}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Đơn vị tính</Typography>
                <TextFieldComponent
                  register={register}
                  name="itemUnit"
                  label="Đơn vị"
                  defaultValue={
                    itemDetailRequestUpdate
                      ? itemDetailRequestUpdate.itemUnit
                      : null
                  }
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
                  {actionUpdateRequest ? (
                    actionUpdateRequest === 'UpdateRequest' ? (
                      <Button
                        type="submit"
                        variant="contained"
                        style={{
                          backgroundColor: '#DD8501',
                          borderRadius: 50,
                          width: '200px',
                          alignSelf: 'center',
                        }}
                      >
                        Cập nhật
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        style={{
                          backgroundColor: '#DD8501',
                          borderRadius: 50,
                          width: '200px',
                          alignSelf: 'center',
                        }}
                      >
                        Tạo mới
                      </Button>
                    )
                  ) : null}
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: '#DD8501',
                      borderRadius: 50,
                      width: '200px',
                      alignSelf: 'center',
                    }}
                  >
                    Hủy
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default DialogUpdateRequestDetail;
