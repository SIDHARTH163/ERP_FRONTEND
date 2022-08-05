import React , {useState ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Manage_profile from './Tabs/Manage_profile'
import Teachers_Dashboard from './Tabs/Teachers_Dashboard'
import Time_table from './Tabs/Time_table'
import {BellIcon, CheckCircleIcon, ClipboardListIcon, ClockIcon, CollectionIcon, DesktopComputerIcon, HomeIcon, SpeakerphoneIcon, TableIcon, UserCircleIcon, ViewListIcon} from '@heroicons/react/outline'
import Status_Bar from '../Components/Dashboard_components/Status_Bar'
import Axios  from 'axios'
// import Add_teachers from './Screens/Add_teachers'
// import Dashboard from './Screens/Dashboard'
import Dashboard_Home from '../Components/Dashboard_components/Dashboard_Home'
import Navbar_home from '../Components/Sidebar/Navbar_home'
import Sidebar_compo from '../Components/Sidebar/Sidebar_compo'
import Dashboard_Nav from '../Components/Dashboard_components/Dashboard_Nav'
export default function Teachers_home() {
    const [showSidebar, setShowSidebar] = useState('-left-80');
   const [profiledata , setprofiledata]=useState({})
    const navigate=useNavigate()
    const token =localStorage.getItem('Token')
  const [dashboard , setdashboard]=useState('false')
  const [profile , setprofile]=useState('false')
  const[timetable , settimetable]=useState('false')
  const [color , setcolor]=useState(false)
  const [color1 , setcolor1]=useState(false)
  const [color2 , setcolor2]=useState(false)
  const changePage =(str)=>{
    if(str==="dashboard"){
        setprofile(false)
        setcolor1(false)
        setcolor2(false)
        setcolor(true)
        setdashboard(true)
        settimetable(false)
    }else if(str === "profile"){
      setprofile(true)
      setcolor(false)
      setcolor1(true)
      setcolor2(false)
      setdashboard(false)
      settimetable(false)
    }
    else if(str === "time_table"){
        setdashboard(false)
        setprofile(false)
        settimetable(true)
        setcolor(false)
        setcolor1(false)
        setcolor2(true)
    }
  }
  useEffect(()=>{
    getteacherprofile();
    async function getteacherprofile(){
            
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
        className={`bg-white  h-screen overflow-y-auto overflow-x-hidden scrollbar-thin   fixed top-18 py-1 md:left-0 ${showSidebar}  flex-row flex-nowrap  z-50  lg:w-1/5 sm:w-64 w-72  py-1 transition-all duration-300`}
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
           <Sidebar_compo title={"Time Table"} Icon={TableIcon} onClick={()=>changePage('time_table')} color={color2}/>
           <Sidebar_compo title={"Notifications"} Icon={BellIcon}/>
           {profiledata.active_role===1?<>
            
            <Sidebar_compo title={"Approve Students"} Icon={CheckCircleIcon}/>
         <Sidebar_compo title={"Student Details"} Icon={UserCircleIcon}/>
         <Sidebar_compo title={"Add Students"} Icon={DesktopComputerIcon}/>
          </>:<></>}
        
          
           <Sidebar_compo title={"Students List"} Icon={ClipboardListIcon}/>
           <Sidebar_compo title={"Mark Attendence"} Icon={ClockIcon}/>
           <Sidebar_compo title={"Students Leaves"} Icon={CollectionIcon}/>
           <Sidebar_compo title={"Students Reports"} Icon={SpeakerphoneIcon}/>
           
          
           
          </ul>

          </div>
        </div>
      </div>
      <div className='  flex lg:flex-row md:flex-row flex-col h-auto   '>
        <div className='lg:w-1/5  invisible h-0 md:w-1/5 sm:w-screen w-screen '>
        </div>
        <div className='lg:w-4/5 md:w-4/5 sm:w-screen w-screen bg-blueGray-100 pb-32   flex flex-col'>
          <div className=' bg-slate-900  relative pb-32  '>
            <Dashboard_Nav/>
            <Status_Bar/>
            <Dashboard_Home student={profiledata}/>
          </div>
          <div className=' mx-auto mb-6 -m-40 pt-12 relative  w-full lg:px-14 md:px-10 px-1 pb-10'>
          {
             dashboard ?<Teachers_Dashboard/>
             :
             (
              profile ? <Manage_profile/>:(
                timetable?<Time_table/>:<>
                <Teachers_Dashboard/>
                </>
                )
             )
            }
          </div>
         
        </div>

      
      </div>



    </div>
  )
}
