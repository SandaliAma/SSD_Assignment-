import React,  { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './CreateManager.css';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header'

function CreateManager() {

    const[TeacherName,setEnterTeacherName]=useState();
    const[TeacherID,setEnterTeacherID]=useState();
    const[SubjectName,setEnetrSubjectName]=useState();
    const[Grade,setEnterGrade]=useState();
    const[AttendStudents,setEnterEnrollStudent]=useState();
    const[FreeCardAmount,setEnterFreeCardAmount]=useState();
    const[InstitutePayment,setEnterInstitutePayment]=useState();
    const[MonthlySalary,setEnterMonthelySalary]=useState();
    const[Date,setEnetrDate]=useState();
    const navigator= useNavigate();

    const submit = (e) =>{
        e.preventDefault();
        axios.post('http://Localhost:5000/createUser',{TeacherName:TeacherName,TeacherID:TeacherID,SubjectName:SubjectName,Grade:Grade,AttendStudents:AttendStudents,FreeCardAmount:FreeCardAmount,InstitutePayment:InstitutePayment,MonthlySalary:MonthlySalary,Date:Date})
        .then(res=>{
            console.log(res);
            
          })
          .catch(err => console.error(err));
    }

    const calculateMonthlySalary = () => {
      const monthlySalary = (parseFloat(AttendStudents) * parseFloat(1000)) -(parseFloat(FreeCardAmount) + parseFloat(InstitutePayment) );
      setEnterMonthelySalary(monthlySalary.toFixed(2));
     };

    const handleSubmit = (e) => {
      e.preventDefault();
      Swal.fire({
        title: "Confirm Salary",
        text: "Are you sure you want to proceed with the Salary?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, proceed!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          submit(e); // Call submit function if result is confirmed
          Swal.fire({
            title: "Salary is Confirmed",
            icon: "success",
          });
          handleClick2();
        } else {
          Swal.fire({
            title: "Salary is Canceled",
            icon: "error",
          });
          // Call submit function even if result is canceled
        }
      });
    };
    
    
  
    const handleClick2 = () => {
      toast.loading('Salary is processing...', {
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
          toast.success('Salary is completed!', {
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
            navigator('/');
          }, 2500); // Wait for 2 seconds after displaying success toast before navigating
        }, 2500); // Wait for 2 seconds after dismissing loading toast before displaying success toast
      }, 5000); // Wait for 5 seconds before dismissing loading toast
    };

    

  return (
    <div>
      <Head/>
    <Toaster/>
    <div className="bodyA">
      <h12 className="h12i">Make a Salary</h12>
      <br></br>

      <div className="container">
        <form onSubmit={handleSubmit} className="AddSalary"><br />
          <label htmlFor="an" className="labelA1">Enter Teacher Name :</label>
          <input type="text" name="acname" placeholder="Enter Name" pattern="[A-Za-z\s]+" required className="text1" onChange={(e)=>setEnterTeacherName(e.target.value)} /><br /><br />

          <label htmlFor="cname" className="labelA2">Enter Teacher ID :</label>
          <input type="text" name="itnum" placeholder="Enter ID"  required className="text1" onChange={(e)=>setEnterTeacherID(e.target.value)} /><br /><br />

          <label htmlFor="an" className="labelA3">Enter Subject Name :</label>
          <input type="text" name="acname" placeholder="Enter Subject" pattern="[A-Za-z\s]+" required className="text1"  onChange={(e)=>setEnetrSubjectName(e.target.value)}/><br /><br />

          <label htmlFor="an" className="labelA4">Enter Grade :</label>
          <input type="text" name="acnum" placeholder="Grade" pattern="[0-9]+" required className="text1" onChange={(e)=>setEnterGrade(e.target.value)} /><br /><br />

          <label htmlFor="an" className="labelA5">Enter Attend Students :</label>
          <input type="text" name="acnum" placeholder="Students" pattern="[0-9]+" required className="text1" onChange={(e)=>setEnterEnrollStudent(e.target.value)} /><br /><br />

          <label id="totalA" name="totalA" className="labelA6">Enter Free Card Amount :</label>
          <input type="text" name="amount" placeholder="00.00" pattern="\d+(\.\d{2})?" required className="text1" onChange={(e)=>setEnterFreeCardAmount(e.target.value)} /><br /><br />

          <label id="totalA" name="totalA" className="labelA7">Enter Institute Payment :</label>
          <input type="text" name="amount" placeholder="00.00" pattern="\d+(\.\d{2})?" required className="text1" onChange={(e)=>setEnterInstitutePayment(e.target.value)} /><br /><br />
          <br/><br/>
          <button type="submit" name="calculate" className="buttonA7" onClick={calculateMonthlySalary}>
              Calculate
            </button>
          <br/><br/>
          <label id="totalA" name="totalA" className="labelA8">Enter Monthly Salary :</label>
          <input type="text" name="amount" placeholder="00.00" pattern="\d+(\.\d{2})?" required className="text1" onChange={(e)=>setEnterMonthelySalary(e.target.value)} /><br /><br />

          <label htmlFor="tda" className="labelA9">Enter Date :</label>
          <input type="text" name="date" placeholder="(DD/MM/YY)" pattern="(0[1-9]|1[0-9]|2[0-9]|3[0-1])/(0[1-9]|1[0-2])/\d{2}" required className="text1" onChange={(e)=>setEnetrDate(e.target.value)} /><br /><br />

          <div className="sign1" className1="container4"><br />
            <button type="submit" name="saveandsubmit" className="buttonA3">Save and Submit</button>
            <button type="submit" name="back" className="buttonA1">Back</button>
          </div>

        </form>
      </div>
    </div>
    </div>
  );
}

export default CreateManager;
