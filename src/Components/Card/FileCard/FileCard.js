import React from 'react';
import {
  Card,
  CardActions,
  CardMedia,
  IconButton,
  CardContent,
  Typography,
  Paper,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import docIcon from '../../../assets/images/Docs-icon.png';
import excelIcon from '../../../assets/images/Sheet-icon.png';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import '../styles.css';
const options = ['Delete'];
const ITEM_HEIGHT = 48;
export const FileCard = (file, fileName) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Paper elevation={8}>
      <Card>
        {/* {
                file.name.includes('.doc') ? icon = docIcon : icon = excelIcon
            } */}
        <CardMedia
          component="img"
          src={file.name.includes('.doc') ? docIcon : excelIcon}
          sx={{ objectFit: 'contain', padding: '32px' }}
        />
        <CardContent>
          <Typography variant="h6">{file.name}</Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={() => window.open(file.link)}>
            <DownloadIcon />
          </IconButton>
          {window.location.pathname.includes('projectDetails') ?
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            : null
          }
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >

            {options.map((option) => (
              <MenuItem
                key={option}
                onClick={handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default FileCard;
