const mongoose = require('mongoose');

// Assuming maximum of 31 days in a month
const dateFields = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

//create fields For dateWise ex- day1,day2 ....day31
const dateWiseFields = dateFields.reduce((fields, date) => {
    fields[`day${date}`] = { type: Number };
    return fields;
}, {});

const slotConfigSchema = new mongoose.Schema({
    dailyStatus: { type: Number },
    dayStatus: { type: Number},
    dateStatus: { type: Number},
    apptStatus: { type: Number, required: true },// if its 1 means Daily ,2 means Weekly , 3 DayWise ,4 Date Wise 
    dayWise: {
        monday: { type:  Number},
        tuesday: { type: Number },
        wednesday: { type: Number },
        thursday: { type: Number },
        friday: { type: Number },
        saturday: { type: Number },
        sunday: { type: Number },
    },
    dateWise: {
        ...dateWiseFields,
    },
    createdBy: { type: String, required: true },
    createdDate: { type: Date, default: Date.now},
    updatedBy: { type: String },
    updatedDate: { type: Date },
    isActive: { type: Number, default: 0 },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true},
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true},
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true},
    slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
   
});

const SlotConfig = mongoose.model('SlotConfig', slotConfigSchema);

module.exports = SlotConfig;
