import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import { useParams } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import TextFieldComponent from '../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateReportApi } from '../../apis/Report/updateReports';
import { updateReportDetailApi } from '../../apis/ReportDetails/updateReportDetail';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { getAllReportTypeApi } from '../../apis/ReportTypes/getAllReportTypes';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import moment from 'moment';
import DialogUpdateReportDetail from './Components/DialogUpdateReportDetail';
import DialogUpdateTaskReport from './Components/DialogUpdateTaskReport';
import { getReportById } from '../../apis/Report/getReportByProjectId';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
const UpdateReportProject = (props) => {
  const { id } = useParams();
  const idN = parseFloat(id);
  const [projectId, setProjectId] = useState();

  const [actionUpdateReport, setActionUpdateReport] = useState();
  const [actionUpdateTask, setActionUpdateTask] = useState();
  const [itemDetailReportUpdate, setitemDetailReportUpdate] = useState();
  const [itemDetailTaskUpdate, setitemDetailTaskUpdate] = useState();
  const [valueReportDate, setValueReportDate] = React.useState(new Date());
  const [loading, setLoading] = useState('');
  const [allReportType, setAllReportType] = React.useState([]);
  const [reportTypeSelected, setReportTypeSelected] = React.useState();
  const [openUpdateReportDetailDialog, setOpenUpdateReportDetailDialog] =
    React.useState(false);
  const [openUpdateTaskReportDialog, setOpenUpdateTaskReportDialog] =
    React.useState(false);
  const [updateReportDetail, setUpdateReportDetail] = React.useState([]);
  const [updateTaskDetail, setUpdateTaskDetail] = React.useState([]);
  const [allReportDetail, setAllReportDetail] = React.useState();
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
        console.log('Không thể lấy danh sách dự án');
      }
    })();
    (async () => {
      try {
        const listAllReportDetail = await getReportById(id, 'BY_ID');
        setAllReportDetail(listAllReportDetail.data);
        setUpdateReportDetail(listAllReportDetail.data.reportDetailList);
        setUpdateTaskDetail(listAllReportDetail.data.taskReportList);
        setProjectId(listAllReportDetail.data.projectId);
      } catch (error) {
        console.log('Không thể lấy dữ liệu của báo cáo');
      }
    })();
  }, []);
  console.log(updateReportDetail);
  const submitForm = (data) => {
    const reportDate = moment(valueReportDate).format('YYYY-MM-DD HH:mm');
    handleUpdateReport(
      projectId,
      reportDate,
      data.reportDesc,
      idN,
      data.reportName,
      reportTypeSelected,
      data.reporterId,
      updateReportDetail,
      updateTaskDetail
    );
    // if (updateReportDetail.length > 0) {
    //   for (let urp of updateReportDetail) {
    //     handleUpdateReportDetails(
    //       urp.itemAmount,
    //       urp.itemDesc,
    //       urp.itemPrice,
    //       urp.itemUnit
    //     );
    //   }
    // }
  };
  const handleUpdateReport = async (
    projectId,
    reportDate,
    reportDesc,
    reportId,
    reportName,
    reportTypeId,
    reporterId,
    reportDetailList,
    taskReportList
  ) => {
    try {
      setLoading(true);
      console.log(
        typeof projectId,
        typeof reportDate,
        typeof reportDesc,
        typeof reportId,
        typeof reportName,
        typeof reportTypeId,
        typeof reporterId,
        typeof reportDetailList,
        typeof taskReportList
      );
      await updateReportApi({
        projectId,
        reportDate,
        reportDesc,
        reportId,
        reportName,
        reportTypeId,
        reporterId,
        reportDetailList,
        taskReportList,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Cập nhật báo cáo thành công',
        timer: 3000,
        showConfirmButton: false,
      });
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
  // const handleUpdateReportDetails = async (
  //   itemAmount,
  //   itemDesc,
  //   itemPrice,
  //   itemUnit
  // ) => {
  //   try {
  //     await updateReportDetailApi({});
  //   } catch (error) {}
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
  const handleOpenUpdateReportDetailDialog = (actionGetUpdate, itemReport) => {
    setActionUpdateReport(actionGetUpdate);
    setitemDetailReportUpdate(itemReport);
    setOpenUpdateReportDetailDialog(true);
  };
  const handleCloseUpdateReportDetailDialog = () => {
    setOpenUpdateReportDetailDialog(false);
  };
  const handleOpenUpdateTaskReportDetailDialog = (actionGetTask, itemTask) => {
    setActionUpdateTask(actionGetTask);
    setitemDetailTaskUpdate(itemTask);
    setOpenUpdateTaskReportDialog(true);
  };
  const handleCloseUpdateTaskReportDetailDialog = () => {
    setOpenUpdateTaskReportDialog(false);
  };
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        CẬP NHẬT BÁO CÁO
      </Typography>
      <Divider></Divider>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {allReportDetail ? (
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
                    defaultValue={allReportDetail.reportName}
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
                    defaultValue={allReportDetail.reportDesc}
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
                      onClick={() =>
                        handleOpenUpdateReportDetailDialog('CreateNewReport')
                      }
                    >
                      Chi tiết báo cáo
                    </Button>
                  </Box>
                </Grid>
                <Grid item container columns={12} spacing={2}>
                  {updateReportDetail ? (
                    updateReportDetail.map((reportDetailItem, index) => (
                      <Grid
                        key={index}
                        item
                        xs={4}
                        onClick={() =>
                          handleOpenUpdateReportDetailDialog(
                            'UpdateReport',
                            reportDetailItem
                          )
                        }
                      >
                        <Box sx={{ width: '100%' }}>
                          <Card sx={{ width: '100%', minHeight: '250px' }}>
                            <CardContent>
                              <Typography>
                                Mã báo cáo chi tiết:{' '}
                                {reportDetailItem.reportDetailId}
                              </Typography>
                              <Typography>
                                Thông tin báo cáo chi tiết:{' '}
                                {reportDetailItem.itemDesc}
                              </Typography>
                              <Typography>
                                Số lượng: {reportDetailItem.itemAmount}
                              </Typography>
                              <Typography>
                                Giá tiền: {reportDetailItem.itemPrice}
                              </Typography>
                              <Typography>
                                Đơn vị: {reportDetailItem.itemUnit}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <Grid
                      item
                      xs={4}
                      onClick={() => handleOpenUpdateReportDetailDialog()}
                    >
                      Không có chi tiết báo cáo!!!
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
                      onClick={() =>
                        handleOpenUpdateTaskReportDetailDialog('CreateNewTask')
                      }
                    >
                      Chi tiết công việc
                    </Button>
                  </Box>
                </Grid>
                <Grid item container columns={12} spacing={2}>
                  {updateTaskDetail ? (
                    updateTaskDetail.map((taskDetailItem, index) => (
                      <Grid
                        key={index}
                        item
                        xs={4}
                        onClick={() =>
                          handleOpenUpdateTaskReportDetailDialog(
                            'UpdateTask',
                            taskDetailItem
                          )
                        }
                      >
                        <Box sx={{ width: '100%' }}>
                          <Card sx={{ width: '100%', minHeight: '200px' }}>
                            <CardContent>
                              <Typography>
                                Mã công việc:
                                {taskDetailItem.taskReportId}
                              </Typography>
                              <Typography>
                                Thông tin công việc: {taskDetailItem.taskNote}
                              </Typography>
                              <Typography>
                                Tiến độ: {taskDetailItem.taskProgress}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <Grid
                      item
                      xs={4}
                      onClick={() => handleOpenUpdateTaskReportDetailDialog()}
                    >
                      Không có chi tiết báo cáo!!!
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
                    defaultValue={allReportDetail.reporterId}
                    errors={errors.reporterId}
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
                      Cập nhật
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        ) : (
          <Typography variant='h5'>Loading... </Typography>
        )}
      </Box>
      <Dialog
        open={openUpdateReportDetailDialog}
        onClose={handleCloseUpdateReportDetailDialog}
      >
        <DialogUpdateReportDetail
          handleCloseUpdateReportDetailDialog={
            handleCloseUpdateReportDetailDialog
          }
          setUpdateReportDetail={setUpdateReportDetail}
          updateReportDetail={updateReportDetail}
          actionUpdateReport={actionUpdateReport}
          itemDetailReportUpdate={itemDetailReportUpdate}
        ></DialogUpdateReportDetail>
      </Dialog>
      <Dialog
        open={openUpdateTaskReportDialog}
        onClose={handleCloseUpdateTaskReportDetailDialog}
      >
        <DialogUpdateTaskReport
          handleCloseUpdateTaskReportDetailDialog={
            handleCloseUpdateTaskReportDetailDialog
          }
          setUpdateTaskDetail={setUpdateTaskDetail}
          updateTaskDetail={updateTaskDetail}
          actionUpdateTask={actionUpdateTask}
          itemDetailTaskUpdate={itemDetailTaskUpdate}
        ></DialogUpdateTaskReport>
      </Dialog>
    </div>
  );
};
export default UpdateReportProject;
