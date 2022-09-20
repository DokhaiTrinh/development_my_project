import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { createCategoryApi } from '../../apis/CategoryPost/createCategory';
import TextFieldComponent from '../../Components/TextField/textfield';
import { getCategoryByIdApi } from '../../apis/CategoryPost/getAllCategory';
import { useParams } from 'react-router-dom';
import { updateCategoryApi } from '../../apis/CategoryPost/updateCategory';

const UpdateCategoryPage = (props) => {
  const { id } = useParams();
  const [categoryId, setCategoryId] = React.useState();
  React.useEffect(() => {
    (async () => {
      try {
        const listCategoryById = await getCategoryByIdApi(
          id,
          'BY_POST_CATEGORY_ID'
        );
        setCategoryId(listCategoryById.data);
      } catch (error) {
        console.log('Không thể lấy danh sách');
      }
    })();
  }, []);
  console.log(categoryId);
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
    Swal.fire({
      title: 'Bạn có chắc là muốn cập nhật?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Cập nhật',
      denyButtonText: `Không cập nhật`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdateCategory(id, data.postCategoryDesc, data.postCategoryName);
      }
    });
  };
  const handleUpdateCategory = async (
    postCategoryId,
    postCategoryDesc,
    postCategoryName
  ) => {
    try {
      setLoading(true);
      await updateCategoryApi({
        postCategoryId,
        postCategoryDesc,
        postCategoryName,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Cập nhật thể loại thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      window.location.replace('/categoryManage');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Cập nhật thất bại',
        timer: 2000,
        showConfirmButton: false,
      });
      setLoading(false);
    }
  };
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        CẬP NHẬT THỂ LOẠI
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
            Cập nhật thể loại
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>
          {categoryId ? (
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
                    defaultValue={categoryId.postCategoryName}
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
                    defaultValue={categoryId.postCategoryDesc}
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
                      {loading ? (
                        <>
                          <CircularProgress color="secondary" size={24} />{' '}
                          &nbsp; Đang xử lí...
                        </>
                      ) : (
                        'Lưu'
                      )}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          ) : (
            <div>Không có dữ liệu!!</div>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default UpdateCategoryPage;
