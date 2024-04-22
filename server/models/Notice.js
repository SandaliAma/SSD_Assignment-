const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({

    topic: 'String',
    date: 'String',
    description: 'String',
    subject_name: { type: 'String', default: 'Commerce' },
    grade: { type: 'Number', default: 10 },
    teacher_id: 'String'
});

const UserModel = mongoose.model('Notice', NoticeSchema);

module.exports = UserModel;