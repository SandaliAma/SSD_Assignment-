import React, { useState } from 'react';
import{Link} from 'react-router-dom';
import './stpaymentbank.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';


function StPaymentBank() {

 const status = 'Pending';
 const type = 'Bank';

  const[itnumber,setItnumber] = useState();
  const[accountname,setAccountname] = useState();
  const[accountnumber,setAccountnumber] = useState();
  const[bankname,setBankname] = useState();
  const[discription,setDiscription] = useState();
  const[date,setDate] = useState();
  const[amount,setAmount] = useState();
  const navigator = useNavigate();


  const submit = (e) => {
      e.preventDefault();
      axios.post('http://Localhost:5000/createbank',{itnumber:itnumber ,accountname:accountname, accountnumber:accountnumber, bankname:bankname,discription:discription,
      date:date , amount:amount, status:status , type:type})

      .then(res=>{
        console.log(res);
        
      })
      .catch(err => console.error(err));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirm Payment",
      text: "Are you sure you want to proceed with the payment?",
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
          title: "Payment is Confirmed",
          icon: "success",
        });
        handleClick2();
      } else {
        Swal.fire({
          title: "Payment is Canceled",
          icon: "error",
        });
        // Call submit function even if result is canceled
      }
    });
  };
  
  

  const handleClick2 = () => {
    toast.loading('Payment is processing...', {
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
        toast.success('Payment is completed!', {
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
      <Toaster/>
     <div className="bodyba">
            <h1 className="bah1"> <br></br>Payment Form</h1>

            <Link to = {'/payonline'} >
            <button type="submit" name="makepayment" className="buttonba1">Online</button>
            </Link>
            <br></br>
            <button type="submit" name="viewpayment" className="buttonba2">Bank Deposit</button>

            <div className="containerba">
                <form className="payba" onSubmit={handleSubmit}>
                <h2 className="onh2"><br></br>Payment Details</h2><br/>

                    <label htmlFor="cname" className="labelba1">Enter IT Number:</label><br/>
                    <input type="text" name="itnum" placeholder="IT12345678" pattern="^IT\d{8}$" required className="textba1" onChange={(e)=>setItnumber(e.target.value)}/><br /><br />

                    <label htmlFor="an" className="labelba1">Enter Account Name:</label><br/>
                    <input type="text" name="acname" placeholder="Enter Name" pattern="[A-Za-z\s]+" required className="textba2" onChange={(e)=>setAccountname(e.target.value)}/> <br /><br />

                    <label htmlFor="an" className="labelba1">Enter Account Number:</label><br/>
                    <input type="text" name="acnum" placeholder="xxxxxxxxxx" pattern="[0-9]+" required className="textba3" onChange={(e)=>setAccountnumber(e.target.value)}/> <br /><br />

                    <label htmlFor="cno" className="labelba1">Enter Bank Name:</label><br/>
                    <input type="text" name="bname" placeholder="Enter Bank Name" pattern="[A-Za-z\s]+" required className="textba4" onChange={(e)=>setBankname(e.target.value)}/><br /><br />

                    <label htmlFor="totalA" className="labelba1">Enter Description:</label><br/>
                    <input type="text" name="descriptions" placeholder="Class Name" pattern="[A-Za-z\s]+" required className="textba7" onChange={(e)=>setDiscription(e.target.value)}/><br /><br />

                    <label htmlFor="tda" className="labelba1">Enter Date:</label><br/>
                    <input type="date" name="dates" placeholder="(DD/MM/YY)"  required className="textba5" onChange={(e)=>setDate(e.target.value)}/><br /><br />

                    <label htmlFor="totalA" className="labelba1">Enter Amount:</label><br/>
                    <input type="text" name="amounts" placeholder="00.00" pattern="\d+(\.\d{2})?" required className="textba6" onChange={(e)=>setAmount(e.target.value)}/><br /><br />
                    <br></br>
                    
                    
                    <div className="payba2">
                      <br/>
                    <label htmlFor="file" className="labelba8">Upload a file:</label><br />
                    <input type="file" id="file" name="file" className="textba8"  />
                    </div>
                    
                    <div> <br/><br/>
                    <input type="checkbox" id="terms" name="terms" value="accepted" className="checkbox-textpa" required/>
                    <label for="terms" className="checkbox-labelpa">I accept the terms and conditions</label>
                    <br/><br/>
                  
                        <button type="submit" name="submit" className="buttonba3">Pay Now</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default StPaymentBank
