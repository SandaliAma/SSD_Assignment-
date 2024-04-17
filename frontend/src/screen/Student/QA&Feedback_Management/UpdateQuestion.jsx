import React, { useEffect, useState } from 'react'
import './AddQuestion.css';
import {Link, useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header';

function UpdateQuestion() {

  
  const {id} = useParams();
  const [grade, setGrade] = useState();
  const [subject, setSubject] = useState();
  const [teacher, setTeacher] = useState();
  const [sid, setSid] = useState();
  const [question, setQuestion] = useState();
  const navigator = useNavigate();


  useEffect(() =>{
    axios.get('http://localhost:5000/getQuestion/' + id)
    .then((res) =>{
      setGrade(res.data.grade);
      setSubject(res.data.subject);
      setTeacher(res.data.teacher);
      setSid(res.data.sid);
      setQuestion(res.data.question);
    })
    .catch((err) => console.error(err));
  },[]);

  const update = (a) =>{
    a.preventDefault();
    axios.put('http://localhost:5000/updateQuestion/'+ id, {grade:grade,subject:subject,teacher:teacher,sid:sid,question:question})
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
          navigator('/MyQuestions');
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
      <Toaster/>
      <form onSubmit={handleSubmit}>
     
      <text className='heading2'>Connect with your teachers - Add Your Question</text>
        
        <label htmlFor="dropdown1" className='t1'>Select Grade</label>
        <select id="dropdown1" name="dropdown" style={{ position: 'absolute', width: '351px', height: '40px', left: '632px', top: '205px', background: '#FFFFFF',border: '1px solid #000000', borderRadius: '10px'  }} value={grade} onChange={(a)=> setGrade(a.target.value)}>
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
        
        <label htmlFor="dropdown2" className='t2'>Select Subject</label>
        <select id="dropdown2" name="dropdown" style={{ position: 'absolute', width: '351px', height: '40px', left: '632px', top: '279px', background: '#FFFFFF', border: '1px solid #000000', borderRadius: '10px' }} value={subject} onChange={(a)=> setSubject(a.target.value)}>
          <option value="" ></option>
          <option value="History" >History</option>
          <option value="Sinhala" >Sinhala</option>
          <option value="ICT" >ICT</option>
          <option value="Music" >Music</option>
          <option value="Mathematics" >Mathematics</option>
          <option value="Science" >Science</option>
          <option value="English" >English</option>
        </select>
        
        <label htmlFor="dropdown3" className='t3'>Select Teacher</label>
        <select id="dropdown3" name="dropdown" style={{ position: 'absolute', width: '351px', height: '40px', left: '632px', top: '360px', background: '#FFFFFF', border: '1px solid #000000', borderRadius: '10px' }} value={teacher} onChange={(a)=> setTeacher(a.target.value)}>
          <option value="" ></option>
          <option value="Mr.Amila" >Mr.Amila</option>
          <option value="Mrs.Nimal" >Mrs.Nimal</option>
          <option value="Mrs.Upul" >Mrs.Upul</option>
          <option value="Mr.Senaka" >Mr.Senaka</option>
          <option value="Mrs.Anne" >Mrs.Anne</option>
        </select>
        
        <text className='t5'>Student ID</text>
        <input type="text" name="sSID" style={{ boxSizing: 'border-box', position: 'absolute', width: '351px', height: '53px', left: '636px', top: '451px', background: '#FFFFFF', border: '1px solid #000000', borderRadius: '10px' }} placeholder='SD001' value={sid} onChange={(a)=> setSid(a.target.value)}/>
        
        <text className='t6'>Question</text>
        <input type="text" name="sQuestion" style={{ boxSizing: 'border-box', position: 'absolute', width: '920px', height: '219px', left: '459px', top: '610px', border: '1px solid #000000', borderRadius: '10px' }} placeholder='Enter your Question' value={question} onChange={(a)=> setQuestion(a.target.value)}/>
        
        <button name="qSubmit" style={{ position: 'absolute', width: '334px', height: '77px', left: '1045px', top: '927px', background: '#6C9DE2', borderRadius: '20px' }} className="t7">Submit</button>
      
      </form>
    </div>
  )
}

export default UpdateQuestion