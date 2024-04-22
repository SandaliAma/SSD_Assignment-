import React, { useState  } from 'react';
import './mgpayment.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ManagerWallet() {
    const [itnumber, setItnumber] = useState('');
    const [walletId, setWalletId] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const navigator = useNavigate();


    const submit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/createwallet', {
            itnumber: itnumber,
            walletId: walletId,
            date: date,
            amount: amount
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
            // Handle error properly, such as showing a toast or error message
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Confirm Payment",
            text: "Are you sure you want to create wallet?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                submit(e);
                Swal.fire({
                    title: "Wallet is Created",
                    icon: "success",
                });
                handleClick2();
            } else {
                Swal.fire({
                    title: "Wallet is Canceled",
                    icon: "error",
                });
            }
        });
    };

    const handleClick2 = () => {
        toast.loading('Wallet is processing...', {
            style: {
                background: 'black',
                color: '#ffffff',
                borderRadius: '10px',
                border: '2px solid #ffffff',
            },
        });
        setTimeout(() => {
            toast.dismiss();
            setTimeout(() => {
                toast.success('Wallet is completed!', {
                    style: {
                        background: '#28a745',
                        color: '#ffffff',
                        borderRadius: '10px',
                        border: '2px solid #ffffff',
                    },
                    duration: 2000,
                    iconTheme: {
                        primary: '#ffffff',
                        secondary: '#28a745',
                    },
                });
                setTimeout(() => {
                    navigator('/managerfinancial'); // Correct the usage of navigator
                }, 2500);
            }, 2500);
        }, 5000);
    };

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

    

  return (
    <div>
    <Head />
    <Toaster />
    <div className="bodymgpa">
        <h1 className="h1mgpa"><br />Wallet</h1>
        <div className="containermgpa">
            <form className="paymgpa" onSubmit={handleSubmit} >
                <br />
                <label htmlFor="cname" className="labelmgpa1">Enter IT Number:</label><br />
                <input type="text" name="itnum" placeholder="IT12345678" pattern="^IT\d{8}$" required className="textmgpa1" onChange={(e) => setItnumber(e.target.value)} /><br /><br />
                <label htmlFor="an" className="labelmgpa1">Enter wallet Id:</label><br />
                <input type="text" name="sname" placeholder="Enter Name" required className="textmgpa1" onChange={(e) => setWalletId(e.target.value)} /><br /><br />
                <label htmlFor="tda" className="labelmgpa1">Enter Date:</label><br />
                <input type="date" name="dates" placeholder="(DD/MM/YY)" value={date} readOnly className="textmgpa4" onChange={(e) => setDate(e.target.value)} /><br /><br />
                <label id="totalA" name="totalA" className="labelmgpa1">Enter Amount:</label><br />
                <input type="text" name="amounts" placeholder="00.00" pattern="\d+(\.\d{2})?" required className="textmgpa5" onChange={(e) => setAmount(e.target.value)} /><br /><br />
                <div className="containermgpa4">
                    <button type="submit" name="submit" className="buttonmgpa3">Confirm</button>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default ManagerWallet