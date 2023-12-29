const mongoose = require('mongoose');

const submenuFunctionMasterSchema = new mongoose.Schema({
    headerName: { type: String, required: true ,unique: true},
    routeModuleName: { type: String, required: true,unique: true },
    description: { type: String, required: true },
    sequence: { type: Number, required: true },
    createdDate: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    updatedDate: { type: Date },
    updatedBy: { type: String },
    isActive: { type: Number, default: 0 }, // Assuming 0 as default value, change if needed
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuFunctionMaster'},
    companyId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
});
submenuFunctionMasterSchema.index({ menuId: 1, sequence: 1 }, { unique: true });

const SubMenuFunctionMaster = mongoose.model('SubMenuFunctionMaster', submenuFunctionMasterSchema);

module.exports = SubMenuFunctionMaster;
