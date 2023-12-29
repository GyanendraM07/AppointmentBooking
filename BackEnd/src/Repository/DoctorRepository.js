const Doctor = require('../Models/Doctor');

class DoctorRepository {
  static async createDoctor(doctorData) {
    try {
      const doctor = new Doctor(doctorData);
      return await doctor.save();
    } catch (error) {
      throw error;
    }
  }

  static async getDoctorById(doctorId) {
    try {
      return await Doctor.findById(doctorId).exec();
    } catch (error) {
      throw error;
    }
  }

  static async getAllDoctors() {
    try {
      return await Doctor.find({}).exec();
    } catch (error) {
      throw error;
    }
  }

  static async updateDoctor(doctorId, updatedData) {
    try {
      return await Doctor.findByIdAndUpdate(doctorId, updatedData, { new: true }).exec();
    } catch (error) {
      throw error;
    }
  }

  static async deleteDoctor(doctorId) {
    try {
      return await Doctor.findByIdAndDelete(doctorId).exec();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DoctorRepository;
