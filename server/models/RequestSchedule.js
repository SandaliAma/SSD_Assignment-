const mongoose = require('mongoose');

const RequestScheduleSchema=new mongoose.Schema({
    teacher:'String',
    grade:'Number',
    date:'String',
    hall:'String',
    subject:'String',
    time:'String',
    status: 'String',



});

const RequestScheduleModel=mongoose.model('requestschedule',RequestScheduleSchema);

module.exports = RequestScheduleModel;