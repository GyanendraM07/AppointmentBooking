const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  appointmentDate: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdDate: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  updatedDate: { type: Date},
  // paymentType: { type: Number },
  // paymentId: { type: Number },
  // patientType: { type: Number },
  apptUniqueId: { type: String, required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  doctorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  slotId: {type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  channelTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  patientTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'PatientType', required: true },
  appointmentStatus: { type: Number, default: 0 },  // 1 means doc has seen 2 means its cancle 
  isActive: { type: Number, default: 0 },  //1 means  its active  0 means over
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
