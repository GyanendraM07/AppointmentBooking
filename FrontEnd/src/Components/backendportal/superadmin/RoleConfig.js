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
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { createRoleApi, updateRole, roleFunctionAccess } from '../../../api/Apicall';
import { store } from '../../redux/store';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SnackbarComponent from '../../SnackbarComponent';
import AdminDialogbox from '../../dialogs/AdminDialogbox';

function TabPanel(props) {
    const { children, value, index, handleClick, ...other } = props;
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ name: '', shortName: '', isActive: '' });
    const [validationErrors, setValidationErrors] = useState({ name: false, shortName: false, isActive: false }); // used for createUser Validation
    const [severty, setSeverty] = useState(''); //this state is used to the severty or type of Alert box not snackbar for simple ALert 
    const [showAlert, setShowAlert] = useState(false);// used to show Alert Box 
    const [showdialog, setShowialog] = useState(false); // used to SHow  and close dialoge for Edit User 
    const [edituserdata, setEdituserData] = React.useState({}); // used to set  the data to show in the editUser Dialoge box 
    const [alertmsg, setAlertmsg] = useState(''); // used to set the msg for the Alert Box 

    const selectedCompanyId = useSelector((state) => state.selectedCompanyId);//taking the Selected Company Id from the redux 
    const companyList = useSelector((state) => state.companyList);// taking companyList form Redux Store 
    const selectedCompany = companyList.companyList.find(company => company._id === selectedCompanyId); // taking the full company Data of the Seletced company
    const filterRoleList = selectedCompany && selectedCompany.roleList !== undefined ? selectedCompany.roleList : [];// roleList based on Selected Company 
   // const filterFunctionList = selectedCompany && selectedCompany.funConfigList !== undefined ? selectedCompany.funConfigList : []; //functionList based on the slected Company
    const filterFunctionList = selectedCompany && selectedCompany.menuFunctionList !== undefined ? selectedCompany.menuFunctionList : []; //functionList based on the slected Company
   
    const createRole = async () => {
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
                const resp = await createRoleApi(modifiedFormData, token);
                debugger;
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

            }

        } else {
            setAlertmsg('Form is invalid. Please fill in all required fields.');
            setSeverty('info');
            setShowAlert(true);
        }
        // You can also perform any other submission logic here
    };

    const resetForm = () => {
        setFormData({ name: '', shortName: '',  isActive: '', });
    };

    const roleDetailsChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));

        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [field]: false,
        }));
    };

    // Function to handle form submission
    const functionSubmit = async (menucheckedIds,selectedSubmenuIds,roleId) => {
        try {
        const token = sessionStorage.getItem('token');
        const resp = await roleFunctionAccess(menucheckedIds,selectedSubmenuIds, roleId, token);
        if (resp.status) {
            handleClick(resp.message, 'success');
            dispatch({ type: 'SET_COMPANY_LIST', payload: { companyList: resp.companyList } });
        } else {
            handleClick(resp.errormessage, 'error');
            console.error('Error creating user:', resp.error);
        }
        } catch (error) {
            handleClick(error.errormessage, 'error');
            console.error('Error During Function Access', error);
        }
    };

    const selectUser = (selecteduser) => {
        console.log("Selected s User Config:", selecteduser);
    };

    //   Role Table Start 
    const headCells = [
        { id: 'createdDate', numeric: false, disablePadding: true, label: 'Created Date', },
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'isActive', numeric: true, disablePadding: false, label: 'Status' }
    ];


    const tableData = filterRoleList.map((role, index) => {
        const isActiveText = role.isActive == 1 ? 'Active' : 'InActive';
        return createData(
            role._id,
            role.createdDate,
            role.name,
            isActiveText,
        )
    });
    function createData(id, createdDate, name, isActive) {
        return {
            id,
            createdDate,
            name,
            isActive,
        };
    }
    const onEditClick = (roleId) => {
        const role = filterRoleList.find(role => role._id === roleId);
        const data = {
            Name: { value: role.name, label: 'Name', editable: false, type: 'text', roleId: roleId },
            ShortName: { value: role.shortName, label: 'ShortName', editable: false, type: 'text', roleId: roleId },
            Status: {
                value: role.isActive,
                label: 'Status',
                editable: true,
                type: 'select',
                roleId: roleId,
                options: [{ value: 1, label: 'Active' }, { value: 0, label: 'InActive' }],
            }
        }
        setEdituserData(data);
        setShowialog(true);
        console.log("Selected s User Delte :", roleId);
    }
    const onDeleteClick = (userId) => {// used to Delete  the user 
        console.log("Selected s User Delte :", userId);
    };
    const dialogClose = () => { // used to close the edit user Dialoge Box  
        setShowialog(false);
    };
    const saveEditedUser = async (editRoleData) => {
        const updatedRole = {
            name: editRoleData.Name.value,
            shortName: editRoleData.ShortName.value,
            isActive: editRoleData.Status.value,
            updatedBy : store.getState().user.user.userId,
            _id: editRoleData.Name.roleId
        }
        const token = sessionStorage.getItem('token');
        const resp = await updateRole(updatedRole, token);
        debugger;
        if (resp.status) {
            handleClick(resp.message, 'success');
            dispatch({ type: 'SET_COMPANY_LIST', payload: { companyList: resp.companyList } });
            setShowialog(false);
           
        } else {
            handleClick(resp.errormessage, 'error');
            console.error('Error creating user:', resp.error);
        }

    }

    const fnRoleList = filterRoleList.map((role, index) => {
        return {
            id: role._id,
            name: role.name,
            FunctionList: role.menuFunctionList,
            label:role.name,
        }
    })
    const functionData = filterFunctionList.map(fn => {
        debugger;
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
    
    const functionAlert = (type, msg) => {
        setAlertmsg(msg);
        setShowAlert(true);
        setSeverty(type);
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
                        // <EnhancedTable />
                        <>
                            {showdialog && (
                                <AdminDialogbox initialRows={edituserdata} saveEditedUser={saveEditedUser} dialogClose={dialogClose} title='Edit User' />
                            )}
                            <EnhancedTable headCells={headCells} rows={tableData} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />

                        </>)}

                    {/* Content for the second tab (index 1) */}
                    {index === 1 && (
                        <Grid container spacing={2} sx={{ maxWidth: 600, margin: 'auto' }}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="standard-basic-1" label="Name" variant="standard" onChange={(e) => roleDetailsChange('name', e.target.value)} required error={validationErrors.name} value={formData.name} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth id="standard-basic-2" label="Short Name" variant="standard" onChange={(e) => roleDetailsChange('shortName', e.target.value)} required error={validationErrors.shortName} value={formData.shortName} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Is Active</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={formData.isActive}
                                        onChange={(e) => roleDetailsChange('isActive', e.target.value)}
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
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" color="primary" onClick={createRole}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    )}

                    {/* Content for the first tab (index 2) */}
                    {index === 2 && (
                        <Grid container spacing={2} sx={{ maxWidth: 600, margin: 'auto' }}>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <DynamicCheckboxList fnUserList={fnRoleList} functionSubmit={functionSubmit} companyfunctionData={functionData} functionAlert={functionAlert} />
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
                    <Tab label="Role List" {...a11yProps(0)} sx={{ whiteSpace: 'nowrap' }}  />
                    <Tab label="Create Role" {...a11yProps(1)} sx={{ whiteSpace: 'nowrap' }} />
                    <Tab label="Function Access" {...a11yProps(2)} sx={{ whiteSpace: 'nowrap' }}/>
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
const RoleConfig = () => {
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
                    <Item>Role Config</Item>
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

export default RoleConfig;