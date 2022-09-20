import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2';
import { deleteProjectApi } from '../../../apis/Project/deleteProject';
import { useStateValue } from '../../../common/StateProvider/StateProvider';
import { TableBody } from '@mui/material';
import { Table } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { useHistory } from 'react-router';
import { DetailButton } from '../../../Components/Button/DetailButton';
import Header from '../../../Components/Tab/Header';

const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

const headCells = [
  {
    id: 'nguoiquantri',
    numeric: false,
    disablePadding: false,
    label: 'Người quản trị',
  },
  {
    id: 'maduan',
    numeric: false,
    disablePadding: false,
    label: 'Mã dự án',
  },
  {
    id: 'tenduan',
    numeric: false,
    disablePadding: false,
    label: 'Tên dự án',
  },
  {
    id: 'nguoithamgia',
    numeric: false,
    disablePadding: false,
    label: 'Người tham gia',
  },
  {
    id: 'batdau',
    numeric: false,
    disablePadding: false,
    label: 'Bắt đầu',
  },
  {
    id: 'ketthuc',
    numeric: false,
    disablePadding: false,
    label: 'Kết thúc',
  },
  {
    id: 'ngaytao',
    numeric: false,
    disablePadding: false,
    label: 'Ngày tạo',
  },
  {
    id: 'chitiet',
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
          userInfor.authorID !== '54' && index === 7 ? null : (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {/* <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              > */}
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel> */}
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

export const ProjectTable = (props) => {
  const { managerProject } = props;

  const [{ loading }, dispatch] = useStateValue();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('maduan');
  const history = useHistory();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleDeleteProject = (id) => {
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
        DeleteProject(id);
      }
    });
  };

  const DeleteProject = async (id) => {
    try {
      await deleteProjectApi(id);
      await Swal.fire(
        'Xóa thành công!',
        'Dự án của bạn đã được xóa thành công.',
        'success'
      );
      dispatch({ type: 'LOADING', newLoading: !loading });
    } catch (error) {}
  };

  return (
    <Box sx={{ width: '100%' }}>
      {Header(``)}
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead order={order} orderBy={orderBy} />
            <TableBody
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: 'none',
                },
              }}
            >
              {managerProject.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    style={
                      index % 2
                        ? { background: '#FAFAFA' }
                        : { background: 'white' }
                    }
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      align="left"
                    >
                      {row.createdBy}
                    </TableCell>
                    <TableCell align="left">{row.projectId}</TableCell>
                    <TableCell align="left">{row.projectName}</TableCell>
                    <TableCell align="left">{row.manager}</TableCell>
                    <TableCell align="left">{row.planStartDate}</TableCell>
                    <TableCell align="left">{row.planEndDate}</TableCell>
                    <TableCell align="left">{row.createdAt}</TableCell>
                    <TableCell align="left">
                      {/* <IconButton
                        edge="end"
                        size="large"
                        component={Link}
                        to={`/projectDetailsManager/${row.projectId}`}
                      >
                        <InfoIcon />
                      </IconButton> */}
                      {DetailButton(`/projectDetailsManager/${row.projectId}`)}
                    </TableCell>
                    {/* {userInfor.authorID === '54' ? (
                      <TableCell align="left">
                        <IconButton
                          aria-label="delete"
                          color="warning"
                          edge="start"
                          size="large"
                          onClick={() => handleDeleteProject(row.projectId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    ) : null} */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
