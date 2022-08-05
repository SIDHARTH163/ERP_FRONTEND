import React, { useState , useEffect } from 'react'
import Heading_text from '../../Custom-fonts/Heading_text'
import Custom_input from '../../Custom_tags/Custom_input'
import Custom_selectboxes from '../../Custom_tags/Custom_selectboxes'
import Custom_buttons from '../../Custom_tags/Custom_buttons'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Custom_selectbox from '../../Custom_tags/Custom_selectbox'
export default function Courses() {
 
  const navigate =useNavigate()
  const [list , setlist]=useState([])
  const token = localStorage.getItem('Token')
  const [course_name, setcourse_name] = useState('')
  const [course_type, setcourse_type] = useState('')
  const [course_duration, setcourse_duration] = useState('')
  const [error, seterror] = useState([])
  const [alert, setalert] = useState([])
  const [user_id , setuser_id]=useState('')
  const [course , setcourse]=useState('')
  const [session , setsession]=useState('')
  const submit = () => {
    
    try {
      Axios.request({
        url: "add_course",
        method: "post",
        
        headers:{
          Authorization: `Bearer ${token}`
        } ,
        
          data:{course_name:course_name , course_type:course_type , course_duration:course_duration}
        
   })
        .then((response) => {

          if (response.data.status === 422) {
            seterror(response.data.error)
            
          }
          else if (response.data.status === 400) {
            setalert(response.data)
          }
          else if (response.data.statuscode === 404) {
            setalert(response.data)
            localStorage.clear()
            navigate('/')
          }
         

        })
    } catch (e) {
      console.log(e)

    }
  }
 
  // for assigning the course
  const submit1=()=>{
    try {
      Axios.request({
        url: "assign_dep",
        method: "post",
        
        headers:{
          Authorization: `Bearer ${token}`
        } ,
        
          data:{user_id:user_id , course_id:course , session:session}
        
   })
        .then((response) => {

          if (response.data.status === 202) {
            seterror(response.data.error)
            
          }
          else if (response.data.status === 400) {
            window.alert(response.data.message)
            setalert(response.data.message)
          }
          else if (response.data.statuscode === 404) {
            setalert(response.data)
            localStorage.clear()
            navigate('/')
          }
         

        })
    } catch (e) {
      console.log(e)

    }

  }
  useEffect(() => {


    getteacherlist();
    async function getteacherlist(){
      
      Axios.get(`assigned_dep_list`, {
        headers: {
          Authorization: `Bearer ${token}`
      }
      }).then((res)=>{
        
        if(res.data.statuscode===404){
          window.alert(res.data.status)
          localStorage.clear()
          navigate('/')

        }else if(res.data.status === 400){
            setlist(res.data.data)

        }
      
        
        // console.log(list)
      
      })
     }

     if(!token){
      
      navigate('/')
      }
  
},[])

  return (
    <div>
      <div className='bg-white overflow-auto h-auto p-3'>
        <div className='p-3'>
          <Heading_text
            text="Add Courses"
            boldness={"font-bold"}
            family={"font-Roboto"}
            size={"text-2xl"}
            color={"text-blue-900"}
            decoration={"underline"}
            className={"ml-3 mt-2"}

          />
        </div>
        <div className='my-2 p-4 shadow-xl rounded-md'>
          {alert.status===400 ? <>
            <div class="bg-green-100 border my-1 border-green-400 text-slate-900 font-bold px-4 py-3 rounded relative" role="alert">
              <strong class="font-bold">Hi</strong>
              <span class="block sm:inline"> {alert.message}.</span>
             
            </div></> : <></>}
          {alert.statuscode===404 ? <>
            <div class="bg-red-100 border my-1 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong class="font-bold">Hi</strong>
              <span class="block sm:inline"> {alert.status}.</span>
             
            </div></> : <></>}
          <div className='flex flex-row'>
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
        font-bold
        text-slate-900
        bg-gray-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        
        m-0
        focus:text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder={"Course Name"}
              handleInputData={setcourse_name}
              value={course_name}
              labelcolor={"text-blue-900 font-Roboto font-bold"}
              width={"w-1/2 p-3"}
              errormessage={error.course_name ? <>{`${error.course_name}`}</> : <></>}
            />
            <Custom_selectboxes
              className="form-control
     font-Roboto
     block
     w-full
     px-3
     py-2
     text-base
     font-bold
     text-slate-900
     bg-gray-200 bg-clip-padding
     border border-solid border-gray-300
     rounded
     transition
     ease-in-out
     
     m-0
     focus:text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder={"Course Duration"}
              handleInputData={setcourse_duration}
              value1={course_duration}

              option1={"5 years"}
              option2={"3 years"}
              option3={"2 years"}
              labelcolor={"text-blue-900 font-bold font-Roboto"}
              width={"w-1/2 p-3"}
              errormessage={error.course_duration ? <>{`${error.course_duration}`}</> : <></>}
            />
          </div>
          <div className='flex flex-row my-1'>
            <Custom_selectboxes
              className="form-control
     font-Roboto
     block
     w-full
     px-3
     py-2
     text-base
     font-bold
     text-slate-900
     bg-gray-200 bg-clip-padding
     border border-solid border-gray-300
     rounded
     transition
     ease-in-out
     
     m-0
     focus:text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder={"Course Type"}
              handleInputData={setcourse_type}
              value={course_type}
              labelcolor={"text-blue-900 font-bold font-Roboto"}
              width={"w-1/2 p-3"}
              errormessage={error.course_type ? <>{`${error.course_type}`}</> : <></>}
              option2={"Yearly"}
              option1={"Semester"}

            />
            <div className=' flex justify-center px-1 h-24 pt-8  w-1/2'>
              <Custom_buttons
                text={"Submit"}
                className="bg-slate-900 hover:bg-indigo-800 text-white p-2 mt-1  font-bold font-Roboto w-full text-thin rounded-md flex gap-1"
                onClick={() => submit()}
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3" />
               </svg>}
              />
            </div>
          </div>

        </div>
      </div>
      <div className='p-3 bg-white rounded-sm h-auto'>
        <div className='p-3'>
        <Heading_text
            text="Assign Courses To Teacher"
            boldness={"font-bold"}
            family={"font-Roboto"}
            size={"text-2xl"}
            color={"text-blue-900"}
            decoration={"underline"}
            className={"ml-3 mt-2"}

          />
        </div>
        {/*assignning the course  */}
        <div className='p-3  h-auto'>
        <div className='flex flex-row'>
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
        font-bold
        text-slate-900
        bg-gray-200 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        
        m-0
        focus:text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder={"Add Session"}
              handleInputData={setsession}
              value={session}
              labelcolor={"text-blue-900 font-Roboto font-bold"}
              width={"w-1/2 p-3"}
              errormessage={error.session ? <>{`${error.session}`}</> : <></>}
            />
            <Custom_selectbox
              className="form-control
     font-Roboto
     block
     w-full
     px-3
     py-2
     text-base
     font-bold
     text-slate-900
     bg-gray-200 bg-clip-padding
     border border-solid border-gray-300
     rounded
     transition
     ease-in-out
     
     m-0
     focus:text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder={"Select Course "}
              handleInputData={setcourse}
              value1={course}

              foraxios={"get_courses"}
            
              labelcolor={"text-blue-900 font-bold font-Roboto"}
              width={"w-1/2 p-3"}
              errormessage={error.course_id ? <>{`${error.course_id}`}</> : <></>}
            />
          </div>
          <div className='flex flex-row'>
           
          <Custom_selectbox
              className="form-control
     font-Roboto
     block
     w-full
     px-3
     py-2
     text-base
     font-bold
     text-slate-900
     bg-gray-200 bg-clip-padding
     border border-solid border-gray-300
     rounded
     transition
     ease-in-out
     
     m-0
     focus:text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder={"Select Teacher"}
              handleInputData={setuser_id}
              value1={user_id}

              foraxios={"get_users"}
            
              labelcolor={"text-blue-900 font-bold font-Roboto"}
              width={"w-1/2 p-3"}
              errormessage={error.user_id ? <>{`${error.user_id}`}</> : <></>}
            />
             <div className=' flex justify-center px-1 h-24 pt-8  w-1/2'>
              <Custom_buttons
                text={"Submit"}
                className="bg-slate-900 hover:bg-indigo-800 text-white p-2 mt-1  font-bold font-Roboto w-full text-thin rounded-md flex gap-1"
                onClick={() => submit1()}
                 icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3" />
               </svg>}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='p-3 bg-white rounded-sm h-auto mt-4'>
        <div className='p-3'>
        <Heading_text
            text="Assigned Courses"
            boldness={"font-bold"}
            family={"font-Roboto"}
            size={"text-2xl"}
            color={"text-blue-900"}
            decoration={"underline"}
            className={"ml-3 mt-2"}

          />
        </div>
        <div className='p-3'>
        <table class="table-fixed border-2 border-black w-full">
  <thead>
    <tr className='bg-slate-900 '>
    <th className='text-white p-2'>Index</th>
      <th className='text-white p-2'>Name</th>
      <th className='text-white p-2'>Phone Number</th>
   
     
      <th className='text-white p-2'>Assigned Department</th>
      <th className='text-white p-2'>Action</th>
    </tr>
  </thead>
  <tbody>
    {list.map((i , index)=>
    <>
    <tr className='my-2 border-2 border-slate-900 font-bold'>
    <td className='text-center border-2 border-slate-900 p-1'>{index}</td>
      <td className='text-center border-2 border-slate-900 p-1'>{i.active===0 ?<a className='text-red-800 font-bold underline'>{i.first_name} {i.last_name}</a>:<a className='text-green-800 underline font-bold'>{i.first_name} {i.last_name}</a>}</td>
      <td className='text-center border-2 border-slate-900 p-1'>{i.phone}</td>
      

     
      <td className='text-center border-2 border-slate-900 p-1'>{i.course_name}</td>
      <td className='text-center border-2 border-slate-900 p-1 text-red-900'>Edit</td>
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
