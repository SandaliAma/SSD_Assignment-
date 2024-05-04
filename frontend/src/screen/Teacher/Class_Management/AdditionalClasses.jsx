import React, { useEffect, useState } from 'react';
import './AdditionalClass.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
            <h2 className="additional-classes-title">View Additional Classes</h2><br/>
            <table className="additionalclasses-table">
                <thead>
                    <tr>
                        <th>Teacher</th>
                        <th>Grade</th>
                        <th>Subject</th>
                        <th>Date1</th>
                        <th>Date2</th>
                        <th>Date3</th>
                        <th>Date4</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {requestedClasses.map((requestedClass) => (
                        <tr key={requestedClass._id}>
                            <td>{requestedClass.teacher}</td>
                            <td>{requestedClass.grade}</td>
                            <td>{requestedClass.subject}</td>
                            <td>{requestedClass.date1}</td>
                            <td>{requestedClass.date2}</td>
                            <td>{requestedClass.date3}</td>
                            <td>{requestedClass.date4}</td>
                            <td>{requestedClass.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table><br/><br/>
            <Link to="/AddAdditionalClasses" className="add-additional-button">Add Additional Class</Link><br/> <br/><br/>
            <Link to="/viewclasses" className="myclasses-button">My Classes</Link>
        </div>
        </div>
    );
}

export default AdditionalClasses;
