const mongoose = require('mongoose');

const ict = new mongoose.Schema({
    name: {type: 'String', required: true},
    email: {type: 'String', required: true, unique: true},
    contactnumber: {type: 'Number', required: true},
    username: {type: 'String', required: true},
    password: {type: 'String', required: true},    
    SecAnswer: {type: 'String', required: true},

},{timestamps: true})

const ICT = mongoose.model('ICT', ict);

module.exports = ICT;