const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    imageUrl: { type: String},
    createdDate: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    updatedDate: { type: Date },
    updatedBy: { type: String},
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    branchId: {type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    doctorList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'}],
    isActive: { type: Number, default: 0 }, // Assuming 0 as default value, change if needed
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
