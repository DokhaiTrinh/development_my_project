import {
  Divider,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  Paper,
  Checkbox,
  Autocomplete,
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
import { createProjectApi1 } from '../../apis/Project/createProject';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-datepicker/dist/react-datepicker.css';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DialogLocation from './Components/DialogLocation';
import DialogManagerList from './Components/DialogManagerList';
import DialogWorkerList from './Components/DialogWorkerList';
import { getAllWorkerApi1 } from '../../apis/Worker/getAllWorker';
import { getAllManagerApi1 } from '../../apis/ProjectManager/getAllManager';
import { getUserByRoleApi } from '../../apis/User/getAllUser';
import RenderImage from '../../Components/Render/RenderImage';
import { Stack } from '@mui/system';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const CreateProjectPage = (props) => {
  const [valuePlanStartDate, setValuePlanStartDate] = React.useState(
    new Date()
  );
  const [valuePlanEndDate, setValuePlanEndDate] = React.useState(new Date());
  const [locationDetail, setLocationDetail] = React.useState();

  // Dữ liệu list manager này phải là array. Để thêm dữ liệu zô array ở thằng report có mẫu á.
  const [managerListDetail, setManagerListDetail] = React.useState([]);
  const [openLocationDialog, setOpenLocationDialog] = useState(false);
  const [openManagerListDialog, setOpenManagerListDialog] = useState(false);

  const [workerListDetail, setWorkerListDetail] = React.useState([]);
  const [openWorkerListDialog, setOpenWorkerListDialog] = useState(false);
  const [loading, setLoading] = useState('');
  const [allManager, setAllManager] = React.useState([]);
  const [allWorker, setAllWorker] = React.useState([]);
  const [allUser, setAllUser] = React.useState([]);
  const [filesImage, setFilesImage] = useState([]);
  const [selectedImages, setSelectedImage] = useState([]);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [managerListChoice, setManagerListChoice] = React.useState([]);
  const [userListChoice, setUserListChoice] = React.useState([]);
  const [workerListChoice, setWokerListChoice] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const listAllManager = await getAllManagerApi1(
          0,
          1000,
          44,
          'BY_ROLE_ID',
          'createdAt',
          true
        );
        setAllManager(listAllManager.data);
      } catch (error) {
        console.log('Không thể lấy danh sách kỹ sư');
      }
      try {
        const listAllWorker = await getAllWorkerApi1(
          0,
          1000,
          'createdAt',
          true
        );
        setAllWorker(listAllWorker.data);
      } catch (error) {
        console.log('Không thể lấy danh sách công nhân');
      }
      try {
        const listAllUser = await getUserByRoleApi(
          14,
          'BY_ROLE_ID',
          0,
          1000,
          'createdAt',
          false
        );
        setAllUser(listAllUser.data);
      } catch (error) {
        console.log('Không thể lấy danh sách người dùng');
      }
    })();
  }, []);
  const submitForm = (data) => {
    const planStartDate = moment(valuePlanStartDate).format('YYYY-MM-DD HH:mm');
    const planEndDate = moment(valuePlanEndDate).format('YYYY-MM-DD HH:mm');
    handleCreateProject(
      planEndDate,
      planStartDate,
      locationDetail,
      managerListChoice,
      userListChoice,
      data.estimatedCost,
      data.projectName,
      workerListChoice,
      filesImage
    );
  };
  const handleCreateProject = async (
    planEndDate,
    planStartDate,
    location,
    ntvManagerIdList,
    userManagerIdList,
    estimatedCost,
    projectName,
    workerIdList,
    fileList
  ) => {
    try {
      setLoading(true);
      console.log(
        typeof planEndDate,
        typeof planStartDate,
        typeof location,
        typeof ntvManagerIdList,
        typeof estimatedCost,
        typeof projectName,
        typeof workerIdList,
        typeof fileList
      );
      await createProjectApi1({
        planEndDate,
        planStartDate,
        location,
        ntvManagerIdList,
        userManagerIdList,
        estimatedCost,
        projectName,
        workerIdList,
        fileList,
      });
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        text: 'Tạo dự án thành công',
        timer: 3000,
        showConfirmButton: false,
      });
      // await window.location.replace(`/project`);
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
      estimatedCost: yup
        .number()
        .min(100000000, 'Giá trị thấp nhất phải là 100.000.000 VNĐ')
        .typeError('Giá tiền phải là số tính theo VNĐ'),
      projectName: yup
        .string()
        .min(5, 'Tên dự án phải lớn hơn 5')
        .max(50, 'Tên dự án không được lớn hơn 50')
        .required('Tên dự án đã trùng với dự án khác!!'),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(valideSchema),
  });
  // const uploadImage = (e) => {
  //   const formData = new FormData();
  //   console.log(bluePrintDetail);
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
  //   e.preventDefault();
  // };
  const handleOpenLocationDialog = () => {
    setOpenLocationDialog(true);
  };
  const handleCloseLocationDialog = () => {
    setOpenLocationDialog(false);
  };
  // const handleOpenManagerListDialog = () => {
  //   setOpenManagerListDialog(true);
  // };
  const handleCloseManagerListDialog = () => {
    setOpenManagerListDialog(false);
  };
  // const handleOpenWorkerDialog = () => {
  //   setOpenWorkerListDialog(true);
  // };
  const handleCloseWorkerDialog = () => {
    setOpenWorkerListDialog(false);
  };

  // const handleGetManagerName = (managerID) => {
  //   if (allManager.length > 0) {
  //     for (const manager of allManager) {
  //       if (manager.userId === managerID) {
  //         return manager.username;
  //       }
  //     }
  //   }
  //   return '';
  // };
  // const handleGetWorkerName = (workerId) => {
  //   if (allWorker.length > 0) {
  //     for (const worker of allWorker) {
  //       if (worker.workerId === workerId) {
  //         return worker.fullName;
  //       }
  //     }
  //   }
  // };
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
  };

  const handleSelectManager = (options) => {
    let getIdList = [];
    for (const option of options) {
      getIdList.push(option.userId);
    }
    setManagerListChoice(getIdList);
  };
  const handleSelectUser = (options) => {
    let getIdList = [];
    for (const option of options) {
      getIdList.push(option.userId);
    }
    setUserListChoice(getIdList);
  };
  const handleSelectWorker = (options) => {
    let getIdList = [];
    for (const option of options) {
      getIdList.push(option.workerId);
    }
    setWokerListChoice(getIdList);
  };
  return (
    <Paper className="bodynonetab">
      <Typography variant="h6" color="#DD8501">
        TẠO MỚI DỰ ÁN
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
          <form onSubmit={handleSubmit(submitForm)}>
            <Typography variant="body1" color="#DD8501" fontWeight="bold">
              Thông tin dự án
            </Typography>
            <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2">Tên dự án</Typography>
                <TextFieldComponent
                  register={register}
                  name="projectName"
                  errors={errors.projectName}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Chủ đầu tư</Typography>
                <Autocomplete
                  multiple
                  options={allUser}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.fullName}
                  onChange={(e, option) => handleSelectUser(option)}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.fullName}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Chủ đầu tư" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Kỹ sư phụ trách</Typography>
                <Autocomplete
                  multiple
                  options={allManager}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.fullName}
                  onChange={(e, option) => handleSelectManager(option)}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.fullName}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Kỹ sư" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Chi phí ước tính</Typography>
                <TextFieldComponent
                  register={register}
                  name="estimatedCost"
                  errors={errors.estimatedCost}
                  variant="outlined"
                  sx={{ width: '100%' }}
                  label="VNĐ"
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
                      renderInput={(props) => <TextField {...props} />}
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
                      renderInput={(props) => <TextField {...props} />}
                      value={valuePlanEndDate}
                      onChange={(newValue) => {
                        setValuePlanEndDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              {/* <Grid item container sx={12}>
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
                      backgroundColor: '#DD8501',
                      borderRadius: 50,
                      width: '200px',
                      alignSelf: 'center',
                    }}
                    onClick={() => handleOpenBluePrintDialog()}
                  >
                    Chi tiết bản vẽ
                  </Button>
                </Box>
              </Grid>
              <Grid item container columns={12} spacing={2}>
                {bluePrintDetail ? (
                  <Grid item xs={4}>
                    <Box sx={{ width: '100%' }}>
                      <Card sx={{ width: '100%' }}>
                        <CardContent>
                          <Typography>
                            Tên bản vẽ: {bluePrintDetail.blueprintName}
                          </Typography>
                          <Typography>
                            Nhà thiết kế: {bluePrintDetail.designerName}
                          </Typography>
                          <Typography>
                            Giá bản vẽ: {bluePrintDetail.estimatedCost}{' '}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                ) : (
                  <Grid item sx={12}>
                    <div>Không có dữ liệu của bản vẽ chi tiết!</div>
                  </Grid>
                )}
              </Grid> */}

              <Grid item xs={12}>
                <Typography variant="body2">Công nhân</Typography>
                <Autocomplete
                  multiple
                  options={allWorker}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.fullName}
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
                >
                  <Button
                    variant="contained"
                    onClick={() => handleOpenLocationDialog()}
                  >
                    Địa điểm thi công
                  </Button>
                </Box>
              </Grid>
              <Grid item container columns={12}>
                {locationDetail ? (
                  <Paper className="tag">
                    <Stack direction="row" spacing={1}>
                      <Typography>{locationDetail.addressNumber},</Typography>
                      <Typography>{locationDetail.street},</Typography>
                      <Typography>{locationDetail.ward},</Typography>
                      <Typography>{locationDetail.district},</Typography>
                      <Typography>{locationDetail.city}</Typography>
                    </Stack>
                  </Paper>
                ) : (
                  <Grid item sx={12}>
                    <div>Không có dữ liệu!</div>
                  </Grid>
                )}
              </Grid>
              {/* <Grid item container sx={12}>
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
                    onClick={() => handleOpenWorkerDialog()}
                  >
                    Danh sách công nhân
                  </Button>
                </Box>
              </Grid>
              <Grid item container columns={12} spacing={2}>
                {workerListDetail ? (
                  workerListDetail.map((workerId, index) => (
                    <Grid item xs={4}>
                      <Box sx={{ width: '100%' }}>
                        <Card sx={{ width: '100%' }}>
                          <CardContent>
                            <Typography>
                              Công nhân: {handleGetWorkerName(workerId)}
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
              </Grid> */}
              <Grid item container xs={12}>
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
              </Grid>
              {/* <Grid item xs={12}>
                <Typography variant="body2">
                  Người quản lý
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="createdBy"
                  errors={errors.createdBy}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid> */}
              {/* <Grid item xs={12}>
                <Typography variant="body2">
                  Giá chính thức
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="actualCost"
                  errors={errors.actualCost}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid> */}

              {/* <Grid item xs={12}>
                <Typography variant="body2">
                  Chọn file
                </Typography>
                <inputF
                  type="file"
                  name="file"
                  onChange={(event) => {
                    setImageSelected(event.target.files[0]);
                  }}
                />
              </Grid>
              <Grid>
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
                    className="submitButton"
                    // onClick={(event) => uploadImage(event)}
                  >
                    Tạo mới dự án
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <Dialog open={openLocationDialog} onClose={handleCloseLocationDialog}>
        <DialogLocation
          handleCloseLocationDialog={handleCloseLocationDialog}
          setLocationDetail={setLocationDetail}
          locationDetail={locationDetail}
        ></DialogLocation>
      </Dialog>
      {/* <Dialog open={openBluePrintDialog} onClose={handleCloseBluePrintDialog}>
        <DialogBluePrint
          handleCloseBluePrintDialog={handleCloseBluePrintDialog}
          setBluePrintDetail={setBluePrintDetail}
          bluePrintDetail={bluePrintDetail}
        ></DialogBluePrint>
      </Dialog> */}
      <Dialog
        open={openManagerListDialog}
        onClose={handleCloseManagerListDialog}
      >
        <DialogManagerList
          handleCloseManagerListDialog={handleCloseManagerListDialog}
          allManager={allManager}
          setManagerListDetail={setManagerListDetail}
          managerListDetail={managerListDetail}
        ></DialogManagerList>
      </Dialog>
      <Dialog open={openWorkerListDialog} onClose={handleCloseWorkerDialog}>
        <DialogWorkerList
          handleCloseWorkerDialog={handleCloseWorkerDialog}
          allWorker={allWorker}
          setWorkerListDetail={setWorkerListDetail}
          workerListDetail={workerListDetail}
        ></DialogWorkerList>
      </Dialog>
    </Paper>
  );
};

export default CreateProjectPage;
