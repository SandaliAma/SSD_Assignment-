import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function ViewClass() {
  const [subname, setSubName] = useState('');
  const { subjectid } = useParams();
  const subid = 'SB0210';

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
      <h2>PayNow</h2>
      <Link to="/paybank">
        <button className="button">PayNow</button>
      </Link>
      <h3>Subject: {subname}</h3>
    </div>
  );
}

export default ViewClass;
