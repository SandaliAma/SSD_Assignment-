const express = require('express');
const router = express.Router();
const cors = require('cors');
const { InstituteNotices } = require('../controllers/noticeController');

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)


router.get('/getinstitutenotices', InstituteNotices);


module.exports = router;