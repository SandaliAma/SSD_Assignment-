import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Head from '../Header/Header';
import './ViewClass.css'

function ViewClass() {
  const [subname, setSubName] = useState('');
  const { subid } = useParams(); // Get the subid from the URL params

  useEffect(() => {
    axios.get(`/getSubject/${subid}`)
      .then((res) => {
        setSubName(res.data.subjectname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [subid]); // Include subid in the dependency array

  

  return (
    <div>
      <Head/>
      <div className='viewclass'>
      <h2>PayNow</h2>
      <Link to={`/paybank/${subid}`}>
        <button className="buttonviec">PayNow</button>
      </Link>
      <h3>Subject: {subname}</h3>
      </div>
    </div>
  );
}

export default ViewClass;
