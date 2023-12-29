// ishq ek he jaat me ho jarrori hai kya 
// vo raazi har baat me ho jarrori hai kya 
import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
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
import { store } from '../../redux/store';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SnackbarComponent from '../../SnackbarComponent';
import AdminDialogbox from '../../dialogs/AdminDialogbox';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { createUrlApi, updatedPatientType } from '../../../api/Apicall';

function TabPanel(props) {
    const { children, value, index, handleClick, ...other } = props;
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ urlName: '', description: '', branchId: '', channelId: '', patientTypeId: '', departmentId: '', isActive: '', });
    const [validationErrors, setValidationErrors] = useState({ urlName: false, description: false, branchId: false, channelId: false, patientTypeId: false, departmentId: false, isActive: false }); // used for createUser Validation
    const [severty, setSeverty] = useState(''); //this state is used to the severty or type of Alert box not snackbar for simple ALert 
    const [showAlert, setShowAlert] = useState(false);// used to show Alert Box 
    const [showdialog, setShowialog] = useState(false); // used to SHow  and close dialoge for Edit User 
    const [edituserdata, setEdituserData] = React.useState({}); // used to set  the data to show in the editUser Dialoge box 
    const [alertmsg, setAlertmsg] = useState(''); // used to set the msg for the Alert Box 
    const selectedCompanyId = useSelector((state) => state.selectedCompanyId);//taking the Selected Company Id from the redux 
    const companyList = useSelector((state) => state.companyList);// taking companyList form Redux Store 
    const selectedCompany = companyList.companyList.find(company => company._id === selectedCompanyId); // taking the full company Data of the Seletced company
    const filterBranchList = selectedCompany && selectedCompany.branchList !== undefined ? selectedCompany.branchList : [];// roleList based on Selected Company 
    const filterDeptList = selectedCompany && selectedCompany.departmentList !== undefined ? selectedCompany.departmentList : [];// roleList based on Selected Company 
    const filterChannelList = selectedCompany && selectedCompany.channelList !== undefined ? selectedCompany.channelList : [];// 
    const filterpatientTypeList = selectedCompany && selectedCompany.patientTypeList !== undefined ? selectedCompany.patientTypeList : [];// 
    const filterUrlList = selectedCompany && selectedCompany.manageUrlList !== undefined ? selectedCompany.manageUrlList : [];// 
    
    const resetForm = () => {
        setFormData({ urlName: '', description: '', branchId: '', channelId: '', patientTypeId: '', departmentId: '', isActive: ''});
    };
    const createUrl = async () => {
        const newValidationErrors = {};
        let isValid = true;
        // Array of fields to exclude from validation
        const excludedFields = ['channelId', 'patientTypeId', 'departmentId'];

        Object.keys(formData).forEach((field) => {
            // Exclude validation for specific fields
            if (!excludedFields.includes(field) && (formData[field] === '' || formData[field] === undefined)) {
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
                //const modifiedFormData = { ...formData };
                const modifiedFormData= Object.entries(formData)
                .filter(([key, value]) => value !== null && value !== '')
                .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
                modifiedFormData.companyId = selectedCompanyId;
                modifiedFormData.createdBy = store.getState().user.user.userId;
                const token = sessionStorage.getItem('token');
                const resp = await createUrlApi(modifiedFormData, token);
                if (resp.status) {
                    handleClick(resp.message, 'success');
                    resetForm();
                    dispatch({ type: 'SET_COMPANY_LIST', payload: { companyList: resp.companyList } });
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

  

    const urlDetailsChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));

        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [field]: false,
        }));
    };

    //   Role Table Start 
    const headCells = [
        { id: 'createdDate', numeric: false, disablePadding: true, label: 'Created Date', },
        { id: 'urlName', numeric: false, disablePadding: true, label: 'URL-Name' },
        { id: 'description', numeric: false, disablePadding: true, label: 'Description' },
        { id: 'branchName', numeric: false, disablePadding: true, label: 'Branch Name' },
        { id: 'channelName', numeric: false, disablePadding: true, label: 'Channel Name' },
        { id: 'patientType', numeric: false, disablePadding: true, label: 'Patient Type' },
        { id: 'departmentName', numeric: false, disablePadding: true, label: 'Department Name' },
        { id: 'isActive', numeric: true, disablePadding: false, label: 'Status' }
    ];
    function createData(id, createdDate, urlName, description, branchName, channelName, patientType, departmentName, isActive) {
        return {
            id,
            createdDate,
            urlName,
            description,
            branchName,
            channelName,
            patientType,
            departmentName,
            isActive,
        };
    }

    const getBranchName = (branchId) => {
        const branch = filterBranchList.find(branch => branch._id === branchId);
        return branch ? branch.name : ''; // Return the Branch name if found, otherwise an empty string
    };
    const getChannelName = (channelId) => {
        const channel = filterChannelList.find(channel => channel._id === channelId);
        return channel ? channel.name : ''; // Return the Branch name if found, otherwise an empty string
    };

    const getpatinetTypeName = (ptTypeId) => {
        const patientType = filterpatientTypeList.find(ptType => ptType._id === ptTypeId);
        return patientType ? patientType.name : ''; // Return the Branch name if found, otherwise an empty string
    };

    const getDepartmentName = (deptId) => {
        const dept = filterDeptList.find(dept => dept._id === deptId);
        return dept ? dept.name : ''; // Return the Branch name if found, otherwise an empty string
    };

    const tableData = filterUrlList.map((url, index) => {
        const isActiveText = url.isActive == 1 ? 'Active' : 'InActive';
        const branchN = getBranchName(url.branchId) || 'NA';
        const deptN = getDepartmentName(url.departmentId) || 'NA';
        const chName = getChannelName(url.channelId) || 'NA';
        const ptTypeName = getpatinetTypeName(url.patientTypeId)|| 'NA';
        return createData(
            url._id,
            url.createdDate,
            url.urlName,
            url.description,
            branchN,
            chName,
            ptTypeName,
            deptN,
            isActiveText,
        )
    });

    function createDataFordwd(id, name) {
        return {
            id,
            name,
        };
    }
    const branchDropDown = filterBranchList.map((branch) => {
        return createDataFordwd(
            branch._id,
            branch.name,
        )
    })
    const channelDropDown = filterChannelList.map((channel) => {
        return createDataFordwd(
            channel._id,
            channel.name,
        )
    })
    const ptTypeDropDown = filterpatientTypeList.map((ptType) => {
        return createDataFordwd(
            ptType._id,
            ptType.name,
        )
    })

    const departmentDropDown = filterDeptList.map((dept) => {
        return createDataFordwd(
            dept._id,
            dept.name,
        )
    })

    const onEditClick = (ptTypeId) => {
        const patientTypeList = filterUrlList.find(url => url._id === ptTypeId);
        // const branchN = getBranchName(patientTypeList.branchId);
        // const deptN = getDepartmentName(patientTypeList.departmentId);
        // const isActiveText = url.isActive == 1 ? 'Active' : 'InActive';
        // const chName = getChannelName(patientTypeList.channelId);
        // const ptTypeName = getpatinetTypeName(patientTypeList.patientTypeId);
        const data = {
            urlName: { value: patientTypeList.urlName, label: 'URL-Name', editable: false, type: 'text', ptTypeId: ptTypeId },
            description: { value: patientTypeList.description, label: 'Description ', editable: false, type: 'text', ptTypeId: ptTypeId },
            branchName: { value: patientTypeList.branchId, label: 'Branch Name', editable: true, type: 'select', ptTypeId: ptTypeId, options: branchDropDown || [],},
            channelName: { value: patientTypeList.channelId, label: 'Channel Name ', editable: true, type: 'select', ptTypeId: ptTypeId, options: channelDropDown || [],},
            patinetType: { value: patientTypeList.patientTypeId, label: 'Patient Type', editable: true, type: 'select', ptTypeId: ptTypeId, options: ptTypeDropDown || [],},
            departmentName: { value: patientTypeList.departmentId, label: 'Department Name', editable: true, type: 'select', ptTypeId: ptTypeId, options:departmentDropDown || [],},
            Status: {
                value: patientTypeList.isActive,
                label: 'Status',
                editable: true,
                type: 'select',
                ptTypeId: ptTypeId,
                options: [{ value: 1, label: 'Active' }, { value: 0, label: 'InActive' }],
            }
        }
        setEdituserData(data);
        setShowialog(true);
    }
    const onDeleteClick = (userId) => {// used to Delete  the user 
        console.log("Selected s User Delte :", userId);
    };
    const dialogClose = () => { // used to close the edit user Dialoge Box  
        setShowialog(false);
    };
    const saveEditedUser = async (editurlData) => {
        const updateUrl = {
            urlName: editurlData.UrlName.value,
            description: editurlData.Description.value,
            isActive: editurlData.Status.value,
            updatedBy: store.getState().user.user.userId,
            branchId: editurlData.BranchName.value,
            channelId: editurlData.ChannelName.value,
            patientTypeId: editurlData.PatinetType.value,
            departmentId: editurlData.DepartmentName.value,
            _id: editurlData.UrlName.ptTypeId
        }
        const token = sessionStorage.getItem('token');
        const resp = await updatedPatientType(updateUrl, token);
        if (resp.status) {
            handleClick(resp.message, 'success');
            dispatch({ type: 'SET_COMPANY_LIST', payload: { companyList: resp.companyList } });
            setShowialog(false);
        } else {
            handleClick(resp.errormessage, 'error');
            console.error('Error creating user:', resp.error);
        }
    }
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
                            <EnhancedTable headCells={headCells} rows={tableData} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
                        </>
                    )}

                    {/* Content for the second tab (index 1) */}
                    {index === 1 && (
                        <Grid container spacing={2} sx={{ maxWidth: 600, margin: 'auto' }}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="standard-basic-1" label="URL-Name" variant="standard" onChange={(e) => urlDetailsChange('urlName', e.target.value)} required error={validationErrors.urlName} value={formData.urlName} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="standard-basic-2" label="Description" variant="standard" onChange={(e) => urlDetailsChange('description', e.target.value)} required error={validationErrors.description} value={formData.description} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Select Branch</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={formData.branchId}
                                        onChange={(e) => urlDetailsChange('branchId', e.target.value)}
                                        label="Select Branch"
                                        required error={validationErrors.branchId}
                                    >
                                        {branchDropDown.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Select Channel</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={formData.channelId}
                                        onChange={(e) => urlDetailsChange('channelId', e.target.value)}
                                        label="Select Channel"
                                        required error={validationErrors.channelId}
                                    >
                                        {channelDropDown.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Select PatientType</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={formData.patientTypeId}
                                        onChange={(e) => urlDetailsChange('patientTypeId', e.target.value)}
                                        label="Select PatientType"
                                        required error={validationErrors.patientTypeId}
                                    >
                                        {ptTypeDropDown.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Select Department</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={formData.departmentId}
                                        onChange={(e) => urlDetailsChange('departmentId', e.target.value)}
                                        label="Select Department"
                                        required error={validationErrors.departmentId}
                                    >
                                        {departmentDropDown.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Select Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={formData.isActive}
                                        onChange={(e) => urlDetailsChange('isActive', e.target.value)}
                                        label="Select Status"
                                        required error={validationErrors.isActive}
                                    >
                                        <MenuItem value={1}>True</MenuItem>
                                        <MenuItem value={0}>False</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" color="primary" onClick={createUrl}>
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

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};

const fabGreenStyle = {
    color: 'common.white',
    bgcolor: green[500],
    '&:hover': {
        bgcolor: green[600],
    },
};

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
                    <Tab label="URL List" {...a11yProps(0)} sx={{ whiteSpace: 'nowrap' }} />
                    <Tab label="Create URL" {...a11yProps(1)} sx={{ whiteSpace: 'nowrap' }} />
                    {/* <Tab label="Configure Company" {...a11yProps(2)} sx={{ whiteSpace: 'nowrap' }} /> */}
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
                {/* <TabPanel value={value} index={3} dir={theme.direction}>
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                </TabPanel>
                <TabPanel value={value} index={5} dir={theme.direction}>
                </TabPanel> */}
                {/* Add more TabPanel components as needed */}
            </SwipeableViews>
            {/* {fabs.map((fab, index) => (
                <Zoom
                    key={fab.color}
                    in={value === index}
                    timeout={transitionDuration}
                    style={{
                        transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                >
                    <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
                        {fab.icon}
                    </Fab>
                </Zoom>
            ))} */}
        </Box>
    );
};

const UrlConfig = () => {
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
    return (
        <>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '26cm', position: 'fixed', zIndex: 1000 }}>
                    <Stack spacing={2}>
                        <Item>URL Config</Item>
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

export default UrlConfig;