const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    isActive: { type: Number, default: 0 }, // Assuming 0 as default value, change if needed
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
});

const PatientType = mongoose.model('PatientType', typeSchema);

module.exports = PatientType;
