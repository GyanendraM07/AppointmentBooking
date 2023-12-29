const Appointment = require('../models/appointment');
    /*
      File: AppointmentRepository.js
      Author: Gyanendra Mishra
      Created Date: November 22, 2023
      Description: This file contains Dao of  Appointment.
      Used async to resolve the promise because saving data to the database returns a promise.
      Used await to wait until the data gets saved.
      Static ensures that the function belongs to the class, not to an instance of the class.
    */
      
class AppointmentRepository {
    // Create a new appointment using async/await.
    static async createAppointment(appointmentData) {
        try {
            const appointment = new Appointment(appointmentData);
            const savedAppointment = await appointment.save();
            return savedAppointment;
        } catch (error) {
            throw error;
        }
    }

    // Get appointments by department
    static async getAppointmentsByDept(deptId) {
        try {
            const appointments = await Appointment.find({ deptId });
            return appointments;
        } catch (error) {
            throw error;
        }
    }

    // Get appointments by doctor
    static async getAppointmentsByDoctor(doctorId) {
        try {
            const appointments = await Appointment.find({ doctorId });
            return appointments;
        } catch (error) {
            throw error;
        }
    }

    // Get appointments by date range
    static async getAppointmentsByDateRange(startDate, endDate) {
        try {
            const appointments = await Appointment.find({
                appDate: { $gte: startDate, $lte: endDate },
            });
            return appointments;
        } catch (error) {
            throw error;
        }
    }

    // Other CRUD operations can be added as needed
}

module.exports = AppointmentRepository;
