import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Test.css';
import axios from 'axios';

function Test() {
  const [grade, setGrade] = useState('');
  const [subjects, setSubjects] = useState([]);

  useEffect(()=>{
    axios.get('/studentprofile')
    .then((res)=>{
       setGrade(res.data.grade);           
    })
    .catch((err)=>{
        console.log(err);
    })
  },[])

  useEffect(() => {
    axios.get('/viewSubject')
      .then((res) => {
        // Filter subjects to only include the ones with grade 10
        const grade10Subjects = res.data.filter(subject => subject.grade === setGrade);
        setSubjects(grade10Subjects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  

 

  return (
    <div>
      <div className='bodyvc'>
        <h1 className='h1vc'><br />My Subjects</h1>
        <div className="tbl-headervc">
          <table className='tabletc'>
            <thead>
              <tr>
                <th className='thvc'>Subject Code</th>
                <th className='thvc'>Subject Name</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-contentvc">
          <table className='tabletc'>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject._id}>
                  <td className='tdvc'>{subject.sbid}</td>
                  <td className='tdvc'>{subject.subjectname}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Test;
