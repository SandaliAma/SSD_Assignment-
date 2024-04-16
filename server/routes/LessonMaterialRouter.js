const express = require('express');
const router = express.Router();
const cors = require('cors');

const { createnotice ,
    viewnotice,
    getnotice,
    updatenotice,
    deletenotice,
    showmaterial,
    getmaterial,
    updatematerial,
    deletematerial
    
} = require('../controllers/lessonmaterialController');

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)


router.post('/createnotice', createnotice)
router.get('/viewnotice', viewnotice)
router.get('/getnotice/:id', getnotice)
router.put('/updatenotice/:id', updatenotice)
router.delete('/deletenotice/:id', deletenotice)
router.get('/showmaterials', showmaterial)
router.get('/getmaterial/:id', getmaterial)
router.put('/updatematerial/:id', updatematerial)
router.delete('/deletematerial/:id', deletematerial)

module.exports = router;