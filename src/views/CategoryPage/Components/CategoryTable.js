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
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Link } from 'react-router-dom';
import UpdateIcon from '@mui/icons-material/Update';
import { deleteCategoryApi } from './../../../apis/CategoryPost/deleteCategory';
import Swal from 'sweetalert2';
import { useStateValue } from '../../../common/StateProvider/StateProvider';
import { tableCellClasses } from "@mui/material/TableCell";
import TableRow from '@mui/material/TableRow';
import { TableBody, Table } from '@mui/material';
import UpdateButton from '../../../Components/Button/UpdateButton';
import Header from '../../../Components/Tab/Header';

const headCells = [
  {
    id: 'vaitriid',
    numeric: false,
    // disablePadding: true,
    label: 'Số thứ tự',
  },
  {
    id: 'tenvaitro',
    numeric: false,
    // disablePadding: false,
    label: 'Tên thể loại',
  },
  {
    id: 'dienta',
    numeric: false,
    // disablePadding: false,
    label: 'Ghi chú',
  },
  {
    id: 'ngaythem',
    numeric: false,
    // disablePadding: false,
    label: 'Ngày được thêm vào',
  },
  {
    id: 'capnhat',
    numeric: false,
    // disablePadding: false,
    label: '',
  },
  {
    id: 'xoa',
    numeric: false,
    // disablePadding: false,
    label: '',
  },
];

const EnhancedTableHead = (props) => {
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
        <TableCell padding="checkbox">
        </TableCell>
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
};

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
          Vai trò
        </Typography>
      )}

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
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export const CategoryTable = (props) => {
  const { allCategory } = props;
  const [{loading, sortBy, sortTypeAsc }, dispatch] = useStateValue();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('ngaythem');
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    
    //Chỗ này code sort. Mã search 13399

  };
  const handleDeleteCategory = (id) => {
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
        deleteCategory(id);
      }
    });
  };
  const deleteCategory = async (id) => {
    try {
      await deleteCategoryApi(id);
      await Swal.fire(
        'Xóa thành công!',
        'Bài đăng của bạn đã được xóa thành công.',
        'success'
      );
      dispatch({ type: 'LOADING', newLoading: !loading });
    } catch (error) { }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {
        Header(`/createCategory/`)
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
              {allCategory ? (
                allCategory.map((row, index) => {
                  return (
                    <TableRow style={index % 2 ? { background: "#FAFAFA" } : { background: "white" }}>
                      <TableCell></TableCell>
                      <TableCell align="left">{row.postCategoryId}</TableCell>
                      <TableCell align="left">{row.postCategoryName}</TableCell>
                      <TableCell align="left">{row.postCategoryDesc}</TableCell>
                      <TableCell align="left">{row.createdAt}</TableCell>
                      <TableCell align="left">
                        {
                          UpdateButton(`/updateCategory/${row.postCategoryId}`)
                        }
                      </TableCell>
                      <TableCell align="left">
                        <IconButton
                          aria-label="delete"
                          color="warning"
                          edge="start"
                          size="large"
                          onClick={() =>
                            handleDeleteCategory(row.postCategoryId)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
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
    </Box>
  );
};
