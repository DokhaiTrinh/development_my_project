import { Divider, Typography, Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import TextFieldComponent from '../../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { getTaskByProjectIdApi } from '../../../apis/Task/getTaskByProjectId';

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
const DialogUpdateTaskReport = (props) => {
  const {
    updateTaskDetail,
    setUpdateTaskDetail,
    actionUpdateTask,
    itemDetailTaskUpdate,
    projectId,
  } = props;
  console.log(projectId);
  const [allTask, setAllTask] = React.useState([]);
  const [taskIdSelected, setTaskIdSelected] = React.useState();
  const valideSchema = yup
    .object({
      taskId: yup.number().required(),
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
  const submitForm = (data) => {
    const createDetailTask = {
      taskId: taskIdSelected,
      taskNote: data.taskNote,
      taskProgress: data.taskProgress,
      reportId: null,
    };
    if (actionUpdateTask === 'CreateNewTask') {
      setUpdateTaskDetail((updateTaskDetail) => [
        ...updateTaskDetail,
        createDetailTask,
      ]);
    } else {
      let updateListTask = [...updateTaskDetail];
      updateListTask = updateListTask.map((t) =>
        t.taskReportId === itemDetailTaskUpdate.taskReportId
          ? (t = {
              ...t,
              taskId: taskIdSelected,
              taskNote: data.taskNote,
              taskProgress: data.taskProgress,
            })
          : t
      );
      setUpdateTaskDetail(updateListTask);
    }
    props.handleCloseUpdateTaskReportDetailDialog();
  };
  React.useEffect(() => {
    (async () => {
      try {
        const listAllTask = await getTaskByProjectIdApi(
          0,
          15,
          projectId,
          'BY_PROJECT_ID',
          'createdAt',
          false
        );
        setAllTask(listAllTask.data);
      } catch (error) {
        console.log('Không thể lấy danh sách dự án');
      }
    })();
  }, []);
  const handleChange = (event) => {
    setTaskIdSelected(event.target.value);
  };
  return (
    <div>
      <Typography
        variant="h6"
        color="#DD8501"
        sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}
      >
        CÔNG VIỆC CHI TIẾT
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
            Thông tin công việc chi tiết
          </Typography>
          <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
          <Box sx={{ width: '100%', height: '20px' }}></Box>
          <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={2}>
              <FormControl sx={{ width: '100%' }}>
                <Select
                  onChange={handleChange}
                  MenuProps={MenuProps}
                  value={taskIdSelected}
                >
                  {allTask.length > 0 ? (
                    allTask.map((taskType, index) => (
                      <MenuItem value={taskType.taskId} key={index}>
                        {taskType.taskName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>
                      Không có dữ liệu của danh sách công việc!
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Thông tin công việc
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="taskNote"
                  defaultValue={
                    itemDetailTaskUpdate ? itemDetailTaskUpdate.taskNote : null
                  }
                  errors={errors.taskNote}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Tiến độ
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="taskProgress"
                  label="Tiến độ"
                  defaultValue={
                    itemDetailTaskUpdate
                      ? itemDetailTaskUpdate.taskProgress
                      : null
                  }
                  errors={errors.taskProgress}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
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
                  {actionUpdateTask ? (
                    actionUpdateTask === 'UpdateTask' ? (
                      <Button
                        type="submit"
                        variant="contained"
                        style={{
                          backgroundColor: '#DD8501',
                          borderRadius: 50,
                          width: '200px',
                          alignSelf: 'center',
                        }}
                      >
                        Cập nhật
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        style={{
                          backgroundColor: '#DD8501',
                          borderRadius: 50,
                          width: '200px',
                          alignSelf: 'center',
                        }}
                      >
                        Tạo mới
                      </Button>
                    )
                  ) : null}
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: '#DD8501',
                      borderRadius: 50,
                      width: '200px',
                      alignSelf: 'center',
                    }}
                  >
                    Lưu
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default DialogUpdateTaskReport;
