import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { deletePostApi } from './../../../apis/Post/deletePost';
import Swal from 'sweetalert2';
import Avatar from '@mui/material/Avatar';
import { useStateValue } from '../../../common/StateProvider/StateProvider';
import Pagination from '@mui/material/Pagination';
import { tableCellClasses } from '@mui/material/TableCell';
import Header from '../../../Components/Tab/Header';
import UpdateButton from '../../../Components/Button/UpdateButton';
import DeletePost from '../../../Components/Button/Delete/DeletePost';

const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

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
    id: 'ma',
    numeric: false,
    disablePadding: false,
    label: 'Mã',
  },
  {
    id: 'hinhanh',
    numeric: false,
    disablePadding: false,
    label: 'Hình Ảnh',
  },
  {
    id: 'ten',
    numeric: false,
    disablePadding: false,
    label: 'Tên dự án',
  },
  {
    id: 'theloai',
    numeric: false,
    disablePadding: false,
    label: 'Thể loại',
  },
  {
    id: 'chudautu',
    numeric: false,
    disablePadding: false,
    label: 'Chủ đầu tư',
  },
  {
    id: 'quymo',
    numeric: false,
    disablePadding: false,
    label: 'Quy mô',
  },
  {
    id: 'vitri',
    numeric: false,
    disablePadding: false,
    label: 'Vị trí',
  },
  {
    id: 'giadukien',
    numeric: false,
    disablePadding: false,
    label: 'Giá dự kiến',
  },
  {
    id: 'capnhat',
    numeric: false,
    disablePadding: false,
    label: '',
  },
  {
    id: 'xoa',
    numeric: false,
    disablePadding: false,
    label: '',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) =>
          userInfor.authorID !== '54' && index === 8 ? null : (
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
          Dự án
        </Typography>
      )}

      {/* {numSelected > 0 ? (
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

export const ProductTable = (props) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { allProduct, totalPage } = props;
  const [{ pageNo, loading }, dispatch] = useStateValue();

  //const [totalPage, setTotalPage] = React.useState(allProduct.totalPage);
  const handleChangePage = (event, value) => {
    dispatch({ type: 'CHANGE_PAGENO', newPageNo: value - 1 });
  };
  const handleDeletePost = (id) => {
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
        deletePost(id);
      }
    });
  };
  const deletePost = async (id) => {
    try {
      await deletePostApi(id);
      await Swal.fire(
        'Xóa thành công!',
        'Bài đăng của bạn đã được xóa thành công.',
        'success'
      );
      dispatch({ type: 'LOADING', newLoading: !loading });
    } catch (error) {}
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = rows.map((n) => n.id);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      {Header('/createProduct')}
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              numSelected={selected.length}
              // order={order}
              // orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              // rowCount={rows.length}
            />
            <TableBody
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: 'none',
                },
              }}
            >
              {allProduct ? (
                allProduct.map((row, index) => {
                  return (
                    <TableRow
                      style={
                        index % 2
                          ? { background: '#FAFAFA' }
                          : { background: 'white' }
                      }
                    >
                      <TableCell>{row.postId}</TableCell>
                      <TableCell align="left">
                        {row.fileList ? (
                          <Avatar
                            src={row.fileList[0].fileLink}
                            variant="square"
                          />
                        ) : (
                          <Avatar src="/broken-image.jpg" />
                        )}
                      </TableCell>
                      <TableCell align="left">{row.postTitle}</TableCell>
                      <TableCell align="left">{row.postCategoryName}</TableCell>
                      <TableCell align="left">{row.ownerName}</TableCell>
                      <TableCell align="left">{row.scale}</TableCell>
                      <TableCell align="left">{row.address}</TableCell>
                      <TableCell align="left">{row.estimatedCost}</TableCell>
                      <TableCell align="left">
                        {UpdateButton(`/updateProduct/${row.postId}`)}
                      </TableCell>
                      {userInfor.authorID === '54' ? (
                        <TableCell align="left">
                          {DeletePost(row.postId)}
                        </TableCell>
                      ) : null}
                    </TableRow>
                  );
                })
              ) : (
                <div>Không có thông tin dữ liệu!</div>
              )}
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
};
