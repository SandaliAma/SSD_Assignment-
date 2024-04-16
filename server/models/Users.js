const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    TeacherName:'String',
    TeacherID:'String',
    SubjectName:'String',
    Grade:'Number',
    AttendStudents:'Number',
    FreeCardAmount:'Number',
    InstitutePayment:'Number',
    MonthlySalary:'Number',
    Date:'String'
    
});

const UserModel = mongoose.model('salary',UserSchema);

module.exports = UserModel;