import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Test.css';
import axios from 'axios';

function Enrolled() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get('/studentprofile')
      .then((res) => {
        const itnum = res.data.stdid;
        axios.get('/displaybank')
          .then((res) => {
            const paymentitnumber = res.data.filter(payment => payment.itnumber === itnum && payment.status === 'Approved' );
            setPayments(paymentitnumber);
          })
          
          .catch((err) => {
            console.log(err);
          });
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
                <th className='thvc'>Actions</th>
                <th></th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-contentvc">
          <table className='tabletc'>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.subjectcode}>
                  <td className='tdvc'>{payment.description}</td>
                  <td className='tdvc'>{payment.subjectname}</td>
                  <td className='tdvc'>
                  <Link to={`/lessonmaterial/${payment.description}`}>
                      <input className="buttonvo5" type="button" name="edit" value="View Class" />
                    </Link>
                  </td>
                  <td className='tdvc'>
                    <Link to="/viewschedule">
                      <input className="buttonvo5" type="button" name="edit" value="View schedule" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Enrolled;
