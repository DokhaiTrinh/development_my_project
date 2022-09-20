import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
const Details = (props) => {
  return <div>
    <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: "100%", mp: 2, borderRadius: "30px", padding: "20px" }} variant="elevation">
                        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                            Thông tin chung
                        </Typography>
                        <Divider sx={{ marginBottom: "20px" }}></Divider>
                        <Grid container rowSpacing={{ xs: 5 }}>
                            <Grid item xs="6">
                                <Typography variant="body1" color="gray">Tên công việc</Typography>
                                <Typography variant="body1" >Buildlink trên PBN ngày 05/09</Typography>
                            </Grid>
                            <Grid item xs="6">
                                <Typography variant="body1" color="gray">Dự án</Typography>
                                <Typography variant="body1" >Dự án - Xây dựng tòa nhà văn phòng ABC</Typography>
                            </Grid>
                            <Grid item xs="6">
                                <Typography variant="body1" color="gray">Tiến độ</Typography>
                                <Typography variant="body1" >100%</Typography>
                            </Grid>
                            <Grid item  xs="6">
                                    <Typography variant="body1" color="gray">Thời gian thực tế</Typography>
                                    <Typography variant="body1" >03/09/2022 - 09/09/2022</Typography>
                            </Grid>
                            <Grid item  xs="6">
                                    <Typography variant="body1" color="gray">Người theo dõi</Typography>
                                    <Typography variant="body1" ></Typography>
                            </Grid>
                            <Grid item  xs="6">
                                    <Typography variant="body1" color="gray">Người giao việc</Typography>
                                    <Typography variant="body1" >Nguyễn Văn A</Typography>
                            </Grid>
                            <Grid item  xs="6">
                                    <Typography variant="body1" color="gray">Mô tả</Typography>
                                    <Typography variant="body1" ></Typography>
                            </Grid>
                            <Grid item  xs="6">
                                    <Typography variant="body1" color="gray">Loại công việc</Typography>
                                    <Typography variant="body1" >Quan trọng nhưng không khẩn cấp</Typography>
                            </Grid>
                                <Grid item xs="6">
                                <Typography variant="body1" color="gray">Trạng thái</Typography>
                                    <Box sx={{ width: '50%', borderRadius: "10px", backgroundColor: "green" }}>
                                        <Typography variant="body1" sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                        }}>Hoàn thành</Typography>
                                    </Box>
                                </Grid>
                            <Grid item xs="6">
                                <Typography variant="body1" color="gray">Thời gian dự kiến</Typography>
                                <Typography variant="body1" >05/09/2022 - 05/09/2022</Typography>
                            </Grid>
                            <Grid item xs="6">
                                <Typography variant="body1" color="gray">Người thực hiện</Typography>
                                <Typography variant="body1" >Nguyễn Văn A</Typography>
                            </Grid>
                            <Grid item xs="6">
                                <Typography variant="body1" color="gray">Ưu tiên</Typography>
                                <Typography variant="body1" ></Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
  </div>;
};

export default Details;
