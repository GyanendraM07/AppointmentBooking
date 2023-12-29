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
import { createPatientTypeApi, updatedPatientType } from '../../../api/Apicall';

function TabPanel(props) {
    const { children, value, index,handleClick, ...other } = props;
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ name: '', shortName: '', isActive: '',});
    const [validationErrors, setValidationErrors] = useState({ name: false, shortName: false,isActive: false}); // used for createUser Validation
    const [severty, setSeverty] = useState(''); //this state is used to the severty or type of Alert box not snackbar for simple ALert 
    const [showAlert, setShowAlert] = useState(false);// used to show Alert Box 
    const [showdialog, setShowialog] = useState(false); // used to SHow  and close dialoge for Edit User 
    const [edituserdata, setEdituserData] = useState({}); // used to set  the data to show in the editUser Dialoge box 
    const [alertmsg, setAlertmsg] = useState(''); // used to set the msg for the Alert Box 
    const selectedCompanyId = useSelector((state) => state.selectedCompanyId);//taking the Selected Company Id from the redux 
    const companyList = useSelector((state) => state.companyList);// taking companyList form Redux Store 
    const selectedCompany = companyList.companyList.find(company => company._id === selectedCompanyId); // taking the full company Data of the Seletced company
    const filterPatientTypeList = selectedCompany && selectedCompany.patientTypeList !== undefined ? selectedCompany.patientTypeList : [];// roleList based on Selected Company 
   
    const createPatientType = async () => {
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
                const resp = await createPatientTypeApi(modifiedFormData, token);
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

    const resetForm = () => {
        setFormData({ name: '', shortName: '',  isActive: '', });
    };

    const doctorDetailsChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));

        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [field]: false,
        }));
    };

    const headCells = [
        { id: 'createdDate', numeric: false, disablePadding: true, label: 'Created Date', },
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'shortName', numeric: false, disablePadding: true, label: 'ShortName' },
        { id: 'isActive', numeric: true, disablePadding: false, label: 'Status' }
    ];

    // const getBranchName = (branchId) => {
    //     const branch = filterBranchList.find(branch => branch._id === branchId);
    //     return branch ? branch.name : ''; // Return the Branch name if found, otherwise an empty string
    // };

    
    // const getDepartmentName = (deptId) => {
    //     const dept = filterDeptList.find(dept => dept._id === deptId);
    //     return dept ? dept.name : ''; // Return the Branch name if found, otherwise an empty string
    // };

    const tableData = filterPatientTypeList.map((ptType, index) => {
        const isActiveText = ptType.isActive == 1 ? 'Active' : 'InActive';
        return createData(
            ptType._id,
            ptType.createdDate,
            ptType.name,
            ptType.shortName,
            isActiveText,
        )
    });
    function createData(id, createdDate, name, shortName, isActive) {
        return {
            id,
            createdDate,
            name,
            shortName,
            isActive,
        };
    }
    // function createBranchData(id, name) {
    //     return {
    //         id,
    //         name,
    //     };
    // }
    const onEditClick = (ptTypeId) => {
        const patient = filterPatientTypeList.find(pat => pat._id === ptTypeId);
        const data = {
            Name: { value: patient.name, label: 'Name', editable: false, type: 'text', ptTypeId: ptTypeId },
            ShortName: { value: patient.shortName, label: 'Short Name', editable: false, type: 'text', ptTypeId: ptTypeId },
            Status: {
                value: patient.isActive,
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
    const saveEditedUser = async (editPatientTypeData) => {
        const updatedptTypeData = {
            name: editPatientTypeData.Name.value,
            shortName: editPatientTypeData.ShortName.value,
            isActive: editPatientTypeData.Status.value,
            updatedBy: store.getState().user.user.userId,
            _id: editPatientTypeData.Name.ptTypeId
        }
        const token = sessionStorage.getItem('token');
        const resp = await updatedPatientType(updatedptTypeData, token);
            if (resp.status) {
                handleClick(resp.message, 'success');
                dispatch({ type: 'SET_COMPANY_LIST', payload: { companyList: resp.companyList } });
                setShowialog(false);
            } else {
                handleClick(resp.errormessage, 'error');
                console.error('Error creating user:', resp.error);
            }

    }
    // const branchDropDown = filterBranchList.map((branch)  =>{
    //     return createBranchData(
    //         branch._id,
    //         branch.name,
    //     )
    // })

    // const departmentDropDown = filterDeptList.map((dept)  =>{
    //     return createBranchData(
    //         dept._id,
    //         dept.name,
    //     )
    // })

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
                                <TextField fullWidth id="standard-basic-1" label="Name" variant="standard" onChange={(e) => doctorDetailsChange('name', e.target.value)}  required error={validationErrors.departmentId} value={formData.name}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="standard-basic-2" label="Short Name" variant="standard" onChange={(e) => doctorDetailsChange('shortName', e.target.value)}   required error={validationErrors.departmentId}  value={formData.shortName}/>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Select Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={formData.isActive}
                                        onChange={(e) => doctorDetailsChange('isActive', e.target.value)}
                                        label="Select Status"
                                        required error={validationErrors.isActive} 
                                    >
                                        <MenuItem value={1}>True</MenuItem>
                                        <MenuItem value={0}>False</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" color="primary" onClick={createPatientType}>
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

const FloatingActionButtonZoom = ({handleClick}) => {
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
                    <Tab label="Patient Type List"  {...a11yProps(0)} sx={{ whiteSpace: 'nowrap' }} />
                    <Tab label="Create Patient Type"  {...a11yProps(1)} sx={{ whiteSpace: 'nowrap' }} />
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
            </SwipeableViews>
        </Box>
    );
};

const PatientTypeConfig = () => {
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [saverty, setSaverty] = useState('');
    const [snackbarKey, setSnackbarKey] = useState(0);

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
                    <Item>Patinet Type Config</Item>
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

export default PatientTypeConfig;