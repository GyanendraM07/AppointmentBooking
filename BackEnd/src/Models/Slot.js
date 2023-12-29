const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    timing: { type: String},
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    updatedBy: { type: String},
    updatedDate: { type: Date},
    isActive: { type: Number, default: 0 }, // Assuming 0 as default value, change if needed
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
