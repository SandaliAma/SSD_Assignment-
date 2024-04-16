import React, { useState, useEffect } from 'react';
import axios from 'axios';
import home from './navbar_images/Home.png'
import classes from './navbar_images/Class.png'
import enroll from './navbar_images/Enroll.png'
import pay from './navbar_images/Pay.png'
import time from './navbar_images/Time.png'
import attendance from './navbar_images/Attendance.png'
import qa from './navbar_images/Qa.png'
import feedback from './navbar_images/Feedback.png'
import profile from './navbar_images/Profile.png'
import wallet from './navbar_images/Wallet.png'
import logout from './navbar_images/Logout.png'
import logo from './photos/logofull.png'
import userpng from './photos/User.png'
import './Dashboard.css';
import dashboard from './photos/dashboard.png';



function Dashboard() {
    const [Institutenotices, setINotices] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [name, setName] = useState();

    useEffect(() => {
        // Get today's date
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
        setCurrentDate(formattedDate);
    }, []);

    useEffect(()=>{
        axios.get('/studentprofile')
        .then((res)=>{
            setName(res.data.name);            
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])


    useEffect(() => {
        //get notices
        axios.get('http://localhost:5000/getinstitutenotices')
            .then(res => {
                setINotices(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    const handleDeletetoken = () => {
        axios.get('/logout').then(res => {
            console.log(res);
            window.location.href = '/';
        }).catch(err => console.log(err));
    }

    return (
        <>
        <div className='sidenavbar'>                
                <ul className='sidenavbarul'>
                    <li>
                        <img src={home} alt='home' className='navimage'/>
                        <a href='/studentdashboard'>Dashboard</a>
                    </li>
                    <li>
                        <img src={classes} alt='home' className='navimage'/>
                        <a href='/lessonmaterial'>My Classes</a>
                    </li>
                    <li>
                        <img src={enroll} alt='home' className='navimage'/>
                        <a href='/login'>Enrollments</a>
                    </li>
                    <li>
                        <img src={pay} alt='home' className='navimage'/>
                        <a href='/login'>Payment</a>
                    </li>
                    <li>
                        <img src={time} alt='home' className='navimage'/>
                        <a href='/studenttimetable'>TimeTable</a>
                    </li>
                    <li>
                        <img src={attendance} alt='home' className='navimage'/>
                        <a href='/login'>Attendance</a>
                    </li>
                    <li>
                        <img src={qa} alt='home' className='navimage'/>
                        <a href='/login'>Q&A</a>
                    </li>
                    <li>
                        <img src={feedback} alt='home' className='navimage'/>
                        <a href='/login'>Feedbacks</a>
                    </li>
                    <li>
                        <img src={profile} alt='home' className='navimage'/>
                        <a href='/studentprofile'>Profile</a>
                    </li>
                    <li>
                        <img src={wallet} alt='home' className='navimage'/>
                        <a href='/login'>Wallet</a>
                    </li>
                    <br/><br/><br/><br/>
                    <li className='logoutsq'>
                        <img src={logout} alt='home' className='navimage'/>
                        <button className='logoutbtn' onClick={handleDeletetoken}>Logout</button>
                    </li>
                </ul>
            </div>
            <div className="d_container">           
                <div className="main-content">
                <table>
                    <tr>
                        <td className='tbllogo'>
                            <img src={logo} alt='logo'/>
                        </td>
                        <td>
                            <p class='hellotxt'><b>Hello, {name}</b><br/>Student</p>
                        </td>
                        <td>
                            <img src={userpng} alt='logo' class='hellopic'/>
                        </td>
                    </tr>
                </table>
                    <div className="box" >
                    <p>{currentDate}</p>
                        <h1>Welcome Back , {name} !</h1>
                        <img src={dashboard} alt="Dashboard" className="image" />
                    </div>
                    
                 
                    <div className="Inotices">
                        <h2 className="inotice_topic" >Institute Notices & Messages</h2>  <hr />
                        {Institutenotices.length > 0 ? Institutenotices.map((Inotice, index) => (
                            <div className="Inotice" key={index}>
                                <label></label>
                                <div className="Inotice-date">{Inotice.I_date}</div>
                                <div className="Inotice-title">{Inotice.I_topic}</div>
                                <div className="Inotice-description">{Inotice.I_description}</div>
                            </div>
                        )) : <div>No notices available</div>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
