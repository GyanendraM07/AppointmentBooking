const appointmentRepo = require('../Repository/AppointmentRepository');
const patientRepo = require('../Repository/PatientRepository');
const deptRepo = require('../Repository/DepartmentRepository');
const slotconfigRepo = require('../Repository/SlotConfigRepository');
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');

class AppointmentService {

  static async getDepartmentList(companyId, branchId) {
    try {
      const deptList = await deptRepo.findDepartmentsByCompanyAndBranch(companyId, branchId);
      const simplifiedDepartments = deptList.map((department, index) => ({
        id: department._id,
        name: department.name,
        imgUrl:department.imageUrl,
        doctorList: department.doctorList.map((doctor, index) => ({
          id: doctor._id,
          name: doctor.name,
          imgUrl:doctor.imageUrl,
          index: index + 1,
        })),
        index: index + 1, // Adding 1 to make the index start from 1 (optional)
      }));
      return { status: true, message: 'DeptList Succesfull !!', deptList: simplifiedDepartments };
    } catch (error) {
      console.error('Error during DeptList  :', error.message);
      return { status: false, error: 'Internal Server Error', errormessage: 'DeptList  Failed !!' };
    }

  }

  static async getAvaliableSlots(companyId, branchId, deptId, docId, dayOfWeek, dayOfMonth) {
    try {
      const slotConfigList = await slotconfigRepo.getslotConfigForAppointment(companyId, branchId, deptId, docId);
      if (slotConfigList == null || slotConfigList.length === 0) {
        console.log('slotConfigList is Emplty');
        return { status: true, error: 'Null or undefined slotConfigList', errorMessage: 'SlotList Failed !!', slotsList: [] };
      }
      const slots = [];
      for (const slotConfig of slotConfigList) {
        const slotObject = {}
        if (slotConfig.apptStatus === 1) {
          slotObject.id = slotConfig.slotId.id;
          slotObject.slotname = slotConfig.slotId.startTime + '-' + slotConfig.slotId.endTime;
        } else if (slotConfig.apptStatus === 2 || slotConfig.apptStatus === 3) {
          if (slotConfig.dayWise[dayOfWeek] === 1) {
            slotObject.id = slotConfig.slotId.id;
            slotObject.slotname = slotConfig.slotId.startTime + '-' + slotConfig.slotId.endTime;
          }
        } else if (slotConfig.apptStatus === 4) {
          if (slotConfig.dateWise[dayOfMonth] === 1) {
            slotObject.id = slotConfig.slotId.id;
            slotObject.slotname = slotConfig.slotId.startTime + '-' + slotConfig.slotId.endTime;
          }
        }
        slots.push(slotObject);
      }
      return { status: true, message: 'SlotList  Succesfull !!', slotsList: slots };
    } catch (error) {
      console.error('Error during SlotList  :', error.message);
      return { status: false, error: 'Internal Server Error', errormessage: 'SlotList  Failed !!' };
    }

  }

  static async getAppointmentsByDept(deptId) {
    try {
      const appointments = await appointmentRepo.getAppointmentsByDept(deptId);
      return appointments;
    } catch (error) {
      throw error;
    }
  }

  static async getAppointmentsByDoctor(doctorId) {
    try {
      const appointments = await appointmentRepo.getAppointmentsByDoctor(doctorId);
      return appointments;
    } catch (error) {
      throw error;
    }
  }

  static async getAppointmentsByDateRange(startDate, endDate) {
    try {
      const appointments = await appointmentRepo.getAppointmentsByDateRange(startDate, endDate);
      return appointments;
    } catch (error) {
      throw error;
    }
  }

  static async  createAppointment(appointmentData,patientData) {
    try {
      const uniqueId = shortid.generate();
      appointmentData.appointmentDate = new Date(appointmentData.appointmentDate);
      appointmentData.apptUniqueId = uniqueId;
      appointmentData.appointmentStatus = 1;
      appointmentData.isActive = 1;
      const savedAppointment = await appointmentRepo.createAppointment(appointmentData);
      const patient = await patientRepo.getPatientById(savedAppointment.patientId);
      patient.appointmentStatus = 1;
      patient.isActive = 1;
      patient.appointmentList = [...patient.appointmentList, savedAppointment.id];
      await patient.save();
      return { status: true, message: 'Appointment Booked Succesfully And AppointmentId is '+  savedAppointment.apptUniqueId+'!!'};
    } catch (error) {
      console.error('Error during Appointment Booking  :', error.message);
      return { status: false, error: 'Internal Server Error', errormessage: 'Appointment Booking  Failed !!' };
    }
  }

  static async getOtpAndStorePt(patientData) {
    try {
      const savedPatient = await patientRepo.createPatient(patientData);
      return { status: true, message: 'OTP Generated Succesfully !!',OTP:'1234', patientId: savedPatient.id};
    } catch (error) {
      console.error('Error during OTP Generating  :', error.message);
      return { status: false, error: 'Internal Server Error', errormessage: 'OTP Generate Failed !!'};
    }
  }

  // Other business logic methods can be added as needed
}

module.exports = AppointmentService;
