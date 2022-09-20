import React from 'react';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useStateValue } from '../../common/StateProvider/StateProvider';
import { useParams } from 'react-router-dom';
import { getRequestIdApi } from '../../apis/Request/getRequestByProjectId';
import RenderImage from '../../Components/Render/RenderImage';
import FileDetail from '../ProjectDetailsPage/components/FileDetail';

function RequestDetailPage() {
  const { id } = useParams();
  const [allRequestList, setAllRequestList] = React.useState();
  const [requestDetail, setRequestDetail] = React.useState([]);
  const [imageGet, setImageGet] = React.useState([]);
  const [docGet, setDocGet] = React.useState([]);
  const [selectedImages, setSelectedImage] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const listAllRequestDetail = await getRequestIdApi(id, 'BY_ID');
        setAllRequestList(listAllRequestDetail.data);
        setRequestDetail(listAllRequestDetail.data.requestDetailList);
        if (listAllRequestDetail.data) {
          if (listAllRequestDetail.data.fileList.length > 0) {
            let arrayImgLink = [];
            let arrayDocLink = [];
            for (
              let index = 0;
              index < listAllRequestDetail.data.fileList.length;
              index++
            ) {
              const element = listAllRequestDetail.data.fileList[index];
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
        console.log('Không thể lấy dữ liệu của yêu cầu!');
      }
    })();
  }, []);
  console.log(allRequestList);
  console.log(docGet);
  console.log(imageGet);
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Paper
          sx={{
            width: '90%',
            mp: 2,
            borderRadius: '30px',
            padding: '20px',
            margin: '5%',
          }}
          variant="elevation"
        >
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            Thông tin chung
          </Typography>
          <Divider sx={{ marginBottom: '20px' }}></Divider>
          {allRequestList ? (
            <Grid container spacing={2}>
              {/* <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Mã dự án
                </Typography>
                <Typography variant="body1">
                  {allRequestList.projectId}
                </Typography>
              </Grid> */}
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Tên yêu cầu
                </Typography>
                <Typography variant="body1">
                  {allRequestList.requestName}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Mã yêu cầu
                </Typography>
                <Typography variant="body1">
                  {allRequestList.requestId}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Thông tin yêu cầu
                </Typography>
                <Typography variant="body1">
                  {/* {handleGetDate(allRequestList.reportDate)} */}
                  {allRequestList.requestDesc}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Kiểu yêu cầu
                </Typography>
                <Typography variant="body1">
                  {allRequestList.requestType ? (
                    allRequestList.requestType.requestTypeName
                  ) : (
                    <div>Chưa có dữ liệu !!</div>
                  )}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Người yêu cầu
                </Typography>
                <Typography variant="body1" paragraph>
                  {allRequestList.requester.username}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Ngày yêu cầu
                </Typography>
                <Typography variant="body1" paragraph>
                  {allRequestList.requestDate}
                </Typography>
              </Grid>
              <Grid item container xs="4">
                <Typography variant="body1" color="gray">
                  Chi tiết yêu cầu
                </Typography>
                <Card sx={{ width: '100%' }}>
                  <CardContent>
                    {requestDetail ? (
                      requestDetail.map((req, index) => (
                        <Card
                          sx={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '10px',
                          }}
                        >
                          {/* <Typography>
                            Mã yêu cầu chi tiết: {req.requestDetailId}
                          </Typography> */}
                          <Typography>
                            Thông tin yêu cầu chi tiết: {req.itemDesc}
                          </Typography>
                          <Typography>
                            Số lượng:
                            {req.itemAmount}
                          </Typography>
                          <Typography>Giá tiền: {req.itemPrice} VNĐ</Typography>
                          <Typography>Đơn vị: {req.itemUnit}</Typography>
                        </Card>
                      ))
                    ) : (
                      <div>Không có dữ liệu!!</div>
                    )}
                  </CardContent>
                </Card>
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
            <div>Không có dữ liệu của yêu cầu!!</div>
          )}
        </Paper>
      </Box>
    </div>
  );
}

export default RequestDetailPage;
