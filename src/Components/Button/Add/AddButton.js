import React from 'react';
import { Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';

export default function AddButton(url) {
  const history = useHistory();

  return (
    <Button variant='contained'
      sx={{
        minWidth: 0, minHeight: 0, paddingLeft: 0, paddingTop: 0, paddingBottom: 0,
        backgroundColor: '#F5F5F5', color: 'black',
        "&.MuiButtonBase-root:hover": {
          bgcolor: "transparent"
        },
        "&.MuiButton-root": {
          background: '#FAFAFA'
        }
      }}
      startIcon={
        <Box sx={{
          bgcolor: '#F1F1F1', padding: 2, borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px',
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <AddIcon sx={{ color: 'black', strokeWidth: 1 }} />
        </Box>
      }
      onClick={() => {
        history.push(url);
      }}
    >Tạo mới</Button>
  )
}
