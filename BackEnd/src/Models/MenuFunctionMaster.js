const mongoose = require('mongoose');

const menuFunctionMasterSchema = new mongoose.Schema({
    headerName: { type: String, required: true ,unique: true},
    routeModuleName: { type: String, required: true ,unique: true},
    description: { type: String, required: true },
    menuIndicator: { type: Number, required: true },
    sequence: { type: Number, required: true ,unique: true},
    createdDate: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    updatedDate: { type: Date },
    updatedBy: { type: String },
    isActive: { type: Number, default: 0 }, // Assuming 0 as default value, change if needed
    submenuList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubMenuFunctionMaster'}],
    companyId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
});

menuFunctionMasterSchema.index({ companyId: 1, sequence: 1 }, { unique: true });
const MenuFunctionMaster = mongoose.model('MenuFunctionMaster', menuFunctionMasterSchema);

module.exports = MenuFunctionMaster;
