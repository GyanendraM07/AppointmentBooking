const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String ,unique: true},
    password: { type: String },
    levelId: { type: Number ,default: 0},
    navIndicator: { type: Number ,required: true },
    contactNo: { type: String },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    updatedBy: { type: String},
    createdBy: { type: String, required: true },
    isActive: { type: String,required: true ,default:0 },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company',required: true},
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role'},
    menuFunctionList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuFunctionMaster'}],
    submenuList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubMenuFunctionMaster'}],
    channelList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel'}],
    patientTypeList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PatientType'}],
    departmentList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department'}],
    branchList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
