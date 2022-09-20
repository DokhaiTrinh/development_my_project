import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
// import { BrowserRouter as Router } from 'react-router-dom';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
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
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, makeStyles } from '@material-ui/core';
const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: 250,
    background: '#511',
    height: '100%',
    color: 'red',
  },
  avatar: {
    // margin: '0.5rem auto',
    padding: '1rem',
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  // listItem: {
  //   color: 'black',
  // },
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  // padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));
// var id = userInfor.id;
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
    listIcon: <PersonIcon />,
    // path: `/userProfile/${userInfor.id}`,
    path: '#',
    // path: '#',
    listText: 'Hồ sơ',
  },
  {
    listIcon: <LogoutIcon />,
    path: '/',
    listText: 'Đăng xuất',
  },
];

const HomeLayoutRoute = (props) => {
  const { component: YourComponent, ...remainsprops } = props;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Route
      {...remainsprops}
      render={(routeProps) => {
        if (!localStorage.getItem('USERINFOR')) {
          return (
            <Redirect
              to={{ pathname: '/', state: { from: routeProps.location } }}
            />
          );
        }
        return (
          <div>
            {/* <NavBar /> */}
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <AppBar
                position="fixed"
                open={open}
                style={{
                  backgroundColor: '#dd8500',
                  color: 'black',
                  boxShadow: 'none',
                }}
              >
                <Toolbar>
                  <IconButton
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                      marginRight: 5,
                      ...(open && { display: 'none' }),
                    }}
                  >
                    <MenuIcon style={{ color: 'white' }} />
                  </IconButton>
                  <Typography variant="h4">Golden Trust</Typography>
                </Toolbar>
              </AppBar>
              <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                  {userInfor.avatarLink ? (
                    <Avatar
                      className={classes.avatar}
                      src={userInfor.avatarLink}
                    />
                  ) : (
                    <Avatar
                      className={classes.avatar}
                      src="https://i.ibb.co/rx5DFbs/avatar.png"
                      alt="Juaneme8"
                    />
                  )}
                  {/* <Avatar
                    className={classes.avatar}
                    src="https://i.ibb.co/rx5DFbs/avatar.png"
                    alt="Juaneme8"
                  /> */}
                  <Route>
                    <Typography
                      variant="h6"
                      style={{ marginRight: '35px', marginLeft: '8px' }}
                    >
                      {userInfor.fullName}
                    </Typography>
                  </Route>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? (
                      <ChevronRightIcon />
                    ) : (
                      <ChevronLeftIcon />
                    )}
                  </IconButton>
                </DrawerHeader>

                <Divider />

                <List>
                  {listItems.map((listItem, index) =>
                    userInfor.authorID === '54' &&
                    (index <= 0 || index >= 2) ? (
                      <NavLink
                        to={listItem.path}
                        key={index}
                        style={{ textDecoration: 'none' }}
                      >
                        <ListItem
                          className={classes.listItem}
                          button
                          key={index}
                        >
                          <ListItemIcon className={classes.listItem}>
                            {listItem.listIcon}
                          </ListItemIcon>
                          <ListItemText
                            primary={listItem.listText}
                            style={{ color: 'black' }}
                          />
                        </ListItem>
                      </NavLink>
                    ) : userInfor.authorID === '44' &&
                      (index <= 1 || index >= 4) ? (
                      <NavLink
                        to={listItem.path}
                        key={index}
                        style={{ textDecoration: 'none' }}
                      >
                        <ListItem
                          className={classes.listItem}
                          button
                          key={index}
                        >
                          <ListItemIcon className={classes.listItem}>
                            {listItem.listIcon}
                          </ListItemIcon>
                          <ListItemText primary={listItem.listText} />
                        </ListItem>
                      </NavLink>
                    ) : userInfor.authorID === '24' &&
                      (index <= 1 || index >= 4 || index === 3) ? (
                      <NavLink
                        to={listItem.path}
                        key={index}
                        style={{ textDecoration: 'none' }}
                      >
                        <ListItem
                          className={classes.listItem}
                          button
                          key={index}
                        >
                          <ListItemIcon className={classes.listItem}>
                            {listItem.listIcon}
                          </ListItemIcon>
                          <ListItemText primary={listItem.listText} />
                        </ListItem>
                      </NavLink>
                    ) : null
                  )}
                </List>
                {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
              </Drawer>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Typography paragraph>
                  <div>
                    <YourComponent {...routeProps} />
                  </div>
                </Typography>
              </Box>
            </Box>
          </div>
        );
      }}
    />
  );
};
export default HomeLayoutRoute;
