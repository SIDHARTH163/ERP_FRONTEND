import  Axios  from 'axios'
import React, { useState , useEffect } from 'react'
import Heading_text from '../../Custom-fonts/Heading_text'
import Custom_buttons from '../../Custom_tags/Custom_buttons'
import Custom_input from '../../Custom_tags/Custom_input'
import Custom_textarea from '../../Custom_tags/Custom_textarea'

import {useNavigate} from 'react-router-dom'
export default function Add_teachers() {
  const navigate = useNavigate();
  const token = localStorage.getItem('Token')
  const[ teacher , setteacher]=useState([])
  const [first_name ,setfirst_name]=useState("")
  const [last_name,setlast_name]=useState("")
  const [email , setemail]=useState("")
  const [phone , setphone]=useState("")
  const [address , setaddress]=useState("")
  const [birthdate , setbirthdate]=useState("")
   const [error , seterror]=useState([])
   const [alert , setalert]=useState([])
  const submit =()=>{
  
   try{
    Axios.post("register" , 
    {first_name:first_name , email:email , last_name : last_name  , phone:phone, birthdate:birthdate , address:address , phone:phone , role:1 })
    .then((response)=>{
      if(response.data.status === 202){
     seterror(response.data.error)
     console.log(response.data.error);
      }
     else if (response.data.status){
      window.alert(response.data.message)
      window.location.reload(false)
     }
    
    })
   }catch(e){
    console.log(e)

   }
  }

  useEffect(()=>{
    getlist();
     async function getlist(){
      
      Axios.get('/get_users', {
        headers: {
          Authorization: `Bearer ${token}`
      }
      }).then((res)=>{
        
        if(res.data.statuscode===404){
          window.alert(res.data.status)
          localStorage.clear()
          navigate('/')

        }else if(res.data.status === 400){
            setteacher(res.data.data)

        }
        const list =res.data
        
        // console.log(list)
      
      })
     }

     if(!token){
      
      navigate('/')
      }
  });
  // delete teachers
  const deactivate_teacher=(id)=>{

Axios.put(`deactivate_teacher/${id}`).then(res=>{
  setalert(res.data)
})
  }
  const activate_teacher=(id)=>{
    
    Axios.put(`activate_teacher/${id}`).then(res=>{
      setalert(res.data)
    })
      }
      const activate_role=(id)=>{
    
        Axios.put(`activate_role/${id}`).then(res=>{
          setalert(res.data)
        })
          }

          const deactivate_role=(id)=>{
    
            Axios.put(`deactivate_role/${id}`).then(res=>{
              setalert(res.data)
            })
              }
  return (
    
    <div className=' h-screen overflow-y-auto scrollbar-thin  '>
    <div className='px-5 py-2'>
       <div className='bg-white py-3 px-7 rounded-md shadow-md'>
        <Heading_text
        text="Add Teacher"
        boldness={"font-bold"}
        family={"font-sans"}
        size={"text-xl"}
        color={"text-blue-900"}
        decoration={"underline"}
        className={""}

        />
        <div className=' flex flex-row gap-2'>
        <Custom_input
        type="text"
        id="0"
        className="form-control
        font-Roboto
        block
        w-full
        px-3
        py-2
        text-base
        font-normal
        text-slate-900
        bg-gray-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        
        m-0
        focus:text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder={"First Name"}
        handleInputData={setfirst_name}
        value={first_name}
        labelcolor={"text-slate-900 font-bold font-Roboto"}
        width={"w-1/2 p-3"}
        errormessage={error.first_name ?<>{`${error.first_name}`}</>:<></>}
      />
      <Custom_input
        type="text"
        id="1"
        className="form-control
        font-Roboto
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-slate-900
        bg-gray-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Last Name"
        handleInputData={setlast_name}
        value={last_name}
        labelcolor={"text-slate-900 font-bold font-Roboto"}
         width={"w-1/2 p-3"}
         errormessage={error.last_name ?<>{`${error.last_name}`}</>:<></>}
      />
        </div>
        {/* email */}
        <div className='w-full'>
        
      <Custom_input
        type="email"
        id="2"
        className="form-control
        font-Roboto
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-slate-900
        bg-gray-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Email"
        handleInputData={setemail}
        value={email}
        labelcolor={"text-slate-900 font-bold font-Roboto"}
         width={"w-full p-3"}
         errormessage={error.email ?<>{`${error.email}`}</>:<></>}
      />
        </div>
      {/* phone no and date of birth */}
      <div className=' flex flex-row gap-2'>
        <Custom_input
        type="tel"
        id="3"
        className="form-control
        font-Roboto
        block
        w-full
        px-3
        py-2
        text-base
        font-normal
        text-slate-900
        bg-gray-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        
        m-0
        focus:text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder={"Phone Number"}
        handleInputData={setphone}
        value={phone}
        labelcolor={"text-slate-900 font-bold font-Roboto"}
        width={"w-1/2 p-3"}
        errormessage={error.phone ?<>{`${error.phone}`}</>:<></>}
      />
      <Custom_input
        type="date"
        id="4"
        className="form-control
        font-Roboto
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-slate-900
        bg-gray-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Date Of Birth"
        handleInputData={setbirthdate}
        value={birthdate}
        labelcolor={"text-slate-900 font-bold font-Roboto"}
         width={"w-1/2 p-3"}
         errormessage={error.birthdate ?<>{`${error.birthdate}`}</>:<></>}
      />
        </div>
      
       <div className='w-full'>
        <Custom_textarea
        type="text"
        id="5"
        className="form-control
        w-full
        text-slate-900
        bg-gray-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Address"
        handleInputData={setaddress}
        value={address}
        labelcolor={"text-slate-900 font-bold font-Roboto"}
         width={"w-full p-2"}
         rows={3}
         errormessage={error.address ?<>{`${error.address}`}</>:<></>}
        />
       </div>
       
       {/* button */}
<div className='flex justify-center'>
<Custom_buttons
      text={"Submit"}
      className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 font-Roboto font-bold  text-thin rounded-md flex gap-1"
      onClick={()=>submit()}
      icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3" />
    </svg>}
      />
</div>



      
       </div>
    </div>
    <div className='p-5 mb-10'>
    <Heading_text
        text="Manage Teachers"
        boldness={"font-bold"}
        family={"font-sans"}
        size={"text-xl"}
        color={"text-blue-900"}
        decoration={"underline"}
        className={"mb-2 text-slate-800"}

        />
      <div className='bg-white p-3  pb-20 overflow-auto scrollbar-thin'>
        {alert.message?<>
          <div class="bg-blue-100 border my-1 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
  <strong class="font-bold">Hi</strong>
  <span class="block sm:inline"> {alert.message}.</span>
  {/* <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span> */}
</div></>:<></>}
      <table class="table-auto border-2 border-black w-full">
  <thead>
    <tr className='bg-slate-900 '>
    <th className='text-white p-2'>Index</th>
      <th className='text-white p-2'>Name</th>
      <th className='text-white p-2'>Phone Number</th>
      <th className='text-white p-2'>Joining Date</th>
      <th className='text-white p-2'>Status</th>
      <th className='text-white p-2'>Action</th>
      <th className='text-white p-2'>Assign Admin</th>
    </tr>
  </thead>
  <tbody>
    {teacher.map((i , index)=>
    <>
    <tr className='my-2 border-2 border-slate-900 font-Roboto font-bold'>
    <td className='text-center border-2 border-slate-900 p-1'>{index}</td>
      <td className='text-center border-2 border-slate-900 p-1'>{i.first_name} {i.last_name}</td>
      <td className='text-center border-2 border-slate-900 p-1'>{i.phone}</td>
      <td className='text-center border-2 border-slate-900 p-1'>{i.updated_at.slice(0,10)}</td>

      <td className='text-center border-2 border-slate-900 p-1 '>{i.active===0 ?<a className='text-red-800 font-bold underline'>Not Active</a>:<a className='text-green-800 underline font-bold'>Active</a>}</td>
      <td className='text-center border-2 border-slate-900 p-1 text-slate-900 font-bold'> {i.active===0 ?<a onClick={()=> activate_teacher(`${i.id}`)} className='text-green-800 hover:scale-105 cursor-pointer font-bold underline'>Activate it</a>:<a onClick={()=> deactivate_teacher(`${i.id}`)} className='text-red-800 hover:scale-105 cursor-pointer underline font-bold'>Deactivate it</a>}</td>
      <td className='text-center border-2 border-slate-900 p-1 text-slate-900 font-bold'> {i.active_role===0 ?<a onClick={()=> activate_role(`${i.id}`)} className='text-green-800 hover:scale-105 cursor-pointer font-bold underline'>Assign</a>:<a onClick={()=> deactivate_role(`${i.id}`)} className='text-red-800 hover:scale-105 cursor-pointer underline font-bold'>Remove</a>}</td>
    </tr>
    </>
    )}
    
   
  </tbody>
</table>
      </div>
    </div>
    </div>
  )
}
