import React, { useState } from 'react'
import './TFeedback.css';
import {Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header';

function TFeedback() {

  const [grade, setGrade] = useState();
  const [subject, setSubject] = useState();
  const [teacher, setTeacher] = useState();
  const [sid, setSid] = useState();
  const [tfeedback, setTFeedback] = useState();
  const navigator = useNavigate();

  const submit = (a) =>{
    a.preventDefault();
    axios.post('http://localhost:5000/createTF', {grade:grade,subject:subject,teacher:teacher,sid:sid,feedback:tfeedback})
    .then(res =>{
      console.log(res);
      console.log( `Feedback Submitted successfully.`);
      
    })
    .catch(err => console.error(err));

  }

  const handleSubmit = (a) => {
    a.preventDefault();
    Swal.fire({
      title: "Submit Feedback",
      text: "Are you sure you want to proceed ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        submit(a); // Call submit function if result is confirmed
        Swal.fire({
          title: "Feedback Submitted",
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
        toast.success('Completed!', {
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
          navigator('/Feedback');
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
    <div className='uth1'>
       <Head/>
        <body >
      <h1 className="heading8">We Want to Hear from You - Teacher Feedback</h1>
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="grade" className="tt1">Select Grade</label>
        <select id="grade" required name="dropdown" style={{ position: 'absolute', width: '337px', height: '37px', left: '632px', top: '200px', background: '#FFFFFF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '8px' }} onChange={(a)=> setGrade(a.target.value)}>
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
        
        <label htmlFor="subject" className="tt2">Select Subject</label>
        <select id="subject" required name="dropdown" style={{ position: 'absolute', width: '337px', height: '37px', left: '632px', top: '264px', background: '#FFFFFF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '8px' }}  onChange={(a)=> setSubject(a.target.value)}>
        <option value="" ></option>
        <option value="History" >History</option>
          <option value="Sinhala" >Sinhala</option>
          <option value="ICT" >ICT</option>
          <option value="Music" >Music</option>
          <option value="Mathematics" >Mathematics</option>
          <option value="Science" >Science</option>
          <option value="English" >English</option>
        </select>
        
        <label htmlFor="teacher" className="tt3">Select Teacher</label>
        <select id="teacher" required name="dropdown" style={{ position: 'absolute', width: '337px', height: '37px', left: '632px', top: '346px', background: '#FFFFFF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '8px' }} onChange={(a)=> setTeacher(a.target.value)}>
        <option value="" ></option>
          <option value="Mr.Amila" >Mr.Amila</option>
          <option value="Mrs.Nimal" >Mrs.Nimal</option>
          <option value="Mrs.Upul" >Mrs.Upul</option>
          <option value="Mr.Senaka" >Mr.Senaka</option>
          <option value="Mrs.Anne" >Mrs.Anne</option>
        </select>
        
        <label htmlFor="studentID" className="tt4">Student ID</label>
        <input
          id="studentID"
          pattern="^SD\d{3}$"
          style={{ boxSizing: 'border-box', position: 'absolute', width: '337px', height: '53px', left: '632px', top: '448px', background: '#FFFFFF', border: '1px solid #000000' }}
          type="text"
          onChange={(a)=> setSid(a.target.value)}
        />
        <label htmlFor="feedback" className="tt5">Feedback</label>
        <textarea
          id="feedback"
          required
          style={{ boxSizing: 'border-box', position: 'absolute', width: '914px', height: '238px', left: '465px', top: '625px', background: '#FFFFFF', border: '1px solid #000000' }}
          onChange={(a)=> setTFeedback(a.target.value)}
        ></textarea>
        <button
          id="tfeed"
          className="buttonbb5"
          
        >
          Submit
        </button>
      </form>
    </body>
    </div>
  )
}

export default TFeedback