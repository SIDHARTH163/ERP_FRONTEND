import React, {useState , useEffect} from 'react'
import  Axios  from 'axios'
import { useNavigate } from 'react-router-dom'
import Custom_search_tab from '../../Custom_tags/Custom_search_tab'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline'
export default function Student_Home() {
  const navigate=useNavigate()
    const[data , setdata]=useState([])
    const[profile , setprofile]=useState({})
    const token = localStorage.getItem('Token')
    useEffect(() => {

     getstudentprofile()
      getteacherlist();
      async function getteacherlist(){
        
        Axios.get(`get_student_time_table_list`, {
          headers: {
            Authorization: `Bearer ${token}`
        }
        }).then((res)=>{
          
          if(res.data.statuscode===404){
            window.alert(res.data.status)
            localStorage.clear()
            navigate('/')
  
          }else if(res.data.status === 400){
               setdata(res.data.data)
              
          }
        
          
          // console.log(list)
        
        })
       }
       async function getstudentprofile(){
            
        Axios.get(`get_user`, {
          headers: {
            Authorization: `Bearer ${token}`
        }
        }).then((res)=>{
          
                   const list=res.data
               setprofile(list.data)
             
          
        
          
          // console.log(list)
        
        })
       }
  
       if(!token){
        
        navigate('/')
        }
    
  },[])
  return (
  <div>
     <div className='flex flex-wrap gap-8  '>
     <div className='h-72 p-2  bg-white rounded-xl shadow-lg lg:w-8/12 md:8/12 sm:1/2 '>
      <div className='font-Roboto font-bold text-xl text-center'>Time Table List</div>
      <div className='my-1 pb-1 pt-1 flex justify-center'>
      <Custom_search_tab
              type="text"
              id="0"
              className="form-control
              mt-1
        font-Roboto
        block
        w-full
        px-3
        py-2
        text-base
        font-bold
        text-slate-900
        bg-gray-100 bg-clip-padding
        border border-solid border-gray-700
        rounded
        transition
        ease-in-out
        
        m-0
        focus:text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder={"Search By Class"}
              handleInputData={""}
              onKeyUp={""}
              labelcolor={"text-blue-900 font-Roboto font-bold"}
              width={"w-auto"}
              // errormessage={error.class_from ? <>{`${error.class_from}`}</> : <></>}
            />
      </div>
     </div>
     <div className=' h-72 overflow-y-auto scrollbar-thin  bg-slate-900 rounded-xl shadow-lg  px-2 py-3'>
      <p className='text-white font-Roboto text-lg  font-bold flex justify-between'>Time Table List  <span className='text-sm animate-bounce mt-1 underline mx-1 hover:scale-105 cursor-pointer font-Roboto'>View All</span></p>
      <div className=''>
      {data.map((i , index)=>
    <div className='p-3' key={index}>
    
    <div className='flex flex-row text-white text-justify'>
    <div className='text-lg font-Roboto font-bold'>{index} {i.subject} </div>
    
    </div>
    </div>
    )}

      </div>
     </div>
   </div>
   <div className='flex flex-wrap gap-8  py-12'>
   <div className='h-72 overflow-y-auto scrollbar-thin bg-white rounded-xl shadow-lg px-3 '>
      <p className='my-1 sticky rounded-b-lg py-1 text-center uppercase font-semibold text-lg bg-slate-900 text-white'>Profile Status</p>
      <div className='lg:w-72 md:w-72 sm:w-full w-full flex flex-col justify-center items-center'>
      

      <ol class="relative border-l-2 border-gray-900 dark:border-gray-700 px-10 ml-20 ">                  
    <li class="mb-24 ml-10">            
        <span class={profile.account_creation===0?("flex absolute -left-5 justify-center  items-center w-10 h-10 bg-blue-200 rounded-full ring-8 ring-white dark:ring-slate-900 dark:bg-red-700"):("flex absolute -left-5 justify-center  items-center w-10 h-10 bg-blue-200 rounded-full ring-8 ring-white dark:ring-slate-900 dark:bg-teal-700")}>



          <CheckCircleIcon className='w-7 h-7 text-white'/>
        </span>
      
        <p class="text-base font-bold text-slate-900 dark:text-gray-900">{profile.account_creation===0?<>Pending</>:<>Completed</>}</p>
       
    </li>
    <li class="mb-24 ml-10">
        <span class={profile.education_added===0?("flex absolute -left-5 justify-center  items-center w-10 h-10 bg-blue-200 rounded-full ring-8 ring-white dark:ring-slate-900 dark:bg-red-700"):("flex absolute -left-5 justify-center  items-center w-10 h-10 bg-blue-200 rounded-full ring-8 ring-white dark:ring-slate-900 dark:bg-teal-700")}>



          {profile.education_added===0?<XCircleIcon className='w-7 h-7 text-white'/>:<CheckCircleIcon className='w-7 h-7 text-white'/>}
        </span>
      
        {profile.education_added===0?<p class="text-base font-bold text-red-900 dark:text-red-900">Education Details Upload Pending</p>:<p class="text-base font-bold text-slate-900 dark:text-slate-900">Completed</p>}
      
    </li>
    <li class="ml-10 mb-10">
        <span class={profile.documents_upload===0?("flex absolute -left-5 justify-center  items-center w-10 h-10 bg-blue-200 rounded-full ring-8 ring-white dark:ring-slate-900 dark:bg-red-700"):("flex absolute -left-5 justify-center  items-center w-10 h-10 bg-blue-200 rounded-full ring-8 ring-white dark:ring-slate-900 dark:bg-teal-700")}>



        {profile.documents_upload===0?<XCircleIcon className='w-7 h-7 text-white'/>:<CheckCircleIcon className='w-7 h-7 text-white'/>}
        </span>
      
        {profile.documents_upload===0?<p class="text-base font-bold text-red-900 dark:text-red-900">Documents Upload Pending</p>:<p class="text-base font-bold text-slate-900 dark:text-slate-900">Completed</p>}
        
    </li>
</ol>
</div>

       </div>
     <div className='h-72  bg-white rounded-xl shadow-lg lg:w-8/12 md:8/12 sm:w-1/2 '>Student_Home</div>
    
   </div>
  </div>
  )
}
