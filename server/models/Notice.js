const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({

    topic: 'String',
    date: 'String',
    description: 'String',
    class_id: 'String',
    teacher_id: 'String'
});

const UserModel = mongoose.model('Notice', NoticeSchema);

module.exports = UserModel;