const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createuser
} = require('../controllers/salaryController');

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

router.get('/createUser', createuser)


module.exports = router;