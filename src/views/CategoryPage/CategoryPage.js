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
import { CategoryTable } from './Components/CategoryTable';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import { getAllCategoryApi } from '../../apis/CategoryPost/getAllCategory';

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
const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export const CategoryPage = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [{ pageNo, pageSize, sortBy, sortTypeAsc, loading }, dispatch] =
    useStateValue();

  const [allCategory, setAllCategory] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const listAllCategory = await getAllCategoryApi({
          pageNo,
          pageSize,
          sortBy,
          sortTypeAsc,
        });
        setAllCategory(listAllCategory.data);
      } catch (error) {
        console.log('Không thể lấy danh sách role');
      }
    })();
  }, [pageNo, pageSize, sortBy, sortTypeAsc]);
  console.log(allCategory);

  return (
    <div>
      <Grid container justify="center">
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
                to={'/createCategory'}
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
              <Typography variant="body1">Tạo thể loại</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%' }}>
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
        <TabPanel value={value} index={0}>
          <Box width="100%">
            <CategoryTable allCategory={allCategory}></CategoryTable>
            {/* {allRole ? (
              allRole.length > 0 ? (
                <RoleTable allRole={allRole}></RoleTable>
             
              ) : (
                <div>Không có dữ liệu để hiển thị</div>
              )
            ) : null} */}
          </Box>
        </TabPanel>
      </Box>
    </div>
  );
};

export default CategoryPage;
