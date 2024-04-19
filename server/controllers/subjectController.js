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


module.exports = {
    createSubject
}