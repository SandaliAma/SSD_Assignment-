const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({

    lesson_Files: 'String',
    lesson_topic: 'String',
    lesson_fileType: 'String',
    lesson_date: 'String',
    lesson_description: 'String',
    class_id: 'String',
    teacher_id: 'String'

});

const UserModelLesson = mongoose.model('Lesson', LessonSchema);

module.exports = UserModelLesson;