const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    updatedBy: { type: String},
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    isActive: { type: Number, default: 0 }, // Assuming 0 as default value, change if needed
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;
