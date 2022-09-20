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

function RequestDetailPage() {
  const handleGetDate = (date) => {
    const getDate = date.substring(0, 10);
    const getDateCom = getDate.split('-');
    const getDateReformat = ''.concat(
      getDateCom[2],
      '/',
      getDateCom[1],
      '/',
      getDateCom[0]
    );
    return getDateReformat;
  };
  const { id } = useParams();
  const [allRequestList, setAllRequestList] = React.useState();
  const [requestDetail, setRequestDetail] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const listAllRequestDetail = await getRequestIdApi(id, 'BY_ID');
        setAllRequestList(listAllRequestDetail.data);
        setRequestDetail(listAllRequestDetail.data.requestDetailList);
      } catch (error) {
        console.log('Không thể lấy dữ liệu của yêu cầu!');
      }
    })();
  }, []);
  console.log(allRequestList);
  return (
    <Paper
      className='bodynonetab'
      elevation='none'
    >
      <Typography variant="h6" sx={{ marginBottom: '20px' }}>
        Thông tin chung
      </Typography>
      <Divider sx={{ marginBottom: '20px' }}></Divider>
      {allRequestList ? (
        <Grid container spacing={2}>
          {/* <Grid item xs="4">
                <Typography variant="caption">
                  Mã dự án
                </Typography>
                <Typography variant="body1">
                  {allRequestList.projectId}
                </Typography>
              </Grid> */}
          <Grid item xs="4">
            <Typography variant="caption">
              Tên yêu cầu
            </Typography>
            <Typography variant="body1">
              {allRequestList.requestName}
            </Typography>
          </Grid>
          <Grid item xs="4">
            <Typography variant="caption">
              Mã yêu cầu
            </Typography>
            <Typography variant="body1">
              {allRequestList.requestId}
            </Typography>
          </Grid>
          <Grid item xs="4">
            <Typography variant="caption">
              Thông tin yêu cầu
            </Typography>
            <Typography variant="body1">
              {/* {handleGetDate(allRequestList.reportDate)} */}
              {allRequestList.requestDesc}
            </Typography>
          </Grid>
          <Grid item xs="4">
            <Typography variant="caption">
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
            <Typography variant="caption">
              Người yêu cầu
            </Typography>
            <Typography variant="body1" paragraph>
              {allRequestList.requester.username}
            </Typography>
          </Grid>
          <Grid item xs="4">
            <Typography variant="caption">
              Ngày yêu cầu
            </Typography>
            <Typography variant="body1" paragraph>
              {allRequestList.requestDate}
            </Typography>
          </Grid>
          <Grid item container xs="4">
            <Typography variant="caption">
              Chi tiết yêu cầu
            </Typography>
          </Grid>
          <Grid item container xs="12" spacing={1}>
            {requestDetail ? (
              requestDetail.map((req, index) => (
                <Grid item xs="4">
                  <Paper sx={{ padding: '10px' }}>
                    {/* <Typography>
                            Mã yêu cầu chi tiết: {req.requestDetailId}
                          </Typography> */}
                    <Typography>
                      {req.itemDesc}
                    </Typography>
                    <Typography>
                      Số lượng:
                      {req.itemAmount}
                    </Typography>
                    <Typography>Giá tiền: {req.itemPrice} VNĐ</Typography>
                    <Typography>Đơn vị: {req.itemUnit}</Typography>
                  </Paper>
                </Grid>
              ))
            ) : (
              <div>Không có dữ liệu!!</div>
            )}

          </Grid>
        </Grid>
      ) : (
        <div>Không có dữ liệu của yêu cầu!!</div>
      )}
    </Paper>
  );
}

export default RequestDetailPage;
