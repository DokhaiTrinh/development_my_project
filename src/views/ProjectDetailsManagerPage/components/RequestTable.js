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
import { getRequestByProjectIdApi } from '../../../apis/Request/getRequestByProjectId';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { tableCellClasses } from "@mui/material/TableCell";
import { Table, TableBody } from '@mui/material';
import Header from '../../../Components/Tab/Header';
import UpdateButton from '../../../Components/Button/UpdateButton';
import DetailButton from '../../../Components/Button/DetailButton';
import DeleteRequest from '../../../Components/Button/Delete/DeleteRequest';

const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

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
          userInfor.authorID !== '44' && index === 6 ? null : (
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
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function RequestTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { id } = useParams();
  const { projectId } = props;
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
          0,
          15,
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

  return (
    <Box sx={{ width: '100%' }}>
      {
        Header(`/createRequestManager/${projectId}`)
      }
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
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
                      {
                        DetailButton(`/requestDetailsManager/${row.requestId}`)
                      }
                    </TableCell>
                    {userInfor.authorID === '44' ? (
                      <TableCell align="left">
                        {
                          UpdateButton(`/updateRequestDetailsManager/${row.requestId}`)
                        }
                      </TableCell>
                    ) : null}
                    {userInfor.authorID === '44' ? (
                      <TableCell align="left">
                        {
                          DeleteRequest(row.requestId)
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
