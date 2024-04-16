import React, { useEffect, useState } from 'react'
import './profile.css'
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
import axios from 'axios'
// import { Link } from 'react-router-dom'


function AdminSearchusers() {
    const [name, setName] = useState();    
    const [student, setStudent] = useState([]);   
    const [teacher, setTeacher] = useState([]);   
    const [searchstudent, setSearchStudent] = useState('');
    const [searchteacher, setSearchTeacher] = useState('');
    
    useEffect(() => {
        axios.get('/getstudentsadmin')
        .then((res) => setStudent(res.data))
        .catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get('/getteachersadmin')
        .then((res) => setTeacher(res.data))
        .catch((err) => {
            console.log(err);
        })
    }, [])
    
    useEffect(()=>{
        axios.get('/adminprofile')
        .then((res)=>{
            setName(res.data.name);            
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const studentDelete = (id) =>{
        axios.delete('/deletestudent/'+id)
        .then((res)=>{
            window.location.reload();        
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const teacherDelete = (id) =>{
        axios.delete('/deleteteacher/'+id)
        .then((res)=>{
            window.location.reload();        
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleDeletetoken = () => {
        axios.get('/logout').then(res => {
            console.log(res);
            window.location.href = '/';
        }).catch(err => console.log(err));
    }
    
  return (
    <main>
        <div className='profilecontent'>        
            <div className='sidenavbar'>                
                <ul className='sidenavbarul'>
                    <li>
                        <img src={home} alt='home' className='navimage'/>
                        <a href='/login'>Dashboard</a>
                    </li>
                    <li>
                        <img src={classes} alt='home' className='navimage'/>
                        <a href='/login'>My Classes</a>
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
                        <a href='/login'>TimeTable</a>
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
            <div>
                <table>
                    <tr>
                        <td className='tbllogo'>
                            <img src={logo} alt='logo'/>
                        </td>
                        <td>
                            <p class='hellotxt'><b>Hello, {name}</b><br/>Admin</p>
                        </td>
                        <td>
                            <img src={userpng} alt='logo' class='hellopic'/>
                        </td>
                    </tr>
                </table> 
                <br/>
                <p class='usertxt'>Student Details</p> 
                <div class="line1"></div>  
                <div>
                    <table>
                        <tr>
                            <td class="searchbarcol">
                                <input type="text" id="search" name="search" placeholder="Search..." class="searchbar" onChange={(e)=> setSearchStudent(e.target.value)}/>
                            </td>
                            {/* <td>
                            <button className='btnedit' type="submit">Search</button>
                            </td>*/}
                        </tr>
                    </table>   
                    <br/>
                    <table className='searchtablemain'>
                        <tr>
                            <th  className='searchtable'>Student Name</th>
                            <th className='searchtable'>Email</th>
                            <th className='searchtable'>Phone</th>
                            <th className='searchtable'>Username</th>
                            <th className='searchtable'>Gender</th>
                            <th className='searchtable'>Parent name</th>
                            <th className='searchtable'>Parent phonenumber</th>
                            <th className='searchtable'>Security Answer</th>
                        </tr>
                        {student.filter((student) => {
                            return searchstudent.toLowerCase() === '' ? student : student.name.toLowerCase().includes(searchstudent)
                        }).map((student) => (
                            <tr>
                                <td className='searchtable'>{student.name}</td>
                                <td className='searchtable'>{student.email}</td>
                                <td className='searchtable'>{student.contactnumber}</td>
                                <td className='searchtable'>{student.username}</td>
                                <td className='searchtable'>{student.gender}</td>
                                <td className='searchtable'>{student.parentname}</td>
                                <td className='searchtable'>{student.parentphonenumber}</td>
                                <td className='searchtable'>{student.SecAnswer}</td>
                                <td><button className='btnedit' onClick={(e) => studentDelete(student._id)}>Delete</button></td>
                            </tr>
                        ))}

                    </table>                 
                </div>
                <br/>
                <p class='usertxt'>Teacher Details</p> 
                <div class="line1"></div> 
                <div>
                    <table>
                        <tr>
                            <td class="searchbarcol">
                                <input type="text" id="search" name="search" placeholder="Search..." class="searchbar" onChange={(e)=> setSearchTeacher(e.target.value)}/>
                            </td>
                            {/* <td>
                            <button className='btnedit' type="submit">Search</button>
                            </td>*/}
                        </tr>
                    </table>   
                    <br/>
                    <table className='searchtablemain'>
                        <tr>
                            <th  className='searchtable'>Teacher Name</th>
                            <th className='searchtable'>Email</th>
                            <th className='searchtable'>Phone</th>
                            <th className='searchtable'>Username</th>
                            <th className='searchtable'>Gender</th>  
                            <th className='searchtable'>Subject</th>                            
                            <th className='searchtable'>Security Answer</th>
                        </tr>
                        {teacher.filter((teacher) => {
                            return searchteacher.toLowerCase() === '' ? teacher : teacher.name.toLowerCase().includes(searchteacher)
                        }).map((teacher) => (
                            <tr>
                                <td className='searchtable'>{teacher.name}</td>
                                <td className='searchtable'>{teacher.email}</td>
                                <td className='searchtable'>{teacher.contactnumber}</td>
                                <td className='searchtable'>{teacher.username}</td>
                                <td className='searchtable'>{teacher.gender}</td>  
                                <td className='searchtable'>{teacher.subject}</td>                                
                                <td className='searchtable'>{teacher.SecAnswer}</td>
                                <td><button className='btnedit' onClick={(e) => teacherDelete(teacher._id)}>Delete</button></td>
                            </tr>
                        ))}

                    </table>                 
                </div>
                <br/><br/>
            </div>            
        </div>
    </main>
  )
}

export default AdminSearchusers
