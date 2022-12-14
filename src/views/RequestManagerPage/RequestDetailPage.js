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
        console.log('Kh??ng th??? l???y d??? li???u c???a y??u c???u!');
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
            Th??ng tin chung
          </Typography>
          <Divider sx={{ marginBottom: '20px' }}></Divider>
          {allRequestList ? (
            <Grid container spacing={2}>
              {/* <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  M?? d??? ??n
                </Typography>
                <Typography variant="body1">
                  {allRequestList.projectId}
                </Typography>
              </Grid> */}
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  T??n y??u c???u
                </Typography>
                <Typography variant="body1">
                  {allRequestList.requestName}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  M?? y??u c???u
                </Typography>
                <Typography variant="body1">
                  {allRequestList.requestId}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Th??ng tin y??u c???u
                </Typography>
                <Typography variant="body1">
                  {/* {handleGetDate(allRequestList.reportDate)} */}
                  {allRequestList.requestDesc}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Ki???u y??u c???u
                </Typography>
                <Typography variant="body1">
                  {allRequestList.requestType ? (
                    allRequestList.requestType.requestTypeName
                  ) : (
                    <div>Ch??a c?? d??? li???u !!</div>
                  )}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Ng?????i y??u c???u
                </Typography>
                <Typography variant="body1" paragraph>
                  {allRequestList.requester.username}
                </Typography>
              </Grid>
              <Grid item xs="4">
                <Typography variant="body1" color="gray">
                  Ng??y y??u c???u
                </Typography>
                <Typography variant="body1" paragraph>
                  {allRequestList.requestDate}
                </Typography>
              </Grid>
              <Grid item container xs="4">
                <Typography variant="body1" color="gray">
                  Chi ti???t y??u c???u
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
                            M?? y??u c???u chi ti???t: {req.requestDetailId}
                          </Typography> */}
                          <Typography>
                            Th??ng tin y??u c???u chi ti???t: {req.itemDesc}
                          </Typography>
                          <Typography>
                            S??? l?????ng:
                            {req.itemAmount}
                          </Typography>
                          <Typography>Gi?? ti???n: {req.itemPrice} VN??</Typography>
                          <Typography>????n v???: {req.itemUnit}</Typography>
                        </Card>
                      ))
                    ) : (
                      <div>Kh??ng c?? d??? li???u!!</div>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid container item xs="12">
                {/* <Grid item xs="4">
                  <Typography variant="body1" color="gray">
                    H??nh ???nh
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
                  T??i li???u
                </Typography>
                {docGet.length > 0 ? (
                  docGet.map((item, index) => (
                    <>
                      <a href={item}>T???i xu???ng</a>
                    </>
                  ))
                ) : (
                  // <div>Kh??ng c?? t???p ??i k??m!!</div>
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
            <div>Kh??ng c?? d??? li???u c???a y??u c???u!!</div>
          )}
        </Paper>
      </Box>
    </div>
  );
}

export default RequestDetailPage;
