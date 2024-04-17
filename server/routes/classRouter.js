const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createaddadditionalclass
} = require('../controllers/classController');

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)


router.post('/createaddadditionalclass', createaddadditionalclass)


module.exports = router;