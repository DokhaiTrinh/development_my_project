import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2';
import { visuallyHidden } from '@mui/utils';
import InfoIcon from '@mui/icons-material/Info';
import { useStateValue } from '../../../common/StateProvider/StateProvider';
import { deleteReportApi } from '../../../apis/Report/deleteReport';
import Pagination from '@mui/material/Pagination';
import { tableCellClasses } from '@mui/material/TableCell';
import { Table, TableBody } from '@mui/material';
import IconButtonCus from '../../../Components/Button/IconButtonCus';
import { useHistory } from 'react-router';
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
    id: 'chitiet',
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
          userInfor.authorID !== '54' && index === 5 ? null : (
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

export default function ReportTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('ngay');
  const { allReportDetails, totalPage } = props;
  const [{ loading, sortBy, sortTypeAsc }, dispatch] = useStateValue();
  const history = useHistory();

  console.log(allReportDetails);
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
    //Chỗ này code sort. Mã search 13399
  };
  return (
    <Box sx={{ width: '100%' }}>
      {Header(``)}
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead
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
              {allReportDetails.map((row, index) => {
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
                      {row.reportId}
                    </TableCell>
                    <TableCell align="left">{row.reportName}</TableCell>
                    <TableCell align="left">{row.reportDate}</TableCell>
                    <TableCell align="left">
                      {row.reportType.reportTypeName}
                    </TableCell>
                    <TableCell align="left">
                      <IconButtonCus
                        onClick={() =>
                          history.push(`/reportDetails/${row.reportId}`)
                        }
                        icon={<InfoIcon style={{ color: 'gray' }} />}
                      />
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
