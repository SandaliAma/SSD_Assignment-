import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Test.css';
import axios from 'axios';

function Enrolled() {
  return (
    <div>
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
              <tr>
                  <td className='tdvc'></td>
                  <td className='tdvc'></td>
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
              
            </tbody>
          </table>
          
        </div>
      </div>
      
    </div>
    </div>
  )
}

export default Enrolled
