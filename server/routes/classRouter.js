const express = require('express');
const router = express.Router();
const cors = require('cors');
const { Studenttimetable
} = require('../controllers/classController');

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)


router.get('/Student/Timetable', Studenttimetable)


module.exports = router;