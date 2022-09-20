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
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { visuallyHidden } from '@mui/utils';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useStateValue } from '../../../common/StateProvider/StateProvider';
import { deleteTaskApi } from '../../../apis/Task/deleteTask';
import Swal from 'sweetalert2';
import { getTaskByProjectIdApi } from '../../../apis/Task/getTaskByProjectId';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { tableCellClasses } from '@mui/material/TableCell';
import { Table, TableBody, TableRow } from '@mui/material';
import DeleteTask from '../../../Components/Button/Delete/DeleteTask';
import UpdateButton from '../../../Components/Button/UpdateButton';
import Header from '../../../Components/Tab/Header';
import DetailButton from '../../../Components/Button/DetailButton';

const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

const headCells = [
  {
    id: 'macongviec',
    numeric: false,
    disablePadding: false,
    label: 'Mã công việc',
  },
  {
    id: 'tenconviec',
    numeric: false,
    disablePadding: false,
    label: 'Tên công việc',
  },
  {
    id: 'chitiet',
    numeric: false,
    disablePadding: false,
    label: 'Chi tiết công việc',
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
    id: 'update',
    numeric: false,
    disablePadding: false,
    label: '',
  },
  {
    id: 'delete',
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
          (userInfor.authorID !== '54' && index === 6) || index === 7 ? null : (
            <TableCell
              key={headCell.id}
              align={headCell.character ? 'right' : 'left'}
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
          Công việc
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

export default function ReportTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [allTaskDetails, setAllTaskDetails] = React.useState([]);
  const { id } = useParams();
  const [totalPage, setTotalPage] = React.useState();
  const [pageNum, setPageNum] = React.useState(0);
  const handleChangePage = (event, value) => {
    setPageNum(value - 1);
  };
  React.useEffect(() => {
    (async () => {
      try {
        const listAllTaskDetail = await getTaskByProjectIdApi(
          pageNum,
          5,
          id,
          'BY_PROJECT_ID',
          'createdAt',
          false
        );
        setAllTaskDetails(listAllTaskDetail.data);
        setTotalPage(listAllTaskDetail.data[0].totalPage);
      } catch (error) {
        console.log('Không thể lấy dữ liệu của báo công việc');
      }
    })();
  }, [pageNum]);
  console.log(allTaskDetails);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = allTaskDetails.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {Header(`/createTask/${id}`)}
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={allTaskDetails.length}
            />
            <TableBody
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: 'none',
                },
              }}
            >
              {allTaskDetails.map((row, index) => {
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
                      // padding="none"
                      align="left"
                    >
                      {row.taskId}
                    </TableCell>
                    <TableCell align="left">{row.taskName}</TableCell>
                    <TableCell align="left">{row.taskDesc}</TableCell>
                    <TableCell align="left">{row.planStartDate}</TableCell>
                    <TableCell align="left">{row.planEndDate}</TableCell>
                    {/* <TableCell align="left">
                      {row.taskAssignment.assignee.username}
                    </TableCell> */}
                    <TableCell align="left">
                      {DetailButton(`/taskDetails/${row.taskId}`)}
                    </TableCell>
                    {userInfor.authorID === '54' ? (
                      <TableCell align="left">
                        {UpdateButton(`/updateTask/${row.taskId}`)}
                      </TableCell>
                    ) : null}
                    {userInfor.authorID === '54' ? (
                      <TableCell align="left">
                        {DeleteTask(row.taskId)}
                      </TableCell>
                    ) : null}
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
