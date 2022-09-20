import React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ImageIcon from '@mui/icons-material/Image';
import FilePresentIcon from '@mui/icons-material/FilePresent';

const actions = [
    { icon: <ImageIcon />, name: "Hình ảnh", operation: 'image' },
    { icon: <FilePresentIcon />, name: "Tệp", operation: 'file' }
];
export const FloatingAddButton = () => {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    function handleClick(e, operation) {
        e.preventDefault();
        if (operation == "image") {
            // do something 
        } else if (operation == "file") {
            //do something else
        }
        setOpen(!open);// to close the speed dial, remove this line if not needed.
    };

    return (
        <SpeedDial
            ariaLabel="SpeedDial example"
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction="up"
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={(e) => {
                        handleClick(e.action.operation)
                    }}
                />
            ))}
        </SpeedDial>
    );
}

export default FloatingAddButton