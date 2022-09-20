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
import Swal from 'sweetalert2';
import { visuallyHidden } from '@mui/utils';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import UpdateIcon from '@mui/icons-material/Update';
import { useStateValue } from '../../../common/StateProvider/StateProvider';
import Pagination from '@mui/material/Pagination';
import { tableCellClasses } from "@mui/material/TableCell";
import DeleteReport from '../../../Components/Button/Delete/DeleteReport';
import UpdateButton from '../../../Components/Button/UpdateButton';
import DetailButton from '../../../Components/Button/DetailButton';
import Header from '../../../Components/Tab/Header';

const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Mã báo cáo',
  },
  {
    id: 'tenconviec',
    numeric: false,
    disablePadding: false,
    label: 'Tên báo cáo',
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
    label: 'Loại báo cáo',
  },
  {
    id: 'Chitiet',
    numeric: false,
    disablePadding: false,
    label: '',
  },
  {
    id: 'Capnhat',
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
  const {
    order,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  console.log(userInfor.authorID);
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) =>
          userInfor.authorID !== '44' && index === 5 ? null : (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'center' : 'left'}
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
          Báo cáo
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
export default function ReportTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const { projectId, allReportDetails, totalPage } = props;
  console.log(allReportDetails);
  const [{ loading }, dispatch] = useStateValue();
  const handleChangePage = (event, value) => {
    dispatch({ type: 'CHANGE_PAGENO', newPageNo: value - 1 });
  };
  
  return (
    <Box sx={{ width: '100%' }}>
      {
        Header(`/createReportManager/${projectId}`)
      }
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
            />
            <TableBody sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none"
              }
            }}>
              {allReportDetails.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow style={index % 2 ? { background: "#FAFAFA" } : { background: "white" }}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      align="left"
                    >
                      {row.reportId}
                    </TableCell>
                    <TableCell align="left">{row.reportName}</TableCell>
                    <TableCell align="left">
                      {(row.reportDate)}
                    </TableCell>
                    <TableCell align="left">
                      {row.reportType.reportTypeName}
                    </TableCell>
                    <TableCell align="left">
                      {
                        DetailButton(`/reportDetailsManager/${row.reportId}`)
                      }
                    </TableCell>
                    {userInfor.authorID === '44' ? (
                      <TableCell align="left">
                        {
                          UpdateButton(`/updateReportDetailsManager/${row.reportId}`)
                        }
                      </TableCell>
                    ) : null}
                    {userInfor.authorID === '44' ? (
                      <TableCell align="left">
                       {
                         DeleteReport(row.reportId)
                       }
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
