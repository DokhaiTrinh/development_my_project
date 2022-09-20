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
import { createReportApi1 } from '../../apis/Report/createReport';
import { createReportApi } from '../../apis/Report/createReport';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogReportDetail from './Components/DialogReportDetail';
import DialogTaskReport from './Components/DialogTaskReport';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { createReportDetailApi } from '../../apis/ReportDetails/createReportDetails';
import { getAllReportTypeApi } from '../../apis/ReportTypes/getAllReportTypes';
import { useStateValue } from '../../common/StateProvider/StateProvider';
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
const CreateReportProject = (props) => {
  const { id } = useParams();
  const idN = parseFloat(id);
  var idUser = parseFloat(userInfor.authorID);
  const [valueReportDate, setValueReportDate] = React.useState(new Date());
  const [loading, setLoading] = useState('');
  const [openReportDetailDialog, setOpenReportDetailDialog] = useState(false);
  const [reportDetail, setReportDetail] = React.useState([]);
  const [allReportType, setAllReportType] = React.useState([]);
  const [reportTypeSelected, setReportTypeSelected] = React.useState();
  const [taskReportDetail, setTaskReportDetail] = React.useState([]);
  const [openTaskReportDetailDialog, setOpenTaskReportDetailDialog] =
    useState(false);
  const [filesImage, setFilesImage] = useState([]);
  const [selectedImages, setSelectedImage] = useState([]);

  const submitForm = (data) => {
    const reportDate = moment(valueReportDate).format('YYYY-MM-DD HH:mm');
    if (
      reportDetail.length === 0 ||
      taskReportDetail.length === 0 
    ) {
      handleCreateReport(
        idN,
        reportDate,
        data.reportDesc,
        null,
        reportTypeSelected,
        idUser,
        data.reportName,
        null,
        filesImage
      );
    } else {
      handleCreateReport(
        idN,
        reportDate,
        data.reportDesc,
        reportDetail,
        reportTypeSelected,
        idUser,
        data.reportName,
        taskReportDetail,
        filesImage
      );
    }
    handleCreateReport(
      idN,
      reportDate,
      data.reportDesc,
      reportDetail,
      reportTypeSelected,
      idUser,
      data.reportName,
      taskReportDetail,
      filesImage
    );
  };
  const handleCreateReport = async (
    projectId,
    reportDate,
    reportDesc,
    reportDetailList,
    reportTypeId,
    reporterId,
    reportName,
    taskReportList,
    fileList
  ) => {
    try {
      setLoading(true);
      console.log(
        typeof projectId,
        typeof reportDate,
        typeof reportDesc,
        typeof reportDetailList,
        typeof reportTypeId,
        typeof reporterId,
        typeof reportName,
        typeof taskReportList,
        typeof fileList
      );
      await createReportApi({
        projectId,
        reportDate,
        reportDesc,
        reportDetailList,
        reportTypeId,
        reporterId,
        reportName,
        taskReportList,
        fileList,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Tạo báo cáo thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      await window.location.replace(`/projectDetails/${id}`);
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

  //   itemAmount,
  //   itemDesc,
  //   itemPrice,
  //   itemUnit
  // ) => {
  //   try {
  //     setLoading(true);
  //     await createReportDetailApi({
  //       itemAmount,
  //       itemDesc,
  //       itemPrice,
  //       itemUnit,
  //     });
  //     setLoading(false);
  //     await Swal.fire({
  //       icon: 'success',
  //       text: 'Tạo báo cáo chi tiết thành công',
  //       timer: 3000,
  //       showConfirmButton: false,
  //     });
  //   } catch (error) {
  //     await Swal.fire({
  //       icon: 'error',
  //       text: error.response.data,
  //       timer: 3000,
  //       showConfirmButton: false,
  //     });
  //     setLoading(false);
  //   }
  // };
  const valideSchema = yup
    .object({
      reportDesc: yup
        .string()
        .min(5, 'Thông tin báo cáo phải có thông tin nhiều hơn 5 ký tự!')
        .required(),
      reporterId: yup.number().required(),
      reportName: yup
        .string()
        .min(5, 'Tên báo cáo phải có ít nhất 5 ký tự')
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
    setReportTypeSelected(event.target.value);
  };
  const handleOpenReportDetailDialog = () => {
    setOpenReportDetailDialog(true);
  };
  const handleCloseReportDetailDialog = () => {
    setOpenReportDetailDialog(false);
  };
  const handleOpenTaskReportDetailDialog = () => {
    setOpenTaskReportDetailDialog(true);
  };
  const handleCloseTaskReportDetailDialog = () => {
    setOpenTaskReportDetailDialog(false);
  };
  React.useEffect(() => {
    (async () => {
      try {
        const listAllReportType = await getAllReportTypeApi(
          0,
          15,
          'createdAt',
          true
        );
        setAllReportType(listAllReportType.data);
      } catch (error) {
        console.log('Không thể lấy danh sách báo cáo');
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
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        TẠO BÁO CÁO
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
            Thông tin báo cáo
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Tên báo cáo
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="reportName"
                  errors={errors.reportName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Thông tin báo cáo
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="reportDesc"
                  errors={errors.reportDesc}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item container xs={12}>
                <Typography variant="body2">
                  Ngày báo cáo
                </Typography>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField {...props} fullWidth />
                      )}
                      value={valueReportDate}
                      onChange={(newValue) => {
                        setValueReportDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Grid item container sx={12}>
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
                    onClick={() => handleOpenReportDetailDialog()}
                  >
                    Chi tiết báo cáo
                  </Button>
                </Box>
              </Grid>
              <Grid item container columns={12} spacing={2}>
                {reportDetail.length ? (
                  reportDetail.map((report, index) => (
                    <Grid item xs={4}>
                      <Box sx={{ width: '100%' }}>
                        <Card sx={{ width: '100%' }}>
                          <CardContent>
                            <Typography>
                              Thông tin báo cáo chi tiết: {report.itemDesc}
                            </Typography>
                            <Typography>
                              Số lượng:{report.itemAmount}
                            </Typography>
                            <Typography>
                              Giá tiền: {report.itemPrice}{' '}
                            </Typography>
                            <Typography>Đơn vị: {report.itemUnit}</Typography>
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
              <Grid item container sx={12}>
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
                    onClick={() => handleOpenTaskReportDetailDialog()}
                  >
                    Chi tiết công việc
                  </Button>
                </Box>
              </Grid>
              <Grid item container columns={12} spacing={2}>
                {taskReportDetail.length ? (
                  taskReportDetail.map((task, index) => (
                    <Grid item xs={4}>
                      <Box sx={{ width: '100%' }}>
                        <Card sx={{ width: '100%' }}>
                          <CardContent>
                            <Typography>{task.taskId}</Typography>
                            <Typography>Số lượng:{task.taskNote}</Typography>
                            <Typography>
                              Giá tiền: {task.taskProgress}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <Grid item sx={12}>
                    <div>Không có dữ liệu chi tiết!</div>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Loại báo cáo
                </Typography>
                <FormControl sx={{ width: '100%' }}>
                  <Select
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    value={reportTypeSelected}
                  >
                    {allReportType.length > 0 ? (
                      allReportType.map((reportType, index) => (
                        <MenuItem value={reportType.reportTypeId} key={index}>
                          {reportType.reportTypeName}
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
                <Typography variant="body2">
                  Người báo cáo
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="reporterId"
                  errors={errors.reportDesc}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
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

              <div className="result">{RenderImage(selectedImages)}</div>
              {/* <input type="file" multiple {...register("file")} /> */}
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
                    Tạo báo cáo
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <Dialog
        open={openReportDetailDialog}
        onClose={handleCloseReportDetailDialog}
      >
        <DialogReportDetail
          handleCloseReportDetailDialog={handleCloseReportDetailDialog}
          setReportDetail={setReportDetail}
          reportDetail={reportDetail}
        ></DialogReportDetail>
      </Dialog>
      <Dialog
        open={openTaskReportDetailDialog}
        onClose={handleCloseTaskReportDetailDialog}
      >
        <DialogTaskReport
          handleCloseTaskReportDetailDialog={handleCloseTaskReportDetailDialog}
          setTaskReportDetail={setTaskReportDetail}
          taskReportDetail={taskReportDetail}
        ></DialogTaskReport>
      </Dialog>
    </div>
  );
};

export default CreateReportProject;
