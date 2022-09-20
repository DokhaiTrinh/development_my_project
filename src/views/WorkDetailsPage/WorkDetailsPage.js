import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Details from './components/Details';
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
const WorkDetailsPage = (props) => {
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
                        <Typography variant="body1">Dự án - Xây dựng tòa nhà văn phòng ABC</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs variant="scrollable"
                    scrollButtons="auto" value={value} onChange={handleChange} aria-label="">
                    <Tab label="Chi tiết" {...a11yProps(0)} />
                    <Tab label="Đính kèm" {...a11yProps(1)} />
                    <Box sx={{ flex: 1 }}></Box>
                    <Box>
                        <Grid container>
                            <Grid item xs={12}>
                                <IconButton aria-label="edit report" component={Link} to={('/updateTask')} sx={{ height: "100%"}}>
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
                <Details></Details>
            </TabPanel>
            <TabPanel value={value} index={1}>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Đính kèm
            </TabPanel>
        </Box>
    </div>;
};

export default WorkDetailsPage;