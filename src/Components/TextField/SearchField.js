import React from 'react';
import { Box, IconButton, Stack, InputLabel, Paper } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function SearchField() {
    const [filter, setFilter] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
            <Paper component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, boxShadow: 'none', bgcolor: '#F5F5F5' }}>
                {/* <FormControl sx={{ width: '24px', display: 'flex', justifyContent: 'center', alignItems: 'end', ml: '6px' }}>
                    <Select
                        labelId="labelId"
                        id=""
                        value={filter}
                        label="Filter"
                        onChange={handleChange}
                        open={open}
                        onClose={handleClose}
                        // onOpen={handleOpen}
                        variant='standard'
                        disableUnderline
                    >
                        <MenuItem value={10}>Tên dự án</MenuItem>
                        <MenuItem value={20}>Mã dự án</MenuItem>
                    </Select>
                </FormControl>
                <IconButton onClick={handleOpen}>
                    <FilterAltIcon style={{ color: 'gray' }} />
                </IconButton> */}
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Tìm kiếm"
                    inputProps={{ 'aria-label': 'tìm kiếm' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
    )
}
