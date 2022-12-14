import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  Paper,
} from '@mui/material';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import TextFieldComponent from '../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import moment from 'moment';
import { createRequestApi } from '../../apis/Request/createRequest';
import { createRequestApi1 } from '../../apis/Request/createRequest';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogRequestProject from './Components/DialogRequestDetail';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { getAllRequestTypeApi } from '../../apis/RequestType/getAllRequestType';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import { createRequestDetailApi } from '../../apis/RequestDetail/createRequestDetail';
import { replaceColor } from '@cloudinary/url-gen/actions/adjust';
import Badge from '@mui/material/Badge';
import CancelIcon from '@mui/icons-material/Cancel';
import RenderImage from '../../Components/Render/RenderImage';

const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
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
const CreateRequestProject = (props) => {
  const { id } = useParams();
  const idN = parseFloat(id);
  var idUser = parseFloat(userInfor.authorID);
  const [valueRequestDate, setValueRequestDate] = React.useState(new Date());
  const [loading, setLoading] = useState('');
  const [openRequestDetailDialog, setOpenRequestDetailDialog] = useState(false);
  const [requestDetail, setRequestDetail] = React.useState([]);
  const [allRequestType, setAllRequestType] = React.useState([]);
  const [requestTypeSelected, setRequestTypeSelected] = React.useState();
  const [filesImage, setFilesImage] = useState([]);
  const [selectedImages, setSelectedImage] = useState([]);
  const submitForm = (data) => {
    const requestDate = moment(valueRequestDate).format('YYYY-MM-DD HH:mm');
    if (requestDetail.length === 0) {
      handleCreateRequest(
        idN,
        requestDate,
        data.requestDesc,
        null,
        data.requestName,
        requestTypeSelected,
        idUser,
        filesImage
      );
    } else {
      handleCreateRequest(
        idN,
        requestDate,
        data.requestDesc,
        requestDetail,
        data.requestName,
        requestTypeSelected,
        idUser,
        filesImage
      );
    }
  };
  const handleCreateRequest = async (
    projectId,
    requestDate,
    requestDesc,
    requestDetailList,
    requestName,
    requestTypeId,
    requesterId,
    fileList
  ) => {
    try {
      setLoading(true);
      console.log(
        typeof projectId,
        typeof requestDate,
        typeof requestDesc,
        typeof requestDetailList,
        typeof requestName,
        typeof requestTypeId,
        typeof requesterId,
        typeof fileList
      );
      await createRequestApi1({
        projectId,
        requestDate,
        requestDesc,
        requestDetailList,
        requestName,
        requestTypeId,
        requesterId,
        fileList,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'T???o y??u c???u th??nh c??ng',
        timer: 3000,
        showConfirmButton: false,
      });
      // await window.location.replace(`/projectDetailsManager/${id}`);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        text: 'T???o y??u c???u th???t b???i!!',
        timer: 3000,
        showConfirmButton: false,
      });
      setLoading(false);
    }
  };
  const valideSchema = yup
    .object({
      requestName: yup
        .string()
        .min(0, 'Ph???i nh???p t??n y??u c???u!!')
        .max(50, 'T??n y??u c???u kh??ng ???????c qu?? 50 k?? t???!')
        .typeError('T??n y??u c???u kh??ng ???????c tr??ng!')
        .required(),
      requestDesc: yup
        .string()
        .min(5, 'Th??ng tin y??u c???u ph???i c?? th??ng tin nhi???u h??n 5 k?? t???!')
        .required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(valideSchema),
  });
  const handleChange = (event) => {
    setRequestTypeSelected(event.target.value);
  };

  const handleOpenRequestDetailDialog = () => {
    setOpenRequestDetailDialog(true);
  };
  const handleCloseRequestDetailDialog = () => {
    setOpenRequestDetailDialog(false);
  };
  React.useEffect(() => {
    (async () => {
      try {
        const listAllRequestType = await getAllRequestTypeApi(
          0,
          15,
          'createdAt',
          true
        );
        setAllRequestType(listAllRequestType.data);
      } catch (error) {
        console.log('Kh??ng th??? l???y danh s??ch d??? ??n');
      }
    })();
  }, []);
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
    <Paper className='bodynonetab'>
      <Typography
        variant="h6"
        color="#DD8501"
      >
        T???O Y??U C???U
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
            Th??ng tin y??u c???u
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2">
                  T??n y??u c???u
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="requestName"
                  errors={errors.requestName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Th??ng tin y??u c???u
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="requestDesc"
                  errors={errors.requestDesc}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Ng??y y??u c???u
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField {...props} fullWidth />
                    )}
                    value={valueRequestDate}
                    onChange={(newValue) => {
                      setValueRequestDate(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item sx={12}>
                <Box
                  sx={{
                    width: '100%',
                    justifyContent: 'left',
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleOpenRequestDetailDialog()}
                  >
                    Chi ti???t y??u c???u
                  </Button>
                </Box>
              </Grid>
              <Grid item container columns={12} spacing={1}>
                {requestDetail.length ? (
                  requestDetail.map((request, index) => (
                    <Grid item xs="4">

                      <Paper sx={{ padding: '10px',}}>
                            <Typography>
                              {request.itemDesc}
                            </Typography>
                            <Typography>
                              S??? l?????ng:{request.itemAmount}
                            </Typography>
                            <Typography>
                              Gi?? ti???n: {request.itemPrice}{' '}
                            </Typography>
                            <Typography>????n v???: {request.itemUnit}</Typography>
                      </Paper>
                    </Grid>
                  ))
                ) : (
                  <Grid item sx={12}>
                    <div>Kh??ng c?? d??? li???u c???a b??o c??o chi ti???t!</div>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Lo???i y??u c???u
                </Typography>
                <FormControl fullWidth>
                  <Select
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    value={requestTypeSelected}
                  >
                    {allRequestType.length > 0 ? (
                      allRequestType.map((requestType, index) => (
                        <MenuItem value={requestType.requestTypeId} key={index}>
                          {requestType.requestTypeName}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>
                        Kh??ng c?? d??? li???u ki???u b??o c??o! Vui l??ng xem l???i!
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                  <Typography variant="body2">
                    T???p ????nh k??m
                  </Typography>
                  <input
                    {...register('files')}
                    type="file"
                    id="files"
                    multiple
                    onChange={handleChangeFile}
                  />
                  <div className="label-holder">
                    <label htmlFor="file" className="img-upload"></label>
                  </div>
                {/* <div className="result">{RenderImage(selectedImages)}</div> */}
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
                    className='submitButton'
                  >
                    L??u
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <Dialog
        open={openRequestDetailDialog}
        onClose={handleCloseRequestDetailDialog}
      >
        <DialogRequestProject
          handleCloseRequestDetailDialog={handleCloseRequestDetailDialog}
          setRequestDetail={setRequestDetail}
          requestDetail={requestDetail}
        ></DialogRequestProject>
      </Dialog>
    </Paper>
  );
};

export default CreateRequestProject;
