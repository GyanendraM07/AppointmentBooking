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
import { createSlotApi, updateChannel, getDeparmentList, createSlotConfigApi } from '../../../api/Apicall';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import MultiDateCalendar from '../Multipledates';


function TabPanel(props) {
    const { children, value, index, handleClick, ...other } = props;
    const dispatch = useDispatch();
    const [formData, setFormData] = React.useState({ name: '', isActive: '', startTime: null, endTime: null, branchId: '' });
    const [validationErrors, setValidationErrors] = useState({ name: false, isActive: false, startTime: false, endTime: false, branchId: false }); // used for createUser Validation
    const [severty, setSeverty] = useState(''); //this state is used to the severty or type of Alert box not snackbar for simple ALert 
    const [showAlert, setShowAlert] = useState(false);// used to show Alert Box 
    const [showdialog, setShowialog] = useState(false); // used to SHow  and close dialoge for Edit User 
    const [edituserdata, setEdituserData] = React.useState({}); // used to set  the data to show in the editUser Dialoge box 
    const [alertmsg, setAlertmsg] = useState(''); // used to set the msg for the Alert Box 
    //used for Slot Config 
    const [deptlist, setDeptlist] = useState([{}]);
    const [doclist, setDoclist] = useState([{}]);
    const [slotList, setSlotList] = useState([{}]);
    const [slotconfig, setSlotconfig] = React.useState({ branchId: '', deptId: '', docId: '', slotType: '', weekDay: '', slotId: '' });
    const theme = useTheme();
    const [daysvalue, setDaysvalue] = useState([]);
    const [datevalues, setDatevalues] = useState([])
    // overall Data 
    const selectedCompanyId = useSelector((state) => state.selectedCompanyId);//taking the Selected Company Id from the redux 
    const companyList = useSelector((state) => state.companyList);// taking companyList form Redux Store 
    const selectedCompany = companyList.companyList.find(company => company._id === selectedCompanyId); // taking the full company Data of the Seletced company
    const filterSlotList = selectedCompany && selectedCompany.slotList !== undefined ? selectedCompany.slotList : [];// roleList based on Selected Company 
    const filterBranchList = selectedCompany && selectedCompany.branchList !== undefined ? selectedCompany.branchList : [];// roleList based on Selected Company 
    const [startselectedTime, setStartselectedTime] = useState(null);
    const [endtselectedTime, setEndselectedTime] = useState(null);


    // used to set the slot time during creation of slot ---start---
    const startTimeChange = (newTime) => {
        setStartselectedTime(newTime);
        console.log("Selected Time:", newTime);
    };

    const endTimeChange = (newTime) => {
        setEndselectedTime(newTime);
        console.log("Selected Time:", newTime);
    };
    // used to set the slot time during creation of slot ---End---
    const createSlot = async () => {
        formData.endTime = endtselectedTime;
        formData.startTime = startselectedTime;
        const newValidationErrors = {};
        let isValid = true;
        Object.keys(formData).forEach((field) => {
            if (formData[field] === '' || formData[field] === undefined || formData[field] === null) {
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
                modifiedFormData.startTime = startselectedTime.format('hh:mm A');
                modifiedFormData.endTime = endtselectedTime.format('hh:mm A');
                console.log("modifiedFormData---", modifiedFormData);
                modifiedFormData.companyId = selectedCompanyId;
                modifiedFormData.createdBy = store.getState().user.user.userId;
                const token = sessionStorage.getItem('token');
                const resp = await createSlotApi(modifiedFormData, token);
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
        setFormData({ name: '', shortName: '', isActive: '', });
        setStartselectedTime(null);
        setEndselectedTime(null);
    };

    const resetslotConfigForm = () => {
        setSlotconfig({ branchId: '', deptId: '', docId: '', slotType: '', weekDay: '', slotId: '' });
        setDaysvalue([]);
        setDatevalues([]);
    }

    const slotDetailsChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));

        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [field]: false,
        }));
    };
    const branchDropDown = filterBranchList.map((branch) => {
        return createBranchData(
            branch._id,
            branch.name,
        )
    })
    function createBranchData(id, name) {
        return {
            id,
            name,
        };
    }

    const getBranchName = (branchId) => {
        const branch = filterBranchList.find(branch => branch._id === branchId);
        return branch ? branch.name : ''; // Return the Branch name if found, otherwise an empty string
    };
    //   Role Table Start 
    const headCells = [
        { id: 'createdDate', numeric: false, disablePadding: true, label: 'Created Date', },
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'branchName', numeric: false, disablePadding: true, label: 'Branch Name' },
        { id: 'startTime', numeric: false, disablePadding: true, label: 'Start Time' },
        { id: 'endTime', numeric: false, disablePadding: true, label: 'End Time' },
        { id: 'isActive', numeric: true, disablePadding: false, label: 'Status' }
    ];

    const tableData = filterSlotList.map((slot, index) => {
        const isActiveText = slot.isActive == 1 ? 'Active' : 'InActive';
        const branchN = getBranchName(slot.branchId);
        return createData(
            slot._id,
            slot.createdDate,
            slot.name,
            branchN,
            slot.startTime,
            slot.endTime,
            isActiveText,
        )
    });
    function createData(id, createdDate, name, branchName, startTime, endTime, isActive) {
        return {
            id,
            createdDate,
            name,
            branchName,
            startTime,
            endTime,
            isActive,
        };
    }

    const saveEditedUser = async (editSlotData) => {
        const updatedSlot = {
            name: editSlotData.Name.value,
            startTime: editSlotData.startTime.value,
            endTime: editSlotData.endTime.value,
            isActive: editSlotData.Status.value,
            updatedBy: store.getState().user.user._id,
            _id: editSlotData.Name.slotId
        }
        const token = sessionStorage.getItem('token');
        const resp = await updateChannel(updatedSlot, token);
        if (resp.status) {
            handleClick(resp.message, 'success');
            dispatch({ type: 'SET_COMPANY_LIST', payload: { companyList: resp.companyList } });
            setShowialog(false);
        } else {
            handleClick(resp.errormessage, 'error');
            console.error('Error creating user:', resp.error);
        }
        // const departmentPage = async () => {
        //     const token = sessionStorage.getItem('token');
        //     const deptList = await getDeparmentList('657497034a41bd2caf35e50b', '657497594a41bd2caf35e517', token);
        //     console.log('deptList   ', deptList);
        //     if (deptList.status) {
        //         setDeptlist(deptList.deptList);
        //     } else {
        //         console.log("Error Occured");
        //     }

        // }

    }
    const onEditClick = (slotId) => {
        const slot = filterSlotList.find(slot => slot._id === slotId);
        const data = {
            Name: { value: slot.name, label: 'Name', editable: false, type: 'text', slotId: slotId },
            StartTime: { value: slot.startTime, label: 'Start Time', editable: false, type: 'text', slotId: slotId },
            StartTime: { value: slot.startTime, label: 'Start Time', editable: false, type: 'text', slotId: slotId },
            EndTime: { value: slot.endTime, label: 'End Time', editable: false, type: 'text', slotId: slotId },
            Status: {
                value: slot.isActive,
                label: 'Status',
                editable: false,
                type: 'select',
                slotId: slotId,
                options: [{ value: 1, label: 'Active' }, { value: 0, label: 'InActive' }],
            }
        }
        setEdituserData(data);
        setShowialog(true);
    }
    const onDeleteClick = (channelId) => {// used to Delete  the user 
        console.log("Selected s User Delte :", channelId);
    };
    const dialogClose = () => { // used to close the edit user Dialoge Box  
        setShowialog(false);
    };
    // methods for  Slot config For Doctors starts here 
    const selectBranch = async (branchId) => {
        setSlotconfig((prevData) => ({
            ...prevData,
            ['branchId']: branchId,
        }));
        const token = sessionStorage.getItem('token');
        const deptList = await getDeparmentList(selectedCompanyId, branchId, token);
        if (deptList.status) {
            setDeptlist(deptList.deptList);
        } else {
            console.log("Error Occured");
        }
        const filteredSlots = filterSlotList
            .filter((slot) => slot.branchId === branchId)
            .map((slot) => ({ id: slot._id, name: slot.startTime + ' - ' + slot.endTime }));
        setSlotList(filteredSlots);
    }

    const selectDepartment = (deptId) => {
        setSlotconfig((prevData) => ({
            ...prevData,
            ['deptId']: deptId,
        }));
        setDoclist(deptlist.find(dept => dept.id === deptId).doctorList);
    };
    const selectDoctor = (docId) => {
        setSlotconfig((prevData) => ({
            ...prevData,
            ['docId']: docId,
        }));
    };
    const selectSlotType = (slotType) => {
        setSlotconfig((prevData) => ({
            ...prevData,
            ['slotType']: slotType,
        }));
    };
    const selectWeekDay = (weekday) => {
        setSlotconfig((prevData) => ({
            ...prevData,
            ['weekDay']: weekday,
        }));
    };
    // const slotConfigSubmit = async () => {
    //     console.log('setPersonName', daysvalue);
    //     console.log("configData", slotconfig)
    // }
    const selectSlot = (slotId) => {
        setSlotconfig((prevData) => ({
            ...prevData,
            ['slotId']: slotId,
        }));
    }
    const weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Firday',
        'Saturday',
    ];
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setDaysvalue(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const createSlotConfig = async () => {
        const slotConfigsubmit = {}
        let check = false;
        if (slotconfig.branchId === '' || slotconfig.deptId === '' || slotconfig.docId === '' || selectedCompanyId === '' || slotconfig.slotType === '' || slotconfig.slotId === '') {
            setAlertmsg('Form is invalid. Please fill in all required fields.');
            setSeverty('info');
            setShowAlert(true);
            return;
        } else if (slotconfig.slotType === 1) {
            check = true;
        }
        else if (slotconfig.slotType === 2 && slotconfig.weekDay !== '') {
            check = true;
            const dayWise = {
                [slotconfig.weekDay.toLowerCase()]: 1,
            }
            slotConfigsubmit.dayWise = dayWise;
        } else if (slotconfig.slotType === 3 && daysvalue.length !== 0) {
            check = true;
            const dayWise = {
            }
            daysvalue.map(day => {
                dayWise[day.toLowerCase()] = 1;
            })
            slotConfigsubmit.dayWise = dayWise;
        } else if (slotconfig.slotType === 4 && datevalues.length !== 0) {
            check = true;
            const dateWise = {
            }
            datevalues.map((date) => {
                const dateNo = date.day;

                dateWise['day' + dateNo] = 1;
            })
            slotConfigsubmit.dateWise = dateWise;
        }
        if (check) {
            slotConfigsubmit.slotId = slotconfig.slotId;
            slotConfigsubmit.apptStatus = slotconfig.slotType;
            slotConfigsubmit.companyId = selectedCompanyId;
            slotConfigsubmit.branchId = slotconfig.branchId;
            slotConfigsubmit.departmentId = slotconfig.deptId;
            slotConfigsubmit.doctorId = slotconfig.docId;
            slotConfigsubmit.createdBy = store.getState().user.user.userId;
            try {
                const token = sessionStorage.getItem('token');
                const resp = await createSlotConfigApi(slotConfigsubmit, token);
                if (resp.status) {
                    handleClick(resp.message, 'success');
                    resetslotConfigForm();
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
            return;
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
                                <TextField fullWidth id="standard-basic-1" label="Name" variant="standard" onChange={(e) => slotDetailsChange('name', e.target.value)} required error={validationErrors.name} value={formData.name} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Select Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={formData.isActive}
                                        onChange={(e) => slotDetailsChange('isActive', e.target.value)}
                                        label="Select Status"
                                        required error={validationErrors.isActive}
                                    >
                                        <MenuItem value={1}>True</MenuItem>
                                        <MenuItem value={0}>False</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container spacing={2} sx={{ maxWidth: 600, margin: 'auto' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer
                                        components={[
                                            'DesktopTimePicker',
                                        ]}
                                    >
                                        <Grid item xs={12} sm={6}>
                                            <DemoItem label="Start Time">
                                                <DesktopTimePicker
                                                    value={startselectedTime}
                                                    onChange={startTimeChange} />
                                            </DemoItem>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <DemoItem label="End Time">
                                                <DesktopTimePicker
                                                    value={endtselectedTime}
                                                    onChange={endTimeChange} />
                                            </DemoItem>
                                        </Grid>
                                    </DemoContainer>

                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Select Branch</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={formData.branchId}
                                        onChange={(e) => slotDetailsChange('branchId', e.target.value)}
                                        label="SelectBranch"
                                        required error={validationErrors.branchId}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {branchDropDown.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" color="primary" onClick={createSlot}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                    {index === 2 && (
                        <div>
                            <Grid container spacing={2} sx={{ maxWidth: 600, margin: 'auto' }}>
                                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                        <InputLabel id="demo-simple-select-standard-label">Select Branch</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={slotconfig.branchId}
                                            onChange={(e) => selectBranch(e.target.value)}
                                            label="SelectBranch"
                                        // required error={validationErrors.branchId}
                                        >

                                            {branchDropDown.map((item) => (
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
                                            value={slotconfig.deptId}
                                            onChange={(e) => selectDepartment(e.target.value)}
                                            label="Select Department"
                                        // required error={validationErrors.branchId}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {deptlist.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                        <InputLabel id="demo-simple-select-standard-label">Select Doctor</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={slotconfig.docId}
                                            onChange={(e) => selectDoctor(e.target.value)}
                                            label="Select Doctor"
                                        // required error={validationErrors.branchId}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {doclist.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                        <InputLabel id="demo-simple-select-standard-label">Slot  Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={slotconfig.slotType}
                                            onChange={(e) => selectSlotType(e.target.value)}
                                            label="SelectBranch"
                                            required error={validationErrors.branchId}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={1}>Daily</MenuItem>
                                            <MenuItem value={2}>Weekly</MenuItem>
                                            <MenuItem value={3}>Day Wise</MenuItem>
                                            <MenuItem value={4}>Date Wise</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                        <InputLabel id="demo-simple-select-standard-label">Slot  Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={slotconfig.slot}
                                            onChange={(e) => selectSlot(e.target.value)}
                                            label="SelectBranch"
                                        // required error={validationErrors.branchId}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {slotList.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    {slotconfig.slotType === 1 ? (
                                        <p> Above Doctor will Avaliable EveryDay </p>
                                    ) : null}
                                    {slotconfig.slotType === 3 ? (
                                        <FormControl variant="standard" sx={{ m: 1, width: 300 }} >
                                            <InputLabel id="demo-multiple-chip-label">Select Multiple Days</InputLabel>
                                            <Select
                                                labelId="demo-multiple-chip-label"
                                                label="Select Multiple Days"
                                                id="demo-multiple-chip"
                                                multiple
                                                value={daysvalue}
                                                onChange={handleChange}
                                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} />
                                                        ))}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                                {weekdays.map((name) => (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                        style={getStyles(name, daysvalue, theme)}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    ) : null}
                                    {slotconfig.slotType === 2 ? (
                                        <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                            <InputLabel id="demo-simple-select-standard-label">Select  Day</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                value={slotconfig.weekDay}
                                                onChange={(e) => selectWeekDay(e.target.value)}
                                                label="Select Day"
                                            // required error={validationErrors.branchId}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {weekdays.map((name) => (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    ) : null}
                                    {slotconfig.slotType === 4 ? (
                                        <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                                            <MultiDateCalendar datevalues={datevalues} setDatevalues={setDatevalues} />
                                        </FormControl>
                                    ) : null}

                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant="contained" color="primary" onClick={createSlotConfig}>
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
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
                // minHeight: 600,
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
                    <Tab label="Slot List" {...a11yProps(0)} sx={{ whiteSpace: 'nowrap' }} />
                    <Tab label="Create Slots" {...a11yProps(1)} sx={{ whiteSpace: 'nowrap' }} />
                    <Tab label="Slot Config" {...a11yProps(2)} sx={{ whiteSpace: 'nowrap' }} />
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
const SlotConfig = () => {
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
                <Box
                    // sx={{ width: '26cm', position: 'fixed', zIndex: 1000 }}
                    sx={{
                        // Adjust the padding as needed
                        minWidth: '26cm',
                        position: 'fixed',
                        zIndex: 1000,
                    }}
                >
                    <Stack spacing={2}>
                        <Item>Slot Config</Item>
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
}

export default SlotConfig;