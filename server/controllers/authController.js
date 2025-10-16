const Student = require('../models/Students');
const Teacher = require('../models/Teacher');
const Manager = require('../models/Manager');
const Admin = require('../models/Admin');
const Wallet = require('../models/Wallets');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// JWT Configuration - FIXED
const JWT_SECRET = process.env.JWT_SECRET || process.env.JWT_ACCESS_SECRET || (() => {
    console.warn('WARNING: JWT_SECRET not found in environment variables, generating temporary secret');
    return crypto.randomBytes(64).toString('hex');
})();

const test = (req, res) => {
    res.json('test is working')
}

//Register a student
const registerStudent = async(req, res) => {
    try {
        const { name, email, contactnumber, grade, username, stdid, password, walletid } = req.body;

        if(!name){
            return res.json({
                error: 'Name is required'
            })
        };

        if(!email){
            return res.json({
                error: 'Email is required'
            })
        };

        if(!contactnumber){
            return res.json({
                error: 'Contact number is required'
            })
        };

        if(!grade){
            return res.json({
                error: 'Grade is required'
            })
        };

        if(!username){
            return res.json({
                error: 'Username is required'
            })
        };

        if(!stdid || stdid.length !== 9){
            return res.json({
                error: 'Student id is required and should be exactly 9 characters long'
            })
        };

        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be minimum 6 characters long'
            })
        };

        const existemail = await Student.findOne({email});
        if(existemail){
            return res.json({
                error: 'Email is already in use'
            })
        };

        const existusername = await Student.findOne({username});
        if(existusername){
            return res.json({
                error: 'Username is already in use'
            })
        };

        const existstdid = await Student.findOne({stdid});
        if(existstdid){
            return res.json({
                error: 'Student id is already in use'
            })
        };

        const hashedPassword = await hashPassword(password);

        const user = await Student.create({
            name,
            email,
            contactnumber,
            grade,
            username,
            stdid,
            password: hashedPassword
        });

        const wallet = await Wallet.create({
            stdid,
            studentname: name,
            walletid,
            balance: "0.00"
        });

        return res.json({
            user,
            wallet
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Registration failed' });
    }
}

//Login a student - FIXED
const loginStudent = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username){
            return res.json({
                error: 'Username is required'
            })
        };

        if(!password){
            return res.json({
                error: 'Password is required'
            })
        };

        const student = await Student.findOne({username});

        if(!student){
            return res.json({
                error: 'No user found'
            })
        };

        const match = await comparePassword(password, student.password);

        if(match){
            // FIXED: Using the defined JWT_SECRET constant
            jwt.sign({
                id: student._id,
                username: student.username,
                role: 'student',
                stdid: student.stdid
            }, JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                if(err) {
                    console.error('JWT Sign Error:', err);
                    return res.status(500).json({ error: 'Token generation failed' });
                }
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                }).json({
                    success: true,
                    student,
                    message: 'Login successful'
                });
            });
        } else {
            res.json({
                error: 'Password is incorrect'
            });
        }
    } catch (error) {
        console.log('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
}

//forgot password student
const forgotPasswordstudent = async (req, res) => {
    try {
        const { username, SecAnswer, newPassword } = req.body;
        if (!username) {
            return res.json({ message: "Username is required" });
        }
        if (!SecAnswer) {
            return res.json({ message: "Answer is required" });
        }
        if (!newPassword) {
            return res.json({ message: "New Password is required" });
        }
        //check
        const student = await Student.findOne({ username, SecAnswer });
        //validation
        if (!student) {
            return res.json({
                success: false,
                message: "Wrong username Or security answer",
            });
        }
        const hashed = await hashPassword(newPassword);
        await Student.findByIdAndUpdate(student._id, { password: hashed });
        return res.json({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
}

//view profile student - FIXED
const getProfile = async (req, res) =>{
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, JWT_SECRET, {}, (err, student)=>{
            if(err) {
                console.error('JWT Verify Error:', err);
                return res.status(403).json({ error: 'Invalid token' });
            }
            Student.findById({_id:student.id})
                .then(student => res.json(student))
                .catch(err => res.status(500).json({ error: 'Profile fetch failed' }));
        })
    }else{
        res.json(null);
    }
}

//view profile student by id
const getProfileid = (req, res) => {
    const id = req.params.id;
    Student.findOne({stdid:id})
        .then(id => res.json(id))
        .catch(err => res.status(500).json({ error: 'Profile fetch failed' }));
}

//update get profile student - FIXED
const getupdateProfile = (req, res) =>{
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, JWT_SECRET, {}, (err, student)=>{
            if(err) {
                console.error('JWT Verify Error:', err);
                return res.status(403).json({ error: 'Invalid token' });
            }
            Student.findById({_id:student.id})
                .then(student => res.json(student))
                .catch(err => res.status(500).json({ error: 'Profile fetch failed' }));
        })
    }else{
        res.json(null);
    }
}

//update profile student by id
const updateProfileid = (req, res) => {
    const id = req.params.sid;
    Student.findByIdAndUpdate({_id:id},{
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        contactnumber: req.body.contactnumber,
        username: req.body.username,
        parentname: req.body.parentname,
        parentphonenumber: req.body.parentphonenumber,
        SecAnswer: req.body.secanswer
    })
        .then(student => res.json(student))
        .catch(err => res.status(500).json({ error: 'Update failed' }));
}

//update profile student - FIXED
const updateProfile = async(req, res) =>{
    const { token } = req.cookies;

    if(token){
        jwt.verify(token, JWT_SECRET, {}, async (err, student)=>{
            if(err) {
                console.error('JWT Verify Error:', err);
                return res.status(403).json({ error: 'Invalid token' });
            }

            Student.findByIdAndUpdate({_id:student.id},{
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                contactnumber: req.body.contactnumber,
                username: req.body.username,
                parentname: req.body.parentname,
                parentphonenumber: req.body.parentphonenumber,
                SecAnswer: req.body.secanswer
            })
                .then(student => res.json(student))
                .catch(err => res.status(500).json({ error: 'Update failed' }));
        })
    }else{
        res.json(null);
    }
}

//logout
const logout = (req, res) => {
    res.clearCookie('token').json({
        message: 'Logged out successfully'
    })
}

//view profile teacher by id
const getteacherProfileid = (req, res) => {
    const id = req.params.id;
    Teacher.findOne({teid:id})
        .then(id => res.json(id))
        .catch(err => res.status(500).json({ error: 'Profile fetch failed' }));
}

//update profile teacher by id
const updateteacherProfileid = (req, res) => {
    const id = req.params.tid;
    Teacher.findByIdAndUpdate({_id:id},{
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        contactnumber: req.body.contactnumber,
        username: req.body.username,
        subject: req.body.subject,
        SecAnswer: req.body.SecAnswer
    })
        .then(student => res.json(student))
        .catch(err => res.status(500).json({ error: 'Update failed' }));
}

//Register a teacher
const registerTeacher = async(req, res) => {
    try {
        const { name, email, contactnumber, teid, username, password, gender, subject, SecAnswer } = req.body;

        if(!name){
            return res.json({
                error: 'Name is required'
            })
        };

        if(!email){
            return res.json({
                error: 'Email is required'
            })
        };

        if(!username){
            return res.json({
                error: 'Username is required'
            })
        };

        if(!contactnumber){
            return res.json({
                error: 'Contact is required'
            })
        };

        if(!gender){
            return res.json({
                error: 'Gender is required'
            })
        };

        if(!subject){
            return res.json({
                error: 'Subject is required'
            })
        };

        if(!SecAnswer){
            return res.json({
                error: 'Security answer is required'
            })
        };

        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be minimum 6 characters long'
            })
        };

        const existemail = await Teacher.findOne({email});
        if(existemail){
            return res.json({
                error: 'Email is already in use'
            })
        };

        const existusername = await Teacher.findOne({username});
        if(existusername){
            return res.json({
                error: 'Username is already in use'
            })
        };

        const existteid = await Teacher.findOne({teid});
        if(existteid){
            return res.json({
                error: 'Teacher id is already in use'
            })
        };

        const hashedPassword = await hashPassword(password);

        const user = await Teacher.create({
            name,
            email,
            contactnumber,
            username,
            teid,
            password: hashedPassword,
            gender,
            subject,
            SecAnswer
        });

        return res.json({
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Registration failed' });
    }
}

//Login a teacher - FIXED
const loginTeacher = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username){
            return res.json({
                error: 'Username is required'
            })
        };

        if(!password){
            return res.json({
                error: 'Password is required'
            })
        };

        const teacher = await Teacher.findOne({username});

        if(!teacher){
            return res.json({
                error: 'No user found'
            })
        };

        const match = await comparePassword(password, teacher.password);

        if(match){
            jwt.sign({
                id: teacher._id,
                username: teacher.username,
                role: 'teacher',
                teid: teacher.teid
            }, JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                if(err) {
                    console.error('JWT Sign Error:', err);
                    return res.status(500).json({ error: 'Token generation failed' });
                }
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                }).json({
                    success: true,
                    teacher,
                    message: 'Login successful'
                });
            });
        } else {
            res.json({
                error: 'Password is incorrect'
            });
        }
    } catch (error) {
        console.log('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
}

//forgot password teacher
const forgotPasswordteacher = async (req, res) => {
    try {
        const { username, SecAnswer, newPassword } = req.body;
        if (!username) {
            return res.json({ message: "Username is required" });
        }
        if (!SecAnswer) {
            return res.json({ message: "Answer is required" });
        }
        if (!newPassword) {
            return res.json({ message: "New Password is required" });
        }
        //check
        const teacher = await Teacher.findOne({ username, SecAnswer });
        //validation
        if (!teacher) {
            return res.json({
                success: false,
                message: "Wrong username Or security answer",
            });
        }
        const hashed = await hashPassword(newPassword);
        await Teacher.findByIdAndUpdate(teacher._id, { password: hashed });
        return res.json({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
}

//view profile teacher - FIXED
const getTeacherProfile = async (req, res) =>{
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, JWT_SECRET, {}, (err, teacher)=>{
            if(err) {
                console.error('JWT Verify Error:', err);
                return res.status(403).json({ error: 'Invalid token' });
            }
            Teacher.findById({_id:teacher.id})
                .then(teacher => res.json(teacher))
                .catch(err => res.status(500).json({ error: 'Profile fetch failed' }));
        })
    }else{
        res.json(null);
    }
}

//view all profile teacher
const getTeacherall = async (req, res) =>{
    Teacher.find()
        .then(teacher => res.json(teacher))
        .catch(err => res.status(500).json({ error: 'Failed to fetch teachers' }));
}

//update get profile teacher - FIXED
const getteacherupdateProfile = (req, res) =>{
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, JWT_SECRET, {}, (err, teacher)=>{
            if(err) {
                console.error('JWT Verify Error:', err);
                return res.status(403).json({ error: 'Invalid token' });
            }
            Teacher.findById({_id:teacher.id})
                .then(teacher => res.json(teacher))
                .catch(err => res.status(500).json({ error: 'Profile fetch failed' }));
        })
    }else{
        res.json(null);
    }
}

//update profile teacher - FIXED
const updateteacherProfile = async(req, res) =>{
    const { token } = req.cookies;

    if(token){
        jwt.verify(token, JWT_SECRET, {}, async (err, teacher)=>{
            if(err) {
                console.error('JWT Verify Error:', err);
                return res.status(403).json({ error: 'Invalid token' });
            }

            Teacher.findByIdAndUpdate({_id:teacher.id},{
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                contactnumber: req.body.contactnumber,
                username: req.body.username,
                subject: req.body.subject,
                SecAnswer: req.body.SecAnswer
            })
                .then(teacher => res.json(teacher))
                .catch(err => res.status(500).json({ error: 'Update failed' }));
        })
    }else{
        res.json(null);
    }
}

//Register a manager
const registerManager = async(req, res) => {
    try {
        const { name, email, contactnumber, username, password, SecAnswer } = req.body;

        if(!name){
            return res.json({
                error: 'Name is required'
            })
        };

        if(!email){
            return res.json({
                error: 'Email is required'
            })
        };

        if(!contactnumber){
            return res.json({
                error: 'Phone number is required'
            })
        };

        if(!username){
            return res.json({
                error: 'Username is required'
            })
        };

        if(!SecAnswer){
            return res.json({
                error: 'Security answer is required'
            })
        };

        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be minimum 6 characters long'
            })
        };

        const existemail = await Manager.findOne({email});
        if(existemail){
            return res.json({
                error: 'Email is already in use'
            })
        };

        const existusername = await Manager.findOne({username});
        if(existusername){
            return res.json({
                error: 'Username is already in use'
            })
        };

        const hashedPassword = await hashPassword(password);

        const manager = await Manager.create({
            name,
            email,
            contactnumber,
            username,
            password: hashedPassword,
            SecAnswer
        });

        return res.json({
            manager
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Registration failed' });
    }
}

//Login a manager - FIXED
const loginManager = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username){
            return res.json({
                error: 'Username is required'
            })
        };

        if(!password){
            return res.json({
                error: 'Password is required'
            })
        };

        const manager = await Manager.findOne({username});

        if(!manager){
            return res.json({
                error: 'No user found'
            })
        };

        const match = await comparePassword(password, manager.password);

        if(match){
            jwt.sign({
                id: manager._id,
                username: manager.username,
                role: 'manager'
            }, JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                if(err) {
                    console.error('JWT Sign Error:', err);
                    return res.status(500).json({ error: 'Token generation failed' });
                }
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                }).json({
                    success: true,
                    manager,
                    message: 'Login successful'
                });
            });
        } else {
            res.json({
                error: 'Password is incorrect'
            });
        }
    } catch (error) {
        console.log('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
}

//forgot password manager
const forgotPasswordmanager = async (req, res) => {
    try {
        const { username, SecAnswer, newPassword } = req.body;
        if (!username) {
            return res.json({ message: "Username is required" });
        }
        if (!SecAnswer) {
            return res.json({ message: "Answer is required" });
        }
        if (!newPassword) {
            return res.json({ message: "New Password is required" });
        }
        //check
        const manager = await Manager.findOne({ username, SecAnswer });
        //validation
        if (!manager) {
            return res.json({
                success: false,
                message: "Wrong username Or security answer",
            });
        }
        const hashed = await hashPassword(newPassword);
        await Manager.findByIdAndUpdate(manager._id, { password: hashed });
        return res.json({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
}

//view profile manager - FIXED
const getManagerProfile = async (req, res) =>{
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, JWT_SECRET, {}, (err, manager)=>{
            if(err) {
                console.error('JWT Verify Error:', err);
                return res.status(403).json({ error: 'Invalid token' });
            }
            Manager.findById({_id:manager.id})
                .then(manager => res.json(manager))
                .catch(err => res.status(500).json({ error: 'Profile fetch failed' }));
        })
    }else{
        res.json(null);
    }
}

//Register a admin
const registerAdmin = async(req, res) => {
    try {
        const { name, email, contactnumber, username, password, SecAnswer } = req.body;

        if(!name){
            return res.json({
                error: 'Name is required'
            })
        };

        if(!email){
            return res.json({
                error: 'Email is required'
            })
        };

        if(!contactnumber){
            return res.json({
                error: 'Phone number is required'
            })
        };

        if(!username){
            return res.json({
                error: 'Username is required'
            })
        };

        if(!SecAnswer){
            return res.json({
                error: 'Security answer is required'
            })
        };

        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be minimum 6 characters long'
            })
        };

        const existemail = await Admin.findOne({email});
        if(existemail){
            return res.json({
                error: 'Email is already in use'
            })
        };

        const existusername = await Admin.findOne({username});
        if(existusername){
            return res.json({
                error: 'Username is already in use'
            })
        };

        const hashedPassword = await hashPassword(password);

        const admin = await Admin.create({
            name,
            email,
            contactnumber,
            username,
            password: hashedPassword,
            SecAnswer
        });

        return res.json({
            admin
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Registration failed' });
    }
}

//Login a admin - FIXED
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username){
            return res.json({
                error: 'Username is required'
            })
        };

        if(!password){
            return res.json({
                error: 'Password is required'
            })
        };

        const admin = await Admin.findOne({username});

        if(!admin){
            return res.json({
                error: 'No user found'
            })
        };

        const match = await comparePassword(password, admin.password);

        if(match){
            jwt.sign({
                id: admin._id,
                username: admin.username,
                role: 'admin'
            }, JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                if(err) {
                    console.error('JWT Sign Error:', err);
                    return res.status(500).json({ error: 'Token generation failed' });
                }
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                }).json({
                    success: true,
                    admin,
                    message: 'Login successful'
                });
            });
        } else {
            res.json({
                error: 'Password is incorrect'
            });
        }
    } catch (error) {
        console.log('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
}

//forgot password admin
const forgotPasswordadmin = async (req, res) => {
    try {
        const { username, SecAnswer, newPassword } = req.body;
        if (!username) {
            return res.json({ message: "Username is required" });
        }
        if (!SecAnswer) {
            return res.json({ message: "Answer is required" });
        }
        if (!newPassword) {
            return res.json({ message: "New Password is required" });
        }
        //check
        const admin = await Admin.findOne({ username, SecAnswer });
        //validation
        if (!admin) {
            return res.json({
                success: false,
                message: "Wrong username Or security answer",
            });
        }
        const hashed = await hashPassword(newPassword);
        await Admin.findByIdAndUpdate(admin._id, { password: hashed });
        return res.json({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
}

//view profile admin - FIXED
const getAdminProfile = async (req, res) =>{
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, JWT_SECRET, {}, (err, admin)=>{
            if(err) {
                console.error('JWT Verify Error:', err);
                return res.status(403).json({ error: 'Invalid token' });
            }
            Admin.findById({_id:admin.id})
                .then(admin => res.json(admin))
                .catch(err => res.status(500).json({ error: 'Profile fetch failed' }));
        })
    }else{
        res.json(null);
    }
}

//view all students
const getallStudent = async (req, res) =>{
    Student.find()
        .then(student => res.json(student))
        .catch(err => res.status(500).json({ error: 'Failed to fetch students' }));
}

//view all teachers
const getallTeacher = async (req, res) =>{
    Teacher.find()
        .then(teacher => res.json(teacher))
        .catch(err => res.status(500).json({ error: 'Failed to fetch teachers' }));
}

//delete a student
const deleteStudent = async (req, res) =>{
    const id = req.params.id;
    Student.findByIdAndDelete(id)
        .then(student => res.json({ message: 'Student deleted successfully', student }))
        .catch(err => res.status(500).json({ error: 'Delete failed' }));
}

//delete a teacher
const deleteTeacher = async (req, res) =>{
    const id = req.params.id;
    Teacher.findByIdAndDelete(id)
        .then(teacher => res.json({ message: 'Teacher deleted successfully', teacher }))
        .catch(err => res.status(500).json({ error: 'Delete failed' }));
}

module.exports = {
    test,
    registerStudent,
    loginStudent,
    forgotPasswordstudent,
    getProfile,
    getProfileid,
    getupdateProfile,
    updateProfileid,
    updateProfile,
    logout,
    getteacherProfileid,
    updateteacherProfileid,
    registerTeacher,
    loginTeacher,
    forgotPasswordteacher,
    getTeacherProfile,
    getTeacherall,
    getteacherupdateProfile,
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
    deleteTeacher
}