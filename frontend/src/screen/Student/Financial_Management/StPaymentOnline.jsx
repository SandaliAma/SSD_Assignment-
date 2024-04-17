import React, { useState , useEffect } from 'react';
import{Link} from 'react-router-dom';
import './stpaymentonline.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header';






function StPaymentOnline() {

  const status = 'Pending';
  const type = 'Online';

  const[itnumber,setItnumber] = useState();
  const[cardname,setCardname] = useState();
  const[cardnumber,setCardnumber] = useState();
  const[securitycode,setSecuritycode] = useState();
  const[expiredate,setExpiredate] = useState();
  const[discription,setDiscription] = useState();
  const[date,setDate] = useState();
  const[amount,setAmount] = useState();
  const navigator = useNavigate();

  const [name, setName] = useState();

  useEffect(()=>{
    axios.get('/studentprofile')
    .then((res)=>{
        setName(res.data.name);            
    })
    .catch((err)=>{
        console.log(err);
    })
  },[])


  const submit = (e) => {
      e.preventDefault();
      axios.post('http://Localhost:5000/createonline',{itnumber:itnumber ,cardname:cardname, cardnumber:cardnumber, securitycode:securitycode,expiredate:expiredate, discription:discription,
      date:date , amount:amount ,status:status ,type:type })

      .then(res=>{
        console.log(res);
       
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;

    const formattedDate = yyyy + '-' + mm + '-' + dd;
    setDate(formattedDate);
  }, []);

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
          navigator('/payment');
        }, 2500); // Wait for 2 seconds after displaying success toast before navigating
      }, 2500); // Wait for 2 seconds after dismissing loading toast before displaying success toast
    }, 5000); // Wait for 5 seconds before dismissing loading toast
  };
  


  return (
    <div>
      <Head/>
       <Toaster/>
      <div className="bodypon">
        
            <h1 className="onh1"><br></br>Payment Form</h1>

            <button type="submit" name="online" className="buttonon1">Online</button><br></br>
            <Link to = {'/paybank'} >
            <button type="submit" name="bank" className="buttonon2">Bank Deposit</button>
    </Link>

            <div className="containerpon">
            <form className="paypon" 
            onSubmit={handleSubmit}
            >

                    <h2 className="onh2"><br></br>Payment Details</h2><br/>
                    <label className="labelon1"> Enter IT Number :</label><br/>
                    <input type="text" name="itnum" placeholder="IT12345678" pattern="^IT\d{8}$"   required className="texton1" onChange={(e)=>setItnumber(e.target.value)} /><br /><br />


                    <label htmlFor="totalA" className="labelon1">Enter Description:</label><br />
                    <input type="text" name="description" placeholder="Class Name" pattern="[A-Za-z\s]+" required className="texton7" onChange={(e)=>setDiscription(e.target.value)}/><br /><br />

                    <label htmlFor="tda" className="labelon2">Enter Date:</label><br />
                    <input type="date" name="date" placeholder="(DD/MM/YYYY)"  value={date} readOnly className="texton5"  onChange={(e)=>setDate(e.target.value)}/><br /><br />

                    <label htmlFor="totalA" className="labelon2">Enter Amount:</label><br />
                    <input type="text" name="amount" placeholder="00.00" pattern="\d+(\.\d{2})?" required className="texton6" onChange={(e)=>setAmount(e.target.value)}/><br /><br />
                    
                    <div className="paypon2" >
                      <h2 className="onh2"><br></br>Card Details</h2><br/>
                    <label htmlFor="an" className="labelon2">Name On the Card</label>
                    <input type="text" name="cname" placeholder="Enter Name" pattern="[A-Za-z\s]+" required className="texton2" onChange={(e)=>setCardname(e.target.value)}/> <br /><br />

                    <label htmlFor="an" className="labelon2">Card Number</label><br />
                    <input type="text" name="cnum" placeholder="xxxxxxxxxx" pattern="^\d{16}$" required className="texton3" onChange={(e)=>setCardnumber(e.target.value)} /> <br /><br />

                    <label htmlFor="tda" className="labelon2">Expire Date</label>
                    <label htmlFor="cno" className="labelon3">Security Code</label><br/>
                    <input type="text" name="exdate" placeholder="(MM/YY)" pattern="(0[1-9]|1[0-2])\/\d{2}" required className="texton8" onChange={(e)=>setExpiredate(e.target.value)}/>
                    <input type="text" name="scode" placeholder="***" pattern="^\d{3}$" required className="texton4" onChange={(e)=>setSecuritycode(e.target.value)} /><br /><br />

                   

               
                    <div className="containeron4"> 

                    <input type="checkbox" id="terms" name="terms" value="accepted" className="checkbox-text" required/>
                    <label for="terms" className="checkbox-label">I accept the terms and conditions</label>
 
                        <button type="submit" name="submit" className="buttonon3">Pay Now</button>
                    </div>

                    </div>
                </form>
            </div>
        </div>
       
    </div>
  )
}

export default StPaymentOnline
