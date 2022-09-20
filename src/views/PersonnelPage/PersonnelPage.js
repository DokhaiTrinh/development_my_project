import * as React from 'react';
import { Box, Typography, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import { PersonnelTable } from './components/PersonnelTable';
import { WorkerTable } from './components/WorkerTable';
import { getAllUserApi } from './../../apis/User/getAllUser';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import { getAllWorkerApi } from './../../apis/Worker/getAllWorker';
import { getAllRoleApi } from './../../apis/Role/GetAllRole';
import { RoleTable } from '../RoleManagePage/components/RoleTable';

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

const PersonnelPage = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [{ pageNo, pageSize, sortBy, sortTypeAsc, loading }, dispatch] =
    useStateValue();
  const [allUser, setAllUser] = React.useState([]);
  const [allWorker, setAllWorker] = React.useState([]);
  const [allRole, setAllRole] = React.useState([]);
  const [totalPage, setToltalPage] = React.useState();
  const [imageGet, setImageGet] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const listAllUser = await getAllUserApi({
          pageNo,
          pageSize,
          sortBy,
          sortTypeAsc,
        });
        setAllUser(listAllUser.data);
        setToltalPage(listAllUser.data[0].totalPage);
        if (listAllUser.data.file) {
          let arrayLinkImg = [];
          arrayLinkImg.push(listAllUser.data.file.fileLink);
          setImageGet(arrayLinkImg);
        }
      } catch (error) {
        console.log('Không thể lấy danh sách người dùng');
      }
      try {
        const listAllWorker = await getAllWorkerApi({
          pageNo,
          pageSize,
          sortBy,
          sortTypeAsc,
        });
        setAllWorker(listAllWorker.data);
        setToltalPage(listAllWorker.data[0].totalPage);
      } catch (error) {
        console.log('Không thể lấy danh sách công nhân');
      }
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
  console.log(imageGet);
  console.log(allUser);
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={value}
          onChange={handleChange}
        >
          <Tab label="Nhân viên" {...a11yProps(0)} />
          <Tab label="Công nhân" {...a11yProps(1)} />
          <Tab label="Vai trò" {...a11yProps(2)} />
        </Tabs>
        <div className='body'>

          <TabPanel value={value} index={0}>
            {allUser ? (
              <Box width="100%">
                <PersonnelTable
                  allUser={allUser}
                  totalPage={totalPage}
                ></PersonnelTable>
              </Box>
            ) : (
              <div>Không có dữ liệu!!</div>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {allWorker ? (
              <Box width="100%">
                <WorkerTable
                  allWorker={allWorker}
                  totalPage={totalPage}
                ></WorkerTable>
              </Box>
            ) : (
              <div>Không có dữ liệu!</div>
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {allRole ? (
              <Box width="100%">
                <RoleTable
                  allRole={allRole}
                  totalPage={totalPage}
                ></RoleTable>
              </Box>
            ) : (
              <div>Không có dữ liệu!</div>
            )}
          </TabPanel>
        </div>
      </Box>
    </div>
  );
};

export default PersonnelPage;
