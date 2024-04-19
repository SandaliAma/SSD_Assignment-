const Subject = require('../models/Subject');

const createSubject = (req, res) => {
    Subject.create(req.body)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json(err);
    });
}

const getSubject = (req, res) => {
    Subject.find()
        .then(users => res.json(users))
        .catch(err => {
            console.error("Error fetching subject:", err);
            res.status(500).json({ error: "An error occurred while fetching subject." });
        });
}

const getSubjectid = (req, res) => {
    const grade = req.params.grade;
    Subject.find({ grade: grade })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "Subject not found." });
            }
            res.json(user);
        })
        .catch(err => {
            console.error("Error fetching subject:", err);
            res.status(500).json({ error: "An error occurred while fetching subject." });
        });
}
module.exports = {
    createSubject,
    getSubject,
    getSubjectid
}