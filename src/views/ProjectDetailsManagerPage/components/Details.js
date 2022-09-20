import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Link, useParams } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Dialog from '@mui/material/Dialog';
import DialogWorker from './DialogWorker';
import Button from '@mui/material/Button';

const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

const Details = (props) => {
  const { allProjectDetails, managerList, workerList } = props;
  const { id } = useParams();
  const [openWorkerDialog, setOpenWorkerDialog] = useState(false);
  console.log(allProjectDetails);
  const handleOpenWorkerDialog = () => {
    setOpenWorkerDialog(true);
  };
  const handleCloseWorkerDialog = () => {
    setOpenWorkerDialog(false);
  };
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Paper
          sx={{ width: '100%', mp: 2, padding: '32px' }}
          variant="elevation"
        >
          <Grid container spacing={0} alignItems="center" justify="center">
            <Grid item xs={11}>
              <Typography variant="h6" sx={{ marginBottom: '20px' }}>
                Thông tin chung
              </Typography>
            </Grid>
            {userInfor.authorID !== '54' ? null : (
              <Grid item container xs={1}>
                <Grid item xs={12}>
                  <Box
                    sx={{ width: '100%' }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <IconButton
                      aria-label="edit report"
                      component={Link}
                      to={`/editProjectDetails/${id}`}
                      sx={{ height: '100%' }}
                    >
                      <Box sx={{ height: '30px' }}>
                        <EditOutlinedIcon fontSize="large" />
                      </Box>
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={12} justify="start">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="button">Chỉnh sửa</Typography>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Divider sx={{ marginBottom: '20px' }}></Divider>
          <Grid container rowSpacing={{ xs: 5 }}>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Mã dự án
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.projectId}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Tên dự án
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.projectName}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Kỹ sư quản lý
              </Typography>
              <Typography sx={{ width: '100%' }}>
                <Typography>
                  {managerList ? (
                    managerList.map((managerList, index) => (
                      <Typography
                        sx={{
                          witdh: '100%',
                          marginBottom: '10px',
                          padding: '10px',
                        }}
                      >
                        {managerList.manager.fullName}
                      </Typography>
                    ))
                  ) : (
                    <div>Không có dữ liệu!!</div>
                  )}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Trạng thái
              </Typography>
              <Box
                sx={{
                  width: '50%',
                  borderRadius: '10px',
                  backgroundColor: 'white',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'green',
                  }}
                >
                  {allProjectDetails.status}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Thời gian bắt đầu dự kiến
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.actualStartDate}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Thời gian kết thúc dự kiến
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.actualEndDate}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Địa chỉ
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.location.addressNumber},{' '}
                {allProjectDetails.location.street}, P{' '}
                {allProjectDetails.location.ward}, Q{' '}
                {allProjectDetails.location.district}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Thành phố
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.location.country}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Thời gian bắt đầu thực tế
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.planStartDate}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Thời gian kết thúc thực tế
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.planEndDate}
              </Typography>
            </Grid>
            <Grid item xs="12">
              <Typography variant="body1" color="gray">
                Danh sách công nhân
              </Typography>
              <Typography sx={{ width: '100%' }}>
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
                {/* <Typography>
                  {workerList ? (
                    workerList.map((workerList, index) => (
                      <Grid item xs={4}>
                        <Box sx={{ width: '100%' }}>
                          <Card sx={{ width: '100%' }}>
                            <CardContent>
                              <Typography>
                                Tên: {workerList.worker.fullName}
                              </Typography>
                              <Typography>
                                CCCD: {workerList.worker.citizenId}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <div>Không có dữ liệu!!</div>
                  )}
                </Typography> */}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Dialog open={openWorkerDialog} onClose={handleCloseWorkerDialog}>
        <DialogWorker workerList={workerList}></DialogWorker>
      </Dialog>
    </div>
  );
};

export default Details;
