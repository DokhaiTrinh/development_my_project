import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const PersonnelProfilePage = (props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <div>
        <Grid container justify="center">
            <Grid container md="8">
                <Grid item>
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ margin: "20px" }}>
                        <IconButton aria-label="add" sx={{ alignSelf: "center", backgroundColor: "#DD8501" }}>
                            <Add sx={{ color: "white" }}></Add>
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item>
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ height: "100%" }}>
                        <Typography variant="body1">Trương Quốc Vinh</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs variant="scrollable"
                    scrollButtons="auto" value={value} onChange={handleChange} aria-label="">
                    <Tab label="Sơ yếu lý lịch" {...a11yProps(0)} />
                    <Box sx={{ flex: 1 }}></Box>
                    <Box>
                        <Grid container>
                            <Grid item xs={12}>
                                <IconButton aria-label="edit report" component={Link} to={('/editPersonnelProfile')} sx={{ height: "100%"}}>
                                    <Box sx={{height: "30px" }}>

                                        <EditOutlinedIcon fontSize="large" />

                                    </Box>
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>

                                <Typography variant="button">
                                    Chỉnh sửa
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: "100%", mp: 2, borderRadius: "30px", padding: "20px" }} variant="elevation">
                        <Typography variant="h6" sx={{ marginBottom: "20px" }} fontWeight="bold">
                            Sơ yếu lý lịch
                        </Typography>
                        <Divider sx={{ marginBottom: "20px" }}></Divider>
                        <Grid container>
                            <Grid item xs={4}>
                                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                    <Avatar sx={{ height: "150px", width: "150px" }} variant="square" src="src/assets/images/non-avatar.png">
                                    </Avatar>
                                </Box>
                            </Grid>
                            <Grid container item xs={8} spacing={3}>
                                <Grid container item xs={6}>
                                    <Grid item xs={4}>
                                        <Typography variant="body2" color="gray">Họ và tên</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body2">Trương Quốc Vinh</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6}>
                                    <Grid item xs={4}>
                                        <Typography variant="body2" color="gray">Mã NV</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body2">1</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6}>
                                    <Grid item xs={4}>
                                        <Typography variant="body2" color="gray">Ngày sinh</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2">31/12/1990</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6}>
                                    <Grid item xs={4}>
                                        <Typography variant="body2" color="gray">Giới tính</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body2">Nam</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6}>
                                    <Grid item xs={4}>
                                        <Typography variant="body2" color="gray">Tình trạng hôn nhân</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body2">Độc thân</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6}>
                                    <Grid item xs={4}>
                                        <Typography variant="body2" color="gray">Quốc tịch</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body2">Việt Nam</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6}>
                                    <Grid item xs={4}>
                                        <Typography variant="body2" color="gray">Điện thoại</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body2">0909090909</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6}>
                                    <Grid item xs={4}>
                                        <Typography variant="body2" color="gray">Email</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body2">vinh@gmail.com</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
                <Box sx={{ height: "30px" }}></Box>
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: "100%", mp: 2, borderRadius: "30px", padding: "20px" }} variant="elevation">
                        <Typography variant="h6" sx={{ marginBottom: "20px" }} fontWeight="bold">
                            Thông tin khác
                        </Typography>
                        <Divider sx={{ marginBottom: "20px" }}></Divider>
                        <Grid container spacing={3}>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Dân tộc</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">Kinh</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Tôn giáo</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">Không</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">CMT/Căn cước/Hộ chiếu</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">123456789</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Ngày cấp, Nơi cấp</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">01/11/2003, tại công an Thành phố Hồ Chí Minh</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Nơi sinh</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">Thành phố Hồ Chí Minh, Việt Nam</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Nguyên quán</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">Thành phố Hồ Chí Minh, Việt Nam</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Thường trú</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">222 Hoàng Hoa Thám, phường 12, quận Tân Bình, Tp HCM</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Chỗ ở hiện tại</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">222 Hoàng Hoa Thám, phường 12, quận Tân Bình, Tp HCM</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
                <Box sx={{ height: "30px" }}></Box>
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: "100%", mp: 2, borderRadius: "30px", padding: "20px" }} variant="elevation">
                        <Typography variant="h6" sx={{ marginBottom: "20px" }} fontWeight="bold">
                            Hồ sơ nhân viên
                        </Typography>
                        <Divider sx={{ marginBottom: "20px" }}></Divider>
                        <Grid container spacing={3}>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Phòng ban</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">Kiểm thử phần mềm</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Vị trí</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">IT</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Chức vụ</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">Trưởng phòng kỹ thuật</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Vai trò</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">Nhân viên</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="gray">Ngày vào</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                        <Typography variant="body2">01/01/2022</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </TabPanel>
        </Box>
    </div>;
};

export default PersonnelProfilePage;