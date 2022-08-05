import React,{useEffect , useState} from 'react'
import  Axios  from 'axios'
import { useNavigate } from 'react-router-dom'



import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline'
export default function Teachers_Dashboard() {
  const navigate=useNavigate()
    const[data , setdata]=useState([])
    const[profile , setprofile]=useState({})
    const token = localStorage.getItem('Token')
    
    useEffect(() => {

      getteacherprofile();
        getteacherdata();
        async function getteacherdata(){
          
          Axios.get(`get_user_time_table`, {
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
    
         if(!token){
          
          navigate('/')
          }
       
          async function getteacherprofile(){
            
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
    },[])
  return (
    <div>
       <div className='flex flex-wrap gap-8  '>
     <div className='h-auto bg-slate-900 rounded-xl py-2 lg:w-8/12 md:w-8/12 sm:w-full overflow-x-auto px-1 '>
     <div className='rounded-lg px-1 py-1 '>
     <div className='Upercase font-Roboto font-bold  text-white flex justify-between'>
      <h1 className='text-xl'>Time Table List</h1>
      <div className='bg-gradient-to-r  from-green-400 to-blue-500 p-1 cursor-pointer hover:scale-105 hover:from-red-500 hover:to-lightBlue-500 rounded-md text-md shadow-md flex flex-row'>View All <span class="material-symbols-outlined text-slate-900 animate-bounce">
double_arrow
</span></div>
     </div>
      <div className='my-3 pb-1 pt-1 flex justify-center '>
      <table class="table-fixed  w-full">
  <thead>
    <tr className='font-Raleway'>
  
    
      <th className='text-gray-200 '>Subject</th>
      <th className='text-gray-200 '>Class days</th>
   
      <th className='text-gray-200 '>Class Timing</th>
      <th className='text-gray-200 text-center'>Dep/Year/Sem</th>
  
    </tr>
  </thead>
  <tbody>
    {data.map((i , index)=>
    <>
    <tr key={index} className='my-2  font-normal font-Roboto '>
    
     
      <td className=' text-white text-center py-4  mx-10 lg:font-semibold p-1'>{i.subject}</td>
      <td className=' text-white text-center py-4  mx-5 p-1'>{i.class_day_from} - {i.class_day_to}</td>
      <td className=' text-white text-center py-4  mx-3  p-1'>{i.class_from} - {i.class_to}</td>
      

     
      <td className=' text-white text-center mx-3 p-1'>{i.course_name}{i.semester}</td>
     
    </tr>
    </>
    )}
    
   
  </tbody>
</table><br/>

      
      </div>
      {data.length === 0 ?<><p className='text-center font-Roboto font-bold text-2xl text-red-900 underline'>Loading Please Wait ...</p></>:<></>}
     </div>
     </div>
     {/* Activity Container */}
     <div className='h-72 overflow-y-auto scrollbar-thin bg-white rounded-xl shadow-lg  '>
      <p className='mb-5 sticky rounded-b-lg py-1 text-center uppercase font-semibold text-lg bg-slate-900 text-white'>Profile Status</p>
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
   </div> 
   {/*activity ends  */}
   <div className='flex flex-wrap gap-8  py-12'>
     <div className='h-72  bg-white rounded-xl shadow-lg w-8/12 '>Student_Home</div>
     <div className='h-72  bg-white rounded-xl shadow-lg w-auto px-28 '>Student_Home</div>
   </div>
    </div>
  )
}
