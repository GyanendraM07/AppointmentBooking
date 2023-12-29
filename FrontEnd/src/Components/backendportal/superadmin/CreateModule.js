import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import EnhancedTable from './Table';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import DynamicCheckboxList from './DynamicCheckboxList';
import { store } from '../../redux/store';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SnackbarComponent from '../../SnackbarComponent';
import AdminDialogbox from '../../dialogs/AdminDialogbox';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getSequenceNumber, createMenuFunction, getSubMenuSequenceNumber, createSubMenuFunction } from '../../../api/Apicall';

function TabPanel(props) {
    const { children, value, index, handleClick, ...other } = props;
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ headerName: '', routeModuleName: '', description: '', sequence: '0', isActive: '', menuIndicator: '' });
    const [validationErrors, setValidationErrors] = useState({ headerName: false, routeModuleName: false, description: false, sequence: false, menuIndicator: false, isActive: false }); // used for createUser Validation
    const [submenuFormData, setSubmenuFormData] = useState({ headerName: '', routeModuleName: '', description: '', sequence: '0', isActive: '', menuId: '' });
    const [submenuvalidationErrors, setSubmenuValidationErrors] = useState({ headerName: false, routeModuleName: false, description: false, sequence: false, menuId: false, isActive: false }); // used for createUser Validation
    const [severty, setSeverty] = useState(''); //this state is used to the severty or type of Alert box not snackbar for simple ALert 
    const [showAlert, setShowAlert] = useState(false);// used to show Alert Box 
    const [showdialog, setShowialog] = useState(false); // used to SHow  and close dialoge for Edit User 
    const [edituserdata, setEdituserData] = React.useState({}); // used to set  the data to show in the editUser Dialoge box 
    const [alertmsg, setAlertmsg] = useState(''); // used to set the msg for the Alert Box 
    const selectedCompanyId = useSelector((state) => state.selectedCompanyId);//taking the Selected Company Id from the redux 
    // const companyList = useSelector((state) => state.companyList);// taking companyList form Redux Store 
    // const selectedCompany = companyList.companyList.find(company => company._id === selectedCompanyId); // taking the full company Data of the Seletced company
    const selectedCompany = useSelector((state) => state.companyList)?.companyList.find(company => company._id === selectedCompanyId);
    const menuListforSubMenu = selectedCompany && selectedCompany.menuFunctionList !== undefined ? selectedCompany.menuFunctionList : [];// roleList based on Selected Company 
    const filteredMenuList = menuListforSubMenu.filter(menu => menu.menuIndicator === 2);

    const saveEditedUser = () => {

    }
    const dialogClose = () => {

    }

    useEffect(() => {
        console.log("useEffect Called First ");
        getMenuSequence();
    }, [selectedCompanyId]);

    const getMenuSequence = async () => {
        if (selectedCompanyId) {
            const token = sessionStorage.getItem('token');
            const resp = await getSequenceNumber(selectedCompanyId, token);
            setFormData((prevData) => ({
                ...prevData,
                sequence: resp.sequenceNo,
            }));
        } else {
            setAlertmsg('Please select a company before Creating Module . !!!');
            setSeverty('info');
            setShowAlert(true);
            return; // Do not proceed with submission
        }
    }

    const menuChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const submenuChange = (field, value) => {
        setSubmenuFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const createFunction = async () => {
        // Print all the form data
        console.log("Form Data:", formData);
        const newValidationErrors = {};
        let isValid = true;
        Object.keys(formData).forEach((field) => {
            if (formData[field] === '' || formData[field] === undefined) {
                newValidationErrors[field] = true;
                isValid = false;
            } else {
                newValidationErrors[field] = false;
            }
        });
        setValidationErrors(newValidationErrors);
        if (!selectedCompanyId) {
            setAlertmsg('Please select a company before submitting. !!!');
            setSeverty('info');
            setShowAlert(true);
            return; // Do not proceed with submission
        }
        if (isValid) {
            try {
                const modifiedFormData = { ...formData };
                modifiedFormData.companyId = selectedCompanyId;
                modifiedFormData.createdBy = store.getState().user.user.userId;
                const token = sessionStorage.getItem('token');
                const resp = await createMenuFunction(modifiedFormData, token);
                if (resp.status) {
                    handleClick(resp.message, 'success');
                    resetForm();
                    dispatch({ type: 'SET_COMPANY_LIST', payload: { companyList: resp.companyList } });
                    setFormData((prevData) => ({
                        ...prevData,
                        sequence: resp.sequenceNo,
                    }));
                } else {
                    handleClick(resp.message, 'error');
                    console.error('Error creating user:', resp.error);
                }
            }
            catch (error) {
                handleClick(error.errormessage, 'error');
                console.error('Error creating user:', error.errormessage);
            }

        } else {
            setAlertmsg('Form is invalid. Please fill in all required fields.');
            setSeverty('info');
            setShowAlert(true);
        }
    };

    const createSubFunction = async () => {
        const newValidationErrors = {};
        let isValid = true;
        Object.keys(submenuFormData).forEach((field) => {
            if (submenuFormData[field] === '' || submenuFormData[field] === undefined) {
                newValidationErrors[field] = true;
                isValid = false;
            } else {
                newValidationErrors[field] = false;
            }
        });
        setSubmenuValidationErrors(newValidationErrors);
        if (!selectedCompanyId) {
            setAlertmsg('Please select a company before submitting. !!!');
            setSeverty('info');
            setShowAlert(true);
            return; // Do not proceed with submission
        }
        if (isValid) {
            try {
                const modifiedFormData = { ...submenuFormData };
                modifiedFormData.companyId = selectedCompanyId;
                modifiedFormData.createdBy = store.getState().user.user.userId;
                const token = sessionStorage.getItem('token');
                const resp = await createSubMenuFunction(modifiedFormData, token);
                if (resp.status) {
                    handleClick(resp.message, 'success');
                    resetSubMenuForm();
                    dispatch({ type: 'SET_COMPANY_LIST', payload: { companyList: resp.companyList } });
                    setSubmenuFormData((prevData) => ({
                        ...prevData,
                        sequence: resp.subSequenceNo,
                    }));
                } else {
                    handleClick(resp.message, 'error');
                    console.error('Error creating user:', resp.error);
                }
            }
            catch (error) {
                handleClick(error.errormessage, 'error');
                console.error('Error creating user:', error.errormessage);
            }

        } else {
            setAlertmsg('Form is invalid. Please fill in all required fields.');
            setSeverty('info');
            setShowAlert(true);
        }
    };
    const resetForm = () => {
        setFormData({ headerName: '', routeModuleName: '', description: '', sequence: '', isActive: '', menuIndicator: '' });
    };
    const resetSubMenuForm = () => {
        setSubmenuFormData({ headerName: '', routeModuleName: '', description: '', sequence: '', isActive: '', menuIndicator: '', menuId: '' });
    };
    const selectMenuModule = async (menuId) => {

        const token = sessionStorage.getItem('token');
        if (selectedCompanyId) {
            const resp = await getSubMenuSequenceNumber(menuId, selectedCompanyId, token);
            setSubmenuFormData((prevData) => ({
                ...prevData,
                menuId: menuId,
                sequence: resp.subSequenceNo,
            }));
        } else {
            setAlertmsg('Please select a company before Selecting Module . !!!');
            setSeverty('info');
            setShowAlert(true);
            return; // Do not proceed with submission
        }
    };

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
            sx={{ width: '950px' }}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {/* Content for the first tab (index 0) */}
                    {showAlert && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity={severty}
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setShowAlert(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                {alertmsg}
                            </Alert>
                        </Stack>
                    )}
                    {index === 0 && (
                        <>
                            {showdialog && (
                                <AdminDialogbox initialRows={edituserdata} saveEditedUser={saveEditedUser} dialogClose={dialogClose} title='Edit User' />
                            )}
                            {/* <EnhancedTable headCells={headCells} rows={tableData} onEditClick={onEditClick} onDeleteClick={onDeleteClick} /> */}
                        </>
                    )}

                    {/* Content for the second tab (index 1) */}
                    {index === 1 && (
                        <Grid container spacing={2} sx={{ maxWidth: 600, margin: 'auto' }}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="standard-basic-1" label="HeaderName" variant="standard" onChange={(e) => menuChange('headerName', e.target.value)} required error={validationErrors.headerName} value={formData.headerName} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="standard-basic-2" label="RouterName" variant="standard" onChange={(e) => menuChange('routeModuleName', e.target.value)} required error={validationErrors.routeModuleName} value={formData.routeModuleName} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="standard-basic-1" label="Description" variant="standard" onChange={(e) => menuChange('description', e.target.value)} required error={validationErrors.description} value={formData.description} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="standard-basic-2" label="Sequence" variant="standard" value={formData.sequence} required error={validationErrors.sequence}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Select Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={formData.isActive}
                                        onChange={(e) => menuChange('isActive', e.target.value)}
                                        label="Select Status"
                                        required error={validationErrors.isActive}
                                    >
                                        <MenuItem value={1}>True</MenuItem>
                                        <MenuItem value={0}>False</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Module Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={formData.menuIndicator}
                                        onChange={(e) => menuChange('menuIndicator', e.target.value)}
                                        label="Module Type"
                                        required error={validationErrors.menuIndicator}
                                    >
                                        <MenuItem value={1}>Only Menu</MenuItem>
                                        <MenuItem value={2}>Sub Menu</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" color="primary" onClick={createFunction}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>

                    )}
                    {index === 2 && (
                        <Grid container spacing={2} sx={{ maxWidth: 600, margin: 'auto' }}>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <FormControl variant="outlined" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Select MenuItem</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={submenuFormData.menuId}
                                        onChange={(e) => selectMenuModule(e.target.value)}
                                        label="Select MenuItem"
                                    >
                                        {filteredMenuList.map((menu) => (
                                            <MenuItem key={menu._id} value={menu._id}>
                                                {menu.headerName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="standard-basic-1" label="HeaderName" variant="standard" onChange={(e) => submenuChange('headerName', e.target.value)} required error={submenuvalidationErrors.headerName} value={submenuFormData.headerName} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="standard-basic-2" label="RouterName" variant="standard" onChange={(e) => submenuChange('routeModuleName', e.target.value)} required error={submenuvalidationErrors.routeModuleName} value={submenuFormData.routeModuleName} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="standard-basic-1" label="Description" variant="standard" onChange={(e) => submenuChange('description', e.target.value)} required error={submenuvalidationErrors.description} value={submenuFormData.description} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="standard-basic-2" label="Sequence" variant="standard" value={submenuFormData.sequence} required error={submenuvalidationErrors.sequence}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Select Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={submenuFormData.isActive}
                                        onChange={(e) => submenuChange('isActive', e.target.value)}
                                        label="Select Status"
                                        required error={submenuvalidationErrors.isActive}
                                    >
                                        <MenuItem value={1}>True</MenuItem>
                                        <MenuItem value={0}>False</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" color="primary" onClick={createSubFunction}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                    {children}
                </Box>
            )}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `action-tab-${index}`,
        'aria-controls': `action-tabpanel-${index}`,
    };
}

const FloatingActionButtonZoom = ({ handleClick }) => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };
    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                width: '100%', // Set width to '100%' for full width
                position: 'relative',
                minHeight: 600,
                mt: 10,
            }}
        >
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="action tabs example"
                >
                    <Tab label="Module List" {...a11yProps(0)} sx={{ whiteSpace: 'nowrap' }} />
                    <Tab label="Create Menu " {...a11yProps(1)} sx={{ whiteSpace: 'nowrap' }} />
                    <Tab label="Create Sub Menu" {...a11yProps(2)} sx={{ whiteSpace: 'nowrap' }} />
                    {/* Add more tabs as needed */}
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction} handleClick={handleClick}>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction} handleClick={handleClick}>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction} handleClick={handleClick}>
                </TabPanel>
                {/* Add more TabPanel components as needed */}
            </SwipeableViews>
        </Box>
    );
};


const CreateModule = () => {
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [saverty, setSaverty] = React.useState('');
    const [snackbarKey, setSnackbarKey] = React.useState(0);

    const handleClick = (message, type) => {
        setOpen(true);
        setMsg(message);
        setSaverty(type);
        setSnackbarKey((prevKey) => prevKey + 1);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#add8e6',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        fontSize: '25px'
    }));
    useEffect(() => {
        console.log("useEffect Called ");
        console.trace(); // Print stack trace
    }, []);

    return (
        <>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '26cm', position: 'fixed', zIndex: 1000 }}>
                    <Stack spacing={2}>
                        <Item>Channel Config</Item>
                    </Stack>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <div>
                    <div>
                        <div>
                            <SnackbarComponent
                                open={open}
                                handleClose={handleClose}
                                severity={saverty}
                                message={msg}
                                autoHideDuration={2000}
                            />
                        </div>
                        {/* FloatingActionButtonZoom  is Responsible for the Tabs  */}
                        <FloatingActionButtonZoom handleClick={handleClick} />
                    </div>
                </div>
            </Grid>
        </>
    );
};

export default CreateModule;