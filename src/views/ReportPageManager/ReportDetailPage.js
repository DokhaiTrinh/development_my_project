import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { getReportById } from '../../apis/Report/getReportByProjectId';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import RenderImage from '../../Components/Render/RenderImage';
import FileDetail from '../ProjectDetailsPage/components/FileDetail';

const ReportDetailPage = (props) => {
  const [{ loading }, dispatch] = useStateValue();
  const { id } = useParams();
  const [allReportDetail, setAllReportDetail] = React.useState([]);
  const [allReportList, setAllReportList] = React.useState([]);
  const [taskReportList, setTaskReportList] = React.useState([]);
  const [filesImage, setFilesImage] = React.useState([]);
  const [imageGet, setImageGet] = React.useState([]);
  const [docGet, setDocGet] = React.useState([]);
  const [selectedImages, setSelectedImage] = React.useState([]);
  const [isShown, setIsShown] = useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const listAllReportDetail = await getReportById(id, 'BY_ID');
        setAllReportDetail(listAllReportDetail.data);
        setAllReportList(listAllReportDetail.data.reportDetailList);
        setTaskReportList(listAllReportDetail.data.taskReportList);
        if (listAllReportDetail.data) {
          if (listAllReportDetail.data.fileList.length > 0) {
            let arrayImgLink = [];
            let arrayDocLink = [];
            for (
              let index = 0;
              index < listAllReportDetail.data.fileList.length;
              index++
            ) {
              const element = listAllReportDetail.data.fileList[index];
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
        console.log('Không thể lấy dữ liệu của báo cáo');
      }
    })();
  }, []);
  console.log(imageGet);
  console.log(docGet);
  const handleChangeFile = (e) => {
    setFilesImage(e.target.files);

    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImage((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };
  const handleDeleteImage = (photo, indexImage) => {
    const index = selectedImages.indexOf(photo);
    if (index > -1) {
      selectedImages.splice(index, 1);
      // dispatch({ type: "LOADING", newLoading: !loading });
    }
    const dt = new DataTransfer();
    const input = document.getElementById('files');
    const { files } = input;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (index !== i) dt.items.add(file); // here you exclude the file. thus removing it.
    }

    input.files = dt.files;
    setFilesImage(input.files);

    // dispatch({ type: 'LOADING', newLoading: !loading });
  };

  console.log(allReportDetail);
  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        sx={{
          width: '100%',
          mp: 2,
          padding: '32px',
        }}
        variant="elevation"
      >
        <Typography variant="h6" sx={{ marginBottom: '20px' }}>
          Thông tin chung
        </Typography>
        <Divider sx={{ marginBottom: '20px' }}></Divider>
        {allReportDetail ? (
          <Grid container spacing={2}>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Mã dự án
                {/* <a href={allReportDetail.fileList[1].fileLink} >Download</a> */}
              </Typography>
              <Typography variant="body1">
                {allReportDetail.projectId}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Mã báo cáo
              </Typography>
              <Typography variant="body1">
                {allReportDetail.reportId}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Tên báo cáo
              </Typography>
              <Typography variant="body1">
                {allReportDetail.reportName}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Ngày báo cáo
              </Typography>
              <Typography variant="body1">
                {allReportDetail.reportDate}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Mô tả báo cáo
              </Typography>
              <Typography variant="body1">
                {allReportDetail.reportDesc}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Người báo cáo
              </Typography>
              <Typography variant="body1" paragraph>
                {allReportDetail.reporterId}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Loại báo cáo
              </Typography>
              <Typography variant="body1" paragraph>
                {allReportDetail.reportType ? (
                  allReportDetail.reportType.reportTypeName
                ) : (
                  <div>Chua co du lieu</div>
                )}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Báo cáo chi tiết
              </Typography>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  {allReportList ? (
                    allReportList.map((reportDetail, index) => (
                      <Card
                        sx={{
                          witdh: '100%',
                          marginBottom: '10px',
                          padding: '10px',
                        }}
                      >
                        <Typography>
                          Thông tin báo cáo chi tiết: {reportDetail.itemDesc}
                        </Typography>
                        <Typography>
                          Số lượng:
                          {reportDetail.itemAmount}
                        </Typography>
                        <Typography>
                          Giá tiền: {reportDetail.itemPrice} VNĐ{' '}
                        </Typography>
                        <Typography>Đơn vị: {reportDetail.itemUnit}</Typography>
                      </Card>
                    ))
                  ) : (
                    <div>Không có dữ liệu!!</div>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs="4">
              <Box sx={{ width: '100%' }}>
                <Typography variant="body1" color="gray">
                  Công việc chi tiết
                </Typography>
                <Card sx={{ width: '100%' }}>
                  <CardContent>
                    {taskReportList ? (
                      taskReportList.map((taskReport, index) => (
                        <Card
                          sx={{
                            witdh: '100%',
                            padding: '10px',
                            marginBottom: '10px',
                          }}
                        >
                          <Typography>
                            <Typography>
                              Mã công việc chi tiết: {taskReport.taskReportId}
                            </Typography>
                            Tên công việc : {taskReport.taskNote}
                          </Typography>
                        </Card>
                      ))
                    ) : (
                      <div>No data!</div>
                    )}
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid container item xs="12">
              {/* <Grid item xs="4">
                  <Typography variant="body1" color="gray">
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
                <Typography variant="body1" color="gray">
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
          <Typography variant='h5'>Loading...</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ReportDetailPage;
