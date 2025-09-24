const StudentModel = require('../models/Students.js');
const Joi = require('joi'); //Add Joi for validation

// ---------------------- Validation Schemas ----------------------
const studentSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  contactnumber: Joi.string().min(6).max(20).optional().allow(''),
  grade: Joi.string().optional().allow(''),
  username: Joi.string().alphanum().min(3).max(30).required(),
  stdid: Joi.string().optional().allow(''),
  // Prevent role/isAdmin or other sensitive fields
});

const studentUpdateSchema = studentSchema.fork(
  ['username', 'email'],
  (schema) => schema.optional()
);

// Controller function to create a new student with validation
exports.createStudent = async (req, res) => {
  try {
    const { error, value } = studentSchema.validate(req.body, { stripUnknown: true });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const student = new StudentModel(value);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await StudentModel.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update a student by ID with validation
exports.updateStudentById = async (req, res) => {
  try {
    const { error, value } = studentUpdateSchema.validate(req.body, { stripUnknown: true });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const student = await StudentModel.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to delete a student by ID
exports.deleteStudentById = async (req, res) => {
  try {
    const student = await StudentModel.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
