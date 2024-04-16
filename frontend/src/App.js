import { Routes, Route } from 'react-router-dom';
import Portal from './screen/Portal';

import StudentLogin from './screen/Student/User_Management/StudentLogin';
import StudentRegister from './screen/Student/User_Management/StudentRegister';
import StudentProfile from './screen/Student/User_Management/StudentProfile';
import StudentProfileEdit from './screen/Student/User_Management/StudentProfieEdit';
import StudentForgetPassword from './screen/Student/User_Management/Forgetpasswordstudent';
import StudentDashboard from './screen/Student/Dashboard';
import StudentTimetable from './screen/Student/Timetbale_Management/Timetable';
import LessonMaterial from './screen/Student/Lesson_Management/StMyClasses';
import PayOnline from './screen/Student/Financial_Management/StPaymentOnline';
import ViewOnline from './screen/Student/Financial_Management/StViewOnline';
import PayBank from './screen/Student/Financial_Management/StPaymentBank';
import ViewBank from './screen/Student/Financial_Management/StViewBank';
import ViewCash from './screen/Student/Financial_Management/StViewCash';
import EditOnline from './screen/Student/Financial_Management/StEditOnline';
import Wallet from './screen/Student/Financial_Management/StWallet';
import EditBank from './screen/Student/Financial_Management/StEditBank';
import CancelOnline from './screen/Student/Financial_Management/StCancelOnline';
import CancelBank from './screen/Student/Financial_Management/StCancelBank';
import Payment from './screen/Student/Financial_Management/StMain';


import TeacherLogin from './screen/Teacher/TeacherLogin';
import TeacherProfile from './screen/Teacher/TeacherProfile';
import TeacherProfileEdit from './screen/Teacher/TeacherProfileEdit';
import TeacherForgetPassword from './screen/Teacher/Forgetpasswordteacher';
import TeacherTimetable from './screen/Teacher/Timetable';

import AdminManagerLogin from './screen/AdminManagerLogin';
import ManagerLogin from './screen/Manager/ManagerLogin';
import ManagerForgetPassword from './screen/Manager/Forgetpasswordmanager';
import ManagerProfile from './screen/Manager/ManagerProfile';

import AdminLogin from './screen/Admin/AdminLogin';
import AdminForgetPassword from './screen/Admin/Forgetpasswordadmin';
import AdminProfile from './screen/Admin/AdminProfile';
import AddTeacher from './screen/Admin/AddTeacher';
import AddManager from './screen/Admin/AddManager';
import AddAdmin from './screen/Admin/AddAdmin';
import SearchusersAdmin from './screen/Admin/AdminSearchusers';

import MyClassess from './screen/Teacher/Lesson_Management/MyClasses';
import CreateNotice from './screen/Teacher/Lesson_Management/CreateNotice';
import EditNotice from './screen/Teacher/Lesson_Management/EditNotice';
import AddMaterials from './screen/Teacher/Lesson_Management/AddMaterials';
import EditMaterials from './screen/Teacher/Lesson_Management/EditMaterials';

import axios from 'axios';
import {Toaster} from 'react-hot-toast';


axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
    <Toaster position='top-center' toastOptions={{duration: 2000}}/>
    <Routes>
      <Route path='/' element={<Portal/>}/>

      <Route path="/login" element={ <StudentLogin /> } />
      <Route path="/register" element={ <StudentRegister />} />
      <Route path="/studentprofile" element={<StudentProfile />} />
      <Route path='/studentprofileedit' element={<StudentProfileEdit/>}/> 
      <Route path='/studentforgetpassword' element={<StudentForgetPassword/>}/>
      <Route path="/studentdashboard" element={<StudentDashboard />} />
      <Route path="/studenttimetable" element={<StudentTimetable />} />
      <Route path="/lessonmaterial" element={<LessonMaterial />} />
      <Route path= '/payment' element = {<Payment/>} />
      <Route path= '/payonline' element = {<PayOnline/>} />
      <Route path= '/viewonline' element = {<ViewOnline/>} />
      <Route path= '/paybank' element = {<PayBank/>} />      
      <Route path= '/viewbank' element = {<ViewBank/>} />
      <Route path= '/viewcash' element = {<ViewCash/>} />      
      <Route path= '/editonline/:id' element = {<EditOnline/>} />
      <Route path= '/Wallet' element = {<Wallet/>} />
      <Route path= '/editbank/:id' element = {<EditBank/>} />     
      <Route path= '/cancelonline/:id' element = {<CancelOnline/>} />
      <Route path= '/cancelbank/:id' element = {<CancelBank/>} /> 

      <Route path="/teacherlogin" element={<TeacherLogin />} />
      <Route path="/teacherprofile" element={<TeacherProfile />} />
      <Route path='/teacherprofileedit' element={<TeacherProfileEdit/>}/>
      <Route path='/teacherforgetpassword' element={<TeacherForgetPassword/>}/>
      <Route path="/teachertimetable" element={<TeacherTimetable />} />

      <Route path="/adminmanagerlogin" element={<AdminManagerLogin />} />
      <Route path="/managerlogin" element={<ManagerLogin />} />
      <Route path='/managerforgetpassword' element={<ManagerForgetPassword/>}/>
      <Route path="/managerprofile" element={<ManagerProfile />} />
      
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path='/adminforgetpassword' element={<AdminForgetPassword/>}/>
      <Route path="/adminprofile" element={<AdminProfile />} />
      <Route path="/addteacher" element={<AddTeacher />} />
      <Route path="/addmanager" element={<AddManager />} />
      <Route path="/addadmin" element={<AddAdmin />} />
      <Route path="/searchusersadmin" element={<SearchusersAdmin />} />   

      <Route path="/myclasses" element={<MyClassess />} />
        <Route path="/createnotice" element={<CreateNotice />} />
        <Route path="/editnotice/:id" element={<EditNotice />} />
        <Route path="/addmaterial" element={<AddMaterials />} />
        <Route path="/editmaterial/:id" element={<EditMaterials />} />         
      
    </Routes>    
    </>
  );
}

export default App;
