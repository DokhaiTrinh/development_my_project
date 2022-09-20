import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import 'react-datepicker/dist/react-datepicker.css';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { tableCellClasses } from '@mui/material/TableCell';
import { Table, TableBody } from '@mui/material';

function createData(code, name, department, position, office, role, join, dob) {
  return {
    code,
    name,
    department,
    position,
    office,
    role,
    join,
    dob,
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
    id: 'manv',
    numeric: false,
    disablePadding: false,
    label: 'Mã công nhân',
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
    id: 'gioitinh',
    numeric: false,
    disablePadding: false,
    label: 'Giới tính',
  },
  {
    id: 'ngaythangnamsinh',
    numeric: false,
    disablePadding: false,
    label: 'Năm sinh',
  },
  {
    id: 'diachi',
    numeric: false,
    disablePadding: false,
    label: 'Địa chỉ',
  },
  {
    id: 'cancuoccongdan',
    numeric: false,
    disablePadding: false,
    label: 'Căn cước công dân',
  },
  {
    id: 'soansinhxahoi',
    numeric: false,
    disablePadding: false,
    label: 'An sinh xã hội',
  },
  //   {
  //     id: 'capnhat',
  //     numeric: false,
  //     disablePadding: false,
  //     label: 'Cập nhật',
  //   },
  //   {
  //     id: 'xoa',
  //     numeric: false,
  //     disablePadding: false,
  //     label: 'Xóa',
  //   },
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
          Công nhân
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

const DialogWorker = (props) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('maduan');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { workerList } = props;
  console.log(workerList);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: 'none',
                },
              }}
            >
              {workerList ? (
                workerList.map((row, index) => {
                  return (
                    <TableRow
                      style={
                        index % 2
                          ? { background: '#FAFAFA' }
                          : { background: 'white' }
                      }
                    >
                      <TableCell>{row.worker.workerId}</TableCell>
                      <TableCell>
                        {row.worker.file ? (
                          <Avatar src={row.worker.file.fileLink} />
                        ) : (
                          <Avatar src="/broken-image.jpg" />
                        )}
                      </TableCell>
                      <TableCell align="left">{row.worker.fullName}</TableCell>
                      <TableCell align="left">{row.worker.gender}</TableCell>
                      <TableCell align="left">{row.worker.birthdate}</TableCell>
                      <TableCell align="left">
                        Q{''} {row.worker.address.district}, TP.{' '}
                        {row.worker.address.country}
                      </TableCell>
                      <TableCell align="left">{row.worker.citizenId}</TableCell>
                      <TableCell align="left">
                        {row.worker.socialSecurityCode}
                      </TableCell>
                      {/* <TableCell align="left">
                        <IconButton
                          component={Link}
                          // edge="start"
                          size="large"
                          to={`/updateWorker/${row.workerId}`}
                        >
                          <UpdateIcon />
                        </IconButton>
                      </TableCell> */}
                      {/* <TableCell align="left">
                        <IconButton
                          aria-label="delete"
                          color="warning"
                          edge="start"
                          size="large"
                          onClick={() => handleDeleteWorker(row.workerId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell> */}
                    </TableRow>
                  );
                })
              ) : (
                <div>Không có thông tin dữ liệu!</div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Pagination
          count={totalPage + 1}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
          default={1}
        /> */}
      </Paper>
    </Box>
  );
};

export default DialogWorker;
