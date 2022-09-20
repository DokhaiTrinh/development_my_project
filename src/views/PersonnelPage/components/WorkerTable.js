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
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { useStateValue } from '../../../common/StateProvider/StateProvider';
import Pagination from '@mui/material/Pagination';
import { tableCellClasses } from '@mui/material/TableCell';
import { Table, TableBody } from '@mui/material';
import DeletePost from '../../../Components/Button/Delete/DeletePost';
import UpdateButton from '../../../Components/Button/UpdateButton';
import Header from '../../../Components/Tab/Header';

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
  {
    id: 'ngaytao',
    numeric: false,
    disablePadding: false,
    label: 'Ngày tạo',
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

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
export const WorkerTable = (props) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('maduan');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { allWorker, totalPage } = props;
  console.log(allWorker);
  const [{ pageNo, loading, sortBy, sortTypeAsc }, dispatch] = useStateValue();
  // const [totalPage, setTotalPage] = React.useState(allUser.totalPage);
  const handleChangePage = (event, value) => {
    dispatch({ type: 'CHANGE_PAGENO', newPageNo: value - 1 });
  };

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

  return (
    <Box sx={{ width: '100%' }}>
      {Header('/createWorker')}
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              numSelected={selected.length}
              orderBy={orderBy}
              order={order}
              onRequestSort={handleRequestSort}
            />
            <TableBody
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: 'none',
                },
              }}
            >
              {allWorker ? (
                allWorker.map((row, index) => {
                  return (
                    <TableRow
                      style={
                        index % 2
                          ? { background: '#FAFAFA' }
                          : { background: 'white' }
                      }
                    >
                      <TableCell>{row.workerId}</TableCell>
                      <TableCell>
                        {row.file ? (
                          <Avatar src={row.file.fileLink} />
                        ) : (
                          <Avatar src="/broken-image.jpg" />
                        )}
                      </TableCell>
                      <TableCell align="left">{row.fullName}</TableCell>
                      <TableCell align="left">{row.gender}</TableCell>
                      <TableCell align="left">{row.citizenId}</TableCell>
                      <TableCell align="left">
                        {row.socialSecurityCode}
                      </TableCell>
                      <TableCell align="left">
                        {row.createdAt}
                      </TableCell>
                      <TableCell align="left">
                        {/* <IconButton
                          component={Link}
                          // edge="start"
                          size="large"
                          to={`/updateWorker/${row.workerId}`}
                        >
                          <UpdateIcon />
                        </IconButton> */}
                        {UpdateButton(`/updateWorker/${row.workerId}`)}
                      </TableCell>
                      <TableCell align="left">
                        {DeletePost(row.workerId)}
                      </TableCell>
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
