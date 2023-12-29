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
import { useLocation } from 'react-router-dom';
import { iconMapping, pageComponents } from '../DynamicMenuConfig';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';


const drawerWidth = 240;// Responsible  for the width of the Side nav 

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

export default function AdminDashBoard() {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [profilemenu, setProfilemenu] = useState(null);
    const openprofile = Boolean(profilemenu);
    const [open, setOpen] = useState(false);
    const selectedModule = useSelector((state) => state.selectedModule); // Selected Module 
    //const [selectedPage, setSelectedPage] = useState('welcomeAdmin');//state to render main content component
    const selectedCompanyId = useSelector((state) => state.selectedCompanyId);//selectedCompany From Redux Store 
    const funConfigList = location.state?.moduleList || [];
    //const funConfigList = userData?.user?.funConfigList || [];
    //const selectedBranchId = useSelector((state) => state.selectedBranchId);//selectedBranch From Redux Store 
    const [companyId, setCompanyId] = useState(selectedCompanyId || '');
    //const [branchId, setBranchId] = useState(selectedBranchId || '');
    const companyList = useSelector((state) => state.companyList);
    const selectedCompany = companyList.companyList.find(company => company._id === selectedCompanyId); // taking the full company Data of the Seletced company
    //const filterDeptList = selectedCompany && selectedCompany.departmentList !== undefined ? selectedCompany.departmentList : [];// roleList based on Selected Company 
    //const filterBranchList = selectedCompany && selectedCompany.branchList !== undefined ? selectedCompany.branchList : [];// branList based on Selected Company 
    const [subMenuOpen, setSubMenuOpen] = useState({});


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const cmpList = companyList.companyList.map(company => ({// compnany DropDown 
        id: company._id, // Assuming '_id' is the desired id property
        name: company.name
    }));

    const companyChange = (event) => {
        const selectedCompID = event.target.value;
        setCompanyId(selectedCompID);
        dispatch({ type: 'SET_SELECTED_COMPANY', payload: selectedCompID });
    };

    // const branchList = filterBranchList.map(branch => ({
    //     id: branch._id, // Assuming '_id' is the desired id property
    //     name: branch.name
    // }));

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


   
 
    // const renderFunctionMenuItem = (funConfig) => (
    //     <ListItem key={funConfig.headerName} disablePadding sx={{ display: 'block' }}>
    //         <ListItemButton
    //             sx={{
    //                 minHeight: 48,
    //                 justifyContent: open ? 'initial' : 'center',
    //                 px: 2.5,
    //             }}
    //             onClick={() => openClickedModule(funConfig.routeModuleName)}
    //         >
    //             <ListItemIcon
    //                 sx={{
    //                     minWidth: 0,
    //                     mr: open ? 3 : 'auto',
    //                     justifyContent: 'center',
    //                 }}
    //             >
    //                 {iconMapping[funConfig.routeModuleName]}
    //             </ListItemIcon>
    //             <ListItemText primary={funConfig.headerName} sx={{ opacity: open ? 1 : 0 }} />
    //         </ListItemButton>
    //     </ListItem>
    // );

    const openClickedModule = (text) => {
        dispatch({ type: 'SET_SELECTED_MODULE', payload: text });
    };
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
    const DynamicComponent = pageComponents[selectedModule || 'welcomeAdmin'];//used To set dynamic Compnnets name of  clicked menu item
    const handleSubMenuToggle = (index) => {
        setSubMenuOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* // change the bg of header */}
            <AppBar position="fixed" open={open} sx={{ backgroundColor: '#FFFFFF' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"

                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                            backgroundColor: 'blue'
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" >
                        <FormControl sx={{ m: 1, minWidth: '8cm' }}>
                            <InputLabel id="demo-simple-select-label">Select Company</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={companyId || ''} // replace with the actual value
                                label="Select Company"
                                size="small"
                                onChange={companyChange}
                            >
                                {cmpList.map((company) => (
                                    <MenuItem key={company.id} value={company.id}>
                                        {company.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* <FormControl sx={{ m: 1, minWidth: '8cm' }}>
                            <InputLabel id="demo-simple-select-label">Select Branch</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={branchId || ''} // replace with the actual value
                                label="Select Branch"
                                size="small"
                                onChange={branchChange}
                            >
                                {branchList.map((branch) => (
                                    <MenuItem key={branch.id} value={branch.id}>
                                        {branch.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}
                    </Typography>
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
            <Box component="main" sx={{ flexGrow: 1, mt: 11, mr: 2, }}>
                <DynamicComponent />
            </Box>
        </Box>
    );
}
