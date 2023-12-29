const ManageUrl = require('../Models/ManageUrl'); // Update the path accordingly

class ManageUrlRepository {
  // Create a new ManageUrl
  static async createManageUrl(data) {
    try {
      const newManageUrl = new ManageUrl(data);
      const savedManageUrl = await newManageUrl.save();
      return savedManageUrl;
    } catch (error) {
      throw error;
    }
  }

  // Get all ManageUrls
  static async getAllManageUrls() {
    try {
      const manageUrls = await ManageUrl.find();
      return manageUrls;
    } catch (error) {
      throw error;
    }
  }

  // Get a ManageUrl by ID
  static async getManageUrlById(id) {
    try {
      const manageUrl = await ManageUrl.findById(id);
      return manageUrl;
    } catch (error) {
      throw error;
    }
  }

  // Get a ManageUrl by urlName
  static async getManageUrlByurlName(urlName) {
    try {
      const result = await ManageUrl.findOne({ urlName:urlName, isActive: 1 })
        .select(' _id companyId branchId channelId patientTypeId departmentId');
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Update a ManageUrl by ID
  static async updateManageUrlById(id, data) {
    try {
      const updatedManageUrl = await ManageUrl.findByIdAndUpdate(id, data, { new: true });
      return updatedManageUrl;
    } catch (error) {
      throw error;
    }
  }

  // Delete a ManageUrl by ID
  static async deleteManageUrlById(id) {
    try {
      const deletedManageUrl = await ManageUrl.findByIdAndDelete(id);
      return deletedManageUrl;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ManageUrlRepository;
