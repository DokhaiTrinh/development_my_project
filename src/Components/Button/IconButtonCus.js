import React from 'react'
import { Button } from '@mui/material';

export const IconButtonCus = (props) => {
    const {
        icon,
        onClick,
    } = props;
    return (
        <Button variant='contained' sx={{
            backgroundColor: '#F5F5F5', boxShadow: 'none', minWidth: 0, minHeight: 0, padding: 1,
            "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent"
            }
        }}
        onClick={onClick}
        >
            {icon}
        </Button>
    );
}

export default IconButtonCus;