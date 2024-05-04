import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from '../Header/Header';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../../styles/Sasi.css';
import { toast } from 'react-hot-toast';

function Enrollments() {
    const [classes, setClasses] = useState([]);
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [contactnumber, setContactnumber] = useState();
    const [gender, setGender] = useState();
    const [parentname, setParentName] = useState();
    const [parentphonenumber, setParentPhonenumber] = useState();
    const [secanswer, setSecAnswer] = useState();
    const [enrollmentAlert, setEnrollmentAlert] = useState(null);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {

        fetchSubjects()
    }, []);

    useEffect(()=>{

    axios.get('/studentprofile')
            .then((res) => {
        setName(res.data.name);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setContactnumber(res.data.contactnumber);
        setGender(res.data.gender);
        setParentName(res.data.parentname);
        setParentPhonenumber(res.data.parentphonenumber);
        setSecAnswer(res.data.SecAnswer);  

        const studentId = res.data.username; 
        console.log('Student enrolled successfully:', res.data);
    })
    .catch((err) => {
        console.log(err);
    });
    },[])



    const fetchSubjects = () => {
        axios.get('/viewSubject')
            .then((res) => {
                setSubjects(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };










    const enrollStudent = (classId , teacherid , subject , time , grade) => {
         //const studentId = sid; 

         axios.get('/studentprofile')
         .then((res) => {
             setName(res.data.name);
             setUsername(res.data.username);
             setEmail(res.data.email);
             setContactnumber(res.data.contactnumber);
             setGender(res.data.gender);
             setParentName(res.data.parentname);
             setParentPhonenumber(res.data.parentphonenumber);
             setSecAnswer(res.data.SecAnswer);  





        console.log(`Enrolling student in class with ID ${classId} ,${teacherid},${subject},${time},${grade}`);

        const studentId = (res.data.username);

        axios.post('/classenrollments', { studentId, classId, teacherid, subject, time, grade })
    .then((res) => {
        console.log('Student enrolled successfully:', res.data);
        setEnrollmentAlert('Student enrolled successfully!');
        toast.success('Student enrolled successfully!');

    })
    .catch((err) => {
        console.error('Error enrolling student:', err);
        setEnrollmentAlert('You are already enrolled in this class.');
        toast.error('You are already enrolled in this class.');
    });



         })
         .catch((err) => {
         console.log(err);
     });

        // You can send a request to your backend to enroll the student in the class
    };

    return (
        <main>
            <Head />
            <div className='profilecontent'>
                <div>
                    <p className='usertxt'>Enrollments</p>
                    <div className='line1'></div>
                    <br/>
                    <center>
                        <div className='card'>
                            <div className='card-header'>Enroll To New Class</div>
                            <div className='card-body'>
                                <table className='table'>
                                    <thead className='thead-dark'>
                                        <tr>
                                            <th scope='col'>Class ID</th>
                                            <th scop='col'>Subject</th>

                                            <th scope='col'>Teacher</th>
                                            <th scope='col'>Class fee</th>
                                            <th scope='col'></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subjects.map((subject) => (
                                            <tr key={subject.sbid}>
                                                <th >{subject.sbid}</th>
                                                <th >{subject.subjectname}</th>
                                                <td>{subject.teachername}</td>
                                                <td>{subject.amount}</td>
                                                <td>
                                                    <button
                                                        type='button'
                                                        className='btn btn-info'
                                                        onClick={() => enrollStudent(subject.sbid,subject.teid,subject.subjectname,subject.teachername,subject.grade)}
                                                    >
                                                        Enroll
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        </center>





                </div>
            </div>

        </main>
    );
}

export default Enrollments;