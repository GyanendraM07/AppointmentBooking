const slotConfig = require('../Models/SlotConfig'); // Update the path accordingly

class SlotConfigRepository {
  static async createSlotConfig(slotConfigData) {
    try {
      const newSlotConfig = new slotConfig(slotConfigData);
      const savedSlotConfig = await newSlotConfig.save();
      return savedSlotConfig;
    } catch (error) {
      throw error;
    }
  }

  static async findSlotConfigByDetails( companyId,branchId, departmentId, doctorId, slotId) {
    try {
      const slotConfigdat = await slotConfig.findOne({
        branchId,
        companyId,
        departmentId,
        doctorId,
        slotId,
      });

      return slotConfigdat;
    } catch (error) {
      throw error;
    }
  }
  static async getslotConfigForAppointment( companyId,branchId, departmentId, doctorId) {
    try {
      const slotConfigdat = await slotConfig.find({
        branchId,
        companyId,
        departmentId,
        doctorId
      }).populate('slotId');

      return slotConfigdat;
    } catch (error) {
      throw error;
    }
  }

  static async getSlotConfigById(slotConfigId) {
    try {
      const slotConfig = await slotConfig.findById(slotConfigId);
      return slotConfig;
    } catch (error) {
      throw error;
    }
  }

  // Add more CRUD operations as needed

  // Update slot config
  static async updateSlotConfig(slotConfigId, updateData) {
    try {
      const updatedSlotConfig = await slotConfig.findByIdAndUpdate(
        slotConfigId,
        { $set: updateData },
        { new: true }
      );
      return updatedSlotConfig;
    } catch (error) {
      throw error;
    }
  }

  // Delete slot config
  static async deleteSlotConfig(slotConfigId) {
    try {
      const deletedSlotConfig = await slotConfig.findByIdAndDelete(slotConfigId);
      return deletedSlotConfig;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SlotConfigRepository;
