import React, { useState, useEffect } from 'react';
import './Style.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function CreateNotice() {
    const [topic, setTopic] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [class_id, setClass_id] = useState('');
    const [teacher_id, setTeacher_id] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        // Set today's date as the default value for the date input field
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();

        if (mm < 10) {
            mm = '0' + mm;
        }
        if (dd < 10) {
            dd = '0' + dd;
        }

        const formattedDate = yyyy + '-' + mm + '-' + dd;
        setDate(formattedDate);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/createnotice', {
            topic: topic,
            date: date,
            description: description,
            class_id: class_id,
            teacher_id: teacher_id
        }).then(res => {
            console.log('Success');
            Swal.fire(
                'Notice Created!',
                'Your notice has been successfully created.',
                'success'
            ).then(() => {
                navigate('/myclasses');
            });
        }).catch(err => {
            console.error(err);
            Swal.fire(
                'Error!',
                'An error occurred while creating the notice.',
                'error'
            );
        });
    }

    return (
        <div className="Noticecontainer">
            <h2 class="form_topic">Add Notice</h2>
            <div className="input_container">
                <form onSubmit={submit}>
                    <label htmlFor="topic">Notice Topic:</label>
                    <input type="text" name="topic" placeholder="Enter topic" onChange={(e) => setTopic(e.target.value)} required />
                    <div className="input_group">
                        <div className="input_col">
                            <label htmlFor="date">Date:</label>
                            <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                        </div>
                    </div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" placeholder="Enter description" onChange={(e) => setDescription(e.target.value)} required />

                    <input type="hidden" name="class_id" value="value" onChange={(e) => setClass_id(e.target.value)} />
                    <input type="hidden" name="teacher_id" value="value" onChange={(e) => setTeacher_id(e.target.value)} />

                    <div className="button-group">
                        <button className="addNoticebutton" type="submit">Create</button>
                        <Link to="/myclasses" className="cancelbutton_CN">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateNotice;
