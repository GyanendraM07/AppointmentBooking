const FunctionMaster = require('../Models/MenuFunctionMaster'); // Update the path based on your project structure

class FunctionMasterRepository {
  static async createFunctionMaster(functionMasterData) {
    try {
      const functionMaster = new FunctionMaster(functionMasterData);
      return await functionMaster.save();
    } catch (error) {
      throw error;
    }
  }

  static async getFunctionMasterById(functionMasterId) {
    try {
      return await FunctionMaster.findById(functionMasterId).exec();
    } catch (error) {
      throw error;
    }
  }

  static async getAllFunctionMasters() {
    try {
      return await FunctionMaster.find({}).exec();
    } catch (error) {
      throw error;
    }
  }
  static async fetchLastMenuSequence() {
    try {
      // Find the last inserted document, sorting by createdDate in descending order
      const lastInsertedFunctionMaster = await FunctionMaster
        .findOne({})
        .sort({ createdDate: -1 })
        .select('menuSequence')
        .exec();

      return lastInsertedFunctionMaster ? lastInsertedFunctionMaster.menuSequence : 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FunctionMasterRepository;
