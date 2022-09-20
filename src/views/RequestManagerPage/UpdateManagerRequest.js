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
        console.log('Không thể lấy danh sách dự án');
      }
    })();
    (async () => {
      try {
        const listAllRequestDetail = await getRequestIdApi(id, 'BY_ID');
        setAllRequestDetail(listAllRequestDetail.data);
        setRequestDetail(listAllRequestDetail.data.requestDetailList);
        setProjectId(listAllRequestDetail.data.projectId);
      } catch (error) {
        console.log('Không thể lấy dữ liệu của báo cáo');
      }
    })();
  }, []);
  console.log(allRequestDetail);
  const submitForm = (data) => {
    const requestDate = moment(valueRequestDate).format('YYYY-MM-DD HH:mm');
    Swal.fire({
      title: 'Cập nhật yêu cầu ?',
      target: document.getElementById('form-modal12'),
      text: 'Lưu ý cập nhật sẽ thay đổi dữ liệu của yêu cầu!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#25723F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'CẬP NHẬT',
      cancelButtonText: 'KHÔNG CẬP NHẬT',
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
        text: 'Tạo yêu cầu thành công',
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
        .min(5, 'Tên yêu cầu phải có thông tin nhiều hơn 5 ký tự!')
        .required(),
      requestDesc: yup
        .string()
        .min(5, 'Thông tin yêu cầu phải có thông tin nhiều hơn 5 ký tự!')
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
        CẬP NHẬT YÊU CẦU
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
              Thông tin yêu cầu
            </Typography>
            <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
            <Box sx={{ width: '100%', height: '20px' }}></Box>
            <form onSubmit={handleSubmit(submitForm)}>
              <Grid container spacing={2}>
                {/* <Grid item xs="4">
                  <Typography variant="body2">Mã dự án</Typography>
                  <Typography variant="body1">
                    {allRequestDetail.projectId}
                  </Typography>
                </Grid> */}
                <Grid item xs={12}>
                  <Typography variant="body2">Tên yêu cầu</Typography>
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
                  <Typography variant="body2">Thông tin yêu cầu</Typography>
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
                  <Typography variant="body2">Ngày yêu cầu</Typography>
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
                      Chi tiết yêu cầu
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
                                Thông tin báo cáo chi tiết: {request.itemDesc}
                              </Typography>
                              <Typography>
                                Số lượng:{request.itemAmount}
                              </Typography>
                              <Typography>
                                Giá tiền: {request.itemPrice}{' '}
                              </Typography>
                              <Typography>
                                Đơn vị: {request.itemUnit}
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
                      <div>Không có dữ liệu của báo cáo chi tiết!</div>
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Loại yêu cầu</Typography>
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
                          Không có dữ liệu kiểu báo cáo! Vui lòng xem lại!
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
          </Box>
        ) : (
          <div>Không có dữ liệu của yêu cầu!!</div>
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
