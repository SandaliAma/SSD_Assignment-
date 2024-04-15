const TimetableModel = require('../models/AddnewClasstime');

const test = (req, res) => {
    res.json('test is working')
}

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
    test,
    Studenttimetable
}