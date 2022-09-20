import {
  Divider,
  Typography,
  Box,
  Grid,
  Button,
} from '@mui/material';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';

export const DialogWorkerList = (props) => {
  const { allWorker, workerListDetail, setWorkerListDetail } = props;

  const [checked, setChecked] = React.useState(workerListDetail);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleSaveListWorker = () => {
    setWorkerListDetail(checked);
    props.handleCloseWorkerDialog();
  };
  return (
    <Box className='dialog'>
      <Typography
        variant="h6"
        color="#DD8501"
      >
        DANH SÁCH CÔNG NHÂN
      </Typography>
      <Divider></Divider>
      <Typography variant="body1" color="#DD8501" fontWeight="bold">
        Thông tin công nhân
      </Typography>
      <Divider sx={{ bgcolor: '#DD8501' }}></Divider>
      <List
        dense
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
      ></List>
      {allWorker ? (
        allWorker.length > 0 ? (
          allWorker.map((worker) =>
            worker.isAvailable ? (
              <ListItem
                key={worker.workerId}
                secondaryAction={
                  workerListDetail.length > 0 ? (
                    <Checkbox
                      onChange={handleToggle(worker.workerId)}
                      checked={checked.indexOf(worker.workerId) !== -1}
                    />
                  ) : (
                    <Checkbox
                      onChange={handleToggle(worker.workerId)}
                      checked={checked.indexOf(worker.workerId) !== -1}
                    />
                  )
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    {/* <Avatar
              alt={`Avatar n°${value + 1}`}
              src={`/static/images/avatar/${value + 1}.jpg`}
            /> */}
                  </ListItemAvatar>
                  <ListItemText primary={`${worker.fullName}`} />
                </ListItemButton>
              </ListItem>
            ) : null
          )
        ) : (
          <p>Không có dữ liệu!!</p>
        )
      ) : (
        <Typography variant='h5'>Loading...</Typography>
      )}
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
            onClick={handleSaveListWorker}
          >
            Lưu
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default DialogWorkerList;
