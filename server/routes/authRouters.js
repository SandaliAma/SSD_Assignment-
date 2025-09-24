const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test,
    registerStudent,
    loginStudent,
    forgotPasswordstudent,
    getProfile,
    getProfileid,
    getupdateProfile,
    updateProfile,
    updateProfileid,
    registerTeacher,
    loginTeacher,
    forgotPasswordteacher,
    getTeacherProfile,
    getteacherupdateProfile,
    getteacherProfileid,
    updateteacherProfileid,
    updateteacherProfile,
    registerManager,
    loginManager,
    forgotPasswordmanager,
    getManagerProfile,
    registerAdmin,
    loginAdmin,
    forgotPasswordadmin,
    getAdminProfile,
    getallStudent,
    getallTeacher,
    deleteStudent,
    deleteTeacher,
    getTeacherall,
    logout 
} = require('../controllers/authController');

// top of server/routes/authRouters.js
const rateLimit = require('express-rate-limit');

// create a login limiter: e.g. 5 attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max attempts per window per IP
  message: { error: 'Too many login attempts, try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

// create a tighter limiter for forgot-password endpoints to avoid abuse
const forgotLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // e.g., 3 password-reset requests per hour per IP
  message: { error: 'Too many password reset attempts, try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

router.get('/', test)
router.post('/register', registerStudent)
// student login protected
router.post('/login', loginLimiter, loginStudent)
router.post('/forgotpassword', forgotLimiter, forgotPasswordstudent)
router.get('/studentprofile', getProfile)
router.get('/studentprofileid/:id', getProfileid)
router.get('/getstudentprofileedit', getupdateProfile)
router.put('/studentprofileedit', updateProfile)
router.put('/studentprofileeditid/:sid', updateProfileid)
router.post('/teacherregister', registerTeacher)
// teacher login protected
router.post('/teacherlogin', loginLimiter, loginTeacher)
router.post('/teacherforgetpassword', forgotLimiter, forgotPasswordteacher)
router.get('/teacherprofile', getTeacherProfile)
router.get('/teacherprofileall', getTeacherall)
router.get('/getteacherprofileedit', getteacherupdateProfile)
router.put('/teacherprofileedit', updateteacherProfile)
router.get('/teacherprofileid/:id', getteacherProfileid)
router.put('/teacherprofileeditid/:tid', updateteacherProfileid)
router.post('/managerregister', registerManager)
// manager login protected
router.post('/managerlogin', loginLimiter, loginManager)
router.post('/managerforgetpassword', forgotLimiter, forgotPasswordmanager)
router.get('/managerprofile', getManagerProfile)
router.post('/adminregister', registerAdmin)
// admin login protected
router.post('/adminlogin', loginLimiter, loginAdmin)
router.post('/adminforgetpassword', forgotLimiter, forgotPasswordadmin)
router.get('/adminprofile', getAdminProfile)
router.get('/getstudentsadmin', getallStudent)
router.get('/getteachersadmin', getallTeacher)
router.delete('/deletestudent/:id', deleteStudent)
router.delete('/deleteteacher/:id', deleteTeacher)

router.get('/logout', logout)

module.exports = router;
