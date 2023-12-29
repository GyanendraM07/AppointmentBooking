const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    imageUrl: { type: String},
    createdDate: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    updatedDate: { type: Date },
    updatedBy: { type: String},
    companyId: {  type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
    departmentId: {  type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    branchId: {  type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true},
    isActive: { type: Number, default: 0 }, // Assuming 0 as default value, change if needed
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
