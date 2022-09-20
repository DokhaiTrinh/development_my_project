import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { getTaskByIdApi } from './../../apis/Task/getTaskByProjectId';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import RenderImage from '../../Components/Render/RenderImage';
import FileDetail from '../ProjectDetailsPage/components/FileDetail';

const TaskDetailPage = (props) => {
  const { id } = useParams();
  const [allTaskDetail, setAllTaskDetail] = React.useState([]);
  const [allTaskList, setAllTaskList] = React.useState([]);
  const [imageGet, setImageGet] = React.useState([]);
  const [docGet, setDocGet] = React.useState([]);
  const [selectedImages, setSelectedImage] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const listAllTaskDetail = await getTaskByIdApi(id, 'BY_ID');
        setAllTaskDetail(listAllTaskDetail.data);
        if (listAllTaskDetail.data) {
          if (listAllTaskDetail.data.fileList.length > 0) {
            let arrayImgLink = [];
            let arrayDocLink = [];
            for (
              let index = 0;
              index < listAllTaskDetail.data.fileList.length;
              index++
            ) {
              const element = listAllTaskDetail.data.fileList[index];
              if (element.fileName.split('.')[1] === 'docx') {
                let objectDoc = {
                  name: element.fileName,
                  link: element.fileLink,
                  id: element.fileId,
                };
                arrayDocLink.push(objectDoc);
              } else {
                arrayImgLink.push(element.fileLink);
              }
            }
            setDocGet(arrayDocLink);
            setImageGet(arrayImgLink);
          }
        }
      } catch (error) {
        console.log('Không có dữ liệu của công việc!!');
      }
    })();
  }, []);
  console.log(allTaskDetail);
  return (
      <Paper
        className='bodynonetab' elevation='none'
      >
        <Typography variant="h6" sx={{ marginBottom: '20px' }}>
          Thông tin công việc
        </Typography>
        <Divider sx={{ marginBottom: '20px' }}></Divider>
        {allTaskDetail ? (
          <Grid container spacing={2}>
            <Grid item xs="4">
              <Typography variant="caption">
                Tên công việc
              </Typography>
              <Typography variant="body1">{allTaskDetail.taskName}</Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="caption">
                Mô tả công việc
              </Typography>
              <Typography variant="body1">{allTaskDetail.taskDesc}</Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="caption">
                Kỹ sư phụ trách
              </Typography>
              {/* <Typography variant="body1">
                {allTaskDetail.taskAssignment.assignee.username}
              </Typography> */}
            </Grid>
            <Grid item xs="4">
              <Typography variant="caption">
                Ngày nhận việc
              </Typography>
              <Typography variant="body1">
                {allTaskDetail.planStartDate}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="caption">
                Ngày kết thúc
              </Typography>
              <Typography variant="body1">
                {allTaskDetail.planEndDate}
              </Typography>
            </Grid>
            <Grid container item xs="12">
              {/* <Grid item xs="4">
                <Typography variant="caption">
                  Hình ảnh
                </Typography>
                <Box sx={{ width: '200px', height: '300px' }}>
                  <div className="label-holder" style={{ height: '200px' }}>
                    <label htmlFor="file" className="img-upload"></label>
                    <div className="result">{RenderImage(imageGet)}</div>
                  </div>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs="4">
              <Typography variant="caption">
                Tài liệu
              </Typography>
              {docGet.length > 0 ? (
                docGet.map((item, index) => (
                  <>
                    <a href={item}>Tải xuống</a>
                  </>
                ))
              ) : (
                // <div>Không có tệp đi kèm!!</div>
                <></>
              )} */}
              <FileDetail
                // projectId={projectId}
                imageGet={imageGet}
                docGet={docGet}
              ></FileDetail>
            </Grid>
          </Grid>
        ) : (
          <div>Loading ...</div>
        )}
      </Paper>
  );
};

export default TaskDetailPage;
