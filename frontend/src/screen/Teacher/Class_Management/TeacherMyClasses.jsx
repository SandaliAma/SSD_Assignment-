import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TeacherMyClasses.css';
import axios from 'axios';
import Head from '../Header/Header';

function TeacherMyClasses() {
    const [addclasses, setAddclasses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/teachermyclasses/addclasses')
            .then((res) => {
                setAddclasses(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/deleteClass/${id}`);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    const filteredClasses = addclasses.filter((addclass) =>
        addclass.grade.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
             <Head/>
        <div className="my-classes-container">
            <h2 className="my-classes-title">My Classes</h2>
            <input
                type="text"
                className="search-grade-input"
                placeholder="Search Grade"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <table className="classes-table">
                <thead>
                    <tr>
                        <th>Teacher</th>
                        <th>Class Id</th>
                        <th>Teacher Id</th>
                        <th>Subject</th>
                        <th>Time</th>
                        <th>Date</th>
                        <th>Grade</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClasses.map((addclass) => (
                        <tr key={addclass._id}>
                            
                            <td>{addclass.teacher}</td>
                            <td>{addclass.classid}</td>
                            <td>{addclass.teacherid}</td>
                            <td>{addclass.subject}</td>
                            <td>{addclass.time}</td>
                            <td>{addclass.date}</td>
                            <td>{addclass.grade}</td>
                            <td>
                                <Link to={`/update/${addclass._id}`}>Edit</Link>
                            </td>
                            <td>
                                <button className="delete-button" onClick={() => handleDelete(addclass._id)}>Delete</button>
                            </td>
                            <td>
                                <button className="view-class-button">View Additional Classes</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={'/addclasses'}><button className="add-classes-button">Add Classes</button></Link>
        </div>
        </div>
    );
}

export default TeacherMyClasses;
