import React, { useEffect, useState } from 'react';
import './AdditionalClass.css';
import axios from 'axios';
import Head from '../Header/Header';

function AdditionalClasses() {
    const [requestedClasses, setRequestedClasses] = useState([]);

    useEffect(() => {
        // Fetch requested additional classes
        axios.get('http://localhost:5000/requestedadditionalclasses/additionalclasses')
            .then((res) => {
                setRequestedClasses(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
             <Head/>
        <div className="additional-classes-container">
            <h2 className="additional-classes-title">Requested Additional Classes</h2>
            <table className="additionalclasses-table">
                <thead>
                    <tr>
                        <th>Grade</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Hall</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {requestedClasses.map((requestedClass) => (
                        <tr key={requestedClass._id}>
                            <td>{requestedClass.grade}</td>
                            <td>{requestedClass.subject}</td>
                            <td>{requestedClass.date}</td>
                            <td>{requestedClass.time}</td>
                            <td>{requestedClass.hall}</td>
                            <td>{requestedClass.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-additional-button">Add Additional Class</button><br></br>
            <button className="myclasses-button">My Classes</button>
        </div>
        </div>
    );
}

export default AdditionalClasses;
