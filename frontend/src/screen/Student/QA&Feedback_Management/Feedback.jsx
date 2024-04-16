import React from 'react'
import './Feedback.css';
import {Link } from 'react-router-dom';

function Feedback() {
  return (
    <div>
      <text className="heading6">We Want to Hear from You</text>
      <p className="parag1">Welcome to our feedback page! Your opinion matters to us, and we greatly appreciate you taking the time to share your thoughts and experiences.</p>
      <button id="addf" className="bt3" style={{ position: 'absolute', width: '592px', height: '86px', left: '354px', top: '422px', background: '#83B2CD', borderRadius: '10px'}} ><Link to="/FeedbackType" style={{ textDecoration: 'none',color: '#000000' }}>ADD YOUR FEEDBACKS</Link></button>
      <button id="mf" className="bt4" style={{ position: 'absolute', width: '592px', height: '86px', left: '354px', background: '#83B2CD', borderRadius: '10px' }}><Link to="/MyFeedbacks" style={{ textDecoration: 'none',color: '#000000' }}>MY FEEDBACKS</Link></button>
    </div>
  )
}

export default Feedback