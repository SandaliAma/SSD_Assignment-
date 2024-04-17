const AddClassesModel = require('../models/AddClasses');
const AddAdditionalClassesModel = require('../models/AddAdditionalClasses');
const RequestScheduleModel = require('../models/RequestSchedule');


const Studenttimetable = (req, res) => {
    TimetableModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
}

module.exports = {
    Studenttimetable
}