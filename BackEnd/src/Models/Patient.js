const mongoose = require('mongoose');

const patinetSchema = new mongoose.Schema({
  fullName: { type: String, required: true},
  contactNo: { type: String, required: true },
  gender: { type: String},
  createdDate: { type: Date, default: Date.now ,required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  updatedDate: { type: Date},
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company',required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' ,required: true },
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' ,required: true },
  patientTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'PatientType', required: true },
  appointmentList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment'}],
  appointmentStatus: { type: Number, default: 0 }, //1 means its  booking confiremd 
  isActive: { type: Number, default: 0 }, // isActive  1 means Patient is Acive in the CLinik or in the Hospital
  // later on Add the Fields like AdharCard  Gender and Other things 
});

const Patient = mongoose.model('Patient', patinetSchema);

module.exports = Patient;
