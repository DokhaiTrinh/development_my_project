import {
  Divider,
  Typography,
  Box,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

const DialogManagerList = (props) => {
  const { managerListDetail, setManagerListDetail, allManager } = props;

  const [checked, setChecked] = React.useState(managerListDetail);

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
  const handleSaveListManager = () => {
    setManagerListDetail(checked);
    props.handleCloseManagerListDialog();
  };

  // const handleCheckExisted = (managerID) => {
  //   for (let index = 0; index < managerListDetail.length; index++) {
  //     const element = managerListDetail[index];
  //     if (element === managerID) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  return (
    <Box className="dialog">
      <Typography variant="h6" color="#DD8501">
        DANH SÁCH KỸ SƯ
      </Typography>
      <Divider></Divider>
      <List
        dense
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
      ></List>
      {allManager ? (
        allManager.length > 0 ? (
          allManager.map((manager) => (
            <ListItem
              key={manager.userId}
              secondaryAction={
                managerListDetail.length > 0 ? (
                  <Checkbox
                    onChange={handleToggle(manager.userId)}
                    checked={checked.indexOf(manager.userId) !== -1}
                  />
                ) : (
                  <Checkbox
                    onChange={handleToggle(manager.userId)}
                    checked={checked.indexOf(manager.userId) !== -1}
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
                <ListItemText primary={`${manager.username}`} />
              </ListItemButton>
            </ListItem>
          ))
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
            className="submitButton"
            onClick={handleSaveListManager}
          >
            Lưu
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default DialogManagerList;
