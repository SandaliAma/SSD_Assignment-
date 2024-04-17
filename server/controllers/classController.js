const AddClassesModel = require('../models/AddClasses');
const AddAdditionalClassesModel = require('../models/AddAdditionalClasses');
const RequestScheduleModel = require('../models/RequestSchedule');

// Create addadditionalclass
const createaddadditionalclass = async(req, res) => {
    try {
        const data = await AddAdditionalClassesModel.create(req.body);
        res.json(data);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

module.exports = {
    createaddadditionalclass
}