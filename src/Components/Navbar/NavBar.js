import React, { useState } from 'react';
// import '../Navbar/';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  CssBaseline,
  Drawer,
  Typography,
} from '@material-ui/core';
import {
  Apps,
  Menu,
  ContactMail,
  AssignmentInd,
  Home,
} from '@material-ui/icons';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: 250,
    background: '#511',
    height: '100%',
    color: 'red',
  },
  avatar: {
    margin: '0.5rem auto',
    padding: '1rem',
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  listItem: {
    color: 'black',
  },
}));

const listItems = [
  // {
  //   listIcon: <Home />,
  //   path: '/',
  //   listText: 'Trang chủ',
  // },
  {
    listIcon: <AssignmentInd />,
    path: '/project',
    listText: 'Dự án',
  },
  {
    listIcon: <AssignmentIndIcon />,
    path: '/projectByManager',
    listText: 'Dự án của tôi',
  },
  {
    listIcon: <Apps />,
    path: '/product',
    listText: 'Sản phẩm',
  },
  {
    listIcon: <ContactMail />,
    path: '/personnel',
    listText: 'Thành viên',
  },
  {
    listIcon: <ChatIcon />,
    path: '/chat',
    listText: 'Tin nhắn',
  },
  {
    listIcon: <LogoutIcon />,
    path: '/',
    listText: 'Đăng xuất',
  },
];

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

  const toggleSlider = () => {
    setOpen(!open);
  };

  const sideList = () => (
    <Box
      className={classes.menuSliderContainer}
      component="div"
      style={{ backgroundColor: '#f4d9b0' }}
    >
      <Avatar
        className={classes.avatar}
        src="https://i.ibb.co/rx5DFbs/avatar.png"
        alt="Juaneme8"
      />
      <Divider />
      <List>
        {listItems.map((listItem, index) =>
          userInfor.authorID === '54' ? (
            <NavLink to={listItem.path} key={index} style={{ textDecoration: 'none' }}>
              <ListItem className={classes.listItem} button key={index}>
                <ListItemIcon className={classes.listItem}>
                  {listItem.listIcon}
                </ListItemIcon>
                <ListItemText primary={listItem.listText} />
              </ListItem>
            </NavLink>
          ) : userInfor.authorID === '44' && (index <= 2 || index >= 5) ? (
            <NavLink to={listItem.path} key={index} style={{ textDecoration: 'none' }}>
              <ListItem className={classes.listItem} button key={index}>
                <ListItemIcon className={classes.listItem}>
                  {listItem.listIcon}
                </ListItemIcon>
                <ListItemText primary={listItem.listText} />
              </ListItem>
            </NavLink>
          ) : userInfor.authorID === '24' &&
            (index <= 1 || index >= 5 || index === 3) ? (
            <NavLink to={listItem.path} key={index} style={{ textDecoration: 'none' }}>
              <ListItem className={classes.listItem} button key={index}>
                <ListItemIcon className={classes.listItem}>
                  {listItem.listIcon}
                </ListItemIcon>
                <ListItemText primary={listItem.listText} />
              </ListItem>
            </NavLink>
          ) : null
        )}
      </List>
    </Box>
  );
  return (
    <>
      <CssBaseline />
      <Box component="nav">
        <AppBar
          position="static"
          style={{ backgroundColor: '#dd8500', color: 'black' }}
        >
          <Toolbar>
            <IconButton onClick={toggleSlider}>
              <Menu style={{color: 'white'}}/>
            </IconButton>
            <Typography variant="h6" style={{color: 'white'}}>Golden Trust</Typography>
            <Drawer open={open} anchor="left" onClose={toggleSlider}>
              {sideList()}
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
