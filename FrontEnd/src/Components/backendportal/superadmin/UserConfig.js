import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
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
import DynamicCheckboxList from './DynamicCheckboxList';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { createUserApi, updateUserDetails, userFunctionAccess } from '../../../api/Apicall';
import { store } from '../../redux/store';
import { useMemo } from 'react';
import SnackbarComponent from '../../SnackbarComponent';
import AdminDialogbox from '../../dialogs/AdminDialogbox';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


function TabPanel(props) {
    //props functions ordata passed from parent 
    const { children, value, index, handleClick, ...other } = props;
    //propsEnd  
    //    useDispatch is used to to dispatch the data and store in the redux store  Start 
    const dispatch = useDispatch();
    // dispatch End Here 
    // States start from here 
    const [severty, setSeverty] = useState(''); //this state is used to the severty or type of Alert box not snackbar for simple ALert 
    const [showAlert, setShowAlert] = useState(false);// used to show Alert Box 
    const [showdialog, setShowialog] = useState(false); // used to SHow  and close dialoge for Edit User 
    const [edituserdata, setEdituserData] = React.useState({}); // used to set  the data to show in the editUser Dialoge box 
    const [alertmsg, setAlertmsg] = useState(''); // used to set the msg for the Alert Box 
    const [formData, setFormData] = useState({ name: '', email: '', contactNo: '', password: '', confirmPassword: '', isActive: '',role:'' ,navIndicator:'' }); //  used to store the data or createuser FOrm 
    const [validationErrors, setValidationErrors] = useState({ name: false, email: false, contactNo: false, password: false, confirmPassword: false, isActive: false, role :false,navIndicator:false  }); // used for createUser Validation
    // useState Ends here 
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    //State  taking from Redux Store  --Start

    const selectedCompanyId = useSelector((state) => state.selectedCompanyId);//taking the Selected Company Id from the redux 
    const companyList = useSelector((state) => state.companyList);// taking companyList form Redux Store 
    const selectedCompany = companyList.companyList.find(company => company._id === selectedCompanyId); // taking the full company Data of the Seletced company
    const filterRoleList = selectedCompany && selectedCompany.roleList !== undefined ? selectedCompany.roleList : [];// roleList based on Selected Company 
    const filterUserList = selectedCompany && selectedCompany.userList !== undefined ? selectedCompany.userList : []; //userList based on selected Company
    const filterFunctionList = selectedCompany && selectedCompany.menuFunctionList !== undefined ? selectedCompany.menuFunctionList : []; //functionList based on the slected Company
    //State  taking from Redux Store  --End
    //  functions to handle the Create User Form  Start
    const resetForm = () => {
        setFormData({ name: '', email: '', contactNo: '', password: '', confirmPassword: '', isActive: '', role: '', });
    };
    const userDetailsChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));

        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [field]: false,
        }));
    };

    const createUser = async () => {
        // Validate fields before submitting
        const newValidationErrors = {};
        let isValid = true;
        Object.keys(formData).forEach((field) => {
            if (formData[field] === '' || formData[field] === undefined) {
                if(field !=='role'){
                newValidationErrors[field] = true;
                isValid = false;
                }
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
            if (formData.password !== formData.confirmPassword) {
                setAlertmsg('Password and ConfirmPassword is not Matching !!!');
                setSeverty('info');
                setShowAlert(true);
                return;
            } else {
                const token = sessionStorage.getItem('token'); // Replace with your actual key

                try {
                    const modifiedFormData = { ...formData };
                    modifiedFormData.companyId = selectedCompanyId;
                    if(formData.role !==''){
                        modifiedFormData.roleId = formData.role;
                    }
                    modifiedFormData.createdBy = store.getState().user.user.userId;
                    modifiedFormData.navIndicator = formData.navIndicator;
                    delete modifiedFormData.role;
                    delete modifiedFormData.confirmPassword;
                    const resp = await createUserApi(modifiedFormData, token);
                    if (resp.success) {
                        handleClick(resp.message, 'success');
                        resetForm();
                        dispatch({ type: 'SET_COMPANY_LIST', payload: { companyList: resp.companyList } });
                    } else {
                        handleClick(resp.message, 'error');
                        console.error('Error creating user:', resp.error);
                    }
                } catch (error) {
                    console.error('Error creating user:', error);
                }
            }
        } else {
            setAlertmsg('Form is invalid. Please fill in all required fields.');
            setSeverty('info');
            setShowAlert(true);
        }
    };


    //  functions to handle the Create User Form  Ends Here 

    //Functions To Edit  and Delete The Selected USer
    const onEditClick = (userId) => {// in this iam setting the data to show in the dialoge box 
        const user = filterUserList.find(user => user._id === userId);
        const roleName = getRoleName(user.roleId, filterRoleList);
        const roleOptions = filterRoleList.map((role) => ({ value: role._id, label: role.name, }));
        const data = {
            Name: { value: user.name, label: 'Name', editable: false, type: 'text', userId: userId },
            Email: { value: user.email, label: 'Email', editable: false, type: 'text', userId: userId },
            ContactNo: { value: user.contactNo, label: 'Contact No', editable: false, type: 'text', userId: userId },
            Role: {
                value: user.roleId,
                label: 'Role',
                editable: true,
                type: 'select',
                userId: userId,
                options: roleOptions,
            },
            Status: {
                value: user.isActive,
                label: 'Status',
                editable: true,
                type: 'select',
                userId: userId,
                options: [{ value: 1, label: 'Active' }, { value: 0, label: 'InActive' }],
            }
        }
        setEdituserData(data);
        setShowialog(true);
    };
    const saveEditedUser = async (editUserData) => {// used to Save the Data 
        console.log("editUserData:", editUserData);
        const token = sessionStorage.getItem('token');
        const updatedUser = {
            name: editUserData.Name.value,
            contactNo: editUserData.ContactNo.value,
            email: editUserData.Email.value,
            roleId: editUserData.Role.value,
            isActive: editUserData.Status.value,
            _id: editUserData.Name.userId,
            updatedBy:store.getState().user.id

        }
        const resp = await updateUserDetails(updatedUser, token);
        if (resp.status) {
            handleClick(resp.message, 'success');
            setShowialog(false);
            dispatch({ type: 'SET_COMPANY_LIST', payload: { companyList: resp.companyList } });
        } else {
            handleClick(resp.message, 'error');
            console.error('Error creating user:', resp.error);
        }

    }
    const dialogClose = () => { // used to close the edit user Dialoge Box  
        setShowialog(false);
    };
    const onDeleteClick = (userId) => {// used to Delete  the user 
        console.log("Selected s User Delte :", userId);
    };
    //Functions To Edit  and Delete The Selected USer Ends here 

    // Functions to handle the FunctionAcces Part  submission Start here 
    const functionSubmit = async (menucheckedIds,selectedSubmenuIds, userId) => {
        const token = sessionStorage.getItem('token');
        const resp = await userFunctionAccess(menucheckedIds,selectedSubmenuIds, userId, token);
        if (resp.status) {
            handleClick(resp.message, 'success');
            dispatch({ type: 'SET_COMPANY_LIST', payload: { companyList: resp.companyList } });
        } else {
            handleClick(resp.message, 'error');
            console.error('Error creating user:', resp.error);
        }

    };

    const selectUser = (selecteduser) => {
        console.log("Selected s User Config:", selecteduser);
    };

    const functionData = filterFunctionList.map(fn => {
        const submenuListData = fn.submenuList.map(submenu => ({
            // Include only the fields you need
            id: submenu._id,
            name: submenu.headerName,
            menuIndicator: submenu.menuIndicator,
            check:false,
            // Add more fields as needed
          }));
        return createfnData(
            fn._id,
            fn.headerName,
            fn.menuIndicator,
            submenuListData,
            false
        )
    })
    function createfnData(id, name,menuIndicator,submenuList, check) {
        return {
            id,
            name,
            menuIndicator,
            submenuList,
            check
        };
    }

    const getRoleName = (roleId, roleList) => {
        const role = roleList.find(role => role._id === roleId);
        return role ? role.name : ''; // Return the role name if found, otherwise an empty string
    };

    const tableData = filterUserList.map((user, index) => {
        const isActiveText = user.isActive == 1 ? 'Active' : 'InActive';
        const roleName = getRoleName(user.roleId, filterRoleList);
        return createData(
            user._id,
            user.createdDate,
            user.name,
            user.email,
            user.contactNo,
            roleName,
            isActiveText,
        )
    });

    function createData(id, createdDate, name, email, contactNo, roleName, isActive) {
        return {
            id,
            createdDate,
            name,
            email,
            contactNo,
            roleName,
            isActive,
        };
    }

    const fnUserList = filterUserList.map((user, index) => {
        debugger;
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            FunctionList: user.menuFunctionList,
            label: user.name + '(' + user.email + ')',
        }
    })
    const headCells = [
        { id: 'createdDate', numeric: false, disablePadding: true, label: 'Created Date', },
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
        { id: 'contactNo', numeric: true, disablePadding: false, label: 'ContactNo' },
        { id: 'roleName', numeric: true, disablePadding: false, label: 'RoleName' },
        { id: 'isActive', numeric: true, disablePadding: false, label: 'Status' }
    ];

    // if You want to Show the Alert Boxes dark like Snackbar  Uncomment This 
    // const Alert = React.forwardRef(function Alert(props, ref) {
    //     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    //   });

    // Used To show the Alert Box Start here 
    const functionAlert = (type, msg) => {
        setAlertmsg(msg);
        setShowAlert(true);
        setSeverty(type);
    }
    // Used To show the Alert Box Ends  here 

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
                                <TextField fullWidth id="standard-basic-5" label="Name" variant="standard" onChange={(e) => userDetailsChange('name', e.target.value)} required error={validationErrors.name} value={formData.name} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="standard-basic-1" label="Email" variant="standard" onChange={(e) => userDetailsChange('email', e.target.value)} required error={validationErrors.email} value={formData.email} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidthid="standard-basic-2" label="Contact Number" variant="standard" onChange={(e) => { const numericValue = e.target.value.replace(/\D/g, ''); userDetailsChange('contactNo', numericValue); }} required error={validationErrors.contactNo} value={formData.contactNo} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="standard-basic-3" label="Password" variant="standard" onChange={(e) => userDetailsChange('password', e.target.value)} required error={validationErrors.password} value={formData.password} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="standard-basic-4" label="Confirm Password" variant="standard" onChange={(e) => userDetailsChange('confirmPassword', e.target.value)} required error={validationErrors.confirmPassword} value={formData.confirmPassword} />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Select Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={formData.role}
                                        onChange={(e) => userDetailsChange('role', e.target.value)}
                                        label="Select Role"
                                        // required
                                        // error={validationErrors.role}
                                    >
                                        {filterRoleList.map((role) => (
                                            <MenuItem key={role._id} value={role._id}>
                                                {role.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Is Active</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={formData.isActive}
                                        onChange={(e) => userDetailsChange('isActive', e.target.value)}
                                        label="Is Active"
                                        required
                                        error={validationErrors.isActive}
                                    >
                                        {/* <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem> */}
                                        <MenuItem value={1}>True</MenuItem>
                                        <MenuItem value={0}>False</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label"> User Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={formData.navIndicator}
                                        onChange={(e) => userDetailsChange('navIndicator', e.target.value)}
                                        label="User Type"
                                        required
                                        error={validationErrors.navIndicator}
                                    >
                                        {/* <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem> */}
                                        <MenuItem value={1}>Super Admin</MenuItem>
                                        <MenuItem value={2}>Admin</MenuItem>
                                        <MenuItem value={3}>User</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" color="primary" onClick={createUser}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>

                    )}

                    {/* Content for the first tab (index 2) */}
                    {index === 2 && (
                        <Grid container spacing={2} sx={{ maxWidth: 600, margin: 'auto' }}>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <DynamicCheckboxList fnUserList={fnUserList} functionSubmit={functionSubmit} companyfunctionData={functionData} functionAlert={functionAlert} />
                            </Grid>
                        </Grid>

                    )}
                    {index === 3 && (
                        <div>

                        </div>
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
                    <Tab label="User List" {...a11yProps(0)} sx={{ whiteSpace: 'nowrap' }} />
                    <Tab label="Create user" {...a11yProps(1)} sx={{ whiteSpace: 'nowrap' }} />
                    <Tab label="Function Access" {...a11yProps(2)} sx={{ whiteSpace: 'nowrap' }} />
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


const UserConfig = () => {

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
                        <Item>User Config</Item>
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

export default UserConfig;
