const SubMenuFunctionMaster = require('../Models/SubMenuFunctionMaster'); // Assuming the model is in the same directory

class SubMenuFunctionMasterRepository {
  static async createSubMenuFunctionMaster(data) {
    try {
      const subMenuFunctionMaster = new SubMenuFunctionMaster(data);
      const result = await subMenuFunctionMaster.save();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async  fetchLastSubMenuSequenceByMenuId(menuId,companyId) {
    try {
        const lastInsertedSubMenu = await SubMenuFunctionMaster
            .findOne({ menuId ,companyId})
            .sort({ createdDate: -1 })
            .select('sequence')
            .exec();
        return lastInsertedSubMenu ? lastInsertedSubMenu.sequence : 0;
    } catch (error) {
        throw error;
    }
}

  static async fetchLastSubMenuSequence() {
    try {
      // Find the last inserted document, sorting by createdDate in descending order
      const lastInsertedFunctionMaster = await SubMenuFunctionMaster
        .findOne({})
        .sort({ createdDate: -1 })
        .select('sequence')
        .exec();
      return lastInsertedFunctionMaster ? lastInsertedFunctionMaster.sequence : 0;
    } catch (error) {
      throw error;
    }
  }

  static async getSubMenuFunctionMasterById(id) {
    try {
      const result = await SubMenuFunctionMaster.findById(id).populate('menuId').exec();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getAllSubMenuFunctionMasters() {
    try {
      const result = await SubMenuFunctionMaster.find().populate('menuId').exec();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async updateSubMenuFunctionMaster(id, data) {
    try {
      const result = await SubMenuFunctionMaster.findByIdAndUpdate(id, data, { new: true });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteSubMenuFunctionMaster(id) {
    try {
      const result = await SubMenuFunctionMaster.findByIdAndRemove(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SubMenuFunctionMasterRepository;
