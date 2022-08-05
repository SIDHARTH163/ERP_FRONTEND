import React, { useState , useEffect } from 'react'
import Heading_text from '../../Custom-fonts/Heading_text'
import Custom_input from '../../Custom_tags/Custom_input'
import Custom_selectboxes from '../../Custom_tags/Custom_selectboxes'
import Custom_buttons from '../../Custom_tags/Custom_buttons'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Custom_selectbox from '../../Custom_tags/Custom_selectbox'
import Time_table from '../AdminComponets/Time_table'
export default function Add_timetable() {
  const navigate=useNavigate()
  const [course_id , setcourse_id]=useState('')
  const [user_id , setuser_id]=useState('')
  const [subject , setsubject]=useState('')
  const [class_day_from , setclass_day_from]=useState('')
  const [class_day_to , setclass_day_to]=useState('')
  const [class_from , setclass_from]=useState('')
  const [class_to , setclass_to]=useState('')
  const [semester , setsemester]=useState('')
  const [error, seterror] = useState([])
  const [alert, setalert] = useState([])
  const token = localStorage.getItem('Token')
  const [changepage , setchangepage]=useState(false)
  const submit=(e)=>{
   
    try {
      Axios.request({
        url: "create_time_table",
        method: "post",
        
        headers:{
          Authorization: `Bearer ${token}`
        } ,
        
          data:{course_id:course_id , user_id:user_id , semester:semester ,subject:subject , class_to:class_to , class_from:class_from , class_day_from:class_day_from , class_day_to:class_day_to}
        
   })
        .then((response) => {

          if (response.data.status === 422) {
            seterror(response.data.error)
            
          }
          else if (response.data.status === 400) {
            
            setalert(response.data)
            setchangepage(true)
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
  return (
    <div>
      {changepage ?<><Time_table/></>:<>
       <div className='bg-white overflow-auto h-auto p-3'>
        <div className='my-2 p-2'>
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
        </div>
        
         <div className='p-2'>
          <Heading_text
            text="Add Time Table"
            boldness={"font-bold"}
            family={"font-Roboto"}
            size={"text-2xl"}
            color={"text-blue-900"}
            decoration={"underline"}
            className={"ml-3 mt-1"}

          />
        </div>
        <div className=' p-4 shadow-xl rounded-md'>
        <div className='p-3'>
          <Heading_text
            text="Add Teacher And Course "
            boldness={"font-bold"}
            family={"font-Roboto"}
            size={"text-xl"}
            color={"text-green-900"}
            decoration={""}
            className={"ml-3 mt-2"}

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
              handleInputData={setcourse_id}
              value1={course_id}

              foraxios={"get_courses"}
            
              labelcolor={"text-blue-900 font-bold font-Roboto"}
              width={"w-1/2 p-3"}
              errormessage={error.course_id ? <>{`${error.course_id}`}</> : <></>}
            />
          </div>
          <div className='p-3'>
          <Heading_text
            text="Add Timing For Classes"
            boldness={"font-bold"}
            family={"font-Roboto"}
            size={"text-xl"}
            color={"text-green-900"}
            decoration={""}
            className={"ml-3 mt-2"}

          />
        </div>
          <div className='flex flex-row'>
          <Custom_input
              type="time"
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
              placeholder={"Class Time From"}
              handleInputData={setclass_from}
              value={class_from}
              labelcolor={"text-blue-900 font-Roboto font-bold"}
              width={"w-1/2 p-3"}
              errormessage={error.class_from ? <>{`${error.class_from}`}</> : <></>}
            />
               <Custom_input
              type="time"
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
              placeholder={"Class Time To"}
              handleInputData={setclass_to}
              value={class_to}
              labelcolor={"text-blue-900 font-Roboto font-bold"}
              width={"w-1/2 p-3"}
              errormessage={error.class_to ? <>{`${error.class_to}`}</> : <></>}
            />
          </div>
          <div className='p-3'>
          <Heading_text
            text="Add Days For Classes"
            boldness={"font-bold"}
            family={"font-Roboto"}
            size={"text-xl"}
            color={"text-green-900"}
            decoration={""}
            className={"ml-3 mt-2"}

          />
        </div>
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
              placeholder={"Class Day From"}
              handleInputData={setclass_day_from}
              value={class_day_from}
              labelcolor={"text-blue-900 font-Roboto font-bold"}
              width={"w-1/2 p-3"}
              errormessage={error.class_day_from ? <>{`${error.class_day_from}`}</> : <></>}
            />
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
              placeholder={"Add Class Day To "}
              handleInputData={setclass_day_to}
              value={class_day_to}
              labelcolor={"text-blue-900 font-Roboto font-bold"}
              width={"w-1/2 p-3"}
              errormessage={error.class_day_to ? <>{`${error.class_day_to}`}</> : <></>}
            />
          </div>
          <div className='p-3'>
          <Heading_text
            text="Add Subject And Semester"
            boldness={"font-bold"}
            family={"font-Roboto"}
            size={"text-xl"}
            color={"text-green-900"}
            decoration={""}
            className={"ml-3 mt-2"}

          />
        </div>
          <div className='flex flex-row'>
          {/* <Custom_input
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
              placeholder={"Add Subject"}
              handleInputData={setsubject}
              value={subject}
              labelcolor={"text-blue-900 font-Roboto font-bold"}
              width={"w-1/2 p-3"}
              errormessage={error.subject ? <>{`${error.subject}`}</> : <></>}
            /> */}

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
              placeholder={"Select Subject "}
              handleInputData={setsubject}
              value1={subject}

              foraxios={"get_subject_list"}
            
              labelcolor={"text-blue-900 font-bold font-Roboto"}
              width={"w-1/2 p-3"}
              errormessage={error.subject ? <>{`${error.subject}`}</> : <></>}
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
              placeholder={"Select Sem/year"}
              handleInputData={setsemester}
              value1={semester}

              option1={"3 year"}
              option2={"2 year"}
              option3={"1 year"}
              option4={"1 sem"}
              option5={"2 sem"}
              option6={"3 sem"}
              option7={"4 sem"}
              option8={"5 sem"}
              option9={"6 sem"}
              labelcolor={"text-blue-900 font-bold font-Roboto"}
              width={"w-1/2 p-3"}
              errormessage={error.semester ? <>{`${error.semester}`}</> : <></>}
            />
          </div>
          <div className=' flex justify-center '>
              <Custom_buttons
                text={"Submit"}
                className="bg-slate-900 hover:bg-indigo-900 text-white px-3 py-2 mt-1  font-bold font-Roboto  text-thin text-center rounded-md flex gap-1"
                onClick={() => submit()}
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3" />
              </svg>}
              />
            </div>
          </div>
        
          </div>
          </>}
    </div>
  )
}
