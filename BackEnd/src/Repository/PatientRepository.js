const Patient = require('../Models/Patient');

class PatientRepository {
  // Create a new patient
  static async createPatient(data) {
    try {
      const patient = new Patient(data);
      return await patient.save();
    } catch (error) {
      throw error;
    }
  }

  // Retrieve a patient by ID
  static async getPatientById(patientId) {
    try {
      return await Patient.findById(patientId);
    } catch (error) {
      throw error;
    }
  }

  // Update a patient by ID
  static async updatePatientById(patientId, data) {
    try {
      return await Patient.findByIdAndUpdate(patientId, data, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // Delete a patient by ID
  static async deletePatientById(patientId) {
    try {
      return await Patient.findByIdAndDelete(patientId);
    } catch (error) {
      throw error;
    }
  }

  // Retrieve all patients
  static async getAllPatients() {
    try {
      return await Patient.find().populate('patientType appointmentId companyId branchId');
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PatientRepository;
