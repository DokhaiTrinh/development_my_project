import { Divider, Typography, Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import TextFieldComponent from '../../../Components/TextField/textfield';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import { getTaskByProjectIdApi } from '../../../apis/Task/getTaskByProjectId';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useParams } from 'react-router-dom';

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
const DialogTaskReport = (props) => {
  const { id } = useParams();
  const { taskReportDetail, setTaskReportDetail } = props;
  const [loading, setLoading] = useState('');
  const [allTask, setAllTask] = React.useState([]);
  const [taskIdSelected, setTaskIdSelected] = React.useState();

  React.useEffect(() => {
    (async () => {
      try {
        const listAllTask = await getTaskByProjectIdApi(
          0,
          15,
          id,
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

  const submitForm = (data) => {
    const detailTaskReport = {
      taskId: taskIdSelected,
      taskNote: data.taskNote,
      taskProgress: data.taskProgress,
      reportId: 0,
    };
    setTaskReportDetail((taskReportDetail) => [
      ...taskReportDetail,
      detailTaskReport,
    ]);

    props.handleCloseTaskReportDetailDialog();
  };
  const handleChange = (event) => {
    setTaskIdSelected(event.target.value);
  };

  return (
    <div className='dialog'>
      <Typography
        variant="h6"
        color="#DD8501"
      >
        CÔNG VIỆC CHI TIẾT
      </Typography>
      <Divider></Divider>
      <Typography variant="body1" color="#DD8501" fontWeight="bold">
        Thông tin công việc chi tiết
      </Typography>
      <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
      <form onSubmit={handleSubmit(submitForm)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              Thông tin công việc
            </Typography>
            <TextFieldComponent
              register={register}
              name="taskNote"
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
              <Button
                type="submit"
                variant="contained"
                className='submitButton'
              >
                Lưu
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default DialogTaskReport;
