import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../../Styles/patientportal.css";
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { border } from '@mui/system';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import cardioImage from '../../assets/images/patientportal/cardio.jpeg';
import dental from '../../assets/images/patientportal/dental.jpeg';
import emergency from '../../assets/images/patientportal/emergency.jpeg';
import opd from '../../assets/images/patientportal/opd.jpeg';
import opthmo from '../../assets/images/patientportal/Opthmo.jpeg';
import orthopedic from '../../assets/images/patientportal/heart colored.png';
import pulomanary from '../../assets/images/patientportal/esophagus.png';
import { getDeparmentList, getTokenAndDataforApt, getSlotsList, bookAppointment, generateOTP } from '../../api/Apicall'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const departments = [
  { id: 1, name: 'Cardiology', image: cardioImage },
  { id: 2, name: 'Dental', image: dental },
  { id: 3, name: 'Emergency', image: emergency },
  { id: 4, name: 'OPD', image: opd },
  { id: 5, name: 'Opthmology', image: opthmo },
  { id: 6, name: 'Orthopadic', image: orthopedic },
  { id: 7, name: 'Pulomanary', image: pulomanary }
];
const doctors = [
  { id: 1, name: 'Doctor1', image: cardioImage },
  { id: 2, name: 'Doctor2', image: dental },
  { id: 3, name: 'Doctor3', image: emergency },
  { id: 4, name: 'Doctor4', image: opd },
  { id: 5, name: 'Doctor5', image: opthmo },
  { id: 6, name: 'Doctor6', image: orthopedic },
  { id: 7, name: 'Doctor7', image: pulomanary }
];

const steps = ['Langauge  Selection', 'Contact Details', 'Personal Details', 'Appointment Booked', 'payment'];

export default function HorizontalNonLinearStepper() {
  const { t, i18n } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [age, setAge] = useState(0);
  const [lang, setLang] = useState('en');
  const [pttype, setPttype] = useState('');
  const [companyid, setCompanyid] = useState("");
  const [branchid, setBranchid] = useState("");
  const [channelid, setChannelid] = useState("");
  const [patientid, setPatientid] = useState("");
  const [OTP, setOTP] = useState("");
  const [departmentid, setDepartmentid] = useState("");
  const [doctorid, setDoctorid] = useState("");
  const [slotid, setSlotid] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [slotmname, setSlotname] = useState("");
  const [selecteddate, setSelecteddate] = useState(null);
  const [deptlist, setDeptlist] = useState([{}]);
  const [doclist, setDoclist] = useState([{}]);
  const [slotlist, setSlotlist] = useState([]);
  const [formData, setFormData] = useState({ fullName: '', contactNo: '', otpNo: '', showOtp: false, disableContactNo: false, disablegetOtp: false, disableverifyOtp: false, otpSucces: false, verifiedMsg: '', checkDept: false, checkDoc: false, showTable: false, succesMsg: '' });
  const [patientdata, setPatientdata] = useState({ fullName: '', contactNo: '' });
  const [patientTimgUrl, setPatientTimgUrl] = useState({ IP: 'http://localhost:9000/abbs/patient_type/ipnew.png', OP: 'http://localhost:9000/abbs/patient_type/opnew.png', HC: 'http://localhost:9000/abbs/patient_type/hcnew.png', IPN: 'http://localhost:9000/abbs/patient_type/ipnew_sel_th.png', OPN: 'http://localhost:9000/abbs/patient_type/opnew_sel_th.png', HCN: 'http://localhost:9000/abbs/patient_type/hcnew_sel_th.png' });

  // bebasi bebas mere haal pe hai 
  // mera khyal mere khyal me hai 
  // utra sansso ki numaish ke liye 
  // magar dhadkane uski  janjaal me hai 

  useEffect(() => {

    const currentUrl = window.location.href;
    const lastSegment = currentUrl.substring(currentUrl.lastIndexOf('?') + 1);
    fetchTokenAndDateAcToUrl(lastSegment);
  }, []);

  const fetchTokenAndDateAcToUrl = async (url) => {
    try {
      const response = await getTokenAndDataforApt(url);
      setCompanyid(response.data.urlDetails.companyId);
      setBranchid(response.data.urlDetails.branchId);
      setChannelid(response.data.urlDetails.channelId);
      sessionStorage.setItem('token', response.data.token);
    } catch (error) {

    }
  }
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ?
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const departmentPage = async () => {
    const token = sessionStorage.getItem('token');
    const deptList = await getDeparmentList(companyid, branchid, token);
    if (deptList.status) {
      setDeptlist(deptList.deptList);
    } else {
      console.log("Error Occured");
    }

    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ?
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const selectLangauge = (lang) => {
    setLang(lang);
    i18n.changeLanguage(lang);
  };

  const selectPatientType = (pt) => {
    setPttype(pt);
  };

  const selectDepartment = (deptId, deptName) => {
    setDoclist(deptlist.find(dept => dept.id === deptId).doctorList);
    setDepartmentid(deptId);
    setDepartmentName(deptName);
  };
  const selectDoctor = (docId, docName) => {
    setDoctorid(docId);
    setDoctorName(docName);
  };
  const sendToDoctor = () => {
    const doc = deptlist.find(dept => dept.id === departmentid);
    console.log('doc    ', doc);
    setDoclist(deptlist.find(dept => dept.id === departmentid).doctorList);
    setFormData((prevData) => ({
      ...prevData,
      checkDept: true,
    }));
  }
  const backToDepartment = () => {
    setFormData((prevData) => ({
      ...prevData,
      checkDept: false,
    }));
  };

  const selectSlot = (slotId, slotName) => {
    setSlotid(slotId);
    setSlotname(slotName);
  };

  const bookingDetailschange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }

  const getOtp = async () => {
    try {
      const ptData = {
        fullName: formData.fullName,
        contactNo: formData.contactNo,
        companyId: companyid,
        branchId: branchid,
        channelId: channelid,
        patientTypeId: '657f665c4db859cd3f60c5b3',
        gender:'Male'
      }
      const token = sessionStorage.getItem('token');
      const response = await generateOTP(ptData, token);
      setPatientid(response.patientId);
      setOTP(response.OTP);
      setFormData((prevData) => ({
        ...prevData,
        showOtp: true,
        disablegetOtp: true
      }));
    } catch (error) {
      console.log('error', error);
    }


    // setPatientdata((prevData) => ({
    //   ...prevData,
    //   fullName: formData.fullName,
    //   contactNo: formData.contactNo
    // }));
  }

  const verifyOtp = () => {
    // setFormData((prevData) => ({
    //   ...prevData,
    // }));
    setFormData((prevData) => ({
      ...prevData,
      otpSucces: formData.otpNo === OTP ? true : false,
      verifiedMsg: formData.otpNo === OTP ? 'OTP Verified Succesfully ' : 'Incorrect OTP',
    }));
  }

  const selectApptDate = async (date) => {
    try {
      const customFormattedDate = date.format('DD-MM-YYYY HH:mm:ss');
      setSelecteddate(date);
      const dayOfWeek = date.format('dddd'); // Full day name
      const dayOfMonth = date.date(); // Day of the month (1-31)
      const month = date.format('MMMM'); // Full month name
      const year = date.year(); // 4-digit year
      const daayy = dayOfWeek.toLowerCase();
      const token = sessionStorage.getItem('token');
      const response = await getSlotsList(companyid, branchid, departmentid, doctorid, daayy, dayOfMonth, token);
      if (response.status && response.slotsList.length !== 0) {
        setSlotlist(response.slotsList);
        console.log('response.slotsList', response.slotsList);
      } else {
        console.log('response.slotsList Empty');
      }
    } catch (error) {
      console.error('Error in Slot List ', error);
    }
  }

  const showTable = () => {
    setFormData((prevData) => ({
      ...prevData,
      showTable: true,
    }));
  }

  const backToSlot = () => {
    setFormData((prevData) => ({
      ...prevData,
      showTable: false,
    }));
  }

  const submitAppointment = async () => {
    try {
      // const patientData = {
      //   fullName: formData.fullName,
      //   contactNo: formData.contactNo,
      //   patientType: '657497034a41bd2caf35e50b',
      //   companyId: companyid,
      //   branchId: branchid,
      // }
      const appointmentData = {
        appointmentDate: selecteddate.format('DD-MM-YYYY HH:mm:ss'),
        patientId: patientid,
        departmentId: departmentid,
        doctorId: doctorid,
        slotId: slotid,
        companyId: companyid,
        branchId: branchid,
        channelTypeId: channelid,
        patientTypeId:'657f665c4db859cd3f60c5b3',
      }
      const token = sessionStorage.getItem('token');
      const response = await bookAppointment(appointmentData, token);
      formData.succesMsg = response.message
      setActiveStep(4);

    } catch (error) {
      console.log(error);
      formData.succesMsg = error.message
    }
  }

  return (
    <Box sx={{ width: '100%', mt: '3cm' }} className="pat-body">
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit">
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div style={{ marginTop: '1cm' }}>
        {(
          <React.Fragment>
            {activeStep === 0 ? (
              <div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <p>{t('selectLangHeading')}</p>
                  </div><br></br>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div onClick={() => selectLangauge('hi')} style={{
                      borderRadius: '20px',
                      width: '5cm',
                      height: '1cm',
                      display: 'flex',
                      alignItems: 'center', // Center vertically
                      justifyContent: 'left', // Center horizontally
                      textAlign: 'right',
                      fontFamily: 'Sans-serif',
                      paddingLeft: '15px', // Adjust marginLeft as needed
                      color: 'white',
                      fontSize: '20px',
                      cursor: 'pointer',
                      backgroundColor: lang === 'hi' ? '#3A7E87 ' : '#697D80  ',
                      border: lang === 'hi' ? '2px  solid  #3A7E87' : ' ',

                    }}>
                      <input type='radio' name='lang' style={{ width: '18px', height: '18px' }} checked={lang === 'hi'}></input>&nbsp;&nbsp;
                      <p>आ</p>&nbsp;&nbsp;
                      <p>हिंदी</p>
                    </div>
                  </div><br></br>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div onClick={() => selectLangauge('en')} style={{
                      border: '1px solid #000', // Border color
                      borderRadius: '20px',
                      width: '5cm',
                      height: '1cm',
                      display: 'flex',
                      alignItems: 'center', // Center vertically
                      justifyContent: 'left', // Center horizontally
                      textAlign: 'right',
                      fontFamily: 'Sans-serif',
                      paddingLeft: '15px', // Adjust marginLeft as needed
                      backgroundColor: '#A0A7AB ',
                      color: 'white',
                      fontSize: '20px',
                      cursor: 'pointer',
                      backgroundColor: lang === 'en' ? '#3A7E87 ' : '#697D80  ',
                      border: lang === 'hi' ? '2px  solid  #3A7E87' : '',
                    }}>
                      <input type='radio' name='lang' style={{ width: '18px', height: '18px' }} checked={lang === 'en'}></input>&nbsp;&nbsp;
                      <p>Aa</p>&nbsp;&nbsp;
                      <p>English</p>
                    </div>
                  </div>
                </div><br></br>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <p>{t('selectPatientTypeHeading')}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      onClick={() => selectPatientType('IP')}
                      className='transparent-image'
                      src={pttype === 'IP' ? patientTimgUrl.IPN : patientTimgUrl.IP}
                      style={{
                        width: pttype === 'IP' ? '90px' : '80px',
                        height: pttype === 'IP' ? '90px' : '80px',
                        // width: '80px',
                        // height: '80px',
                        marginBottom: '5px',
                        cursor: 'pointer'
                      }}
                    />
                    <img
                      onClick={() => selectPatientType('OP')}
                      className='transparent-image'
                      src={pttype === 'OP' ? patientTimgUrl.OPN : patientTimgUrl.OP}
                      style={{
                        width: pttype === 'OP' ? '90px' : '80px',
                        height: pttype === 'OP' ? '90px' : '80px',
                        marginBottom: '5px',
                        marginLeft: '1cm',
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      onClick={() => selectPatientType('HC')}
                      className='transparent-image'
                      src={pttype === 'HC' ? patientTimgUrl.HCN : patientTimgUrl.HC}
                      style={{
                        width: pttype === 'HC' ? '90px' : '80px',
                        height: pttype === 'HC' ? '90px' : '80px',
                        marginBottom: '5px',
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button disabled={lang === '' || pttype === ''} variant="contained" size="medium" sx={{ width: '100%', maxWidth: '4cm', mt: '1cm', backgroundColor: '#3A7E87' }} onClick={handleNext}>
                    {t('next')}
                  </Button>
                </div>
              </div>
            ) : null}
            {activeStep === 1 ? (
              <div >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <TextField sx={{ width: '100%', maxWidth: '8cm' }}
                    fullWidth
                    label={t('fullName')}
                    variant="standard"
                    margin="normal"
                    onChange={(e) => bookingDetailschange('fullName', e.target.value)}
                    value={formData.fullName}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <TextField sx={{ width: '100%', maxWidth: '5cm' }}
                    fullWidth
                    label={t('contactNo')}
                    variant="standard"
                    margin="normal"
                    onChange={(e) => bookingDetailschange('contactNo', e.target.value)}
                    value={formData.contactNo}
                  />
                  <Button onClick={getOtp} disabled={formData.contactNo.length !== 10 || !formData.fullName.trim() || formData.disablegetOtp} variant="outlined" size="small" sx={{ mt: '0.60cm', ml: '0.4cm', height: '2.6rem', width: '6rem', fontSize: '0.75rem' }}>
                    {t('getOTP')}
                  </Button>
                </div>
                {formData.showOtp ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField sx={{ width: '100%', maxWidth: '5cm' }}
                      fullWidth
                      label={t('otpNumber')}
                      variant="standard"
                      margin="normal"
                      onChange={(e) => bookingDetailschange('otpNo', e.target.value)}
                      value={formData.otpNo}
                    />  <Button disabled={formData.otpNo.length !== 4 || formData.disableverifyOtp} onClick={verifyOtp} variant="outlined" size="small" sx={{ mt: '0.60cm', ml: '0.4cm', height: '2.6rem', width: '6rem', fontSize: '0.75rem' }} >
                      {t('verifyOTP')}
                    </Button>
                  </div>) : null}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {formData.otpSucces ? (
                    <p style={{ color: 'green' }}> {formData.verifiedMsg}</p>
                  ) : <p style={{ color: 'red' }}> {formData.verifiedMsg}</p>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="contained" size="medium" sx={{ width: '100%', maxWidth: '3cm', mt: '2cm', backgroundColor: '#3A7E87' }} onClick={handleBack}>
                    {t('back')}
                  </Button>
                  {/* disabled={!formData.otpSucces}  */}
                  <Button disabled={!formData.otpSucces} variant="contained" size="medium" sx={{ width: '100%', maxWidth: '3cm', mt: '2cm', ml: '1cm', backgroundColor: '#3A7E87' }} onClick={departmentPage}>
                    {t('next')}
                  </Button>
                </div>
              </div>
            ) : null}
            {activeStep === 2 ? (
              <div>
                {!formData.checkDept ? (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <p >Select Department</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '20px',
                          flexWrap: 'wrap',
                          overflowY: 'auto', // Enable vertical scrolling
                          maxHeight: '400px', // Set a maximum height for the content
                          width: '100%',
                          maxWidth: '15cm',
                          padding: '10px 16px', // Equal padding of 16px from left and right
                          boxSizing: 'border-box', // Ensure padding is included in the width
                        }}
                      >
                        {deptlist.map((department, index) => (
                          <Paper key={index + 1} elevation={3} sx={{
                            p: 1,
                            textAlign: 'center',
                            height: '3cm',
                            width: '3cm', // play with width to set the How many boxes want in one line 
                            // width: 'calc(33.33% - 16px)', // Adjust the width for smaller boxes and three in one line
                            boxSizing: 'border-box',
                            // boxShadow: '0 16px 32px rgba(0, 0, 0, 0.2)',
                            // backgroundColor: '#3A7E87'
                            backgroundColor: 'transparent',
                            border: department.id === departmentid ? '2px solid blue' : '2px solid transparent',
                            transform: department.id === departmentid ? 'scale(1.1)' : 'scale(1)',
                            // marginTop: '1cm',

                            cursor: 'pointer'
                            // '@media (max-width: 600px)': {76
                            //   // Adjustments for small screens
                            //   width: '100%', // Allow 1 box in one row on small screens
                            // },
                          }} onClick={() => selectDepartment(department.id, department.name)}>
                            <img
                              className='transparent-image'
                              src={department.imgUrl}
                              alt={department.name}
                              style={{
                                width: '50px',
                                height: '50px',
                                marginBottom: '5px',
                              }}
                            />
                            <Typography variant="body2">{department.name}</Typography>
                          </Paper>
                        ))}
                      </Box>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button disabled={departmentid === ''} variant="contained" size="medium" sx={{ width: '100%', maxWidth: '3cm', mt: '2cm', ml: '1cm', backgroundColor: '#3A7E87' }} onClick={sendToDoctor}>
                        Next
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <p >Select Doctor</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '20px',
                          flexWrap: 'wrap',
                          overflowY: 'auto', // Enable vertical scrolling
                          maxHeight: '400px', // Set a maximum height for the content
                          width: '100%',
                          maxWidth: '15cm',
                          padding: '10px 16px', // Equal padding of 16px from left and right
                          boxSizing: 'border-box', // Ensure padding is included in the width
                        }}
                      >
                        {doclist.map((doctor, index) => (
                          <Paper key={index + 1} elevation={3} sx={{
                            p: 1,
                            textAlign: 'center',
                            height: '3cm',
                            width: '3cm', // play with width to set the How many boxes want in one line 
                            // width: 'calc(33.33% - 16px)', // Adjust the width for smaller boxes and three in one line
                            boxSizing: 'border-box',
                            // boxShadow: '0 16px 32px rgba(0, 0, 0, 0.2)',
                            // backgroundColor: '#3A7E87'
                            backgroundColor: 'transparent',
                            border: doctor.id === doctorid ? '2px solid blue' : '2px solid transparent',
                            transform: doctor.id === doctorid ? 'scale(1.1)' : 'scale(1)',
                            // marginTop: '1cm',
                            cursor: 'pointer'
                            // '@media (max-width: 600px)': {
                            //   // Adjustments for small screens
                            //   width: '100%', // Allow 1 box in one row on small screens
                            // },
                          }} onClick={() => selectDoctor(doctor.id, doctor.name)}>
                            <img
                              className='transparent-image'
                              src={doctor.imgUrl}
                              alt={doctor.name}
                              style={{
                                width: '50px',
                                height: '50px',
                                marginBottom: '5px',
                              }}
                            />
                            <Typography variant="body2">{doctor.name}</Typography>
                          </Paper>
                        ))}
                      </Box>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button variant="contained" size="medium" sx={{ width: '100%', maxWidth: '3cm', mt: '2cm', backgroundColor: '#3A7E87' }} onClick={backToDepartment}>
                        Back
                      </Button>
                      <Button disabled={doctorid === ''} variant="contained" size="medium" sx={{ width: '100%', maxWidth: '3cm', mt: '2cm', ml: '1cm', backgroundColor: '#3A7E87' }} onClick={handleNext}>
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
            {activeStep === 3 ? (
              <div>
                {!formData.showTable ? (
                  <div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DemoItem >
                          <DatePicker label="Basic date picker"
                            slotProps={{ textField: { variant: 'standard' } }}
                            value={selecteddate}
                            onChange={selectApptDate}
                          />
                        </DemoItem>
                      </LocalizationProvider>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '20px',
                          flexWrap: 'wrap',
                          overflowY: 'auto', // Enable vertical scrolling
                          maxHeight: '400px', // Set a maximum height for the content
                          width: '100%',
                          maxWidth: '15cm',
                          padding: '10px 16px', // Equal padding of 16px from left and right
                          boxSizing: 'border-box', // Ensure padding is included in the width
                        }}
                      >
                        {slotlist.map((slot, index) => (
                          <Paper key={index + 1} elevation={3} sx={{
                            p: 1,
                            textAlign: 'center',
                            height: '1cm',
                            width: '4cm', // play with width to set the How many boxes want in one line 
                            // width: 'calc(33.33% - 16px)', // Adjust the width for smaller boxes and three in one line
                            boxSizing: 'border-box',
                            // boxShadow: '0 16px 32px rgba(0, 0, 0, 0.2)',
                            // backgroundColor: '#3A7E87'
                            backgroundColor: 'transparent',
                            border: slot.id === slotid ? '2px solid blue' : '2px solid transparent',
                            transform: slot.id === slotid ? 'scale(1.1)' : 'scale(1)',
                            marginTop: '1cm',
                            // marginBottom: '1cm',
                            cursor: 'pointer'
                            // '@media (max-width: 600px)': {76
                            //   // Adjustments for small screens
                            //   width: '100%', // Allow 1 box in one row on small screens
                            // },
                          }} onClick={() => selectSlot(slot.id, slot.slotname)}>
                            <Typography variant="body2">{slot.slotname}</Typography>
                          </Paper>
                        ))}
                      </Box>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button variant="contained" size="medium" sx={{ width: '100%', maxWidth: '3cm', mt: '2cm', backgroundColor: '#3A7E87' }} onClick={handleBack}>
                        Back
                      </Button>
                      <Button disabled={slotid === ''} variant="contained" size="medium" sx={{ width: '100%', maxWidth: '3cm', mt: '2cm', ml: '1cm', backgroundColor: '#3A7E87' }} onClick={showTable} >
                     Next
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <br></br>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <TableContainer component={Paper} style={{ maxWidth: 500, background: 'transparent' }} >
                        <Table sx={{ maxWidth: 500 }} size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell colSpan={3} align="center" style={{ backgroundColor: '#3A7E87', color: 'white', fontSize: '20px' }}>
                                Patient Data
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody >
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                              <TableCell component="th" scope="row" align="right" style={{ fontSize: '16px' }}>
                                Patient Name :
                              </TableCell>
                              <TableCell align="left" style={{ fontSize: '16px' }}> {formData.fullName}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                              <TableCell component="th" scope="row" align="right" style={{ fontSize: '16px' }}>
                                Contact Number :
                              </TableCell>
                              <TableCell align="left" style={{ fontSize: '16px' }}>  {formData.contactNo}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                              <TableCell component="th" scope="row" align="right" style={{ fontSize: '16px' }}>
                                Patient Type :
                              </TableCell>
                              <TableCell align="left" style={{ fontSize: '16px' }}>  {pttype}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                              <TableCell component="th" scope="row" align="right" style={{ fontSize: '16px' }}>
                                Department Name :
                              </TableCell>
                              <TableCell align="left" style={{ fontSize: '16px' }}> {departmentName}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                              <TableCell component="th" scope="row" align="right" style={{ fontSize: '16px' }}>
                                Doctor Name :
                              </TableCell>
                              <TableCell align="left" style={{ fontSize: '16px' }}> {doctorName}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                              <TableCell component="th" scope="row" align="right" style={{ fontSize: '16px' }}>
                                Appointment Slot :
                              </TableCell>
                              <TableCell align="left" style={{ fontSize: '16px' }}> {slotmname}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button variant="contained" size="medium" sx={{ width: '100%', maxWidth: '3cm', mt: '2cm', backgroundColor: '#3A7E87' }} onClick={backToSlot}>
                        Back
                      </Button>
                      <Button disabled={slotid === ''} variant="contained" size="medium" sx={{ width: '100%', maxWidth: '3cm', mt: '2cm', ml: '1cm', backgroundColor: '#3A7E87' }} onClick={submitAppointment}>
                        Submit
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
            {activeStep === 4 ? (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h2>{formData.succesMsg}</h2>
              </div>
            ) : null}
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}