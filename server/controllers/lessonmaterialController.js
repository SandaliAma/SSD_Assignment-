const UserModelLesson = require('../models/Lesson');
const UserModel = require('../models/Notice');


//create a Notice
const createnotice = (req, res) => {
    UserModel.create(req.body)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json(err);
    });
}

//get all Notices
const viewnotice = (req, res) => {
    UserModel.find()
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.json(err));
}

//Get Notice by id
const getnotice = (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.json(err));
}

//update Notice
const updatenotice = (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id}, {
        topic: req.body.topic,
        date: req.body.date,
        description: req.body.description
    })
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.json(err));
}

//delete Notice
const deletenotice = (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.json(err));
}

//get all Materials
const showmaterial = (req, res) => {
    UserModelLesson.find()
    
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.json(err));
}

//Get Material by id
const getmaterial = (req, res) => {
    const id = req.params.id;
    UserModelLesson.findById({_id:id})
    .then(MyClasses => res.json(MyClasses))

    .catch(err => res.json(err));
}

//update Material
const updatematerial = (req, res) => {
    const id = req.params.id;
    UserModelLesson.findByIdAndUpdate({_id:id}, {
        
        lesson_topic: req.body.lesson_topic,
        lesson_date: req.body.lesson_date,
        lesson_fileType: req.body.lesson_fileType,
        lesson_description: req.body.lesson_description,
      
    })
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.json(err));
}

//delete Material
const deletematerial = (req, res) => {
    const id = req.params.id;
    UserModelLesson.findByIdAndDelete({_id:id})
    .then(MyClasses => res.json(MyClasses))
    .catch(err => res.json(err));
}

module.exports = {
    createnotice,
    viewnotice,
    getnotice,
    updatenotice,
    deletenotice,
    showmaterial,
    getmaterial,
    updatematerial,
    deletematerial
}