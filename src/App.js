import React from 'react'
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import Landing from './Screens/LandingPage/Landing'

import './App.css'
import Login from './Screens/Login/Login';
import AdminHome from './AdminDashboard/AdminHome';
import Teachers_home from './TeachersDAshboard/Teachers_home';
import Student_dashboard from './StudentDashboard/Student_dashboard';
export default function App() {
  return (
   <div className='scrollbar-thin'>
   <BrowserRouter>
   {/* <Header/> */}
  
   <Routes>
        <Route path="/home" element={<Landing/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        {/* Admin dahsboard */}
        <Route path="/admin_workspace" element={<AdminHome/>}/>
        <Route path="/teachers_workspace" element={<Teachers_home/>}/>
        {/* student dahsboard */}
        <Route path='/student_workspace' element={<Student_dashboard/>}/>
      </Routes>
   
   {/* <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route> */}
   

   </BrowserRouter>

   </div>
  )
}


function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}