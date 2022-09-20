import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { ProjectTable } from './components/ProjectTable';
import { Link } from 'react-router-dom';
//Get all project
import { getAllProjectApi } from '../../apis/Project/getAllProject';
import { useStateValue } from '../../common/StateProvider/StateProvider';

const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const ProjectPage = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [{ pageNo, pageSize, sortBy, sortTypeAsc, loading }, dispatch] =
    useStateValue();

  const [allProject, setAllProject] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState();
  const [managerList, setManagerList] = React.useState();
  const handleChangePage = (event, value) => {
    dispatch({ type: 'CHANGE_PAGENO', newPageNo: value - 1 });
  };

  React.useEffect(() => {
    (async () => {
      try {
        const listAllProject = await getAllProjectApi({
          pageNo,
          pageSize,
          sortBy,
          sortTypeAsc,
        });
        setAllProject(listAllProject.data);
        setTotalPage(listAllProject.data[0].totalPage);
        setManagerList(listAllProject.data.projectWorkerList);
      } catch (error) {
        console.log('Không thể lấy danh sách dự án');
      }
    })();
  }, [pageNo, pageSize, sortBy, sortTypeAsc, loading]);
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={value}
          onChange={handleChange}
          aria-label=""
        >
          <Tab label="Tất cả" {...a11yProps(0)} />
          <Box sx={{ flex: 1 }}></Box>
        </Tabs>
        <div className='body'>
          <TabPanel value={value} index={0}>
            <Box width="100%">
              {/* {allProject ? (
              allProject.length > 0 ? ( */}
              <ProjectTable
                allProject={allProject}
                totalPage={totalPage}
              ></ProjectTable>
              {/* ) : (
                <div>Không có dữ liệu để hiển thị</div>
              )
            ) : null} */}
            </Box>
          </TabPanel>
        </div>
      </Box>
    </div>
  );
};

export default ProjectPage;
