// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// // import { Navigate } from 'react-big-calendar';
// import Head from '../Header/Header';


// const EnrollmentForm = () => {
//     const [studentId, setStudentId] = useState('');
//     const [classId, setClassId] = useState('');
//     const [teacherId, setTeacherId] = useState('');
//     const [subject, setSubject] = useState('');
//     const [time, setTime] = useState('');
//     const [grade, setGrade] = useState('');
//     const [students, setStudents] = useState([]);
//     const [teachers, setTeachers] = useState([]);
//     const [classes, setClasses] = useState([]);

//     useEffect(() => {
//         // Fetch students, teachers, and classes data from your API
//         axios.get('/getAllStudents')
//             .then(res => setStudents(res.data))
//             .catch(err => console.log(err));

//         axios.get('/getAllTeachers')
//             .then(res => setTeachers(res.data))
//             .catch(err => console.log(err));

//         axios.get('/getSubject')
//             .then(res => setClasses(res.data))
//             .catch(err => console.log(err));
//     }, []);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Submit the form data to your API endpoint
//         const formData = {
//             studentId,
//             classId,
//             teacherId,
//             subject,
//             time,
//             grade
//         };
//         axios.post('http://localhost:3000/classenrollments', formData)
//             .then(res => {
//                 console.log('Enrollment created successfully!');
//                 // Reset form fields
//                 setStudentId('');
//                 setClassId('');
//                 setTeacherId('');
//                 setSubject('');
//                 setTime('');
//                 setGrade('');
//             })
//             .catch(err => console.log(err));
//     };

//     return (
//         <div>
//             <Head />
//         <Container>
//             <Row className="justify-content-center">
//                 <Col md={6}>
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group controlId="studentId">
//                             <Form.Label>Student ID</Form.Label>
//                             <Form.Control as="select" value={studentId} onChange={e => setStudentId(e.target.value)}>
//                                 <option value="">Select Student</option>
//                                 {students.map(student => (
//                                     <option key={student._id} value={student.username}>{student.username}</option>
//                                 ))}
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group controlId="classId">
//                             <Form.Label>Class ID</Form.Label>
//                             <Form.Control as="select" value={classId} onChange={e => setClassId(e.target.value)}>
//                                 <option value="">Select Class</option>
//                                 {classes.map(classItem => (
//                                     <option key={classItem._id} value={classItem._id}>{classItem.className}</option>
//                                 ))}
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group controlId="teacherId">
//                             <Form.Label>Teacher ID</Form.Label>
//                             <Form.Control as="select" value={teacherId} onChange={e => setTeacherId(e.target.value)}>
//                                 <option value="">Select Teacher</option>
//                                 {teachers.map(teacher => (
//                                     <option key={teacher._id} value={teacher._id}>{teacher.username}</option>
//                                 ))}
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group controlId="subject">
//                             <Form.Label>Subject</Form.Label>
//                             <Form.Control type="text" value={subject} onChange={e => setSubject(e.target.value)} />
//                         </Form.Group>

//                         <Form.Group controlId="grade">
//                             <Form.Label>Grade</Form.Label>
//                             <Form.Control type="number" value={grade} onChange={e => setGrade(e.target.value)} />
//                         </Form.Group>
//                         <Button variant="primary" type="submit">
//                             Submit
//                         </Button>
//                     </Form>
//                 </Col>
//             </Row>
//         </Container>
//         </div>
//     );
// };

// export default EnrollmentForm;