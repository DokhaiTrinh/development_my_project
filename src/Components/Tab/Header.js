import React from 'react';
import { Paper, Stack } from '@mui/material';
import SearchField from '../TextField/SearchField';
import AddButton from '../Button/Add/AddButton';
const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

export const Header = (path) => {
  const url = path.toString();
  return (
    <Paper sx={{ width: '100%', mb: 2, padding: '32px', boxShadow: 'none' }}>
      {console.log(path.toString())}
      <Stack direction="row" justifyContent="space-between">
        {((userInfor.authorID === '54' || userInfor.authorID === '24' || (userInfor.authorID === '44' && url.toString().includes('Manager'))) && url !== '') 
          ? AddButton(url)
          : null}
        <SearchField />
      </Stack>
    </Paper>
  );
};

export default Header;
