import * as React from 'react';
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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { iconMapping, pageComponents } from '../DynamicMenuConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;

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
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  }),
);


export default function UserDashboard() {
  const theme = useTheme();
  const navigate = useNavigate(); // used to Navigate to another Page 
  const location = useLocation(); // used to get the Data passing  during login 
  const dispatch = useDispatch(); // used to dispatch the Data to the store 
  const [open, setOpen] = useState(false);  // Used for Drawer open and close 
  const selectedModule = useSelector((state) => state.selectedModule);
  const funConfigList = location.state?.moduleList || [];
  // used for the Profile
  const [profilemenu, setProfilemenu] = useState(null);
  const openprofile = Boolean(profilemenu);



  const profileClick = (event) => {
    setProfilemenu(event.currentTarget);
  };
  const profileClose = () => {
    setProfilemenu(null);
  };

  const logoutUser = (event) => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const openClickedModule = (routerName) => { // used To set and open  the clicked  module 
    dispatch({ type: 'SET_SELECTED_MODULE', payload: routerName });
  };
  const DynamicComponent = pageComponents[selectedModule || 'welcomeAdmin']; //used To set dynamic Compnnets name of  clicked menu item

  const renderFunctionMenuItem = (menuItem, index) => (// used to Rednder a side nav with menu and submenu item 
    <div key={index}>
      <ListItemButton
        onClick={() => (menuItem.menuIndicator === 2 ? handleSubMenuToggle(index) : openClickedModule(menuItem.routeModuleName))}
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
          {iconMapping[menuItem.routeModuleName]}
        </ListItemIcon>
        <ListItemText primary={menuItem.headerName} sx={{ opacity: open ? 1 : 0 }} />
        {menuItem.menuIndicator === 2 &&
          (subMenuOpen[index] ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {menuItem.menuIndicator === 2 && (
        <Collapse in={subMenuOpen[index]} timeout="auto" unmountOnExit>
          <List sx={{ paddingLeft: 2 }}>
            {menuItem.submenuList.map((subMenuItem, subIndex) => (
              <ListItem key={subIndex} disablePadding>
                <ListItemButton
                  onClick={() => openClickedModule(subMenuItem.routeModuleName)}
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
                    {iconMapping[subMenuItem.routeModuleName]}
                  </ListItemIcon>
                  <ListItemText primary={subMenuItem.headerName} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
      <Divider />
    </div>
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubMenuToggle = (index) => {
    setSubMenuOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
  };

  const [subMenuOpen, setSubMenuOpen] = React.useState({});

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ marginLeft: 'auto' }}>
            <Tooltip title="Open Setting">
              <Avatar sx={{ bgcolor: deepPurple[500] }}
                aria-controls={openprofile ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openprofile ? 'true' : undefined}
                onClick={profileClick}
              >OP</Avatar>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={profilemenu}
              open={openprofile}
              onClose={profileClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={profileClose}>Profile</MenuItem>
              <MenuItem onClick={profileClose}>My account</MenuItem>
              <MenuItem onClick={logoutUser}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {funConfigList.map((funConfig, index) => renderFunctionMenuItem(funConfig, index))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main"
        sx={{
          flexGrow: 1,
          overflowY: 'hidden', // Hide vertical scroll bar
        }}
      >
        <DynamicComponent />
      </Box>
    </Box>
  );
}
