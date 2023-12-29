const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String },
    shortName: { type: String },
    domainName: { type: String },
    smtpPort: { type: Number },
    smtpEmail: { type: String },
    smtpPassword: { type: String },
    contactNo: { type: String },
    createdDate: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    updatedDate: { type: Date },
    updatedBy: { type: String },
    activationDate: { type: Date },
    userName: { type: String },
    email: { type: String },
    password: { type: String },
    menuFunctionList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuFunctionMaster'}],
    submenuList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubMenuFunctionMaster'}],
    departmentList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
    doctorList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
    branchList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }],
    roleList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
    slotList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Slot' }],
    userList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    channelList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
    patientTypeList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PatientType' }],
    manageUrlList: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ManageUrl' }], default: []}
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
