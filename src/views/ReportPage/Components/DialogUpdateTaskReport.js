import { Divider, Typography, Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import TextFieldComponent from '../../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';

const DialogUpdateTaskReport = (props) => {
  const {
    updateTaskDetail,
    setUpdateTaskDetail,
    actionUpdateTask,
    itemDetailTaskUpdate,
  } = props;

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
      taskId: data.taskId,
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
              taskId: data.taskId,
              taskNote: data.taskNote,
              taskProgress: data.taskProgress,
            })
          : t
      );
      setUpdateTaskDetail(updateListTask);
    }
    props.handleCloseUpdateTaskReportDetailDialog();
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
              <Grid item xs={12}>
                <Typography variant="body2">
                  Công việc thuộc mã công việc:
                </Typography>
                <TextFieldComponent
                  register={register}
                  name="taskId"
                  defaultValue={
                    itemDetailTaskUpdate ? itemDetailTaskUpdate.taskId : null
                  }
                  errors={errors.taskId}
                  variant="outlined"
                  sx={{ width: '100%' }}
                />
              </Grid>
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
