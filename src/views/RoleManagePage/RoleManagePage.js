import * as React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { RoleTable } from './components/RoleTable';
import { Link } from 'react-router-dom';
import { getAllRoleApi } from './../../apis/Role/GetAllRole';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import Header from '../../Components/Tab/Header';

const TabPanel = (props) => {
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
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const RoleManagePage = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [{ pageNo, pageSize, sortBy, sortTypeAsc, loading }, dispatch] =
    useStateValue();

  const [allRole, setAllRole] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const listAllRole = await getAllRoleApi({
          pageNo,
          pageSize,
          sortBy,
          sortTypeAsc,
        });
        setAllRole(listAllRole.data);
      } catch (error) {
        console.log('Không thể lấy danh sách role');
      }
    })();
  }, [pageNo, pageSize, sortBy, sortTypeAsc]);
  console.log(allRole);

  return (
    <div>
      {/* <Grid container justify="center">
        <Grid container md="8">
          <Grid item>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ margin: '20px' }}
            >
              <IconButton
                aria-label="add"
                sx={{ alignSelf: 'center', backgroundColor: '#DD8501' }}
                component={Link}
                to={'/createRole'}
              >
                <Add sx={{ color: 'white' }}></Add>
              </IconButton>
            </Box>
          </Grid>
          <Grid item>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: '100%' }}
            >
              <Typography variant="body1">Danh sách vai trò</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid> */}
      {/* <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={value}
            onChange={handleChange}
            aria-label=""
          >
            <Tab label="Tất cả" {...a11yProps(0)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}> */}
          <Box width="100%">
            <RoleTable allRole={allRole}></RoleTable>
            {/* {allRole ? (
              allRole.length > 0 ? (
                <RoleTable allRole={allRole}></RoleTable>
             
              ) : (
                <div>Không có dữ liệu để hiển thị</div>
              )
            ) : null} */}
          </Box>
        {/* </TabPanel> */}
      {/* </Box> */}
    </div>
  );
};

export default RoleManagePage;
