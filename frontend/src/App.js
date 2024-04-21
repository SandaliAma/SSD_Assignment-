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
import AddQuestion from './screen/Student/QA&Feedback_Management/AddQuestion';
import FAskedQ from './screen/Student/QA&Feedback_Management/FAskedQ';
import MyQuestions from './screen/Student/QA&Feedback_Management/MyQuestions';
import Question from './screen/Student/QA&Feedback_Management/Question';
import UpdateQuestion from './screen/Student/QA&Feedback_Management/UpdateQuestion';
import Feedback from './screen/Student/QA&Feedback_Management/Feedback';
import FeedbackType from './screen/Student/QA&Feedback_Management/FeedbackType';
import MyFeedbacks from './screen/Student/QA&Feedback_Management/MyFeedbacks';
import TFeedback from './screen/Student/QA&Feedback_Management/TFeedback';
import SFeedback from './screen/Student/QA&Feedback_Management/SFeedback';
import UpdateTeacherF from './screen/Student/QA&Feedback_Management/UpdateTeacherF';
import UpdateSFeedback from './screen/Student/QA&Feedback_Management/UpdateSFeedback';
import Test from './screen/Student/Enroll_Mangement/Test';
import ViewClass from './screen/Student/Enroll_Mangement/ViewClass';
import Enrolled from './screen/Student/Enroll_Mangement/Enrolled';


import TeacherLogin from './screen/Teacher/User_Management/TeacherLogin';
import TeacherProfile from './screen/Teacher/User_Management/TeacherProfile';
import TeacherProfileEdit from './screen/Teacher/User_Management/TeacherProfileEdit';
import TeacherForgetPassword from './screen/Teacher/User_Management/Forgetpasswordteacher';
import TeacherTimetable from './screen/Teacher/Timetable';
import MyClassess from './screen/Teacher/Lesson_Management/MyClasses';
import CreateNotice from './screen/Teacher/Lesson_Management/CreateNotice';
import EditNotice from './screen/Teacher/Lesson_Management/EditNotice';
import AddMaterials from './screen/Teacher/Lesson_Management/AddMaterials';
import EditMaterials from './screen/Teacher/Lesson_Management/EditMaterials';
import AnswerQ from './screen/Teacher/QA&Feedback_Management/AnswerQ';
import AnswerUpdate from './screen/Teacher/QA&Feedback_Management/AnswerUpdate';
import TeacherQuestion from './screen/Teacher/QA&Feedback_Management/TeacherQuestion';
import THQuestion from './screen/Teacher/QA&Feedback_Management/THQuestion';
import ViewTeacherFeedback from './screen/Teacher/QA&Feedback_Management/ViewTeacherFeedback';
import TeacherViewPayment from './screen/Teacher/Financial_Management/TeView';
import TeacherMyClasses from './screen/Teacher/Class_Management/TeacherMyClasses';
import UpdateClasses from './screen/Teacher/Class_Management/UpdateClasses';
import AdditionalClasses from './screen/Teacher/Class_Management/AdditionalClasses';
import AddAdditionalClasses from './screen/Teacher/Class_Management/AddAdditionalClasses';
import RequestSchedule from './screen/Teacher/Class_Management/RequestSchedule';
import AddClasses from './screen/Teacher/Class_Management/AddClasses';
import TeacherView from './screen/Teacher/Salary_Management/TeacherView';

import AdminManagerLogin from './screen/AdminManagerLogin';
import ManagerLogin from './screen/Manager/User_Management/ManagerLogin';
import ManagerForgetPassword from './screen/Manager/User_Management/Forgetpasswordmanager';
import ManagerProfile from './screen/Manager/User_Management/ManagerProfile';
import ManagerFeedback from './screen/Manager/QA&Feedback_Management/ManagerFeedback';
import ManagerNFeedback from './screen/Manager/QA&Feedback_Management/ManagerNFeedback';
import ReplyF from './screen/Manager/QA&Feedback_Management/ReplyF';
import MFeedbackUpdate from './screen/Manager/QA&Feedback_Management/MFeedbackUpdate';
import EditManager from './screen/Manager/Financial_Management/Mgedit';
import Manager from './screen/Manager/Financial_Management/MgMain';
import MgPay from './screen/Manager/Financial_Management/MgPayment';
import MgView from './screen/Manager/Financial_Management/MgView';
import CreateManager from './screen/Manager/Salary_Management/CreateManager';
import Home from './screen/Manager/Salary_Management/Home';
import ManagerSalary from './screen/Manager/Salary_Management/Manager';
import ManagerView from './screen/Manager/Salary_Management/ManagerView';
import UpdateManager from './screen/Manager/Salary_Management/UpdateManager';
import ManagerTimetable from './screen/Manager/Timetable_management/Timetable';
import AddNewClassForm from './screen/Manager/Timetable_management/AddnewClasstime';
import ManagerUpdateTimetable from './screen/Manager/Timetable_management/UpdateTimetable';


import AdminLogin from './screen/Admin/AdminLogin';
import AdminForgetPassword from './screen/Admin/Forgetpasswordadmin';
import AdminProfile from './screen/Admin/AdminProfile';
import AddTeacher from './screen/Admin/AddTeacher';
import AddManager from './screen/Admin/AddManager';
import AddAdmin from './screen/Admin/AddAdmin';
import SearchusersAdmin from './screen/Admin/AdminSearchusers';



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
      <Route path="/lessonmaterial/:description" element={<LessonMaterial />} />
      <Route path= '/payment' element = {<Payment/>} />
      <Route path= '/payonline' element = {<PayOnline/>} />
      <Route path= '/viewonline' element = {<ViewOnline/>} />
      <Route path= '/paybank/:subid' element = {<PayBank/>} />      
      <Route path= '/viewbank' element = {<ViewBank/>} />
      <Route path= '/viewcash' element = {<ViewCash/>} />      
      <Route path= '/editonline/:id' element = {<EditOnline/>} />
      <Route path= '/Wallet' element = {<Wallet/>} />
      <Route path= '/editbank/:id' element = {<EditBank/>} />     
      <Route path= '/cancelonline/:id' element = {<CancelOnline/>} />
      <Route path= '/cancelbank/:id' element = {<CancelBank/>} /> 
      <Route path='/AddQuestion' element={<AddQuestion/>}/>
      <Route path='/FAskedQ' element={<FAskedQ/>}/>
      <Route path='/MyQuestions' element={<MyQuestions/>}/>
      <Route path='/question' element={<Question/>}/>
      <Route path='/UpdateQuestion/:id' element={<UpdateQuestion/>}/>
      <Route path='/Feedback' element={<Feedback/>}/>
      <Route path='/FeedbackType' element={<FeedbackType/>}/>
      <Route path='/MyFeedbacks' element={<MyFeedbacks/>}/>
      <Route path='/TFeedback' element={<TFeedback/>}/>
      <Route path='/SFeedback' element={<SFeedback/>}/>
      <Route path='/UpdateTeacherF/:id' element={<UpdateTeacherF/>}/>
      <Route path='/UpdateSFeedback/:id' element={<UpdateSFeedback/>}/>
      <Route path='/test' element={<Test/>}/>
      <Route path='/viewclass/:subid' element={<ViewClass />} />
      <Route path='/enrolled' element={<Enrolled />} />



      <Route path="/teacherlogin" element={<TeacherLogin />} />
      <Route path="/teacherprofile" element={<TeacherProfile />} />
      <Route path='/teacherprofileedit' element={<TeacherProfileEdit/>}/>
      <Route path='/teacherforgetpassword' element={<TeacherForgetPassword/>}/>
      <Route path="/teachertimetable" element={<TeacherTimetable />} />
      <Route path="/myclasses" element={<MyClassess />} />
      <Route path="/createnotice" element={<CreateNotice />} />
      <Route path="/editnotice/:id" element={<EditNotice />} />
      <Route path="/addmaterial" element={<AddMaterials />} />
      <Route path="/editmaterial/:id" element={<EditMaterials />} /> 
      <Route path='/AnswerQ/:id' element={<AnswerQ/>}/>
      <Route path='/AnswerUpdate/:id' element={<AnswerUpdate/>}/>
      <Route path='/THQuestion' element={<THQuestion/>}/>
      <Route path='/ViewTeacherFeedback' element={<ViewTeacherFeedback/>}/>   
      <Route path='/TeacherQuestion' element={<TeacherQuestion/>}/>   
      <Route path='/ManagerFeedback' element={<ManagerFeedback/>}/>
      <Route path='/ManagerNFeedback' element={<ManagerNFeedback/>}/>
      <Route path='/ReplyF/:id' element={<ReplyF/>}/>
      <Route path='/MFeedbackUpdate/:id' element={<MFeedbackUpdate/>}/>
      <Route path= '/teacherfinancial' element = {<TeacherViewPayment/>} />
      <Route path= '/editmanager/:id' element = {<EditManager/>} />
      <Route path='/viewclasses' element={<TeacherMyClasses />} />
      <Route path='/update/:id' element={<UpdateClasses />} />
      <Route path='/additionalclasses' element={<AdditionalClasses/>} />
      <Route path='/AddAdditionalClasses' element={<AddAdditionalClasses />} />
      <Route path='/requestschedule' element={<RequestSchedule />} />
      <Route path='/addclasses' element={<AddClasses/>} />
      <Route path='/tesalaryview' element={<TeacherView/>} />


      <Route path="/adminmanagerlogin" element={<AdminManagerLogin />} />
      <Route path="/managerlogin" element={<ManagerLogin />} />
      <Route path='/managerforgetpassword' element={<ManagerForgetPassword/>}/>
      <Route path="/managerprofile" element={<ManagerProfile />} />
      <Route path= '/managerfinancial' element = {<Manager/>} />
      <Route path= '/mgpay' element = {<MgPay/>} />
      <Route path= '/mgview' element = {<MgView/>} />
      <Route path= '/editmanager/:id' element = {<EditManager/>} />
       <Route path='/create' element={<CreateManager />} />
      <Route path='/homemain' element={<Home />} />
      <Route path='/home' element={<ManagerView />} />
      <Route path='/managersalary' element={<ManagerSalary />} />
      <Route path='/update/:id' element={<UpdateManager />} />
      <Route path="/Manager/Timetable" element={<ManagerTimetable/>} />
      <Route path='/Manager/AddnewClasstime' element={<AddNewClassForm/>}/>
      <Route path='/Manager/UpdateTimetable/:id' element={< ManagerUpdateTimetable/>}/>
  
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path='/adminforgetpassword' element={<AdminForgetPassword/>}/>
      <Route path="/adminprofile" element={<AdminProfile />} />
      <Route path="/addteacher" element={<AddTeacher />} />
      <Route path="/addmanager" element={<AddManager />} />
      <Route path="/addadmin" element={<AddAdmin />} />
      <Route path="/searchusersadmin" element={<SearchusersAdmin />} />   

      
              
      
    </Routes>    
    </>
  );
}

export default App;
