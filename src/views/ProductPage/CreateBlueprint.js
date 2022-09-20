import React, { useState, useEffect } from 'react';
import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { yupResolver } from '@hookform/resolvers/yup';
import { createBlueprintApi } from '../../apis/Blueprint/createBlueprint';
import * as yup from 'yup';
import TextFieldComponent from '../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { getAllProjectApi1 } from '../../apis/Project/getAllProject';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Badge from '@mui/material/Badge';
import CancelIcon from '@mui/icons-material/Cancel';
import Select from '@mui/material/Select';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import RenderImage from '../../Components/Render/RenderImage';
import { useParams } from 'react-router-dom';
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
const CreateBlueprint = (props) => {
  const { id } = useParams();
  console.log(id);
  const [blueprint, setBlueprint] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [allProject, setAllProject] = React.useState([]);
  const [filesImage, setFilesImage] = useState([]);
  const [selectedImages, setSelectedImage] = useState([]);
  const [ip, setIP] = useState('');
  //   const [{ loading }, dispatch] = useStateValue();
  // const getData = async () => {
  //   const res = await axios.get('https://geolocation-db.com/json/');
  //   console.log(res.data);
  //   setIP(res.data.IPv4);
  // };

  // useEffect(() => {
  //   //passing getData method to the lifecycle method
  //   getData();
  // }, []);
  React.useEffect(() => {
    (async () => {
      try {
        const listAllProject = await getAllProjectApi1(
          0,
          15,
          'createdAt',
          true
        );
        setAllProject(listAllProject.data);
      } catch (error) {
        console.log('Không thể lấy danh sách');
      }
    })();
  }, []);
  const validateSchema = yup
    .object({
      designerName: yup
        .string()
        .min(5, 'Tên người thiết kế')
        .required('Phải có tên người thiết kế!'),
      blueprintName: yup.string().required('Phải có tên bản vẽ'),
      estimatedCost: yup.number().required('Phải có giá tiền'),
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
    console.log(filesImage);
    handleCreateBlueprint(
      id,
      data.designerName,
      data.blueprintName,
      data.estimatedCost,
      filesImage
    );
  };
  const handleCreateBlueprint = async (
    projectId,
    desginerName,
    blueprintName,
    estimatedCost,
    file
  ) => {
    try {
      setLoading(true);
      await createBlueprintApi({
        projectId,
        desginerName,
        blueprintName,
        estimatedCost,
        file,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Tạo bản vẽ thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      await window.location.replace(`/projectDetailsManager/${id}`);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Tạo bản vẽ không thành công',
        timer: 2000,
        showConfirmButton: false,
      });
      //   setLoading(false);
    }
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
  return (
    <div>
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
          <form onSubmit={handleSubmit(submitForm)}>
            <Box sx={{ width: '100%', height: '20px' }}></Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* <ImageList sx={{ width: '100%' }} cols={3} rowHeight={164}>
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
                </ImageList> */}
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2">Tên bản vẽ</Typography>
                <TextFieldComponent
                  register={register}
                  name="blueprintName"
                  // label="Tên vai trò"
                  errors={errors.blueprintName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Người thiết kế</Typography>
                <TextFieldComponent
                  register={register}
                  name="designerName"
                  // label="Tên vai trò"
                  errors={errors.designerName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Typography variant="body2">Giá bản vẽ</Typography>
                  <TextFieldComponent
                    register={register}
                    name="estimatedCost"
                    // label="Tên vai trò"
                    errors={errors.estimatedCost}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <input
                  {...register('files')}
                  type="file"
                  id="files"
                  // multiple
                  accept="image/*"
                  onChange={handleChangeFile}
                />
                <div className="label-holder">
                  <label htmlFor="file" className="img-upload"></label>
                </div>

                <div className="result">{RenderImage(selectedImages)}</div>
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
        </Box>
      </Box>
    </div>
  );
};
export default CreateBlueprint;
