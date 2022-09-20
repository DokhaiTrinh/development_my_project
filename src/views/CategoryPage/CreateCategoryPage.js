import {
  Divider,
  Typography,
  Box,
  Grid,
  Button,
  Paper,
} from '@mui/material';
import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { createCategoryApi } from '../../apis/CategoryPost/createCategory';
import TextFieldComponent from '../../Components/TextField/textfield';
const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
const CreateCategortPage = (props) => {
  //   const [date, setDate] = React.useState(new Date());
  //   const idN = parseInt(id);
  const [editorState, setEditorState] = React.useState('');
  const [loading, setLoading] = useState(false);

  const validateSchema = yup
    .object({
      postCategoryName: yup
        .string()
        .min(5, 'Tên thể loại phải lớn hơn hoặc bằng 6 kí tự')
        .required('Tên vai trò không được để trống'),
      postCategoryDesc: yup
        .string()
        .min(5, 'Tên thể loại phải lớn hơn hoặc bằng 6 kí tự'),
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
    handleCreateRole(data.postCategoryDesc, data.postCategoryName);
  };
  const handleCreateRole = async (postCategoryDesc, postCategoryName) => {
    try {
      setLoading(true);
      await createCategoryApi({ postCategoryDesc, postCategoryName });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Tạo thể loại thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      window.location.replace('/categoryManage');
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
  return (
    <Paper className='bodynonetab' elevation='none'>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        TẠO MỚI THỂ LOẠI
      </Typography>
      <Divider></Divider>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ paddingLeft: '10px', paddingTop: '10px', width: '40%' }}>
          <Typography variant="body1" color="#DD8501" fontWeight="bold">
            Thông tin thể loại
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>

          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Tên vai trò
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="postCategoryName"
                  errors={errors.postCategoryName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Chi tiết thể loại</Typography>
                <TextFieldComponent
                  register={register}
                  name="postCategoryDesc"
                  errors={errors.postCategoryDesc}
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
                    {loading ? (
                      <>
                        <CircularProgress color="secondary" size={24} /> &nbsp;
                        Đang xử lí...
                      </>
                    ) : (
                      'Lưu'
                    )}
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

export default CreateCategortPage;
