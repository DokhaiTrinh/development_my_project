import React from 'react';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link, useParams } from 'react-router-dom';
import { getBlueprintByProjectIdApi } from '../../../apis/Blueprint/getBlueprintByProjectId';
import RenderImage from '../../../Components/Render/RenderImage';

const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

export const Blueprint = (props) => {
  const { id } = useParams();
  console.log(id);
  const [blueprintDetail, setBlueprintDetail] = React.useState({});
  const [filesImage, setFilesImage] = React.useState([]);
  const [imageGet, setImageGet] = React.useState([]);
  const [selectedImages, setSelectedImage] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const listAllBlueprint = await getBlueprintByProjectIdApi(
          id,
          'BY_PROJECT_ID'
        );
        setBlueprintDetail(listAllBlueprint.data);
        if (listAllBlueprint.data.file) {
          let arrayLinkImg = [];
          arrayLinkImg.push(listAllBlueprint.data.file.fileLink);
          setImageGet(arrayLinkImg);
        }
      } catch (error) {
        console.log('Không thể lấy dữ liệu của bản vẽ!');
      }
    })();
  }, []);
  console.log(blueprintDetail);
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

  return (
        <Paper
          sx={{ width: '100%', mp: 2, padding: '32px' }}
          variant="elevation"
        >
          <Typography variant="h6">Thông tin bản vẽ</Typography>
          <Divider sx={{ marginBottom: '20px' }}></Divider>
          <Grid container rowSpacing={{ xs: 5 }}>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Tên bản vẽ
              </Typography>
              <Typography variant="body1">
                {blueprintDetail.blueprintName}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Người thiết kế
              </Typography>
              <Typography variant="body1">
                {blueprintDetail.designerName}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">
                Giá bản vẽ
              </Typography>
              <Typography variant="body1">
                {blueprintDetail.estimatedCost}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <Typography variant="body1" color="gray">Hình ảnh</Typography>
              <div className="label-holder">
                <label htmlFor="file" className="img-upload"></label>
              </div>
              <div className="result">{RenderImage(imageGet)}</div>
            </Grid>
          </Grid>
        </Paper>
  );
};

export default Blueprint;
