import { Divider, Typography, Box, TextField, Grid, Button } from '@mui/material';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';
import {Link} from 'react-router-dom';
// import * as image from '../../assets/images'
import image1 from '../../assets/images/background.jpg';
import image2 from '../../assets/images/background.jpg';
import image3 from '../../assets/images/background.jpg';

const itemData = [
    {
      img: image1,
      title: 'Toàn nhà văn phòng 1',
    },
    {
      img: image2,
      title: 'Toàn nhà văn phòng 2',
    },
    {
      img: image3,
      title: 'Toàn nhà văn phòng 3',
    },
  ];
const EditServicePage = (props) => {
    return <div>

        <Typography variant="h6" color="#DD8501" sx={{ marginTop: "20px", marginBottom: "20px", marginLeft: "30px" }}>
            CHỈNH SỬA DỊCH VỤ
        </Typography>
        <Divider></Divider>
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Box sx={{ paddingLeft: "10px", paddingTop: "10px", width: "40%", marginBottom: "30px" }}>
                <Typography variant="body1" color="#DD8501" fontWeight="bold">Thông tin dịch vụ</Typography>
                <Divider sx={{ bgcolor: "#DD8501" }}></Divider>
                <Box sx={{ width: "100%", height: "20px" }}></Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ImageList sx={{ width: "100%"}} cols={3} rowHeight={164}>
                            {itemData.map((item) => (
                                <ImageListItem key={item.img}>
                                    <img
                                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{width: 164, height: 164}} display="flex" justifyContent="center" alignItems="center">
                        <IconButton aria-label="add" sx={{ alignSelf: "center", backgroundColor: "#DD8501" }} component={Link} to={('/createProject')}>
              <Add sx={{ color: "white" }}></Add>
            </IconButton>
                            </Box>            
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Tên dự án</Typography>
                        <TextField id="project-name" value="Tòa nhà văn phòng" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Thể loại</Typography>
                        <TextField id="project-name" value="Thiết kế nhà đẹp" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Quy mô</Typography>
                        <TextField id="project-name" value="Trệt + 3 lầu" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Vị trí</Typography>
                        <TextField id="project-name" value="Dĩ An, Bình Dương" variant="outlined" sx={{ width: "100%" }} />
                    </Grid>


                    <Grid item xs={12}>
                        <Box sx={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex"
                        }}>
                            <Button variant="contained"
                                style={{
                                    backgroundColor: "#DD8501", borderRadius: 50, width: "200px",
                                    alignSelf: "center"
                                }}>Lưu</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </div>;
};

export default EditServicePage;