import {
  Divider,
  Typography,
  Box,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MenuItem from '@mui/material/MenuItem';
import TextFieldComponent from '../../../Components/TextField/textfield';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { getAllUserApi1 } from '../../../apis/User/getAllUser';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export const DialogTaskAssgin = (props) => {
  const { userListDetail, setUserListDetail } = props;
  const [assigneeIdSelected, setAssigneeIdSelected] = React.useState();
  const [assignerIdSelected, setAssignerIdSelected] = React.useState();
  const [allUser, setAllUser] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const listAllUser = await getAllUserApi1(0, 1000, 'createdAt', true);
        setAllUser(listAllUser.data);
      } catch (error) {
        console.log('Không thể lấy danh sách kỹ sư');
      }
    })();
  }, []);
  console.log(allUser);
  const valideSchema = yup
    .object({
      taskNote: yup.string().required(),
      taskProgress: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(valideSchema),
  });

  const handleSumbmit = () => {
    const detailTaskAssgin = {
      assigneeId: assigneeIdSelected,
      assignerId: assignerIdSelected,
      taskId: 0,
    };
    setUserListDetail(detailTaskAssgin);
    props.handleCloseUserDialog();
  };
  const handleChange = (event) => {
    setAssigneeIdSelected(event.target.value);
  };
  const handleChange1 = (event1) => {
    setAssignerIdSelected(event1.target.value);
  };
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        PHÂN CÔNG CÔNG VIỆC
      </Typography>
      <Divider></Divider>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            paddingLeft: '10px',
            paddingTop: '10px',
            width: '40%',
            marginBottom: '30px',
          }}
        >
          <Typography variant="body1" color="#DD8501" fontWeight="bold">
            Thông tin phân công công việc
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>
          <div >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Người giao
                </Typography>
                <FormControl sx={{ width: '100%' }}>
                  <Select
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    value={assigneeIdSelected}
                  >
                    {allUser.length > 0 ? (
                      allUser.map((userType, index) => (
                        <MenuItem value={userType.userId} key={index}>
                          {userType.username}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>
                        Không có dữ liệu của danh sách ngườ dùng!
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Người nhận
                </Typography>
                <FormControl sx={{ width: '100%' }}>
                  <Select
                    onChange={handleChange1}
                    MenuProps={MenuProps}
                    value={assignerIdSelected}
                  >
                    {allUser.length > 0 ? (
                      allUser.map((userType, index) => (
                        <MenuItem value={userType.userId} key={index}>
                          {userType.username}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>
                        Không có dữ liệu của danh sách ngườ dùng!
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: '#DD8501',
                      borderRadius: 50,
                      width: '200px',
                      alignSelf: 'center',
                    }}
                    onClick={handleSumbmit}
                  >
                    Lưu
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Box>
    </div>
  );
};
export default DialogTaskAssgin;
