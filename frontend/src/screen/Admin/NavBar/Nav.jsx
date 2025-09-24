import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure react-router-dom is imported
import './navbar.css';
import home from './navbar_images/Home.png';
import classes from './navbar_images/Class.png';
import enroll from './navbar_images/Enroll.png';
import pay from './navbar_images/Pay.png';
import time from './navbar_images/Time.png';
import attendance from './navbar_images/Attendance.png';
import qa from './navbar_images/Qa.png';
import feedback from './navbar_images/Feedback.png';
import profile from './navbar_images/Profile.png';
import wallet from './navbar_images/Wallet.png';
import logout from './navbar_images/Logout.png';
import axios from 'axios';

function Nav() {
  const navigate = useNavigate(); 

  const handleDeletetoken = async () => {
    try {
      const res = await axios.get('/logout');
      console.log(res);
      navigate('/');  
    } catch (err) {
      console.log(err);
     
    }
  };

  return (
    <div>
      <div className='sidenavbar'>
        <ul className='sidenavbarul'>
          <li>
            <img src={home} alt='home' className='navimage' />
            <a href='/adminprofile' rel='noopener noreferrer'>Dashboard</a>
          </li>
          <li>
            <img src={classes} alt='classes' className='navimage' />
            <a href='/adgenerateclass' rel='noopener noreferrer'>My Classes</a>
          </li>
          <li>
            <img src={classes} alt='lessons' className='navimage' />
            <a href='/adgenratelesson' rel='noopener noreferrer'>Lesson Materials</a>
          </li>
          <li>
            <img src={pay} alt='payment' className='navimage' />
            <a href='/admain' rel='noopener noreferrer'>Payment</a>
          </li>
          <li>
            <img src={profile} alt='profile' className='navimage' />
            <a href='/adminprofile' rel='noopener noreferrer'>Profile</a>
          </li>
          <li>
            <img src={wallet} alt='salary' className='navimage' />
            <a href='/adgenratesalry' rel='noopener noreferrer'>Salary</a>
          </li>
          <br /><br /><br />
          <li className='logoutsq'>
            <img src={logout} alt='logout' className='navimage' />
            <div className='logoutbtn' onClick={handleDeletetoken}>
              <div className='logouttxt'>Logout</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;