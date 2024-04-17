import React, { useState } from 'react'
import './SFeedback.css';
import {Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header';


function SFeedback() {

  const[sid,setSid]=useState();
  const [grade, setGrade] = useState();
  const [sfeedback, setSFeedback] = useState();
  const [date, setDate] = useState();
  const navigator = useNavigate();

  const submit = (a) =>{
    a.preventDefault();
    axios.post('http://localhost:5000/createSF', {grade:grade,sid:sid,feedback:sfeedback,date:date})
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
    <div className='uth2' >
        <Head/>
      <Toaster/>
    <h1 className="heading9">We Want to Hear from You - Teacher Feedback</h1>
    <form onSubmit={handleSubmit}>

    <label htmlFor="sid1" className="tv18">Student ID</label>
    <input
        id="sid1"
        pattern="^SD\d{3}$"
       style={{boxSizing: 'border-box',position: 'absolute',width: '920px',height: '53px',left: '431px',top: '262px',background: '#FFFFFF',border: '1px solid #000000'}} 
        type="text" required
        onChange={(a)=> setSid(a.target.value)}
      />

      <label htmlFor="grade" className="tt6">Select Grade</label>
      <select id="grade" name="dropdown" required style={{boxSizing: 'border-box',position: 'absolute',width: '920px',height: '53px',left: '431px',top: '406px',background: '#FFFFFF',border: '1px solid #000000'}} onChange={(a)=> setGrade(a.target.value)}>
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
        style={{boxSizing: 'border-box',position: 'absolute',width: '920px',height: '178px',left: '431px',top: '561px',background: '#FFFFFF',border: '1px solid #000000'}}
        onChange={(a)=> setSFeedback(a.target.value)}
        required
      ></textarea>

      <label htmlFor="date" className="tt8">Enter Date</label>
      <input
        id="date"
        style={{boxSizing: 'border-box',position: 'absolute',width: '920px',height: '53px',left: '436px',top: '815px',background: '#FFFFFF',border: '1px solid #000000'}}
        type="date"
        required
        onChange={(a)=> setDate(a.target.value)}
      />
      <button
        id="sfeed"
        className="buttonbb6"
       
      >
        Submit
      </button>
    </form>
  </div>
  )
}

export default SFeedback