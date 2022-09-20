import { Divider, Typography, Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import TextFieldComponent from '../../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';

const DialogEditBlueprint = (props) => {
  const { bluePrintDetail, setBluePrintDetail } = props;

  const validateSchema = yup.object({
    blueprintName: yup.string().min(0, 'Phải có tên của bản vẽ!!').required(),
    designerName: yup
      .string()
      .min(0, 'Phải nhập tên người thiết kế!!')
      .required(),
    estimatedCost: yup
      .number()
      .min(0, 'Phải nhập giá tiền!')
      .typeError('Số tiền được tính theo VNĐ')
      .required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });

  const submitForm = (data) => {
    const detailBlueprint = {
      blueprintName: data.blueprintName,
      designerName: data.designerName,
      estimatedCost: data.estimatedCost,
      projectId: 0,
    };
    setBluePrintDetail(detailBlueprint);
    props.handleCloseBluePrintDialog();
  };
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        BẢN VẼ
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
            Thông tin bản vẽ
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Tên bản vẽ
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="blueprintName"
                  errors={errors.blueprintName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Nhà thiết kế
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="designerName"
                  errors={errors.designerName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Giá bản vẽ
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="estimatedCost"
                  errors={errors.estimatedCost}
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
                    style={{
                      backgroundColor: '#DD8501',
                      borderRadius: 50,
                      width: '200px',
                      alignSelf: 'center',
                    }}
                  >
                    Lưu
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
export default DialogEditBlueprint;
