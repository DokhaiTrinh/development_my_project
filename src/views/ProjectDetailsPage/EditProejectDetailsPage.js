import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  Checkbox,
  Autocomplete,
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
import { updateProjectApi } from '../../apis/Project/updateProject';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-datepicker/dist/react-datepicker.css';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DialogEditLocation from './components/DialogEditLocation';
import { useParams } from 'react-router-dom';
import { getProjectByParam } from '../../apis/Project/updateProject';
import { Stack } from '@mui/system';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const EditProejectDetailsPage = (props) => {
  const { id } = useParams();
  var idN = parseInt(id);
  const [valueActualStartDate, setValueActualStartDate] = React.useState(
    new Date()
  );
  const [valueActualEndDate, setValueActualEndDate] = React.useState(
    new Date()
  );
  const [valuePlanStartDate, setValuePlanStartDate] = React.useState();
  const [valuePlanEndDate, setValuePlanEndDate] = React.useState();
  const [updateLocationDetail, setUpdateLocationDetail] = React.useState([]);
  const [openLocationDialog, setOpenLocationDialog] = useState(false);
  const [loading, setLoading] = useState('');
  const [allProjectDetails, setAllProjectDetails] = React.useState();
  const [projectId, setProjectId] = React.useState();
  const [actionUpdateLocation, setActionUpdateLocation] = React.useState();
  const [itemDetailLocationUpdate, setItemDetailLocationUpdate] =
    React.useState();
  const [allManager, setAllManager] = React.useState([]);
  const [allWorker, setAllWorker] = React.useState([]);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [managerListChoice, setManagerListChoice] = React.useState([]);
  const [workerListChoice, setWokerListChoice] = React.useState([]);
  const [workerList, setWorkerList] = React.useState();
  // const [imageSelected, setImageSelected] = useState('');
  // const [imageData, setImageData] = useState('');
  React.useEffect(() => {
    (async () => {
      try {
        const listAllProjectDetails = await getProjectByParam(id, 'BY_ID');
        setAllProjectDetails(listAllProjectDetails.data);
        // setValueActualStartDate(listAllProjectDetails.data.actualStartDate);
        // setValueActualEndDate(listAllProjectDetails.data.actualEndDate);
        setValuePlanStartDate(listAllProjectDetails.data.planStartDate);
        setValuePlanEndDate(listAllProjectDetails.data.planEndDate);
        setProjectId(listAllProjectDetails.data.projectId);
        setUpdateLocationDetail(listAllProjectDetails.data.location);
        setAllManager(listAllProjectDetails.data.projectManagerList);
        setAllWorker(listAllProjectDetails.data.projectWorkerList);
      } catch (error) {
        console.log('Không thể lấy danh sách dự án');
      }
    })();
  }, []);
  console.log(allProjectDetails);
  const submitForm = (data) => {
    const actualStartDate =
      moment(valueActualStartDate).format('YYYY-MM-DD HH:mm');
    const actualEndDate = moment(valueActualEndDate).format('YYYY-MM-DD HH:mm');
    const planStartDate = moment(valuePlanStartDate).format('YYYY-MM-DD HH:mm');
    const planEndDate = moment(valuePlanEndDate).format('YYYY-MM-DD HH:mm');
    const projectId = idN;
    Swal.fire({
      title: 'Bạn có chắc là muốn cập nhật?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Cập nhật',
      denyButtonText: `Không cập nhật`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (managerListChoice === 0 || workerListChoice === 0) {
          handleUpdateProject(
            projectId,
            actualEndDate,
            actualStartDate,
            planEndDate,
            planStartDate,
            updateLocationDetail,
            null,
            null,
            data.actualCost,
            data.estimatedCost,
            data.projectName
          );
        } else {
          handleUpdateProject(
            projectId,
            actualEndDate,
            actualStartDate,
            planEndDate,
            planStartDate,
            updateLocationDetail,
            null,
            null,
            data.actualCost,
            data.estimatedCost,
            data.projectName
          );
        }
      }
    });
  };
  const handleUpdateProject = async (
    projectId,
    actualEndDate,
    actualStartDate,
    planEndDate,
    planStartDate,
    location,
    managerListChoice,
    workerListChoice,
    actualCost,
    estimatedCost,
    projectName
  ) => {
    try {
      setLoading(true);
      await updateProjectApi({
        projectId,
        actualEndDate,
        actualStartDate,
        planEndDate,
        planStartDate,
        location,
        managerListChoice,
        workerListChoice,
        actualCost,
        estimatedCost,
        projectName,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Cập nhật dự án thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      window.location.replace(`/projectDetails/${id}`);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        text: 'Cập nhật thất bại',
        timer: 3000,
        showConfirmButton: false,
      });
      setLoading(false);
    }
  };
  const valideSchema = yup
    .object({
      actualCost: yup
        .number()
        .min(1, 'Số lượng phải lớn hơn 0')
        .typeError('Giá tiền phải là số tính theo VNĐ')
        .required(),
      estimatedCost: yup
        .number()
        .min(1, 'Số lượng phải lớn hơn 0')
        .typeError('Giá tiền phải là số tính theo VNĐ'),
      projectName: yup
        .string()
        .min(5, 'Tên dự án phải lớn hơn 5')
        .max(50, 'Tên dự án không được lớn hơn 50')
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
  //   const formData = new FormData();
  //   formData.append('file', imageSelected);
  //   formData.append('upload_preset', 'u78fm100');

  //   const postImage = async () => {
  //     try {
  //       const response = await axios.post(
  //         'https://api.cloudinary.com/v1_1/niem-tin-vang/upload',
  //         formData
  //       );
  //       console.log(response);
  //       setImageData(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   postImage();
  // };
  const handleOpenUpdateLocationDialog = (actionGetUpdate, itemLocation) => {
    setActionUpdateLocation(actionGetUpdate);
    setItemDetailLocationUpdate(itemLocation);
    setOpenLocationDialog(true);
  };
  const handleCloseUpdateLocationDialog = () => {
    setOpenLocationDialog(false);
  };
  const handleSelectManager = (options) => {
    let getIdList = [];
    for (const option of options) {
      getIdList.push(option.userId);
    }
    setManagerListChoice(getIdList);
  };
  const handleSelectWorker = (options) => {
    let getIdList = [];
    for (const option of options) {
      getIdList.push(option.workerId);
    }
    setWokerListChoice(getIdList);
  };
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        CẬP NHẬT DỰ ÁN
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
            Thông tin dự án
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>

          <form onSubmit={handleSubmit(submitForm)}>
            {allProjectDetails ? (
              <Grid container spacing={2}>
                {/* <Grid item xs={12}>
                  <Typography variant="body2">Mã dự án</Typography>
                  <TextField
                    {...register('projectId')}
                    inputProps={{ readOnly: true }}
                    name="projectId"
                    variant="outlined"
                    autoComplete="projectId"
                    autoFocus
                    defaultValue={allProjectDetails.projectId}
                    error={errors.projectName != null}
                    helperText={errors.projectId?.message}
                    sx={{ width: '100%' }}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <Typography variant="body2">Tên dự án</Typography>
                  <TextField
                    {...register('projectName')}
                    name="projectName"
                    variant="outlined"
                    defaultValue={allProjectDetails.projectName}
                    error={errors.projectName != null}
                    helperText={errors.projectName?.message}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <Typography variant="body2">Kỹ sư phụ trách</Typography>
                  <Autocomplete
                    multiple
                    options={allManager}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.manager.username}
                    onChange={(e, option) => handleSelectManager(option)}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.manager.username}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Kỹ sư" />
                    )}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <Typography variant="body2">Chi phí ước tính</Typography>
                  <TextField
                    {...register('estimatedCost')}
                    name="estimatedCost"
                    variant="outlined"
                    autoComplete="estimatedCost"
                    autoFocus
                    defaultValue={allProjectDetails.estimatedCost}
                    error={errors.estimatedCost != null}
                    helperText={errors.estimatedCost?.message}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="body2">Thời gian dự kiến</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Bắt đầu dự kiến</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => (
                          <TextField {...props} fullWidth />
                        )}
                        value={valuePlanStartDate}
                        onChange={(newValue) => {
                          setValuePlanStartDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Kết thúc dự kiến</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => (
                          <TextField {...props} fullWidth />
                        )}
                        value={valuePlanEndDate}
                        onChange={(newValue) => {
                          setValuePlanEndDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      Thời gian chính thức
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Bắt đầu chính thức</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => (
                          <TextField {...props} fullWidth />
                        )}
                        value={valueActualStartDate}
                        onChange={(newValue) => {
                          setValueActualStartDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Kết thúc chính thức</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => (
                          <TextField {...props} fullWidth />
                        )}
                        value={valueActualEndDate}
                        onChange={(newValue) => {
                          setValueActualEndDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Công nhân</Typography>
                  <Autocomplete
                    multiple
                    options={allWorker}
                    disableCloseOnSelect
                    defaultValue={[allWorker.projectWorkerList]}
                    getOptionLabel={(option) => option.username}
                    onChange={(e, option) => handleSelectWorker(option)}
                    renderOption={(props, option, { selected }) =>
                      option.isAvailable ? (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.fullName}
                        </li>
                      ) : null
                    }
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Công nhân" />
                    )}
                  />
                </Grid>
                <Grid item container sx={12}>
                  <Box
                    sx={{
                      width: '100%',
                      justifyContent: 'left',
                      alignItems: 'center',
                      display: 'flex',
                    }}
                  ></Box>
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
                    {/* <Button
                      variant="contained"
                      style={{
                        backgroundColor: '#DD8501',
                        borderRadius: 50,
                        width: '200px',
                        alignSelf: 'center',
                      }}
                      // onClick={() =>
                      //   handleOpenUpdateLocationDialog('CreateNewLocation')
                      // }
                    ></Button> */}
                    Chi tiết địa điểm
                  </Box>
                </Grid>
                <Grid item container columns={12} spacing={2}>
                  {updateLocationDetail ? (
                    <Grid
                      item
                      xs={4}
                      onClick={() =>
                        handleOpenUpdateLocationDialog(
                          'UpdateLocation',
                          updateLocationDetail
                        )
                      }
                    >
                      <Box sx={{ width: '100%' }}>
                        <Card sx={{ width: '100%' }}>
                          <CardContent>
                            <Typography>
                              Số nhà: {updateLocationDetail.addressNumber}
                            </Typography>
                            <Typography>
                              Tên đường:{updateLocationDetail.street}
                            </Typography>
                            <Typography>
                              Quận: {updateLocationDetail.district}{' '}
                            </Typography>
                            <Typography>
                              Thành phố: {updateLocationDetail.city}
                            </Typography>
                            <Typography>
                              Khu vực: {updateLocationDetail.ward}
                            </Typography>
                            <Typography>
                              Địa bàn tỉnh: {updateLocationDetail.province}
                            </Typography>
                            <Typography>
                              Quốc gia: {updateLocationDetail.country}
                            </Typography>
                            <Typography>
                              Diện tích: {updateLocationDetail.area}
                            </Typography>
                            <Typography>
                              Điều phối: {updateLocationDetail.coordinate}
                            </Typography>
                            {/* <Typography>
                                Mã địa chỉ: {updateLocationDetail.locationId}
                              </Typography> */}
                          </CardContent>
                        </Card>
                      </Box>
                    </Grid>
                  ) : (
                    <Grid
                      item
                      sx={12}
                      onClick={() => handleOpenUpdateLocationDialog()}
                    >
                      <div>Không có dữ liệu của báo cáo chi tiết!</div>
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Giá chính thức</Typography>
                  <TextField
                    {...register('actualCost')}
                    name="actualCost"
                    variant="outlined"
                    autoComplete="actualCost"
                    autoFocus
                    defaultValue={allProjectDetails.actualCost}
                    error={errors.actualCost != null}
                    helperText={errors.actualCost?.message}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                {/* <Grid item xs={12}>
              <Typography variant="body2">
                Chọn file
              </Typography>
              <input
                type="file"
                name="file"
                onChange={(event) => {
                  setImageSelected(event.target.files[0]);
                }}
              />
            </Grid> */}
                {/* <Grid>
              {imageData && (
                <Image
                  cloudName="niem-tin-vang"
                  publicId={`http://res.cloudinary.com/niem-tin-vang/image/upload/v1655116089/${imageData.public_id}`}
                />
              )}
            </Grid> */}
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
                      // onClick={uploadImage}
                    >
                      Cập nhật dự án
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            ) : null}
          </form>
        </Box>
      </Box>
      <Dialog
        open={openLocationDialog}
        onClose={handleCloseUpdateLocationDialog}
      >
        <DialogEditLocation
          handleCloseUpdateLocationDialog={handleCloseUpdateLocationDialog}
          setUpdateLocationDetail={setUpdateLocationDetail}
          updateLocationDetail={updateLocationDetail}
          actionUpdateLocation={actionUpdateLocation}
          // itemDetailLocationUpdate={itemDetailLocationUpdate}
        ></DialogEditLocation>
      </Dialog>
    </div>
  );
};

export default EditProejectDetailsPage;
