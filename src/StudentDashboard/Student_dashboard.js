import { React, useState , useEffect } from 'react';
import Dashboard_Home from '../Components/Dashboard_components/Dashboard_Home';
import Navbar_home from '../Components/Sidebar/Navbar_home';
import {AcademicCapIcon, ClockIcon, DesktopComputerIcon, HomeIcon, TableIcon, UserCircleIcon} from '@heroicons/react/solid'
import Sidebar_compo from '../Components/Sidebar/Sidebar_compo';
import Student_Home from './Screens/Student_Home'
import Dashboard_Nav from '../Components/Dashboard_components/Dashboard_Nav';
import Student_profile from './Screens/Student_profile';
import Admissions from './Screens/Admissions';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import Status_Bar from '../Components/Dashboard_components/Status_Bar';
export default function Student_dashboard() {
  const navigate=useNavigate()
  const [profiledata , setprofiledata]=useState({})
  const [showSidebar, setShowSidebar] = useState('-left-80');
  const [dash, setdash] = useState(false)
  const [Acedmics, setAcedmics] = useState(false)
  const [profile, setprofile] = useState(false)
  const [notification, setnotification] = useState(false)
  const token =localStorage.getItem('Token')
 
  const [color , setcolor]=useState(false)
  const [color1 , setcolor1]=useState(false)
  const [color2 , setcolor2]=useState(false)
  const changePage = (str) => {
    if (str === "dashboard") {
      setdash(true)
      setAcedmics(false)
      setprofile(false)
     setcolor(true)
     setcolor1(false)
setcolor2(false)
    }
    else if(str === "profile"){
      setdash(false)
      setAcedmics(false)
      setprofile(true)
     setcolor(false)
     setcolor1(true)
setcolor2(false)
    }else if(str === "acedmics"){
      setdash(false)
      setAcedmics(true)
      setprofile(false)
     setcolor(false)
     setcolor1(false)
setcolor2(true)
    }
  }
  // get profile details
  useEffect(()=>{
    getstudentprofile();
    async function getstudentprofile(){
            
      Axios.get(`get_user`, {
        headers: {
          Authorization: `Bearer ${token}`
      }
      }).then((res)=>{
        
                 const list=res.data
             console.log(list.data)
           
        setprofiledata(list.data)
      
        
        // console.log(list)
      
      })
     }

    if(!token){
      
      navigate('/')
    
     
      }
  },[])
  return (
  
      <div>
    <Navbar_home showSidebar={showSidebar}
        setShowSidebar={setShowSidebar} />
      {/* <Navigation showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar} user={user} /> */}
      <div
        className={`bg-white  h-screen overflow-y-auto overflow-x-hidden scrollbar-thin   fixed top-18 py-1 md:left-0 ${showSidebar}  flex-row flex-nowrap  z-10  lg:w-1/5 sm:w-3/4 w-3/4 py-1 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative bg-transparent pt-6">
          
          <div className=" z-40 top-0 left-0 ml-6 ">
            <hr className='my-4 md:min-w-full'/>

              <h6 className='md:min-w-full  text-blueGray-500 text-md uppercase font-bold block pt-1 pb-4 no-underline ml-1'>
                Your Details
              </h6>

          <ul className='flex w-full  flex-col list-none'>
           <Sidebar_compo title={"Dashboard"} Icon={DesktopComputerIcon} onClick={()=>changePage('dashboard')} color={color}/>
           <Sidebar_compo title={"Profile"} Icon={UserCircleIcon} onClick={()=>changePage('profile')} color={color1} />
           <Sidebar_compo title={"Acedmics"} Icon={AcademicCapIcon} onClick={()=>changePage('acedmics')} color={color2}/>
          
           <Sidebar_compo title={"Time Table"} Icon={ClockIcon} />
          </ul>

          </div>
        </div>
      </div>
      <div className='  flex lg:flex-row md:flex-row flex-col '>
        <div className='lg:w-1/5  invisible h-0 md:w-1/5 sm:w-screen w-screen '>
        </div>
        <div className='lg:w-4/5 md:w-4/5 sm:w-screen w-screen bg-slate-100 h-auto pb-32   flex flex-col'>
          <div className=' bg-slate-900  relative pb-32  '>
            <Dashboard_Nav/>
            <Status_Bar/>
            <Dashboard_Home  student={profiledata}/>
          </div>
          <div className=' mx-auto mb-6 -m-40 pt-12 relative  w-full lg:px-14 md:px-10 px-1 pb-10'>
            {
              dash ?<Student_Home/>:(
                profile ?<Student_profile/>:(
                  Acedmics ?<Admissions/>:
                  <Student_Home/>
                )
              )
            }
          </div>
         
        </div>

      
      </div>

    </div>

  );
}