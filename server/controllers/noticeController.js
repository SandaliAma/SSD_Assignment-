const NoticeModel = require('../models/InstituteNotice');

const InstituteNotices = (req, res) => {
    NoticeModel.find()
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.json(err));
}

module.exports = {
    InstituteNotices
}