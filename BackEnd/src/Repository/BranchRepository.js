const Branch = require('../Models/Branch'); // Update the path based on your project structure

class BranchRepository {
  static async createBranch(branchData) {
    try {
      const branch = new Branch(branchData);
      return await branch.save();
    } catch (error) {
      throw error;
    }
  }

  static async getBranchById(branchId) {
    try {
      return await Branch.findById(branchId).exec();
    } catch (error) {
      throw error;
    }
  }

  static async getAllBranches() {
    try {
      return await Branch.find({}).exec();
    } catch (error) {
      throw error;
    }
  }

  // Add other CRUD methods as needed
}

module.exports = BranchRepository;
