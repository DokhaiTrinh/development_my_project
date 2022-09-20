import {
  Divider,
  Typography,
  Box,
  TextField,
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
import { createRoleApi } from '../../apis/Role/CreateRole';
import TextFieldComponent from '../../Components/TextField/textfield';
const CreateRolePage = (props) => {
  //   const [date, setDate] = React.useState(new Date());
  //   const idN = parseInt(id);
  const [editorState, setEditorState] = React.useState('');
  const [loading, setLoading] = useState(false);

  const validateSchema = yup
    .object({
      roleName: yup
        .string()
        .min(5, 'Tên vai trò phải lớn hơn hoặc bằng 6 kí tự')
        .required('Tên vai trò không được để trống'),
      roleDesc: yup.string(),
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
    handleCreateRole(data.roleName, data.roleDesc);
  };
  const handleCreateRole = async (roleName, roleDesc) => {
    try {
      setLoading(true);
      await createRoleApi({ roleName, roleDesc });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Tạo vai trò thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      window.location.replace('/roleManage');
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
    <Paper sx={{ padding: '32px' }}>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        TẠO MỚI VAI TRÒ
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
            Thông tin vai trò
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Tên vai trò
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="roleName"
                  label="Tên vai trò"
                  errors={errors.roleName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Chi tiết vai trò</Typography>
                <TextFieldComponent
                  register={register}
                  name="roleDesc"
                  label="Chi tiết vai trò"
                  errors={errors.roleDesc}
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

export default CreateRolePage;
