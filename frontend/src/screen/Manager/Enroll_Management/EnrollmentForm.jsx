// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import Head from '../Header/Header';
// import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// const EnrollmentForm = () => {
//     const [studentId, setStudentId] = useState('');
//     const [classId, setClassId] = useState('');
//     const [teacherId, setTeacherId] = useState('');
//     const [subject, setSubject] = useState('');
//     const [grade, setGrade] = useState('');
//     const [students, setStudents] = useState([]);
//     const [classes, setClasses] = useState([]);
//     const [teachers, setTeachers] = useState([]);
//     const [teacher, setTeacher] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const studentsResponse = await axios.get('/students');
//                 setStudents(studentsResponse.data);

//                 const classesResponse = await axios.get('/viewSubject');
//                 setClasses(classesResponse.data);

//                 const teachersResponse = await axios.get('/getAllTeachers');
//                 setTeachers(teachersResponse.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleClassChange = (e) => {
//         const selectedClassId = e.target.value;
//         const selectedClass = classes.find(item => item.sbid === selectedClassId);

//         if (selectedClass) {
//             setTeacherId(selectedClass.teid);
//             setSubject(selectedClass.subjectname);
//             setTeacher(selectedClass.teachername); // Add teacher name to state
//             setGrade(selectedClass.grade); 
//         }
//     };

//     const handleBack = () => {
//         navigate("/ManagerEnroll");
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();


//         const formData = {
//             "studentId": studentId,
//             "classId": classId,
//             "teacherId": teacherId,
//             "subject": subject,
//             "grade":grade
//         };

//         console.log(formData);

//         console.log("Form Data:", formData);

//         try {
//             await axios.post('/classenrollments', formData);
//             toast.success("Enrollment created successfully!");
//             // Clear form fields after successful submission
//             setStudentId('');
//             setClassId('');
//             setTeacherId('');
//             setSubject('');
//             setTeacher('');
//             setGrade();
//         } catch (error) {
//             console.error("Error creating enrollment:", error);
//             toast.error("Failed to create enrollment. Please try again.");
//         }
//     };

//     return (
//         <div>
//             <Head />
//             <Container>
//                 <Row className="justify-content-center">
//                     <Col md={6}>
//                         <Form onSubmit={handleSubmit}>
//                             <Form.Group controlId="studentId">
//                                 <Form.Label>Student ID</Form.Label>
//                                 <Form.Control as="select" value={studentId} onChange={e => setStudentId(e.target.value)}>
//                                     <option value="">Select Student</option>
//                                     {students.map(student => (
//                                         <option key={student._id} value={student.username}>{student.username}</option>
//                                     ))}
//                                 </Form.Control>
//                             </Form.Group>
//                             <Form.Group controlId="classId">
//                                 <Form.Label>Class ID</Form.Label>
//                                 <Form.Control as="select" value={classId} onChange={e => {
//                                     setClassId(e.target.value);
//                                     handleClassChange(e);
//                                 }}>
//                                     <option value="">Select Class</option>
//                                     {classes.map(classItem => (
//                                         <option key={classItem._id} value={classItem.sbid}>{classItem.sbid}</option>
//                                     ))}
//                                 </Form.Control>
//                             </Form.Group>
//                             <Form.Group controlId="teacherId">
//                                 <Form.Label>Teacher ID</Form.Label>
//                                 <Form.Control type="text" value={teacherId} readOnly />
//                             </Form.Group>
//                             <Form.Group controlId="subject">
//                                 <Form.Label>Subject</Form.Label>
//                                 <Form.Control type="text" value={subject} readOnly />
//                             </Form.Group>
//                             <Form.Group controlId="teacher">
//                                 <Form.Label>Teacher</Form.Label>
//                                 <Form.Control type="text" value={teacher} readOnly />
//                             </Form.Group>
//                             <Form.Group controlId="grade">
//                                 <Form.Label>Grade</Form.Label>
//                                 <Form.Control type="number" value={grade} readOnly />
//                             </Form.Group>
//                             <Button variant="primary" type="submit"> Submit </Button>
//                             <Button variant="secondary" onClick={handleBack}> Back </Button>
//                         </Form>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// };

// export default EnrollmentForm;