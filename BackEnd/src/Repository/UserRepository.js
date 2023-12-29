const mongoose = require('mongoose');
const User = require('../Models/User'); // Assuming your model is in a separate file

class UserDao {
  static async createUser(userObject) {
    try {
      const newUser = new User(userObject);
      const result = await newUser.save();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(userId) {
    try {
      const user = await User.findById(userId)
        .populate({
          path: 'menuFunctionList',
          match: { isActive: 1 },
          select: ' -password -createdDate -__v -submenuList',
          options: { sort: { sequence: 1 } }, // Sort menuFunctionList by sequence in ascending order
          // populate: {
          //   path: 'submenuList',
          //   model: 'SubMenuFunctionMaster',
          //   select: ' -password -createdDate -__v ',
          //   match: { isActive: 1 },
          //   options: { sort: { sequence: 1 } }, // Sort submenuList by sequence in ascending order
          // },
        })
        .populate({
          path: 'submenuList',
          model: 'SubMenuFunctionMaster',
          select: ' -password -createdDate -__v ',
          match: { isActive: 1 },
          options: { sort: { sequence: 1 } }, // Sort submenuList by sequence in ascending order
        })
      // .exec();
      // .populate({
      //   path: 'funConfigList',
      //   options: { strictPopulate: false },
      //   populate: [
      //     {
      //       path: 'menuId',
      //       model: 'MenuFunctionMaster',
      //     },
      //     {
      //       path: 'subMenuIds',
      //       model: 'SubMenuFunctionMaster',
      //     },
      //   ],
      // })
      // .exec();

      // Assuming user.menuFunctionList is an array of objects
      user.menuFunctionList = user.menuFunctionList.map((menuFunction) => {
        if (menuFunction.menuIndicator === 2) {//me 2 means has subMenus
          menuFunction.submenuList = user.submenuList
            .filter(submenuItem => submenuItem.menuId.equals(menuFunction.id));
        }
        return menuFunction;
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getuserByIdforUserDash(userId) {
    try {
      const user = await User.findById(userId)
      .select('_id name email companyId navIndicator') 
        .populate({
          path: 'menuFunctionList',
          match: { isActive: 1 },
          select: '_id headerName routeModuleName menuIndicator sequence',
          options: { sort: { sequence: 1 } }, // Sort menuFunctionList by sequence in ascending order
          // populate: {
          //   path: 'submenuList',
          //   model: 'SubMenuFunctionMaster',
          //   select: '_id headerName routeModuleName menuIndicator sequence',
          //   match: { isActive: 1 },
          //   options: { sort: { sequence: 1 } }, // Sort submenuList by sequence in ascending order
          // },
        })
        .populate({
          path: 'submenuList',
          model: 'SubMenuFunctionMaster',
          select: ' _id headerName routeModuleName menuIndicator sequence menuId',
          match: { isActive: 1 },
          options: { sort: { sequence: 1 } }, // Sort submenuList by sequence in ascending order
        })
        .populate({
          path: 'companyId',
          select: '_id name',
        })
        .populate({
          path: 'channelList',
          match: { isActive: 1 },
          select: '_id name',
        })
        .populate({
          path: 'patientTypeList',
          match: { isActive: 1 },
          select: '_id name',
        })
        .populate({
          path: 'departmentList',
          match: { isActive: 1 },
          select: '_id name',
        })
        .populate({
          path: 'branchList',
          match: { isActive: 1 },
          select: '_id name',
        });

      // Assuming user.menuFunctionList is an array of objects
      user.menuFunctionList = user.menuFunctionList.map((menuFunction) => {
        if (menuFunction.menuIndicator === 2) {//me 2 means has subMenus
          menuFunction.submenuList = user.submenuList
            .filter(submenuItem => submenuItem.menuId.equals(menuFunction.id));
        }
        return menuFunction;
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async findUserByEmail(email) {
    try {
      return await User.findOne({ email, isActive: 1 });
    } catch (error) {
      throw new Error(`Error finding user: ${error.message}`);
    }
  }


  static async updateUser(userId, updatedUserObject) {
    try {
      const result = await User.findByIdAndUpdate(userId, updatedUserObject, { new: true });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(userId) {
    try {
      const result = await User.findByIdAndDelete(userId);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Add more methods for querying users based on your application's requirements
}

module.exports = UserDao;
