import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { visuallyHidden } from '@mui/utils';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import InfoIcon from '@mui/icons-material/Info';
import { useStateValue } from '../../../common/StateProvider/StateProvider';
import { deleteRequestApi } from '../../../apis/Request/deleteRequest';
import { getRequestByProjectIdApi } from '../../../apis/Request/getRequestByProjectId';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { tableCellClasses } from "@mui/material/TableCell";
import { Table, TableBody, TableRow } from '@mui/material';
import Header from '../../../Components/Tab/Header';

const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));
function createData(
  name,
  progress,
  perform,
  start,
  end,
  durationn,
  status,
  prioritized
) {
  return {
    name,
    progress,
    perform,
    start,
    end,
    durationn,
    status,
    prioritized,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Mã yêu cầu',
  },
  {
    id: 'tenyeucau',
    numeric: false,
    disablePadding: false,
    label: 'Tên yêu cầu',
  },
  {
    id: 'ngay',
    numeric: false,
    disablePadding: false,
    label: 'Ngày',
  },
  {
    id: 'theloai',
    numeric: false,
    disablePadding: false,
    label: 'Thể loại',
  },
  {
    id: 'nguoiyeucau',
    numeric: false,
    disablePadding: false,
    label: 'Người yêu cầu',
  },
  {
    id: 'chitiet',
    numeric: false,
    disablePadding: false,
    label: '',
  },

  // {
  //   id: 'capnhat',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Cập nhật',
  // },
  // {
  //   id: 'xoa',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Xóa',
  // },
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) =>
          (userInfor.authorID !== '54' && index === 6) || index === 7 ? null : (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Yêu cầu
        </Typography>
      )}
      {/* 
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function RequestTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('ngay');
  const [selected, setSelected] = React.useState([]);
  const { id } = useParams();
  const [allRequestDetails, setAllRequestDetails] = React.useState([]);
  const [{ loading }, dispatch] = useStateValue();
  const [totalPage, setTotalPage] = React.useState();
  const [pageNum, setPageNum] = React.useState(0);
  const handleChangePage = (event, value) => {
    setPageNum(value - 1);
  };
  React.useEffect(() => {
    (async () => {
      try {
        const listAllRequestDetail = await getRequestByProjectIdApi(
          pageNum,
          10,
          id,
          'BY_PROJECT_ID',
          'createdAt',
          false
        );
        setAllRequestDetails(listAllRequestDetail.data);
        setTotalPage(listAllRequestDetail.data[0].totalPage);
      } catch (error) {
        console.log('Không thể lấy dữ liệu của yêu cầu!');
      }
    })();
  }, [pageNum]);
  console.log(allRequestDetails);
  const handleDeleteRequest = (id) => {
    Swal.fire({
      title: 'Bạn có chắc chứ?',
      text: 'Bạn không thể thu hổi lại khi ấn nút!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, hãy xóa nó!',
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteRequest(id);
      }
    });
  };
  console.log(allRequestDetails);
  const DeleteRequest = async (id) => {
    try {
      await deleteRequestApi(id);
      await Swal.fire(
        'Xóa thành công!',
        'Dự án của bạn đã được xóa thành công.',
        'success'
      );
      dispatch({ type: 'LOADING', newLoading: !loading });
    } catch (error) { }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    //Chỗ này code sort. Mã search 13399

  };

  return (
    <Box sx={{ width: '100%' }}>
      {
        Header(``)
      }
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none"
              }
            }}>
              {allRequestDetails.map((row, index) => {
                // const isItemSelected = isSelected(row.admin);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow style={index % 2 ? { background: "#FAFAFA" } : { background: "white" }}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      // padding="none"
                      align="left"
                    >
                      {row.requestId}
                    </TableCell>
                    <TableCell align="left">{row.requestDesc}</TableCell>
                    <TableCell align="left">{row.requestDate}</TableCell>
                    <TableCell align="left">
                      {row.requestType.requestTypeName}
                    </TableCell>
                    <TableCell align="left">{row.requester.username}</TableCell>
                    <TableCell align="left">
                      <IconButton
                        size="large"
                        component={Link}
                        to={`/requestDetails/${row.requestId}`}
                      >
                        <InfoIcon />
                      </IconButton>
                      {/* <Route>
                        <Link
                          underline="hover"
                          to={`/requestDetails/${row.requestId}`}
                        >
                          {'Chi Tiết'}
                        </Link>
                      </Route> */}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Pagination
        count={totalPage + 1}
        variant="outlined"
        shape="rounded"
        onChange={handleChangePage}
        default={1}
      />
    </Box>
  );
}
