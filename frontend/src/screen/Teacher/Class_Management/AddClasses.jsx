// AddClasses.js
import React, { useState } from 'react';
import './AddClasses.css'; // Importing CSS file
import axios from 'axios';
import Head from '../Header/Header';

function AddClasses() {
    const [teacher, setTeacher] = useState('');
    const [classid, setClassId] = useState('');
    const [teacherid, setTeacherId] = useState('');
    const [subject, setSubject] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [grade, setGrade] = useState('');
    





    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/addclass', {
                teacher: teacher,
                time: time,
                date: date,
                grade: grade,
                classid: classid,
                teacherid : teacherid,
                subject : subject,
            });
            console.log(response.data); // assuming response.data is the data returned from the server
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
             <Head/>
        <div className="add-classes-container">
            <h2 className="add-class-title">Add Classes</h2>
            <div className="form-container">
                <form onSubmit={handleSubmit}>


                <div className="input-container">
                        <label htmlFor="teacherInput">Teacher</label>
                        <input type="text" id="teacherInput" pattern="[A-Za-z\s]+" required value={teacher} onChange={(e) => setTeacher(e.target.value)} />
                    </div>

                <div className="input-container">
                        <label htmlFor="classidInput">Class Id</label>
                        <input type="text" id="classidInput" required value={classid} onChange={(e) => setClassId(e.target.value)} />
                    </div>

                    <div className="input-container">
                        <label htmlFor="teacheridInput">Teacher Id</label>
                        <input type="text" id="teacheridInput" required value={teacherid} onChange={(e) => setTeacherId(e.target.value)} />
                    </div>

                    <div className="input-container">
                        <label htmlFor="subjectInput">Subject </label>
                        <input type="text" id="subjectInput" required value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </div>


                    <div className="input-container">
                        <label htmlFor="timeInput">Time</label>
                        <input type="text" id="timeInput" required value={time} onChange={(e) => setTime(e.target.value)} />
                    </div>

                    <div className="input-container">
                        <label htmlFor="dateInput">Date</label>
                        <input type="text" id="dateInput" required value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>

                  

                    <div className="input-container">
                        <label htmlFor="gradeInput">Grade</label>
                        <input type="text" id="gradeInput" pattern="[0-9]+" required value={grade} onChange={(e) => setGrade(e.target.value)} />
                    </div>

                 
                    <div className="button-container">
                        <button className="cancel-button" type="button">Cancel</button>
                        <button className="save-button" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}

export default AddClasses;
