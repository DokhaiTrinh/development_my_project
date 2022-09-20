import { Divider, Typography, Box, TextField, Grid, Button, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';

const gender = [
    { label: 'Nam' },
    { label: 'Nữ' },
]
const relationship = [
    { label: 'Độc thân' },
    { label: 'Đã kết hôn' },
]
const role = [
    { label: 'Quản trị viên' },
    { label: 'Nhân viên' },
]
const EditPersonnleProfile = (props) => {
    const [dob, setDob] = React.useState('12/31/1990');
    const [joinDate, setJoinDate] = React.useState('01/01/2022');
    return <Paper className='bodynonetab'>

        <Typography variant="h6" color="#DD8501" sx={{ marginTop: "20px", marginBottom: "20px", marginLeft: "30px" }}>
            Chỉnh sửa hồ sơ nhân viên
        </Typography>
        <Divider></Divider>
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>

            <Box sx={{ paddingLeft: "10px", paddingTop: "10px", width: "40%", marginBottom: "30px" }}>
                <Typography variant="body1" color="#DD8501" fontWeight="bold">Sơ yếu lý lịch</Typography>
                <Divider sx={{ bgcolor: "#DD8501" }}></Divider>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body2">Mã nhân viên</Typography>
                        <TextField id="project-name" value="1" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Họ và tên</Typography>
                        <TextField id="project-name" value="Trương Quốc Vinh" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" >Ngày sinh</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disableFuture
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={dob}

                                onChange={(newValue) => {
                                    setDob(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Giới tính</Typography>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={gender}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} value="Nam" />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Tình trạng hôn nhân</Typography>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={relationship}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} value="Độc thân" />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Quốc tịch</Typography>
                        <TextField id="project-name" value="Việt Nam" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Điện thoại</Typography>
                        <TextField id="project-name" value="0909090909" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Email</Typography>
                        <TextField id="project-name" value="vinh@gmail.com" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>

                </Grid>
                <Typography variant="body1" color="#DD8501" fontWeight="bold" sx={{marginTop: "30px"}}>Thông tin khác</Typography>
                <Divider sx={{ bgcolor: "#DD8501" }}></Divider>
                <Box sx={{ width: "100%", height: "20px" }}></Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body2">Dân tộc</Typography>
                        <TextField id="project-name" value="Kinh" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Tôn giáo</Typography>
                        <TextField id="project-name" value="Không" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">CMT/Căn cước/Hộ chiếu</Typography>
                        <TextField id="project-name" value="123456789" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Ngày cấp, Nơi cấp</Typography>
                        <TextField id="project-name" value="11/01/2003, tại công an Thành phố Hồ Chí Minh" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Nơi sinh</Typography>
                        <TextField id="project-name" value="Thành phố Hồ Chí Minh, Việt Nam" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Nguyên quán</Typography>
                        <TextField id="project-name" value="Thành phố Hồ Chí Minh, Việt Nam" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Thường trú</Typography>
                        <TextField id="project-name" value="222 Hoàng Hoa Thám, phường 12, quân Tân Bình, Tp HCM" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Chỗ ở hiện tại</Typography>
                        <TextField id="project-name" value="222 Hoàng Hoa Thám, phường 12, quân Tân Bình, Tp HCM" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                </Grid>
                <Typography variant="body1" color="#DD8501" fontWeight="bold" sx={{marginTop: "30px"}}>Hồ sơ nhân viên</Typography>
                <Divider sx={{ bgcolor: "#DD8501" }}></Divider>
                <Box sx={{ width: "100%", height: "20px" }}></Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body2">Phòng ban</Typography>
                        <TextField id="project-name" value="Kiểm thử phần mềm" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Vị trí</Typography>
                        <TextField id="project-name" value="IT" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Chức vụ</Typography>
                        <TextField id="project-name" value="Trưởng phòng kỹ thuật" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Vai trò</Typography>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={role}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} value="Nhân viên" />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" >Ngày vào</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disableFuture
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={joinDate}

                                onChange={(newValue) => {
                                    setJoinDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex"
                        }}>
                            <Button variant="contained"
                            className='submitButton'
                                >Lưu</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Paper>;
};

export default EditPersonnleProfile;