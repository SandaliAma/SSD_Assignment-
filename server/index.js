const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const crypto = require('crypto');
const multer = require('multer');

const UserModelLesson = require('./models/Lesson');
const BankModel = require('./models/BankPayments');
const SalaryModel = require('./models/Salary');
const PhotoModel = require('./models/ProfilePhoto');

const app = express();

// Redis client for token blacklisting
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis connected'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Database not connected', err));

// CORS Configuration
app.use(
    cors({
      origin: process.env.NODE_ENV === 'production'
          ? process.env.FRONTEND_URL
          : 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    })
);

// JWT Secrets and Expirys
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || (() => {
  console.warn('WARNING: JWT_ACCESS_SECRET not set in environment variables');
  return crypto.randomBytes(64).toString('hex');
})();

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || (() => {
  console.warn('WARNING: JWT_REFRESH_SECRET not set in environment variables');
  return crypto.randomBytes(64).toString('hex');
})();

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Static file serving with security headers
app.use("/files", express.static("files", {
  setHeaders: (res, path) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
}));
app.use("/files2", express.static("files2", {
  setHeaders: (res, path) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
  }
}));
app.use("/files3", express.static("files3", {
  setHeaders: (res, path) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
  }
}));
app.use("/ProfilePhotos", express.static("ProfilePhotos", {
  setHeaders: (res, path) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
  }
}));

// Token Blacklist Service
class TokenBlacklist {
  static async addToBlacklist(token, expiryTime) {
    const tokenId = this.extractTokenId(token);
    if (tokenId) {
      const ttl = Math.max(0, expiryTime - Date.now()) / 1000;
      await redisClient.setex(`blacklist:${tokenId}`, Math.ceil(ttl), 'true');
    }
  }

  static async isBlacklisted(token) {
    const tokenId = this.extractTokenId(token);
    if (!tokenId) return false;

    const result = await redisClient.get(`blacklist:${tokenId}`);
    return result === 'true';
  }

  static extractTokenId(token) {
    try {
      const decoded = jwt.decode(token);
      return decoded?.jti;
    } catch (error) {
      return null;
    }
  }

  static async invalidateUserTokens(userId) {
    await redisClient.set(`user_token_version:${userId}`, Date.now());
  }

  static async getUserTokenVersion(userId) {
    const version = await redisClient.get(`user_token_version:${userId}`);
    return version ? parseInt(version) : 0;
  }
}

// Token Service
class TokenService {
  static generateTokens(user) {
    const tokenId = crypto.randomUUID();
    const issuedAt = Date.now();

    const accessTokenPayload = {
      userId: user.id || user._id,
      email: user.email,
      role: user.role,
      jti: tokenId,
      iat: Math.floor(issuedAt / 1000),
      tokenVersion: issuedAt
    };

    const refreshTokenPayload = {
      userId: user.id || user._id,
      jti: `${tokenId}_refresh`,
      iat: Math.floor(issuedAt / 1000),
      tokenVersion: issuedAt
    };
    const accessToken = jwt.sign(accessTokenPayload, JWT_ACCESS_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRY
    });

    const refreshToken = jwt.sign(refreshTokenPayload, JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRY
    });

    return { accessToken, refreshToken };
  }

  static async verifyAccessToken(token) {
    try {
      if (await TokenBlacklist.isBlacklisted(token)) {
        throw new Error('Token is blacklisted');
      }

      const decoded = jwt.verify(token, JWT_ACCESS_SECRET);

      const userTokenVersion = await TokenBlacklist.getUserTokenVersion(decoded.userId);
      if (userTokenVersion > decoded.tokenVersion) {
        throw new Error('Token has been invalidated');
      }

      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

// Authentication Middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = await TokenService.verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }
};

// Role-based Authorization Middleware
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

// Enhanced file validation
const fileFilter = (allowedTypes) => {
  return (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  };
};

// Multer configurations
const createSecureStorage = (destination, allowedTypes = [], maxSize = 10 * 1024 * 1024) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(6).toString('hex');
      const ext = file.originalname.split('.').pop();
      cb(null, `${uniqueSuffix}.${ext}`);
    },
  });

  return multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: allowedTypes.length > 0 ? fileFilter(allowedTypes) : undefined
  });
};

// Secure upload configurations
const uploadLesson = createSecureStorage("./files", [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png'
]);

const uploadBank = createSecureStorage("./files2", [
  'application/pdf',
  'image/jpeg',
  'image/png'
]);

const uploadSalary = createSecureStorage("./files3", [
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]);

const uploadPhoto = createSecureStorage("./ProfilePhotos", [
  'image/jpeg',
  'image/png',
  'image/webp'
], 5 * 1024 * 1024);

// Import existing routes
app.use('/', require('./routes/authRouters'));
app.use('/', require('./routes/timetableRouter'));
app.use('/', require('./routes/InstituenoticeRouter'));
app.use('/', require('./routes/LessonMaterialRouter'));
app.use('/', require('./routes/paymentRouters'));
app.use('/', require('./routes/QA&FeedbackRouter'));
app.use('/', require('./routes/salaryRouters'));
app.use('/', require('./routes/classRouter'));
app.use('/', require('./routes/subjectRouter'));
app.use('/', require('./routes/attendanceRouters'));
app.use('/', require('./routes/EnrollmentsRouter'));
app.use('/', require('./routes/studentRoutes'));

// SECURED LESSON MATERIAL ROUTES
app.post('/addmaterial', authenticateToken, authorizeRoles('teacher', 'admin'), uploadLesson.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { filename } = req.file;

    // Validate required fields
    const requiredFields = ['lesson_topic', 'lesson_fileType', 'lesson_date', 'subject_name', 'grade'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    const lessonData = await UserModelLesson.create({
      lesson_Files: filename,
      lesson_topic: req.body.lesson_topic,
      lesson_fileType: req.body.lesson_fileType,
      lesson_date: req.body.lesson_date,
      lesson_description: req.body.lesson_description,
      subject_name: req.body.subject_name,
      grade: req.body.grade,
      teacher_id: req.user.userId, // Use authenticated user ID
      teachername: req.body.teachername,
      createdBy: req.user.userId,
      createdAt: new Date()
    });

    res.status(201).json({
      success: true,
      data: lessonData,
      message: 'Lesson material uploaded successfully'
    });
  } catch (error) {
    console.error('Add material error:', error);
    res.status(500).json({ error: 'Failed to upload lesson material' });
  }
});

// Get all materials
app.get('/showmaterials', authenticateToken, async (req, res) => {
  try {
    let query = {};

    // If user is a teacher, only show their materials
    if (req.user.role === 'teacher') {
      query.teacher_id = req.user.userId;
    }

    const materials = await UserModelLesson.find(query)
        .select('-__v')
        .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: materials,
      count: materials.length
    });
  } catch (error) {
    console.error('Show materials error:', error);
    res.status(500).json({ error: 'Failed to fetch materials' });
  }
});

// Get material by id - with ownership check
app.get('/getmaterial/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid material ID' });
    }

    let query = { _id: id };

    // If user is a teacher, ensure they can only access their own materials
    if (req.user.role === 'teacher') {
      query.teacher_id = req.user.userId;
    }

    const material = await UserModelLesson.findOne(query);

    if (!material) {
      return res.status(404).json({ error: 'Material not found or access denied' });
    }

    res.json({
      success: true,
      data: material
    });
  } catch (error) {
    console.error('Get material error:', error);
    res.status(500).json({ error: 'Failed to fetch material' });
  }
});

// Update material - with ownership check
app.put('/updatematerial/:id', authenticateToken, authorizeRoles('teacher', 'admin'), async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid material ID' });
    }

    let query = { _id: id };

    // If user is a teacher, ensure they can only update their own materials
    if (req.user.role === 'teacher') {
      query.teacher_id = req.user.userId;
    }

    const updateData = {
      lesson_topic: req.body.lesson_topic,
      lesson_date: req.body.lesson_date,
      lesson_fileType: req.body.lesson_fileType,
      lesson_description: req.body.lesson_description,
      updatedBy: req.user.userId,
      updatedAt: new Date()
    };

    const updatedMaterial = await UserModelLesson.findOneAndUpdate(
        query,
        updateData,
        { new: true, runValidators: true }
    );

    if (!updatedMaterial) {
      return res.status(404).json({ error: 'Material not found or access denied' });
    }

    res.json({
      success: true,
      data: updatedMaterial,
      message: 'Material updated successfully'
    });
  } catch (error) {
    console.error('Update material error:', error);
    res.status(500).json({ error: 'Failed to update material' });
  }
});

// Delete material - with ownership check
app.delete('/deletematerial/:id', authenticateToken, authorizeRoles('teacher', 'admin'), async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid material ID' });
    }

    let query = { _id: id };

    // If user is a teacher, ensure they can only delete their own materials
    if (req.user.role === 'teacher') {
      query.teacher_id = req.user.userId;
    }

    const deletedMaterial = await UserModelLesson.findOneAndDelete(query);

    if (!deletedMaterial) {
      return res.status(404).json({ error: 'Material not found or access denied' });
    }

    res.json({
      success: true,
      message: 'Material deleted successfully'
    });
  } catch (error) {
    console.error('Delete material error:', error);
    res.status(500).json({ error: 'Failed to delete material' });
  }
});

// SECURED BANK PAYMENT ROUTES
app.post('/createbank', authenticateToken, authorizeRoles('admin', 'accountant'), uploadBank.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { filename } = req.file;

    const bankData = await BankModel.create({
      itnumber: req.body.itnumber,
      accountname: req.body.accountname,
      accountnumber: req.body.accountnumber,
      bankname: req.body.bankname,
      description: req.body.description,
      date: req.body.date,
      amount: req.body.amount,
      status: req.body.status,
      type: req.body.type,
      upload_files: filename,
      createdBy: req.user.userId,
      createdAt: new Date()
    });

    res.status(201).json({
      success: true,
      data: bankData,
      message: 'Bank payment record created successfully'
    });
  } catch (error) {
    console.error('Create bank error:', error);
    res.status(500).json({ error: 'Failed to create bank payment record' });
  }
});

// SECURED SALARY ROUTES
app.post('/createSalary', authenticateToken, authorizeRoles('admin', 'hr'), uploadSalary.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { filename } = req.file;

    const salaryData = await SalaryModel.create({
      TeacherName: req.body.TeacherName,
      TeacherID: req.body.TeacherID,
      SubjectName: req.body.SubjectName,
      Grade: req.body.Grade,
      AttendStudents: req.body.AttendStudents,
      FreeCardAmount: req.body.FreeCardAmount,
      InstitutePayment: req.body.InstitutePayment,
      MonthlySalary: req.body.MonthlySalary,
      Date: req.body.Date,
      upload_paymentFiles: filename,
      createdBy: req.user.userId,
      createdAt: new Date()
    });

    res.status(201).json({
      success: true,
      data: salaryData,
      message: 'Salary record created successfully'
    });
  } catch (error) {
    console.error('Create salary error:', error);
    res.status(500).json({ error: 'Failed to create salary record' });
  }
});

// SECURED PROFILE PHOTO ROUTES
app.post('/addphoto', authenticateToken, uploadPhoto.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { filename } = req.file;

    // Check if user is updating their own photo or is admin
    const studentId = req.body.student_id;
    if (req.user.role !== 'admin' && req.user.userId !== studentId) {
      return res.status(403).json({ error: 'Can only update your own profile photo' });
    }

    // Delete existing photo for this student
    await PhotoModel.findOneAndDelete({ student_id: studentId });

    const photoData = await PhotoModel.create({
      profile_photo: filename,
      student_id: studentId,
      uploadedBy: req.user.userId,
      createdAt: new Date()
    });

    res.status(201).json({
      success: true,
      data: photoData,
      message: 'Profile photo uploaded successfully'
    });
  } catch (error) {
    console.error('Add photo error:', error);
    res.status(500).json({ error: 'Failed to upload profile photo' });
  }
});

// Get profile photo - with privacy check
app.get("/getimage/:studentId", authenticateToken, async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Check if user can access this photo
    if (req.user.role !== 'admin' && req.user.userId !== studentId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const photoData = await PhotoModel.findOne({ student_id: studentId });

    if (!photoData) {
      return res.status(404).json({ error: 'Profile photo not found' });
    }

    res.json({
      success: true,
      data: photoData
    });
  } catch (error) {
    console.error('Get image error:', error);
    res.status(500).json({ error: 'Failed to fetch profile photo' });
  }
});

// Delete profile photo - with ownership check
app.delete('/deletephoto/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid photo ID' });
    }

    // Find the photo first to check ownership
    const photo = await PhotoModel.findById(id);

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    // Check if user can delete this photo
    if (req.user.role !== 'admin' && req.user.userId !== photo.student_id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await PhotoModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Photo deleted successfully'
    });
  } catch (error) {
    console.error('Delete photo error:', error);
    res.status(500).json({ error: 'Failed to delete photo' });
  }
});

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);

  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
    return res.status(400).json({ error: 'File upload error' });
  }

  if (error.message === 'Invalid file type') {
    return res.status(400).json({ error: 'Invalid file type' });
  }

  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await redisClient.quit();
  await mongoose.connection.close();
  process.exit(0);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Secure server is running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Export for testing
module.exports = { app, TokenService, TokenBlacklist };