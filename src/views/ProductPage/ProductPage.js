import * as React from 'react';
import { Typography, Box, Tabs, Tab } from '@mui/material';
import PropTypes from 'prop-types';
import { ProductTable } from './components/ProductTable';
import { useHistory } from 'react-router-dom';
import { getAllPostApi } from './../../apis/Post/getAllPost';
import { getAllCategoryApi } from '../../apis/CategoryPost/getAllCategory';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import { CategoryTable } from '../CategoryPage/Components/CategoryTable';

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
const ProductPage = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const history = useHistory();
  const [{ pageNo, pageSize, sortBy, sortTypeAsc, loading }, dispatch] =
    useStateValue();
  const [allProduct, setAllProduct] = React.useState([]);
  const [allCategory, setAllCategory] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState();

  React.useEffect(() => {
    (async () => {
      try {
        const listAllProduct = await getAllPostApi({
          pageNo,
          pageSize,
          sortBy,
          sortTypeAsc,
        });
        setAllProduct(listAllProduct.data);
        setTotalPage(listAllProduct.data[0].totalPage);
      } catch (error) {
        console.log('Không thể lấy danh sách dịch vụ');
      }
      // try {
      //   const listAllCategory = await getAllPostApi({
      //     pageNo,
      //     pageSize,
      //     sortBy,
      //     sortTypeAsc,
      //   });
      //     setAllProduct(listAllCategory.data);
      //   } catch (error) {
      //   console.log('Không thể lấy danh sách dịch vụ');
      // }
      try {
        const listAllCategory = await getAllCategoryApi({
          pageNo,
          pageSize,
          sortBy,
          sortTypeAsc,
        });
        setAllCategory(listAllCategory.data);
      } catch (error) {
        console.log('Không thể lấy danh sách thể loại');
      }
    })();
  }, [pageNo, pageSize, sortBy, sortTypeAsc]);
  console.log(totalPage);
  console.log(allProduct);
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
            <Tab label="Dịch vụ" {...a11yProps(0)} />
            <Tab label="Sản phẩm" {...a11yProps(1)} />
            <Tab label="Thể loại" {...a11yProps(2)} />
          </Tabs>
        <div className='body'>
          <TabPanel value={value} index={0}>
            {allProduct ? (
              <Box width="100%">
                <ProductTable
                  allProduct={allProduct}
                  totalPage={totalPage}
                ></ProductTable>
              </Box>
            ) : (
              <div>Không có dữ liệu</div>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            Product
          </TabPanel>
          <TabPanel value={value} index={2}>
            {allCategory ? (
              <Box width="100%">
                <CategoryTable
                  allCategory={allCategory}
                  totalPage={totalPage}
                ></CategoryTable>
              </Box>
            ) : (
              <div>Không có dữ liệu</div>
            )}
          </TabPanel>
        </div>
      </Box>
    </div>
  );
};

export default ProductPage;
