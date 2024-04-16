import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './photos/logofull.png'
import userpng from './photos/User.png'
import './Dashboard.css';
import dashboard from './photos/dashboard.png';
import Nav from './NavBar/Nav';



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


    return (
        <div>
        <Nav/>
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
        </div>
    );
}

export default Dashboard;
