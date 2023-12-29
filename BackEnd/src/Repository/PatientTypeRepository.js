const PatientType = require('../Models/PatientType'); // Assuming your model file is in the same directory

class PatientTypeRepository {
  // Create a new patient type
  static async createPatientType(patientTypeData) {
    try {
      const patientType = new PatientType(patientTypeData);
      const result = await patientType.save();
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Get all patient types
  static async getAllPatientTypes() {
    try {
      const patientTypes = await PatientType.find();
      return patientTypes;
    } catch (error) {
      throw error;
    }
  }

  // Get patient type by ID
  static async getPatientTypeById(patientTypeId) {
    try {
      const patientType = await PatientType.findById(patientTypeId);
      return patientType;
    } catch (error) {
      throw error;
    }
  }

  // Update patient type by ID
  static async updatePatientTypeById(patientTypeId, updatedData) {
    try {
      const patientType = await PatientType.findByIdAndUpdate(patientTypeId, updatedData, { new: true });
      return patientType;
    } catch (error) {
      throw error;
    }
  }

  // Delete patient type by ID
  static async deletePatientTypeById(patientTypeId) {
    try {
      const result = await PatientType.findByIdAndDelete(patientTypeId);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PatientTypeRepository;
