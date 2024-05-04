import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Head from '../Header/Header';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../../styles/Sasi.css';


function AttendTeacher() {
    const [attendances, setAttendances] = useState([]);
    const [classFilter, setClassFilter] = useState('');
    const [studentFilter, setStudentFilter] = useState('');
    const [studentTeacher, setteacherFilter] = useState('');

    const [, setUsername] = useState();
    
    useEffect(()=>{
        axios.get('/teacherprofile')
        .then((res)=>{
            setUsername(res.data.username);            

            const setteacherFilter = (e) => {
                const selectedClass = setUsername(res.data.username);
                setteacherFilter(selectedClass);
            };



        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(() => {
        fetchAttendances();
    }, []);

    const fetchAttendances = async () => {
        try {
            const response = await axios.get('/attendancemark', {
                params: {
                    teacherId: studentTeacher
                }
            });
            setAttendances(response.data);
        } catch (error) {
            console.error('Error fetching attendances:', error);
            toast.error('Failed to fetch attendances');
        }
    };

    const handleClassFilter = (e) => {
        const selectedClass = e.target.value;
        setClassFilter(selectedClass);
    };

    const handleStudentFilter = (e) => {
        const selectedStudent = e.target.value;
        setStudentFilter(selectedStudent);
    };

    const filteredAttendances = attendances.filter((attendance) =>
        (classFilter ? attendance.classId.includes(classFilter) : true) &&
        (studentFilter ? attendance.studentId.includes(studentFilter) : true)
    );

    return (
        <main>
            <Head />
            <div className='profilecontent'>
                <div>
                    <p className='usertxt'>Attendance</p>
                    <div className='line1'></div>
                    <br />
                    <div className='ViewAttendances'>
                        <div className="card text-center">
                            <div className="card-header">
                                View Attendance
                            </div>
                            <div className="card-body">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by Class ID"
                                        value={classFilter}
                                        onChange={handleClassFilter}
                                    />
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by Student ID"
                                        value={studentFilter}
                                        onChange={handleStudentFilter}
                                    />
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Class ID</th>
                                                <th scope="col">Student ID</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-body-scroll">
                                            {filteredAttendances.map((attendance) => (
                                                <tr key={attendance._id}>
                                                    <td>{attendance.classId}</td>
                                                    <td>{attendance.studentId}</td>
                                                    <td>{attendance.date}</td>
                                                    <td>{attendance.time}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>




        </main>
    );
}

export default AttendTeacher;