import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  Paper,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import TextFieldComponent from '../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import moment from 'moment';
import { updateRequestApi } from '../../apis/Request/updateRequest';
import { updateRequestApi1 } from '../../apis/Request/updateRequest';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogUpdateRequestDetail from './Components/DialogUpdateRequestDetail';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { getAllRequestTypeApi } from '../../apis/RequestType/getAllRequestType';
import { getRequestIdApi } from '../../apis/Request/getRequestByProjectId';
import Badge from '@mui/material/Badge';
import CancelIcon from '@mui/icons-material/Cancel';
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
const UpdateRequest = () => {
  const { id } = useParams();
  const idN = parseFloat(id);
  var idUser = parseFloat(userInfor.authorID);
  const [valueRequestDate, setValueRequestDate] = React.useState(new Date());
  const [loading, setLoading] = useState('');
  const [openUpdateRequestDetailDialog, setOpenUpdateRequestDetailDialog] =
    useState(false);
  const [requestDetail, setRequestDetail] = React.useState([]);
  const [allRequestType, setAllRequestType] = React.useState([]);
  const [requestTypeSelected, setRequestTypeSelected] = React.useState();
  const [allRequestDetail, setAllRequestDetail] = useState();
  const [projectId, setProjectId] = React.useState();
  const [actionUpdateRequest, setActionUpdateRequest] = useState();
  const [itemDetailRequestUpdate, setItemDetailRequestUpdate] = useState();
  const [selectedImages, setSelectedImage] = useState([]);
  const [filesImage, setFilesImage] = useState([]);
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
    (async () => {
      try {
        const listAllRequestDetail = await getRequestIdApi(id, 'BY_ID');
        setAllRequestDetail(listAllRequestDetail.data);
        setRequestDetail(listAllRequestDetail.data.requestDetailList);
        setProjectId(listAllRequestDetail.data.projectId);
      } catch (error) {
        console.log('Kh??ng th??? l???y d??? li???u c???a b??o c??o');
      }
    })();
  }, []);
  console.log(allRequestDetail);
  const submitForm = (data) => {
    const requestDate = moment(valueRequestDate).format('YYYY-MM-DD HH:mm');
    Swal.fire({
      title: 'C???p nh???t y??u c???u ?',
      target: document.getElementById('form-modal12'),
      text: 'L??u ?? c???p nh???t s??? thay ?????i d??? li???u c???a y??u c???u!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#25723F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'C???P NH???T',
      cancelButtonText: 'KH??NG C???P NH???T',
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdateRequest(
          idN,
          projectId,
          requestDate,
          data.requestName,
          data.requestDesc,
          requestDetail,
          requestTypeSelected,
          idUser,
          filesImage
        );
      }
    });
  };
  const handleUpdateRequest = async (
    requestId,
    projectId,
    requestDate,
    requestName,
    requestDesc,
    requestDetailList,
    requestTypeId,
    requesterId,
    fileList
  ) => {
    try {
      setLoading(true);
      await updateRequestApi1({
        requestId,
        projectId,
        requestDate,
        requestName,
        requestDesc,
        requestDetailList,
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
      // await window.location.replace(`/projectDetails/${id}`);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        text: error.response.data,
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
        .min(5, 'T??n y??u c???u ph???i c?? th??ng tin nhi???u h??n 5 k?? t???!')
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
  const handleOpenUpdateRequestDetailDialog = (
    actionGetUpdate,
    itemRequest
  ) => {
    setActionUpdateRequest(actionGetUpdate);
    setItemDetailRequestUpdate(itemRequest);
    setOpenUpdateRequestDetailDialog(true);
  };
  const handleCloseUpdateRequestDetailDialog = () => {
    setOpenUpdateRequestDetailDialog(false);
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
    <Paper>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        C???P NH???T Y??U C???U
      </Typography>
      <Divider></Divider>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {allRequestDetail ? (
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
            <Box sx={{ width: '100%', height: '20px' }}></Box>
            <form onSubmit={handleSubmit(submitForm)}>
              <Grid container spacing={2}>
                {/* <Grid item xs="4">
                  <Typography variant="body2">M?? d??? ??n</Typography>
                  <Typography variant="body1">
                    {allRequestDetail.projectId}
                  </Typography>
                </Grid> */}
                <Grid item xs={12}>
                  <Typography variant="body2">T??n y??u c???u</Typography>
                  <TextFieldComponent
                    register={register}
                    name="requestName"
                    defaultValue={allRequestDetail.requestName}
                    errors={errors.requestName}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Th??ng tin y??u c???u</Typography>
                  <TextFieldComponent
                    register={register}
                    name="requestDesc"
                    defaultValue={allRequestDetail.requestDesc}
                    errors={errors.requestDesc}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Ng??y y??u c???u</Typography>
                  <Grid item xs={12}>
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
                      style={{
                        backgroundColor: '',
                        borderRadius: 50,
                        width: '200px',
                        alignSelf: 'center',
                      }}
                      onClick={() =>
                        handleOpenUpdateRequestDetailDialog('CreateNewRequest')
                      }
                    >
                      Chi ti???t y??u c???u
                    </Button>
                  </Box>
                </Grid>
                <Grid item container columns={12} spacing={2}>
                  {requestDetail ? (
                    requestDetail.map((request, index) => (
                      <Grid
                        key={index}
                        item
                        xs={4}
                        onClick={() =>
                          handleOpenUpdateRequestDetailDialog(
                            'UpdateRequest',
                            request
                          )
                        }
                      >
                        <Box sx={{ width: '100%' }}>
                          <Card sx={{ width: '100%' }}>
                            <CardContent>
                              <Typography>
                                Th??ng tin b??o c??o chi ti???t: {request.itemDesc}
                              </Typography>
                              <Typography>
                                S??? l?????ng:{request.itemAmount}
                              </Typography>
                              <Typography>
                                Gi?? ti???n: {request.itemPrice}{' '}
                              </Typography>
                              <Typography>
                                ????n v???: {request.itemUnit}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <Grid
                      item
                      sx={12}
                      onClick={() => handleOpenUpdateRequestDetailDialog()}
                    >
                      <div>Kh??ng c?? d??? li???u c???a b??o c??o chi ti???t!</div>
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Lo???i y??u c???u</Typography>
                  <FormControl sx={{ width: 580 }}>
                    <Select
                      onChange={handleChange}
                      MenuProps={MenuProps}
                      value={requestTypeSelected}
                    >
                      {allRequestType.length > 0 ? (
                        allRequestType.map((requestType, index) => (
                          <MenuItem
                            value={requestType.requestTypeId}
                            key={index}
                          >
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
                <Grid item xs={6}>
                  <input
                    {...register('files')}
                    type="file"
                    id="files"
                    multiple
                    onChange={handleChangeFile}
                  />
                  <div className="label-holder">
                    <label htmlFor="file" className="img-upload">
                      Ch???n h??nh
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
                      L??u
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        ) : (
          <div>Kh??ng c?? d??? li???u c???a y??u c???u!!</div>
        )}
      </Box>
      <Dialog
        open={openUpdateRequestDetailDialog}
        onClose={handleCloseUpdateRequestDetailDialog}
      >
        <DialogUpdateRequestDetail
          handleCloseUpdateRequestDetailDialog={
            handleCloseUpdateRequestDetailDialog
          }
          setRequestDetail={setRequestDetail}
          requestDetail={requestDetail}
          actionUpdateRequest={actionUpdateRequest}
          itemDetailRequestUpdate={itemDetailRequestUpdate}
          idN={idN}
        ></DialogUpdateRequestDetail>
      </Dialog>
    </Paper>
  );
};

export default UpdateRequest;
