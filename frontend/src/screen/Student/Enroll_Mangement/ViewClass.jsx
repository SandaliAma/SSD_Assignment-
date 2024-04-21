// ViewClass.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect ,useState } from 'react';

function ViewClass() {

  const [subname, setsubName] = useState();
  const { subid } = useParams();

  useEffect(()=>{
    axios.get('/getSubject:'+subid)
    .then((res)=>{
      setsubName(res.data.subjectname);         
    })
    .catch((err)=>{
        console.log(err);
    })
  },[])
  return (
    <div>
      <h2>PayNow</h2>
      <Link to="/paybank">
        <button className="button">PayNow</button>
      </Link>
      <h3>Subject Name: {subname}</h3> {/* Display the subject name */}
    </div>
  );
}

export default ViewClass;
