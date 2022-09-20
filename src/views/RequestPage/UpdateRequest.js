import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
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
import { updateRequestApi } from '../../apis/Request/updateRequest';
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
import { useStateValue } from '../../common/StateProvider/StateProvider';
import { createRequestDetailApi } from '../../apis/RequestDetail/createRequestDetail';
import { replaceColor } from '@cloudinary/url-gen/actions/adjust';
import { getRequestIdApi } from '../../apis/Request/getRequestByProjectId';

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
  const [allRequestDetail, setAllRequestDetail] = React.useState();
  const [projectId, setProjectId] = React.useState();

  const submitForm = (data) => {
    const requestDate = moment(valueRequestDate).format('YYYY-MM-DD HH:mm');
    handleUpdateRequest(
      idN,
      requestDate,
      data.requestDesc,
      requestDetail,
      requestTypeSelected,
      idUser
    );
    console.log(requestDetail);
  };
  const handleUpdateRequest = async (
    projectId,
    requestDate,
    requestDesc,
    updateRequestDetailModels,
    requestTypeId,
    requesterId
  ) => {
    try {
      setLoading(true);
      await updateRequestApi({
        projectId,
        requestDate,
        requestDesc,
        updateRequestDetailModels,
        requestTypeId,
        requesterId,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Tạo yêu cầu thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      await window.location.replace(`/projectDetailsManager/${id}`);
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
  const handleOpenUpdateRequestDetailDialog = () => {
    setOpenUpdateRequestDetailDialog(true);
  };
  const handleCloseUpdateRequestDetailDialog = () => {
    setOpenUpdateRequestDetailDialog(false);
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
        console.log('Không thể lấy danh sách dự án');
      }
    })();
    (async () => {
      try {
        const listAllRequestDetail = await getRequestIdApi(id, 'BY_ID');
        setAllRequestDetail(listAllRequestDetail.data);
        setRequestDetail(listAllRequestDetail.data.requestDetailList);
      } catch (error) {
        console.log('Không thể lấy dữ liệu của báo cáo');
      }
    })();
  }, []);
  console.log(allRequestDetail);
  return (
    <div>
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
            <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
            <Box sx={{ width: '100%', height: '20px' }}></Box>
            <form onSubmit={handleSubmit(submitForm)}>
              <Grid container spacing={2}>
                <Grid item xs="4">
                  <Typography variant="body2">
                    Mã dự án
                  </Typography>
                  <Typography variant="body1">
                    {allRequestDetail.projectId}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Cập nhật thông tin yêu cầu
                  </Typography>
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
                  <Typography variant="body2">
                    Ngày yêu cầu
                  </Typography>
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
                      onClick={() => handleOpenUpdateRequestDetailDialog()}
                    >
                      Chi tiết yêu cầu
                    </Button>
                  </Box>
                </Grid>
                <Grid item container columns={12} spacing={2}>
                  {requestDetail ? (
                    requestDetail.map((request, index) => (
                      <Grid item xs={4}>
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
                    <Grid item sx={12}>
                      <div>Không có dữ liệu của báo cáo chi tiết!</div>
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Loại yêu cầu
                  </Typography>
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
        ></DialogUpdateRequestDetail>
      </Dialog>
    </div>
  );
};

export default UpdateRequest;
