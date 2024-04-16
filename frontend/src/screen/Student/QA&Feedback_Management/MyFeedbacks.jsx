import React, { useEffect, useState } from 'react'
import './MyFeedbacks.css';
import {Link } from 'react-router-dom';
import axios from 'axios';
import Head from '../Header/Header';

function MyFeedbacks() {


    const[tfeedbacks,setTFeedbacks] = useState([]);
    const[sfeedbacks,setSFeedbacks] = useState([]);
    

    useEffect(() => {
        //get teacher feedback
      axios.get('http://localhost:5000/MyTFeedbacks')
      .then((res) =>{
        setTFeedbacks(res.data);
      })
      .catch((err) => console.error(err));

      //get service feedback
      axios.get('http://localhost:5000/MySFeedbacks')
      .then((res) =>{
        setSFeedbacks(res.data);
      })
      .catch((err) => console.error(err));

    },[]);

    const handleDeleteT = (id) =>{
      axios.delete('http://localhost:5000/deleteTFeedback/' + id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.error(err));
    }

    const handleDeleteS = (id) =>{
      axios.delete('http://localhost:5000/deleteSFeedback/' + id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.error(err));
    }
    
    //align th sFeedback 
    const totalTeacherFeedbackHeight = tfeedbacks.length * 225 + (tfeedbacks.length - 1) * 20;


  return (
    <div>
       <Head/>
  <h2 className="heading10">We Want to Hear from You - My Feedbacks</h2>

  <ul style={{ position: 'absolute',listStyleType: 'none'}}>
    {tfeedbacks.map((tfeedback, index) => (
      <li key={index} style={{ position: 'relative', marginBottom: '20px' }}>
        <label className="tt9">Feedback</label>
        <ul style={{ listStyleType: 'none' ,boxSizing: 'border-box', position: 'absolute', height: '165px', width: '830px', left: '537px', top: '224px', background: '#FFFFFF', border: '1px solid #000000' }}>
          <li><strong>Grade:</strong> {tfeedback.grade}</li><br/>
          <li><strong>Subject:</strong> {tfeedback.subject}</li><br/>
          <li><strong>Teacher:</strong> {tfeedback.teacher}</li><br/>
          <li><strong>Feedback:</strong> {tfeedback.feedback}</li><br/>
        </ul>

      
        
        <Link to={`/UpdateTeacherF/${tfeedback._id}`} style={{ textDecoration: 'none', color: '#FFFFFF' }}>
          <button id="mfe1" className="mfet" style={{ position: 'absolute', width: '182px', height: '70px', top: '405px', background: '#6C9DE2', borderRadius: '20px' }}>
            Edit
          </button>
        </Link>



        <button id="mfd" onClick={(a) => handleDeleteT(tfeedback._id)} className="mfdt" style={{ position: 'absolute', width: '182px', height: '70px', left: '1188px', top: '402px', background: '#6C9DE2', borderRadius: '20px' }}>
          Delete
        </button><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </li>
    ))}
  </ul>

  <ul style={{ listStyleType: 'none',position: 'absolute', top: `${totalTeacherFeedbackHeight }px`,marginTop: '35%'}}>
  {sfeedbacks.map((sfeedback, index) => (
    <li key={index} style={{ marginBottom: '20px', position: 'relative' }}>
      <label className="tt9" style={{  top: '45px' }}>Feedback</label>
      <ul style={{listStyleType: 'none', boxSizing: 'border-box', position: 'absolute', height: '163px', width: '830px', left: '537px', background: '#FFFFFF', border: '1px solid #000000', padding: '10px' }}>
        <li><strong>Grade:</strong> {sfeedback.grade}</li><br/><br/>
        <li><strong>Feedback:</strong> {sfeedback.feedback}</li><br/><br/>
      </ul>
      
      <Link to={`/UpdateSFeedback/${sfeedback._id}`} style={{ textDecoration: 'none', color: '#FFFFFF' }}>
      <button id="mfe" className="mfet" style={{ position: 'absolute', width: '182px', height: '70px',  background: '#6C9DE2', borderRadius: '20px' ,top: '65%' }}>
        Edit
      </button></Link>

      <button id="mfd"  onClick={(a) => handleDeleteS(sfeedback._id)} className="mfdt" style={{ position: 'absolute', width: '182px', height: '70px', left: '1188px', background: '#6C9DE2', borderRadius: '20px',top: '65%' }}>
        Delete
      </button><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </li>
  ))}
</ul>
  

    
  </div>
  )
}

export default MyFeedbacks