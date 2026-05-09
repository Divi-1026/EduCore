import Register from "@/pages/Auth/Register";
import ProtectedRoute from "@/Routes/protectedRoute";
import { LogIn } from "lucide-react";
import Login from "@/pages/Auth/Login";
import React from "react";
import Home from "@/pages/User/Home";
import {Route, Routes } from "react-router-dom";
import Buy from "@/components/Buy";
import QuizAttempt from "@/Course/QuizAttempt";
import CoursePage from "@/Course/CourseShow";
import CourseDetails from "@/Course/CourseDetails";
import { PurchaseCourse } from "@/Course/PurchasedCourse";
import CreatedCourse from "@/Course/CreatedCourse";
import { PaymentSuccess } from "@/Course/PaymentSucces";
import CreateCourse from "@/Course/CreateCourse";
import AdminPanel from "@/components/AdminPannel";
import UserProfile from "@/components/Profile/UserProfile";
import EducatorProfile from "@/components/Profile/Educator_Profile";
import EducatorAnalytics from "@/components/Profile/Educator_Analytics";
import AdminProfile from "@/components/Profile/Admin_Profile";
import NavBar from "@/components/ui/Navbar";
import AdminAnalytics from "@/components/Profile/Admin_Analytics";
// import AdminProfile from "@/components/Profile/Admin_Profile";
// import EducatorProfile from "@/components/Profile/Educator_profile";
// import  PaymentSucces  from "@/Course/PaymentSucces";
const MainRoutes=()=>{
    return (
        <Routes>
            <Route path='/'element={<Home/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path="/buy-course" element={ <ProtectedRoute>
            
      <Buy/>
    </ProtectedRoute>
  } 
/>
<Route path='/requests' element={<AdminPanel></AdminPanel>}></Route>
<Route path='/courses' element={<CoursePage></CoursePage>}></Route>
<Route path='/create_course' element={<CreateCourse></CreateCourse>}></Route>
<Route path='/your_courses' element={<PurchaseCourse></PurchaseCourse>}></Route>
<Route path='/courses/:id' element={<CourseDetails></CourseDetails>}></Route>
<Route path='/purchase' element={<PaymentSuccess></PaymentSuccess>}></Route>
<Route path="/created-courses" element={<CreatedCourse/>} />
<Route path="/attempt_quiz/:quizId" element={<QuizAttempt />} />
<Route path='/educator_analytics' element={<EducatorAnalytics/>}/>
<Route path='/educator_profile' element={<EducatorProfile/>}/>
<Route path='/user_profile' element={<UserProfile/>}/>
<Route path='/admin_profile' element={<AdminProfile/>}/>
<Route path='/admin_analytics' element={<AdminAnalytics/>}></Route>
        </Routes>
        
    )
} 
export default MainRoutes