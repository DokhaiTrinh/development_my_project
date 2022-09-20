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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Link } from 'react-router-dom';
import UpdateIcon from '@mui/icons-material/Update';
import { tableCellClasses } from "@mui/material/TableCell";
import { Table, TableBody } from '@mui/material';
import Header from '../../../Components/Tab/Header';

const headCells = [
  {
    id: 'vaitriid',
    numeric: false,
    // disablePadding: true,
    label: 'Vai trò ID',
  },
  {
    id: 'tenvaitro',
    numeric: false,
    // disablePadding: false,
    label: 'Tên vai trò',
  },
  {
    id: 'ngaythem',
    numeric: false,
    // disablePadding: false,
    label: 'Ngày được thêm vào',
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
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            > */}
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel> */}
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

export const RoleTable = (props) => {
  const { allRole } = props;
  console.log(allRole);

  return (
    <Box sx={{ width: '100%' }}>
      {
        Header('/createRole')
      }
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead
            />
            <TableBody sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none"
              }
            }}>
              {allRole.map((row, index) => {
                return (
                  <TableRow style={index % 2 ? { background: "#FAFAFA" } : { background: "white" }}>
                    <TableCell></TableCell>
                    <TableCell align="left">{row.roleId}</TableCell>
                    <TableCell align="left">{row.roleName}</TableCell>
                    <TableCell align="left">{row.updatedAt}</TableCell>
                    <TableCell align="left">
                      <IconButton
                        aria-label="delete"
                        color="warning"
                        edge="start"
                        size="large"
                      // onClick={() => handleDeleteReport(row.reportId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
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
