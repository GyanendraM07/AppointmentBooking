const mongoose = require('mongoose');

const manageUrlSchema = new mongoose.Schema({
    urlName: { type: String, required: true },
    description: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    updatedDate: { type: Date },
    updatedBy: { type: String},
    companyId: {  type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
    branchId: {  type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true},
    channelId: {  type: mongoose.Schema.Types.ObjectId, ref: 'Channel'},
    patientTypeId: {  type: mongoose.Schema.Types.ObjectId, ref: 'PatientType'},
    departmentId: {  type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    isActive: { type: Number, default: 0 }, // Assuming 0 as default value, change if needed
});

const ManageUrl = mongoose.model('ManageUrl', manageUrlSchema);

module.exports = ManageUrl;
