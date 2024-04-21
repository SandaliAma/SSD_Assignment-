import React, { useEffect, useState } from 'react'
import './profile.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Head from '../Header/Header';


function StudentProfile() {
    const [name, setName] = useState();
    const [stdid, setstdid] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [contactnumber, setContactnumber] = useState();
    const [gender, setGender] = useState();
    const [parentname, setParentName] = useState();
    const [parentphonenumber, setParentPhonenumber] = useState();
    const [secanswer, setSecAnswer] = useState();
    const [show_profile_photo, setProfilePhotoView] = useState(null);

    
    useEffect(()=>{
        axios.get('/studentprofile')
        .then((res)=>{
            setName(res.data.name);
            setstdid(res.data.stdid);
            setUsername(res.data.username);
            setEmail(res.data.email);
            setContactnumber(res.data.contactnumber);
            setGender(res.data.gender);
            setParentName(res.data.parentname);
            setParentPhonenumber(res.data.parentphonenumber);
            setSecAnswer(res.data.SecAnswer);  
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    
    useEffect(() => {
        getImage();
    }, []);


    const getImage = async () => {
        try {
            const result = await axios.get('/getimage');
            setProfilePhotoView(result.data.data);
        } catch (error) {
            console.error(error);
        }
    };


    
  return (
    <main>
       <Head/>
        <div className='profilecontent'>        
            
            <div>
                
                <p class='usertxt'>User Profile</p> 
                <div class="line1"></div>  
                <table>
                    <tr>
                        <td>
                        {show_profile_photo === null
                                            ? ""
                                            : show_profile_photo.map((data, index) => (
                                                <img
                                                    key={index}
                                                    src={`http://localhost:5000/profilephotos/${data.profile_photo}`}
                                                    height={100}
                                                    width={100}
                                                    alt="profile"
                                                />
                                            ))}
                        </td>
                        <td>
                            <p class='hellotxt'>{name}<br/>{stdid}<br/>Student</p>
                        </td>
                        <td>          
                            <Link to={'/studentprofileedit'}><button className='btnedit' type="submit">Edit User Details</button> </Link>              
                                                      
                        </td>
                    </tr>
                </table>  
                <div class="line"></div>   
                <p class='userprofiletxt'>Full name</p>  
                <div className='profilebox'>{name}</div>
                <p class='userprofiletxt'>Username</p>  
                <div className='profilebox'>{username}</div> 
                <p class='userprofiletxt'>Gender</p>  
                <div className='profilebox'>{gender}</div>
                <br/>
                <div class="line"></div>
                <table>
                    <tr>
                        <td className='conatctcol'>
                            <p class='userprofiletxt'>Email Address</p>  
                            <div className='profilebox'>{email}</div>  
                        </td>
                        <td>
                            <p class='userprofiletxt'>Phone Number</p>  
                            <div className='profilebox'>{contactnumber}</div>
                        </td>
                    </tr>
                </table>
                <br/>
                <div class="line"></div>
                <table>
                    <tr>
                        <td className='conatctcol'>
                            <p class='userprofiletxt'>Parent Name</p>  
                            <div className='profilebox'>{parentname}</div>
                        </td>
                        <td>
                            <p class='userprofiletxt'>Parent Phone Number</p>  
                            <div className='profilebox'>{parentphonenumber}</div>
                        </td>
                    </tr>
                </table>
                <br/>
                <div class="line"></div>
                <p class='userprofiletxt'>Security Question - What city were you born in?</p>  
                <div className='profilebox'>{secanswer}</div> 
                <br/>
                <div class="line"></div>                
                <br/>
            </div>            
        </div>
    </main>
  )
}

export default StudentProfile
