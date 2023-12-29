const Company = require('../Models/Company'); // Update the path based on your project structure
const cryptoUtil = require('../security/cryptoUtils');


class CompanyRepository {
  static async createCompany(companyData) {
    try {
      const company = new Company(companyData);
      return await company.save();
    } catch (error) {
      throw error;
    }
  }

  static async getCompanyById(companyId) {
    try {
      return await Company.findById(companyId);
    } catch (error) {
      throw error;
    }
  }

  static async getCompanyByIdToPopulate(companyId) {
    try {
      return Company.findById(companyId).populate('channelList')
        .populate('branchList');
    } catch (error) {
      throw error;
    }
  }

  static async getAllCompanies() {
    try {
      const companies = await Company.find({})
        .populate('channelList')
        .populate('departmentList')
        .populate('doctorList')
        .populate('branchList')
        .populate('patientTypeList')
        .populate('manageUrlList')
        .populate({
          path:'roleList',
          select: '-__v',
          populate: [
            {
              path: 'menuFunctionList',
              select: '_id menuIndicator ',
              model: 'MenuFunctionMaster',
            },
            {
              path: 'submenuList',
              select: '_id menuId',
              model: 'SubMenuFunctionMaster',
            },
          ],
      })
        .populate('slotList')
        .populate({
          path: 'userList',
          select: '-password',
          populate: [
            {
              path: 'menuFunctionList',
              select: '_id menuIndicator ',
              model: 'MenuFunctionMaster',
            },
            {
              path: 'submenuList',
              select: '_id menuId',
              model: 'SubMenuFunctionMaster',
            },
          ],

        })
        .populate({
          path: 'menuFunctionList',
          populate: {
            path: 'submenuList',
            model: 'SubMenuFunctionMaster',
          },
        });

      // Iterate through companies and decrypt contactNo in each userList
      for (const company of companies) {
        // Decrypt contactNo in each User document within userList
        company.roleList = company.roleList.map(role => {
          role.menuFunctionList = role.menuFunctionList.map((menuFunction) => {
            if (menuFunction.menuIndicator === 2) {
              // Use company.submenuList instead of role.submenuList
              menuFunction.submenuList = company.submenuList
                .filter(submenuItem => submenuItem.menuId.equals(menuFunction.id)).map(submenuItem => submenuItem._id);
            }
            return menuFunction;
          });
          return role; // Make sure to return the updated role
        });
        company.userList = company.userList.map(user => {
          user.menuFunctionList = user.menuFunctionList.map((menuFunction) => {
            if (menuFunction.menuIndicator === 2) {//me 2 means has subMenus
              menuFunction.submenuList = user.submenuList
                .filter(submenuItem => submenuItem.menuId.equals(menuFunction.id)).map(submenuItem => submenuItem._id);
            }
            return menuFunction;
          });
          if (user.contactNo) {
            user.contactNo = cryptoUtil.decrypt(user.contactNo);
          }
          return user;
        });
      }
      return companies;
    } catch (error) {
      throw error;
    }
  }

  // Add other CRUD methods as needed
}

module.exports = CompanyRepository;
