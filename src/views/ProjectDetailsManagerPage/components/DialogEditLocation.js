import { Divider, Typography, Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import TextFieldComponent from '../../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField } from '@mui/material';
const DialogEditLocation = (props) => {
  const {
    updateLocationDetail,
    setUpdateLocationDetail,
    actionUpdateLocation,
    itemDetailLocationUpdate,
  } = props;
  console.log(itemDetailLocationUpdate);
  const validateSchema = yup
    .object({
      addressNumber: yup
        .string()
        .min(0, 'Địa chỉ phải là số lớn hơn 0!')
        .required(),
      area: yup.string().required(),
      city: yup.string().required('Phải có tên thành phố'),
      coordinate: yup
        .string()
        .required('Tên vùng phải khác biệt')
        .typeError('Tên vùng đã bị trùng!!!'),
      country: yup.string().required('Phải có tên quốc gia!'),
      locationId: yup.number().required(),
      district: yup.string().required('Phải có tên đường!!!'),
      province: yup.string(),
      street: yup.string().required('Phải có tên đường'),
      ward: yup.string().required('Phải có tên khu vực'),
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
    const updateDetailLocation = {
      addressNumber: data.addressNumber,
      area: data.area,
      city: data.city,
      coordinate: data.coordinate,
      country: data.country,
      updatedBy: data.updatedBy,
      district: data.district,
      province: data.province,
      street: data.street,
      ward: data.ward,
      locationId: data.locationId,
    };
    if (actionUpdateLocation === 'CreateNewLocation') {
      setUpdateLocationDetail((updateLocationDetail) => [
        ...updateLocationDetail,
        updateDetailLocation,
      ]);
    } else {
      let updateListLocation = [...updateLocationDetail];
      updateListLocation = updateListLocation.map((u) =>
        u.locationDetailId === itemDetailLocationUpdate.locationDetailId
          ? (u = {
              ...u,
              addressNumber: data.addressNumber,
              area: data.area,
              city: data.city,
              coordinate: data.coordinate,
              country: data.country,
              updatedBy: data.updatedBy,
              district: data.district,
              province: data.province,
              street: data.street,
              ward: data.ward,
              locationId: data.locationId,
            })
          : u
      );
      setUpdateLocationDetail(updateListLocation);
    }
    props.handleCloseUpdateLocationDialog();
  };
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        ĐỊA CHỈ
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
            Thông tin địa chỉ mới
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Số nhà mới
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="addressNumber"
                  errors={errors.addressNumber}
                  defaultValue={
                    itemDetailLocationUpdate
                      ? itemDetailLocationUpdate.addressNumber
                      : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Tên đường
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="street"
                  errors={errors.street}
                  defaultValue={
                    itemDetailLocationUpdate
                      ? itemDetailLocationUpdate.street
                      : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Quận
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="district"
                  errors={errors.district}
                  defaultValue={
                    itemDetailLocationUpdate
                      ? itemDetailLocationUpdate.district
                      : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Thành phố
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="city"
                  errors={errors.city}
                  defaultValue={
                    itemDetailLocationUpdate
                      ? itemDetailLocationUpdate.city
                      : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Khu vực
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="ward"
                  errors={errors.ward}
                  defaultValue={
                    itemDetailLocationUpdate
                      ? itemDetailLocationUpdate.ward
                      : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Địa bàn tỉnh
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="province"
                  errors={errors.province}
                  defaultValue={
                    itemDetailLocationUpdate
                      ? itemDetailLocationUpdate.province
                      : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Quốc gia
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="country"
                  errors={errors.country}
                  defaultValue={
                    itemDetailLocationUpdate
                      ? itemDetailLocationUpdate.country
                      : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Diện tích
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="area"
                  errors={errors.area}
                  defaultValue={
                    itemDetailLocationUpdate
                      ? itemDetailLocationUpdate.area
                      : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Điều phối
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="coordinate"
                  errors={errors.coordinate}
                  defaultValue={
                    itemDetailLocationUpdate
                      ? itemDetailLocationUpdate.coordinate
                      : null
                  }
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Mã địa chỉ
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="locationId"
                  errors={errors.locationId}
                  defaultValue={
                    itemDetailLocationUpdate
                      ? itemDetailLocationUpdate.locationId
                      : null
                  }
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
                    Cập nhật
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
export default DialogEditLocation;
