import React from 'react'
import { Card, CardActions, CardMedia, IconButton, Paper } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
const options = ['Xóa'];
const ITEM_HEIGHT = 48;
export const ImageCard = (image) => {
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
            <Card className='card'>
                <CardMedia
                    component="img"
                    src={image}
                    className='img'
                />
                <CardActions className='cardActions'>
                    <IconButton>
                        <ZoomInIcon />

                    </IconButton>
                    {window.location.pathname.includes('projectDetails') ?
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}>
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
    )
}

export default ImageCard