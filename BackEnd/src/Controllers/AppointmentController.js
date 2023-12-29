const express = require('express');
const router = express.Router();
const appointmentService = require('../ControllerServices/AppointmentService');



router.get('/getDeptList', async (req, res) => {
  try {
    const { companyId, branchId } = req.query;
    const response = await appointmentService.getDepartmentList(companyId, branchId);
    if (response.status) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response);
    }
  } catch (error) {
    console.error('Error in  fetching DepartmentList :', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
  }
})

router.get('/getslotList', async (req, res) => {
  try {
    const { companyId, branchId, departmentId, doctorId, dayOfWeek, dayOfMonth } = req.query;
    const response = await appointmentService.getAvaliableSlots(companyId, branchId, departmentId, doctorId, dayOfWeek, dayOfMonth);
    if (response.status) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response);
    }
  } catch (error) {
    console.error('Error in  fetching DepartmentList :', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
  }
})

router.post('/generateOTP', async (req, res) => {
  try {
    const patinetData = req.body;
    const response = await appointmentService.getOtpAndStorePt(patinetData);
    if (response.status) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response);
    }
  } catch (error) {
    console.error('Error in  fetching DepartmentList :', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error', errormessage: 'Internal Server Error' });
  }
})

router.post('/createAppt', async (req, res) => {
  try {
    const appointmentData = req.body;
    const savedAppointment = await appointmentService.createAppointment(appointmentData);
    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});













// Create a new appointment


// //dummy api for Testing 
// router.get('/submit', async (req, res) => {
//     try {
//       // Dummy data for testing
//       const newAppointmentData = {
//         fullName: 'John Doe',
//         contactNo: '1234567890',
//         deptId: 1,
//         doctorId: 2,
//         slotId: 3,
//         appointmentDate: new Date('2023-11-22T08:00:00'),
//         paymentType: 1,
//         paymentId: 123,
//         companyId: 456,
//         branchId: 789,
//         patientType: 1,
//         channelType: 2,
//       };

//       // Create a new appointment instance
//       //const newAppointment = new Appointment(newAppointmentData);

//       // Save the appointment to the database
//       const savedAppointment = await AppointmentService.createAppointment(newAppointmentData);
//       console.error('Succes submitting appointment data:');
//       res.status(201).json(savedAppointment);
//     } catch (error) {
//       console.error('Error submitting appointment data:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

// // Get appointments by department
// router.get('/byDept/:deptId', async (req, res) => {
//   try {
//     const deptId = req.params.deptId;
//     const appointments = await AppointmentService.getAppointmentsByDept(deptId);
//     res.status(200).json(appointments);
//   } catch (error) {
//     console.error('Error getting appointments by department:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Get appointments by doctor
// router.get('/byDoctor/:doctorId', async (req, res) => {
//   try {
//     const doctorId = req.params.doctorId;
//     const appointments = await AppointmentService.getAppointmentsByDoctor(doctorId);
//     res.status(200).json(appointments);
//   } catch (error) {
//     console.error('Error getting appointments by doctor:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Get appointments by date range
// router.get('/byDateRange/:startDate/:endDate', async (req, res) => {
//   try {
//     const startDate = new Date(req.params.startDate);
//     const endDate = new Date(req.params.endDate);
//     const appointments = await AppointmentService.getAppointmentsByDateRange(startDate, endDate);
//     res.status(200).json(appointments);
//   } catch (error) {
//     console.error('Error getting appointments by date range:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

module.exports = router;
