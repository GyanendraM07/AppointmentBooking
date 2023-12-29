const mongoose = require('mongoose');

const functionMasterSchema = new mongoose.Schema({
    headerName: { type: String, required: true },
    routeModuleName: { type: String, required: true },
    desc: { type: String, required: true },
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'FunctionMaster'},
    menuIndicator: { type: Number, required: true },
    menuSequence: { type: Number, required: true },
    submenuSequence: { type: Number, required: true },
    createdDate: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    isActive: { type: Number, default: 0 }, // Assuming 0 as default value, change if needed
    companyId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
});

const FunctionMaster = mongoose.model('FunctionMaster', functionMasterSchema);

module.exports = FunctionMaster;
