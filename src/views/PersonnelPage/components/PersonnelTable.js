import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { useStateValue } from '../../../common/StateProvider/StateProvider';
import Pagination from '@mui/material/Pagination';
import Avatar from '@mui/material/Avatar';
import { tableCellClasses } from '@mui/material/TableCell';
import { Table, TableBody } from '@mui/material';
import Header from '../../../Components/Tab/Header';

import DeleteUser from '../../../Components/Button/Delete/DeleteUser';
import UpdateButton from '../../../Components/Button/UpdateButton';

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
    id: 'manv',
    numeric: false,
    disablePadding: false,
    label: 'Mã NV',
  },
  {
    id: 'anhdaidien',
    numeric: false,
    disablePadding: false,
    label: 'Ảnh đại diện',
  },
  {
    id: 'hovaten',
    numeric: false,
    disablePadding: false,
    label: 'Họ Và Tên',
  },
  {
    id: 'chucvu',
    numeric: false,
    disablePadding: false,
    label: 'Chức vụ',
  },
  {
    id: 'ngayvao',
    numeric: false,
    disablePadding: false,
    label: 'Ngày vào',
  },
  {
    id: 'sodienthoai',
    numeric: false,
    disablePadding: false,
    label: 'Số điện thoại',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  // {
  //   id: 'capnhat',
  //   numeric: false,
  //   disablePadding: false,
  //   label: '',
  // },
  {
    id: 'xoa',
    numeric: false,
    disablePadding: false,
    label: '',
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
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
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
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
          Nhân viên
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

export const PersonnelTable = (props) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('maduan');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { allUser, totalPage } = props;
  const [{ pageNo, loading, sortBy, sortTypeAsc }, dispatch] = useStateValue();
  // const [totalPage, setTotalPage] = React.useState(allUser.totalPage);
  const handleChangePage = (event, value) => {
    dispatch({ type: 'CHANGE_PAGENO', newPageNo: value - 1 });
  };
  // const handleDeleteUser = (id) => {
  //   Swal.fire({
  //     title: 'Bạn có chắc chứ?',
  //     text: 'Bạn không thể thu hổi lại khi ấn nút!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Có, hãy xóa nó!',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       deleteUser(id);
  //     }
  //   });
  // };
  // const deleteUser = async (id) => {
  //   try {
  //     await deleteUserkApi(id);
  //     await Swal.fire(
  //       'Xóa thành công!',
  //       'Nhân viên của bạn đã được xóa thành công.',
  //       'success'
  //     );
  //     dispatch({ type: 'LOADING', newLoading: !loading });
  //   } catch (error) { }
  // };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    if (sortTypeAsc) {
      dispatch({ type: 'CHANGE_SORTTYPEASC', newSortTypeAsc: false });
      // handleSearch(title, sortBy, false);
    } else if (sortTypeAsc === false) {
      dispatch({ type: 'CHANGE_SORTTYPEASC', newSortTypeAsc: true });
      // handleSearch(title, sortBy, true);
    }
  };

  const handleClick = (event, admin) => {
    const selectedIndex = selected.indexOf(admin);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, admin);
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

  const isSelected = (admin) => selected.indexOf(admin) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      {Header('/createPersonnel')}
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
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
              {allUser.map((row, index) => {
                return (
                  <TableRow
                    style={
                      index % 2
                        ? { background: '#FAFAFA' }
                        : { background: 'white' }
                    }
                  >
                    <TableCell>{row.userId}</TableCell>
                    <TableCell>
                      {row.file ? (
                        <Avatar src={row.file.fileLink} />
                      ) : (
                        <Avatar src="/broken-image.jpg" />
                      )}
                    </TableCell>
                    <TableCell align="left">{row.fullName}</TableCell>
                    <TableCell align="left">{row.role.roleName}</TableCell>
                    <TableCell align="left">{row.role.updatedAt}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">
                      {UpdateButton(`/updatePersonnel/${row.userId}`)}
                    </TableCell>
                    <TableCell align="left">{DeleteUser(row.userId)}</TableCell>
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
};
