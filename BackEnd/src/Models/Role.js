const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    createdBy: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
    updatedBy: { type: String},
    isActive: { type: Number, default: 0 },
    userList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    menuFunctionList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuFunctionMaster'}],
    submenuList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubMenuFunctionMaster'}],
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
