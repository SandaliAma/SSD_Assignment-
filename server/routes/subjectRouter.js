const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createSubject,
    getSubject,
    getSubjectid
} = require('../controllers/subjectController');

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

router.post('/createSubject', createSubject)
router.get('/viewSubject', getSubject)
router.get('/getSubject/:id', getSubjectid)


module.exports = router;