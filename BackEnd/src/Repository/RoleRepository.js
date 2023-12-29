const Role = require('../Models/Role');

class RoleRepository {
  // Create a new user role
  static async createRole(roleData) {
    try {
      const newRole = new Role(roleData);
      const savedRole = await newRole.save();
      return savedRole;
    } catch (error) {
      throw error;
    }
  }

  // Get all user roles
  static async getAllRoles() {
    try {
      const roles = await Role.find();
      return roles;
    } catch (error) {
      throw error;
    }
  }

  // Get a user role by ID
  static async getRoleById(roleId) {
    try {
      const role = await Role.findById(roleId);
      return role;
    } catch (error) {
      throw error;
    }
  }

  // Update a user role by ID
  static async updateRoleById(roleId, updatedData) {
    try {
      const updatedRole = await Role.findByIdAndUpdate(roleId, updatedData, { new: true });
      return updatedRole;
    } catch (error) {
      throw error;
    }
  }

  // Delete a user role by ID
  static async deleteRoleById(roleId) {
    try {
      const deletedRole = await Role.findByIdAndDelete(roleId);
      return deletedRole;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RoleRepository;
