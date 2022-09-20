import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Dialog from '@mui/material/Dialog';
import DialogWorker from './DialogWorker';
import { Button, Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';
import IconButtonCus from '../../../Components/Button/IconButtonCus';

const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

const Details = (props) => {
  const history = useHistory();
  const { allProjectDetails, managerList, workerList, userList } = props;
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
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography variant="h5">Thông tin chung</Typography>
            {userInfor.authorID !== '54' ? null : (
              <IconButtonCus
                onClick={() => {
                  history.push(`/editProjectDetails/${id}`);
                }}
                icon={<EditOutlinedIcon style={{ color: 'gray' }} />}
              />
            )}
          </Stack>
          <Divider sx={{ marginBottom: '20px' }}></Divider>
          <Grid container spacing={5}>
            <Grid item xs="4">
              <Typography variant="caption">Mã dự án</Typography>
              <Typography variant="body1">
                {allProjectDetails.projectId}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="caption">Tên dự án</Typography>
              <Typography variant="body1">
                {allProjectDetails.projectName}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="caption">Chủ đầu tư</Typography>
              <Typography variant="body1">
                {userList ? (
                  userList.map((userList, index) => (
                    <Typography
                      sx={{
                        witdh: '100%',
                        marginBottom: '10px',
                      }}
                    >
                      {userList.manager.fullName}
                    </Typography>
                  ))
                ) : (
                  <div>Không có dữ liệu!!</div>
                )}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="caption">Kỹ sư quản lý</Typography>
              <Typography>
                {managerList ? (
                  managerList.map((managerList, index) => (
                    <Typography
                      sx={{
                        witdh: '100%',
                        marginBottom: '10px',
                      }}
                    >
                      {managerList.manager.fullName}
                    </Typography>
                  ))
                ) : (
                  <div>Không có dữ liệu!!</div>
                )}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="caption">Trạng thái</Typography>
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
                    alignItems: 'left',
                    justifyContent: 'left',
                    color: 'green',
                  }}
                >
                  {allProjectDetails.status}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs="4">
              <Typography variant="caption">Ngày tạo</Typography>
              <Typography variant="body1">
                {allProjectDetails.createdAt}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="caption">
                Thời gian bắt đầu thực tế
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.actualStartDate}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="caption">
                Thời gian kết thúc thực tế
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.actualEndDate}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="caption">Địa chỉ</Typography>
              <Typography variant="body1">
                {allProjectDetails.location.addressNumber},{' '}
                {allProjectDetails.location.street}, P{' '}
                {allProjectDetails.location.ward}, Q{' '}
                {allProjectDetails.location.district}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="caption">Thành phố</Typography>
              <Typography variant="body1">
                {allProjectDetails.location.country}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="caption">
                Thời gian bắt đầu dự kiến
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.planStartDate}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="caption">
                Thời gian kết thúc dự kiến
              </Typography>
              <Typography variant="body1">
                {allProjectDetails.planEndDate}
              </Typography>
            </Grid>
            <Grid item xs="12">
              <Typography variant="caption">Danh sách công nhân</Typography>
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
