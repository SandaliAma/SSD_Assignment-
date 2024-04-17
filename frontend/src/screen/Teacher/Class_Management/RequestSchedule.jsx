import React, { useState } from 'react';
import './RequestSchedule.css'; // Importing CSS file
import axios from 'axios';

function RequestSchedule() {
    const [teacher, setTeacher] = useState('');
    const [date, setDate] = useState('');
    const [grade, setGrade] = useState('');
    const [hall, setHall] = useState('');
    const [subject, setSubject] = useState('');
    const [time, setTime] = useState('');
    const [status, setStatus] = useState('Pending');


    const request = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/createschedule', {
            teacher: teacher,
            date: date,
            grade: grade,
            hall: hall,
            subject: subject,
            time: time,
            status: status

        })
        .then(response => {
            // handle response
            console.log(response);
        })
        .catch(error => {
            // handle error
            console.error(error);
        });
    }

    const clearForm = () => {
        setTeacher('');
        setDate('');
        setGrade('');
        setHall('');
        setSubject('');
        setTime('');
        setStatus('');
    };

    return (
        <div className="request-schedule-container">
            <div className="request-schedule-box">
                <h2 className="request-schedule-title">Request A Schedule</h2>
                <div className="form-container">
                    <form onSubmit={request}>
                        <div className="input-container">
                            <label htmlFor="teacherInput">Teacher</label>
                            <input type="text" id="teacherInput" pattern="[A-Za-z\s]+" required value={teacher} onChange={(e) => setTeacher(e.target.value)}/>
                        </div>

                        <div className="input-container">
                            <label htmlFor="gradeInput">Grade</label>
                            <input type="text" id="gradeInput" pattern="[0-9]+" required value={grade} onChange={(e) => setGrade(e.target.value)}/>
                        </div>

                        <div className="input-container">
                            <label htmlFor="dateInput">Date</label>
                            <input type="text" id="dateInput" pattern="[A-Za-z\s]+" required value={date} onChange={(e) => setDate(e.target.value)}/>
                        </div>

                        <div className="input-container">
                            <label htmlFor="hallInput">Hall</label>
                            <input type="text" id="hallInput" required value={hall} onChange={(e) => setHall(e.target.value)}/>
                        </div>

                        <div className="input-container">
                            <label htmlFor="subjectInput">Subject</label>
                            <input type="text" id="subjectInput" pattern="[A-Za-z\s]+" required value={subject} onChange={(e) => setSubject(e.target.value)}/>
                        </div>

                        <div className="input-container">
                            <label htmlFor="timeInput">Time</label>
                            <input type="text" id="timeInput" value={time} required onChange={(e) => setTime(e.target.value)}/>
                        </div>

                        <div className="button-container">
                            <button className="cancel-button" type="button" onClick={clearForm}>Cancel</button>
                            <button className="save-button" type="submit">Request</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RequestSchedule;
