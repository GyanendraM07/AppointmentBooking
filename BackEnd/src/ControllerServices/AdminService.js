const userRepo = require('../Repository/UserRepository');
const companyRepo = require('../Repository/CompanyRepository');
const roleRepo = require('../Repository/RoleRepository');
const branchRepo = require('../Repository/BranchRepository');
const deptRepo = require('../Repository/DepartmentRepository');
const doctorRepo = require('../Repository/DoctorRepository');
const channelRepo = require('../Repository/ChannelRepository');
const slotRepo = require('../Repository/SlotRepository');
const slotconfigRepo = require('../Repository/SlotConfigRepository');
const funmasterRepo = require('../Repository/FunctionMasterRepository');
const menuFunctionRepo = require('../Repository/MenuFunctionMasterRepository');
const subMenuFunctionRepo = require('../Repository/SubMenuFunctionMasterRepository');
const patientTypeRepo = require('../Repository/PatientTypeRepository');
const manageUrlRepo = require('../Repository/ManageUrlRepository');
const cryptoUtil = require('../security/cryptoUtils');

class AdminService {

    static async createUser(userData) {
        try {
            userData.contactNo = cryptoUtil.encrypt(userData.contactNo);
            userData.password = cryptoUtil.encrypt(userData.password);
            const user = await userRepo.createUser(userData);
            const company = await companyRepo.getCompanyById(user.companyId);
            company.userList = [...company.userList, user.id];
            const updatedCompany = await company.save();
            if(user.roleId !=null){
            const role = await roleRepo.getRoleById(user.roleId);
            role.userList = [...role.userList, user.id];
            const updatedRole = await role.save();
            user.menuFunctionList = role.menuFunctionList;
            user.submenuList = role.submenuList;
            await user.save();
            }
            const companyList = await companyRepo.getAllCompanies();
            return { success: true, message: 'User created successfully !!', companyList: companyList };
        } catch (error) {
            console.error('Error during user creation in service:', error.message);
            return { success: false, error: 'Internal Server Error' };
        }

    }

    static async updateUser(userData) {
        try {
            const user = await userRepo.getUserById(userData._id);
            user.name = userData.name;
            user.email = userData.email;
            user.updatedDate = new Date();
            user.updatedBy = userData.updatedBy;
            user.contactNo = cryptoUtil.encrypt(userData.contactNo);
            user.isActive = userData.isActive;
            // if(user.roleId==+userData.roleId){
            user.roleId = userData.roleId;
            user.save();
            // }else{

            // }
            const companyList = await companyRepo.getAllCompanies();
            return { success: true, message: 'User update successfully !!', companyList: companyList };
        }
        catch (error) {
            console.error('Error during updation of user :', error.message);
            return { success: false, error: 'Internal Server Error' };
        }
    }

    static async userFunctionAcces(menuIdList,subMenuIdList, userID) {
        try {
            const user = await userRepo.getUserById(userID);
            user.menuFunctionList = menuIdList;
            user.submenuList = subMenuIdList;
            const updatedUser = await user.save();
            const companyList = await companyRepo.getAllCompanies();
            return { success: true, message: updatedUser.name + updatedUser.email + 'Updated successfully !!', companyList: companyList };
        } catch (error) {
            console.error('Error during updation of user :', error.message);
            return { success: false, error: 'Internal Server Error' };
        }
    }

    static async createRole(role) {
        try {
            const updateRole = await roleRepo.createRole(role);
            const company = await companyRepo.getCompanyById(updateRole.companyId);
            company.roleList = [...company.roleList, updateRole.id];
            const savedCompany = await company.save();
            const companyList = await companyRepo.getAllCompanies();
            return { status: true, message: 'Role' + updateRole.name + 'Created SuccesFully!!', companyList: companyList };
        } catch (error) {
            console.error('Error during updation of user :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'Role Creation Failed !!' };
        }
    }

    static async updateRole(roleData) {
        try {
            const role = await roleRepo.getRoleById(roleData._id);
            console.log('role', role);
            role.name = roleData.name;
            role.shortName = roleData.shortName;
            role.updatedDate = new Date();
            role.updatedBy = roleData.updatedBy;
            role.isActive = roleData.isActive;
            role.save();
            const companyList = await companyRepo.getAllCompanies();
            return { status: true, message: 'User update successfully !!', companyList: companyList };
        }
        catch (error) {
            console.error('Error during updation of user :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'Role Updation Failed !!' };
        }
    }

    static async roleFunctionAcces(menucheckedIds,selectedSubmenuIds, roleId) {
        try {
            const role = await roleRepo.getRoleById(roleId);
            role.menuFunctionList = menucheckedIds;
            role.submenuList = selectedSubmenuIds;
            const updatedRole = await role.save();
            const companyList = await companyRepo.getAllCompanies();
            return { status: true, message: ' Role Access Updated successfully', companyList: companyList };
        } catch (error) {
            console.error('Error during updation of Role :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'Role Function  Updation Failed !!' };
        }
    }

    static async createBranch(branchData) {
        try {
            const savedBranch = await branchRepo.createBranch(branchData);
            const company = await companyRepo.getCompanyById(savedBranch.companyId);
            company.branchList = [...company.branchList, savedBranch.id];
            await company.save();
            const companyList = await companyRepo.getAllCompanies();
            return { status: true, message: ' Branch Created  successfully', companyList: companyList };
        } catch (error) {
            console.error('Error In  Create Branch  :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'Create Branch Failed !!' };
        }
    }

    static async updateBranch(branchData) {
        try {
            const branch = await branchRepo.getBranchById(branchData._id);
            branch.name = branchData.name;
            branch.shortName = branchData.shortName;
            branch.updatedDate = new Date();
            branch.updatedBy = branchData.updatedBy;
            branch.isActive = branchData.isActive;
            await branch.save();
            const companyList = await companyRepo.getAllCompanies();
            return { status: true, message: 'Branch update successfully !!', companyList: companyList };
        }
        catch (error) {
            console.error('Error during Branch Update  :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'Branch Update  Failed !!' };
        }
    }

    static async createDepartment(deptData) {
        try {
            const savedDept = await deptRepo.createDepartment(deptData);
            const company = await companyRepo.getCompanyById(savedDept.companyId);
            company.departmentList = [...company.departmentList, savedDept.id];
            await company.save();
            const companyList = await companyRepo.getAllCompanies();
            return { status: true, message: ' Department Created successfully', companyList: companyList };
        } catch (error) {
            console.error('Error in Create Department :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'Create Department Failed !!' };
        }
    }

    static async updateDepartment(deptData) {
        try {
            const dept = await deptRepo.getDepartmentById(deptData._id);
            dept.name = deptData.name;
            dept.shortName = deptData.shortName;
            dept.updatedDate = new Date();
            dept.updatedBy = deptData.updatedBy;
            dept.isActive = deptData.isActive;
            await dept.save();
            const companyList = await companyRepo.getAllCompanies();
            return { status: true, message: 'Department update successfully !!', companyList: companyList };
        }
        catch (error) {
            console.error('Error during Department Update  :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'Department Update  Failed !!' };
        }
    }

    static async createDoctor(doctorData) {
        try {
            const savedDoctor = await doctorRepo.createDoctor(doctorData);
            const company = await companyRepo.getCompanyById(savedDoctor.companyId);
            company.doctorList = [...doctor.doctorList, savedDoctor.id];
            await company.save();
            const department = await deptRepo.getDepartmentById(savedDoctor.departmentId);
            department.doctorList = [...department.doctorList, savedDoctor.id];
            await department.save();
            const companyList = await companyRepo.getAllCompanies();
            return { status: true, message: 'Doctor Created successfully !!', companyList: companyList };
        } catch (error) {
            console.error('Error during Department Update  :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'Doctor Creation   Failed !!' };
        }
    }

    static async updateDoctor(doctorData) {
        try {
            const doctor = await doctorRepo.getDoctorById(doctorData._id);
            doctor.name = deptData.name;
            doctor.shortName = deptData.shortName;
            doctor.updatedDate = new Date();
            doctor.updatedBy = deptData.updatedBy;
            doctor.isActive = deptData.isActive;
            await doctor.save();
            const companyList = await companyRepo.getAllCompanies();
            return { status: true, message: 'Doctor update successfully !!', companyList: companyList };
        }
        catch (error) {
            console.error('Error during Doctor Update  :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'Doctor Update  Failed !!' };
        }
    }

    static async createDoctor(doctorData) {
        try {
            const savedDoctor = await doctorRepo.createDoctor(doctorData);
            const company = await companyRepo.getCompanyById(savedDoctor.companyId);
            company.doctorList = [...company.doctorList, savedDoctor.id];
            await company.save();
            const department = await deptRepo.getDepartmentById(savedDoctor.departmentId);
            department.doctorList = [...department.doctorList, savedDoctor.id];
            await department.save();
            const companyList = await companyRepo.getAllCompanies();
            return { status: true, message: 'Doctor Created successfully !!', companyList: companyList };
        } catch (error) {
            console.error('Error during Department Update  :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'Doctor Creation   Failed !!' };
        }
    }

    static async updateDoctor(doctorData) {
        try {
            const doctor = await doctorRepo.getDoctorById(doctorData._id);
            doctor.name = doctorData.name;
            doctor.shortName = doctorData.shortName;
            doctor.updatedDate = new Date();
            doctor.updatedBy = doctorData.updatedBy;
            doctor.isActive = doctorData.isActive;
            await doctor.save();
            const companyList = await companyRepo.getAllCompanies();
            return { status: true, message: 'Doctor update successfully !!', companyList: companyList };
        }
        catch (error) {
            console.error('Error during Doctor Update  :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'Doctor Update  Failed !!' };
        }
    }

    static async createChannel(channelData) {
        try {
            const savedChannel = await channelRepo.createChannel(channelData);
            const company = await companyRepo.getCompanyById(savedChannel.companyId);
            company.channelList = [...company.channelList, savedChannel.id];
            await company.save();
            const companyList = await companyRepo.getAllCompanies();
            return { status: true, message: 'Channel Created successfully !!', companyList: companyList };
        } catch (error) {
            console.error('Error in Create  Channel   :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'Channel Creation  Failed !!' };
        }
    }

    static async updateChannel(channelData) {
        try {
            const channel = await channelRepo.getChannelById(channelData._id);
            channel.name = channelData.name;
            channel.shortName = channelData.shortName;
            channel.updatedDate = new Date();
            channel.updatedBy = channelData.updatedBy;
            channel.isActive = channelData.isActive;
            await channel.save();
            const companyList = await companyRepo.getAllCompanies();
            return { status: true, message: 'Channel update successfully !!', companyList: companyList };
        }
        catch (error) {
            console.error('Error during Channel Update  :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'Channel Update  Failed !!' };
        }
    }

    static async createSlot(slotData) {
        try {
            const savedSlot = await slotRepo.createSlot(slotData);
            const company = await companyRepo.getCompanyById(savedSlot.companyId);
            company.slotList = [...company.slotList, savedSlot.id];
            await company.save();
            const companyList = await companyRepo.getAllCompanies();
            return { status: true, message: 'Slot Created successfully !!', companyList: companyList };
        } catch (error) {
            console.error('Error in Create  Slot   :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'Slot Creation  Failed !!' };
        }
    }

    static async createSlotConfig(slotconfigData) {
        try {
            const checkDuplicate = await slotconfigRepo.findSlotConfigByDetails(slotconfigData.companyId, slotconfigData.branchId, slotconfigData.departmentId, slotconfigData.doctorId, slotconfigData.slotId);
            if (checkDuplicate) {
                const companyList = await companyRepo.getAllCompanies();
                return { status: true, message: 'Slot Configured Already Please Update ', companyList: companyList };
            } else {
                const savedSlotconfig = await slotconfigRepo.createSlotConfig(slotconfigData);
                const companyList = await companyRepo.getAllCompanies();
                return { status: true, message: 'Slot Config  Created successfully !!', companyList: companyList };
            }
        } catch (error) {
            console.error('Error in Create  Slot Config  :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'Slot Config Creation  Failed !!' };
        }
    }

    static async getMenuSequence(companyId) {
        try{
        const sequenceNo = await menuFunctionRepo.fetchLastMenuSequence(companyId);
        const seq = sequenceNo + 1;
        return { status: true, message: 'Sequence Number Succesfull ', sequenceNo: seq };
        }catch (error) {
            console.error('Error in Last Sequence   :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'getting last Sequence   Failed !!' };
        }
    }

    
    static async getsubMenuSequence(menuId,companyId) {
        try{
        const sequenceNo = await subMenuFunctionRepo.fetchLastSubMenuSequenceByMenuId(menuId,companyId);
        const seq = sequenceNo + 1;
        return { status: true, message: 'Sequence Number Succesfull ', subSequenceNo: seq };
        }catch (error) {
            console.error('Error in Last Sequence   :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'getting last Sequence   Failed !!' };
        }
    }

    static async createMenuFunction(menuFnData) {
        try{
        const savedMenuFunction = await menuFunctionRepo.createMenuFunctionMaster(menuFnData);
        const company = await companyRepo.getCompanyById(savedMenuFunction.companyId);
        company.menuFunctionList = [...company.menuFunctionList, savedMenuFunction.id];
        await company.save();
        const companyList = await companyRepo.getAllCompanies();
        const sequenceNo = await menuFunctionRepo.fetchLastMenuSequence(savedMenuFunction.companyId);
        const seq = sequenceNo + 1;
        return { status: true, message: 'Create Menu Function Succesfull ',companyList:companyList, sequenceNo: seq };
        }catch (error) {
            if (error.name === 'MongoServerError' && error.code === 11000) {
                const field = Object.keys(error.keyPattern)[0];
                return { status: false, error: 'Duplicate Key Error', errormessage: `${field} must be unique.` };
            }
            console.error('Error in  Menu Function   :', error.message,error.name,error.code);
            return { status: false, error: 'Internal Server Error', errormessage: ' Menu Function  Failed !!' };
        }
    }

    static async createSubMenuFunction(submenuFnData) {
        try{
        const savedSubmenuFunction = await subMenuFunctionRepo.createSubMenuFunctionMaster(submenuFnData);
        const menuFunction = await menuFunctionRepo.getMenuFunctionMasterById(savedSubmenuFunction.menuId);
        menuFunction.submenuList = [...menuFunction.submenuList, savedSubmenuFunction.id];
        await menuFunction.save();
        const companyList = await companyRepo.getAllCompanies();
        const sequenceNo = await subMenuFunctionRepo.fetchLastSubMenuSequenceByMenuId(savedSubmenuFunction.menuId,menuFunction.companyId);
        const seq = sequenceNo + 1;
        return { status: true, message: 'Create Menu Function Succesfull ',companyList:companyList ,subSequenceNo: seq };
        }catch (error) {
            if (error.name === 'MongoServerError' && error.code === 11000) {
                const field = Object.keys(error.keyPattern)[0];
                return { status: false, error: 'Duplicate Key Error', errormessage: `${field} must be unique.` };
            }
            console.error('Error in  Menu Function   :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: ' Menu Function  Failed !!' };
        }
    }

    static async createPatientType(patinetTypeData) {
        try {
            const savedPtType = await patientTypeRepo.createPatientType(patinetTypeData);
            const company = await companyRepo.getCompanyById(savedPtType.companyId);
            company.patientTypeList = [...company.patientTypeList, savedPtType.id];
            await company.save();
            const companyList = await companyRepo.getAllCompanies();
            return { status: true, message: 'PatientType Created successfully', companyList: companyList };
        } catch (error) {
            console.error('Error during PatientType Creation  :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'Error during PatientType Creation ' };
        }
    }

    static async updatePatientType(updatePtTypeData) {
        try {
            const patient = await patientTypeRepo.getPatientTypeById(updatePtTypeData._id);
            patient.name = updatePtTypeData.name;
            patient.shortName = updatePtTypeData.shortName;
            patient.updatedDate = new Date();
            patient.updatedBy = updatePtTypeData.updatedBy;
            patient.isActive = updatePtTypeData.isActive;
            await patient.save();
            const companyList = await companyRepo.getAllCompanies();
            return { status: true, message: 'PatientType update successfully !!', companyList: companyList };
        }
        catch (error) {
            console.error('Error during Patient Type Update  :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'PatientType Update  Failed !!' };
        }
    }

    static async createManageUrl(urlData) {
        try {
            const savedUrl = await manageUrlRepo.createManageUrl(urlData);
            const company = await companyRepo.getCompanyById(savedUrl.companyId);
            company.manageUrlList = [...company.manageUrlList, savedUrl.id];
            await company.save();
            const companyList = await companyRepo.getAllCompanies();
            return { status: true, message: 'PatientType Created successfully', companyList: companyList };
        } catch (error) {
            console.error('Error during PatientType Creation  :', error.message);
            return { status: false, error: 'Internal Server Error', errormessage: 'Error during PatientType Creation ' };
        }
    }

}


module.exports = AdminService;