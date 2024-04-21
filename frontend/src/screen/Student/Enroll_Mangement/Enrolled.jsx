import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Test.css';
import axios from 'axios';

function Enrolled() {
  const [idnumber, setIdNumber] = useState('');
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get('/studentprofile')
      .then((res) => {
        setIdNumber(res.data.stdid);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/displayonline')
      .then((res) => {
        // Filter payments to only include the ones with IT number 'IT12345678'
        const filteredPayments = res.data.filter(payment => payment.itnumber === idnumber);
        setPayments(filteredPayments);
      })
      .catch((err) => console.error(err));
  }, [idnumber]);

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
                  <td className='tdvc'>{payment.subjectcode}</td>
                  <td className='tdvc'>{payment.subjectname}</td>
                  <td className='tdvc'>
                    <Link to="/viewclass">
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
