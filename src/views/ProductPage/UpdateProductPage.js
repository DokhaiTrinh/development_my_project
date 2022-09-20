import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  Paper,
} from '@mui/material';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import * as yup from 'yup';
import TextFieldComponent from '../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { yupResolver } from '@hookform/resolvers/yup';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Badge from '@mui/material/Badge';
import CancelIcon from '@mui/icons-material/Cancel';
import { getAllCategoryApi1 } from '../../apis/CategoryPost/getAllCategory';
import { getPostByIdApi } from '../../apis/Post/getAllPost';
import { updatePostApi } from '../../apis/Post/updatePost';
import { updatePostApi1 } from '../../apis/Post/updatePost';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const itemData = [];
const UpdateProductPage = (props) => {
  const [allCategory, setAllCategory] = React.useState([]);
  const [categorySelected, setCategorySelected] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const { id } = useParams();
  const [postById, setPostById] = React.useState();
  const [selectedImages, setSelectedImage] = React.useState([]);
  const [filesImage, setFilesImage] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const listAllCategory = await getAllCategoryApi1(
          0,
          15,
          'createdAt',
          true
        );
        setAllCategory(listAllCategory.data);
      } catch (error) {
        console.log('Không thể lấy danh sách');
      }
      try {
        const listPostById = await getPostByIdApi(id, 'BY_POST_ID');
        setPostById(listPostById.data);
      } catch (error) {
        console.log('Không thể lấy danh sách');
      }
    })();
  }, []);
  const validateSchema = yup
    .object({
      address: yup
        .string()
        .min(5, 'Địa chỉ phải lớn hoặc hoặc bằng 6 kí tự')
        .required('Địa chỉ không được để trống'),
      authorName: yup
        .string()
        .min(5, 'Tên tác giả phải lớn hoặc hoặc bằng 6 kí tự')
        .required('Tên tác giả không được để trống'),
      ownerName: yup
        .string()
        .min(5, 'Tên chủ đầu tư phải lớn hoặc hoặc bằng 6 kí tự')
        .required('Tên chủ đầu tư không được để trống'),
      postTitle: yup
        .string()
        .min(5, 'Tên bài đăng phải lớn hoặc hoặc bằng 6 kí tự')
        .required('Tên bài đăng tư không được để trống')
        .typeError('Tên bài đăng đã trùng!!'),
      scale: yup
        .string()
        .min(5, 'Tên quy mô phải lớn hoặc hoặc bằng 6 kí tự')
        .required('Tên quy mô không được để trống'),
      estimatedCost: yup.number().required(),
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
        handleUpdatePost(
          id,
          data.address,
          data.authorName,
          data.ownerName,
          categorySelected,
          data.postTitle,
          data.scale,
          data.estimatedCost,
          filesImage
        );
      }
    });
  };
  const handleUpdatePost = async (
    postId,
    address,
    authorName,
    ownerName,
    postCategoryId,
    postTitle,
    scale,
    estimatedCost,
    fileList
  ) => {
    try {
      setLoading(true);
      await updatePostApi1({
        postId,
        address,
        authorName,
        ownerName,
        postCategoryId,
        postTitle,
        scale,
        estimatedCost,
        fileList,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Cập nhật đăng thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      // window.location.replace('/product');
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
  const handleChange = (event) => {
    setCategorySelected(event.target.value);
  };
  const handleChangeFile = (e) => {
    setFilesImage(e.target.files);

    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImage((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };
  const handleDeleteImage = (photo, indexImage) => {
    const index = selectedImages.indexOf(photo);
    if (index > -1) {
      selectedImages.splice(index, 1);
      // dispatch({ type: "LOADING", newLoading: !loading });
    }

    const dt = new DataTransfer();
    const input = document.getElementById('files');
    const { files } = input;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (index !== i) dt.items.add(file); // here you exclude the file. thus removing it.
    }

    input.files = dt.files;
    setFilesImage(input.files);

    // dispatch({ type: 'LOADING', newLoading: !loading });
  };
  const renderPhotos = (src) => {
    return src.map((photo, index) => {
      return (
        <Badge
          badgeContent={<CancelIcon />}
          onClick={() => handleDeleteImage(photo, index)}
        >
          <img
            style={{
              width: '150px',
              height: '150px',
              // borderRadius: "50%",
              marginRight: '5px',
              marginBottom: '5px',
            }}
            src={photo}
            key={index}
          />
        </Badge>
      );
    });
  };
  return (
    <div>
      <Paper className="bodynonetab">
        <Typography
          variant="h6"
          color="#DD8501"
          sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
        >
          TẠO MỚI DỊCH VỤ
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
              Thông tin dịch vụ
            </Typography>
            <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
            {postById ? (
              <form onSubmit={handleSubmit(submitForm)}>
                <Box sx={{ width: '100%', height: '20px' }}></Box>
                <Grid container spacing={2}>
                  {/* <Grid item xs={12}>
                    <Typography variant="body2">Hình ảnh</Typography>
                    <ImageList sx={{ width: '100%' }} cols={3} rowHeight={164}>
                      {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                          <img
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Grid> */}
                  {/* <Grid item xs={12}>
                    <Box
                      sx={{ width: 164, height: 164 }}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton
                        aria-label="add"
                        sx={{ alignSelf: 'center', backgroundColor: '#DD8501' }}
                        component={Link}
                        to={'/createProject'}
                      >
                        <Add sx={{ color: 'white' }}></Add>
                      </IconButton>
                    </Box>
                  </Grid> */}
                  <Grid item xs={12}>
                    <Typography variant="body2">Tên dự án</Typography>
                    <TextField
                      {...register('postTitle')}
                      // inputProps={{ readOnly: true }}
                      name="postTitle"
                      variant="outlined"
                      autoComplete="postTitle"
                      autoFocus
                      defaultValue={postById.postTitle}
                      error={errors.postTitle != null}
                      helperText={errors.postTitle?.message}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">Chủ đầu tư</Typography>
                    <TextFieldComponent
                      register={register}
                      name="ownerName"
                      // label="Tên vai trò"
                      errors={errors.ownerName}
                      defaultValue={postById.ownerName}
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">Vị trí</Typography>
                    <TextFieldComponent
                      register={register}
                      name="address"
                      // label="Tên vai trò"
                      errors={errors.address}
                      defaultValue={postById.address}
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">Quy mô</Typography>
                    <TextFieldComponent
                      register={register}
                      name="scale"
                      // label="Tên vai trò"
                      errors={errors.scale}
                      defaultValue={postById.scale}
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">Thể loại</Typography>
                    <FormControl sx={{ width: '100%' }}>
                      <Select
                        onChange={handleChange}
                        MenuProps={MenuProps}
                        value={categorySelected}
                        defaultValue={postById.categorySelected}
                      >
                        {allCategory.length > 0 ? (
                          allCategory.map((cateType, index) => (
                            <MenuItem
                              value={cateType.postCategoryId}
                              key={index}
                            >
                              {cateType.postCategoryName}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>
                            Không có dữ liệu của danh sách công việc!
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                    <Grid item xs={12}>
                      <Typography variant="body2">Tác giả</Typography>
                      <TextFieldComponent
                        register={register}
                        name="authorName"
                        // label="Tên vai trò"
                        errors={errors.authorName}
                        defaultValue={postById.authorName}
                        variant="outlined"
                        sx={{ width: '100%' }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">Giá dự kiến</Typography>
                      <TextFieldComponent
                        register={register}
                        name="estimatedCost"
                        // label="Tên vai trò"
                        errors={errors.estimatedCost}
                        variant="outlined"
                        sx={{ width: '100%' }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <input
                      {...register('files')}
                      type="file"
                      id="files"
                      multiple
                      onChange={handleChangeFile}
                      accept="image/*"
                    />
                    <div className="label-holder">
                      <label htmlFor="file" className="img-upload">
                        Chọn hình
                      </label>
                    </div>

                    <div className="result">{renderPhotos(selectedImages)}</div>
                    {/* <input type="file" multiple {...register("file")} /> */}
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
            ) : (
              <div>Không có dữ liệu</div>
            )}
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default UpdateProductPage;
