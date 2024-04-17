import React, { useEffect, useState } from 'react'
import './SFeedback.css';
import axios from 'axios';
import {Link, useParams,useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header';

function UpdateSFeedback() {

  const {id} = useParams();
  const [grade, setGrade] = useState();
  const [sfeedbacks, setSFeedbacks] = useState();
  const [date, setDate] = useState();
  const navigator = useNavigate();
  

  useEffect(() =>{
    //get service feedback
    axios.get('http://localhost:5000/getSFeedback/' + id)
    .then((res) =>{
      setGrade(res.data.grade);
      setSFeedbacks(res.data.feedback);
      setDate(res.data.date);
    })
    .catch((err) => console.error(err));

  },[]);

  const update = (a) =>{
    a.preventDefault();
  
  axios.put('http://localhost:5000/updateSFeedback/'+ id, {grade:grade,sfeedbacks:sfeedbacks,date:date})
    .then(res =>{
      
      
    })
    .catch(err => console.error(err));

  }

  const handleSubmit = (a) => {
    a.preventDefault();
    Swal.fire({
      title: "Submit ",
      text: "Are you sure you want to proceed ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
      
    }).then((result) => {
      if (result.isConfirmed) {
        update(a); // Call submit function if result is confirmed
        Swal.fire({
          title: "Updated",
          icon: "success",
        });
        handleClick2();
      } else {
        Swal.fire({
          title: "Failed",
          icon: "error",
        });
        // Call submit function even if result is canceled
      }
    });
  };
  
  

  const handleClick2 = () => {
    toast.loading('Processing...', {
      style: {
        background: 'black', // Customize the background color
        color: '#ffffff', // Customize the text color
        borderRadius: '10px', // Add border radius
        border: '2px solid #ffffff', // Add border
      },
    });
  
    setTimeout(() => {
      toast.dismiss();
      setTimeout(() => {
        toast.success('Updated!', {
          style: {
            background: '#28a745', // Green background color
            color: '#ffffff', // White text color
            borderRadius: '10px', // Rounded corners
            border: '2px solid #ffffff', // White border
          },
          duration: 2000, // Display duration in milliseconds (3 seconds)
          iconTheme: {
            primary: '#ffffff', // White icon color
            secondary: '#28a745', // Green icon color
          },
        });
        setTimeout(() => {
          navigator('/MyFeedbacks');
        }, 2500); // Wait for 2 seconds after displaying success toast before navigating
      }, 2500); // Wait for 2 seconds after dismissing loading toast before displaying success toast
    }, 5000); // Wait for 5 seconds before dismissing loading toast
  };

  /*const[questions,setQuestions] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/MyQuestions')
    .then((res) =>{
      setQuestions(res.data);
    })
    .catch((err) => console.error(err));
  },[]);*/

  return (
    <div className='uth2' >
       <Head/>
       <Toaster/>
    <h1 className="heading9">We Want to Hear from You - Teacher Feedback</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="grade" className="tt6">Select Grade</label>
      <select id="grade" name="dropdown" style={{ boxSizing: 'border-box', position: 'absolute', width: '920px', height: '53px', left: '436px', top: '268px', background: '#FFFFFF', border: '1px solid #000000' }} value={grade} onChange={(a)=> setGrade(a.target.value)}>
      <option value="" ></option>
      <option value="Grade 4" >Grade 4</option>
          <option value="Grade 5" >Grade 5</option>
          <option value="Grade 6" >Grade 6</option>
          <option value="Grade 7" >Grade 7</option>
          <option value="Grade 8" >Grade 8</option>
          <option value="Grade 9" >Grade 9</option>
          <option value="Grade 10" >Grade 10</option>
          <option value="Grade 11" >Grade11</option>
      </select>
      

      <label htmlFor="feedback" className="tt7">Feedback</label>
      <textarea
        id="feedback"
        style={{ boxSizing: 'border-box', position: 'absolute', width: '920px', height: '178px', left: '436px', top: '445px', background: '#FFFFFF', border: '1px solid #000000' }}
        value={sfeedbacks}
        onChange={(a)=> setSFeedbacks(a.target.value)}
      ></textarea>
      <label htmlFor="date" className="tt8">Enter Date</label>
      <input
        id="date"
        style={{ boxSizing: 'border-box', position: 'absolute', width: '920px', height: '53px', left: '436px', top: '755px', background: '#FFFFFF', border: '1px solid #000000' }}
        type="text"
        value={date}
        onChange={(a)=> setDate(a.target.value)}
      />
      <button
        id="sfeed"
        className="sfet"
        style={{ position: 'absolute', width: '334px', height: '77px', left: '1079px', top: '906px', background: '#6C9DE2', borderRadius: '20px' }}
      >
        Submit
      </button>
    </form>
  </div>
  )
}

export default UpdateSFeedback