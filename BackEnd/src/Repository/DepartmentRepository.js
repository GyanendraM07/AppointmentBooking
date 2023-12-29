const Department = require('../Models/Department'); // Update the path based on your project structure

class DepartmentRepository {
  static async createDepartment(departmentData) {
    try {
      const department = new Department(departmentData);
      return await department.save();
    } catch (error) {
      throw error;
    }
  }

  static async getDepartmentById(departmentId) {
    try {
      return await Department.findById(departmentId).exec();
    } catch (error) {
      throw error;
    }
  }

  static async getAllDepartments() {
    try {
      return await Department.find({}).exec();
    } catch (error) {
      throw error;
    }
  }

  static async findDepartmentsByCompanyAndBranch(companyId, branchId) {
    try {
      return await Department.find({ isActive: 1,companyId:companyId,branchId: branchId }).populate('doctorList');
    } catch (error) {
      throw error;
    }
  };
}

module.exports = DepartmentRepository;
