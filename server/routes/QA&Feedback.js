const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createque,
    allque,
    getupdateque,
    updateque,
    deleteque,
    getteacherque,
    giveans,
    updateans,
    showans,
    getans,
    updateanswer,
    deleteanswer,
    displayfaq,
    searchfaq,
    createteacherfeedback,
    createservicefeedback,
    getteacherfeedback,
    getservicefeedback,
    getteacherfeedbackid
} = require('../controllers/QA&FeedbackController');

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)


router.post('/createQ', createque)
router.get('/Myquestions', allque)
router.get('/getQuestion/:id', getupdateque)
router.put('/updateQuestion/:id', updateque)
router.delete('/deleteQuestion/:id', deleteque)
router.get('/getTQuestions', getteacherque)
router.get('/giveToAnswers/:id', giveans)
router.put('/getToAnswers/:id', updateans)
router.get('/questionsShow', showans)
router.get('/getAnswer/:id', getans)
router.put('/updateAnswers/:id', updateanswer)
router.put('/deleteAnswer/:id', deleteanswer)
router.get('/fAskQs', displayfaq)
router.get('/fASearch', searchfaq)
router.post('/createTF', createteacherfeedback)
router.post('/createSF', createservicefeedback)
router.get('/MyTFeedbacks', getteacherfeedback)
router.get('/MySFeedbacks', getservicefeedback)
router.get('/getTFeedback/:id', getteacherfeedbackid)

module.exports = router;