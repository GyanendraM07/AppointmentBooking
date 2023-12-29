const MenuFunctionMaster = require('../Models/MenuFunctionMaster'); // Assuming the model is in the same directory

class MenuFunctionMasterRepository {
  static async createMenuFunctionMaster(data) {
    try {
      const menuFunctionMaster = new MenuFunctionMaster(data);
      const result = await menuFunctionMaster.save();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async fetchLastMenuSequence(companyId) {
    try {
      // Find the last inserted document, sorting by createdDate in descending order
      const lastInsertedFunctionMaster = await MenuFunctionMaster
        .findOne({companyId})
        .sort({ createdDate: -1 })
        .select('sequence')
        .exec();
      return lastInsertedFunctionMaster ? lastInsertedFunctionMaster.sequence : 0;
    } catch (error) {
      throw error;
    }
  }
  static async fetchFunctionList(companyId) {
    try {
        // Find the last inserted document, sorting by createdDate in descending order
        const menuFunctions = await MenuFunctionMaster.find({ companyId: companyId, isActive: 1 })
            .populate({
                path: '',
                match: { isActive: 1 }, // Filter active submenu items
                options: { sort: { sequence: 1 } } // Sort submenu items by sequence in ascending order
            })
            .sort({ sequence: 1 }) // Remove this line, sorting should be done within populate
            .exec();

        return menuFunctions;
    } catch (error) {
        throw error;
    }
}


  static async getMenuFunctionMasterById(id) {
    try {
      const result = await MenuFunctionMaster.findById(id).exec();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getAllMenuFunctionMasters() {
    try {
      const result = await MenuFunctionMaster.find().populate('submenuList').exec();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async updateMenuFunctionMaster(id, data) {
    try {
      const result = await MenuFunctionMaster.findByIdAndUpdate(id, data, { new: true });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteMenuFunctionMaster(id) {
    try {
      const result = await MenuFunctionMaster.findByIdAndRemove(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MenuFunctionMasterRepository;
