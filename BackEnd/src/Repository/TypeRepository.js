const Type = require('../Models/PatientType'); // Update the path based on your project structure

class TypeRepository {
  static async createType(typeData) {
    try {
      const type = new Type(typeData);
      return await type.save();
    } catch (error) {
      throw error;
    }
  }

  static async getTypeById(typeId) {
    try {
      return await Type.findById(typeId).exec();
    } catch (error) {
      throw error;
    }
  }

  static async getAllTypes() {
    try {
      return await Type.find({}).exec();
    } catch (error) {
      throw error;
    }
  }

  // Add other CRUD methods as needed
}

module.exports = TypeRepository;
