const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test,    
    Studenttimetable
} = require('../controllers/timetableController');

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

router.get('/', test)
router.get('/Student/Timetable', Studenttimetable)


module.exports = router;