import React , {useState , useEffect} from 'react'
import Heading_text from '../../Custom-fonts/Heading_text'
import Custom_input from '../../Custom_tags/Custom_input'
import Custom_selectbox from '../../Custom_tags/Custom_selectbox'
import Custom_selectboxes from '../../Custom_tags/Custom_selectboxes'
import Custom_buttons from '../../Custom_tags/Custom_buttons'
import Axios from 'axios'
export default function Manage_subjects() {
    const[course_id , setcourse_id]=useState('')
    const[subject , setsubject]=useState('')
    const[subject_code , setsubject_code]=useState('')
    const[sem , setsem]=useState('')
    const [error, seterror] = useState([])
    const [alert, setalert] = useState([])
    const[data , setdata]=useState([])
    const add_subject=()=>{
        
    try {
        Axios.request({
          url: "add_subject",
          method: "post",
          
        
          
            data:{course_id:course_id , semester:sem ,subject:subject , subject_code:subject_code}
          
     })
          .then((response) => {
  
            if (response.data.status === 422) {
              seterror(response.data.error)
              
            }
            else if (response.data.status === 400) {
              
              setalert(response.data)
             
            }
           
           
  
          })
      } catch (e) {
        console.log(e)
  
      }
    }
    useEffect(() => {


        getsubjects();
        async function getsubjects(){
          
          Axios.get(`get_subject_list`, {
        //     headers: {
        //       Authorization: `Bearer ${token}`
        //   }
          }).then((res)=>{
        
                 setdata(res.data.data)
                
          
          
            
            // console.log(list)
          
          })
         }
    
       
      
    },[])
  return (
    <div>
        <div className='bg-white overflow-auto h-auto p-3'>
        <div className='p-2'>
          <Heading_text
            text="Add Sujects To The Course"
            boldness={"font-bold"}
            family={"font-Roboto"}
            size={"text-2xl"}
            color={"text-blue-900"}
            decoration={"underline"}
            className={"ml-3 mt-1"}

          />
        </div>
        {alert.status===400 ? <>
            <div class="bg-green-100 border my-1 border-green-400 text-slate-900 font-bold px-4 py-3 rounded relative" role="alert">
              <strong class="font-bold">Hi</strong>
              <span class="block sm:inline"> {alert.message}.</span>
             
            </div></> : <></>}
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
              placeholder={"Select Course "}
              handleInputData={setcourse_id}
              value1={course_id}

              foraxios={"get_courses"}
            
              labelcolor={"text-blue-900 font-bold font-Roboto"}
              width={"w-1/2 p-3"}
            errormessage={error.course_id ? <>{`${error.course_id}`}</> : <></>}
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
              placeholder={"Select Sem / year"}
              handleInputData={setsem}
              value1={sem}

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
              placeholder={"Add Subject"}
              handleInputData={setsubject}
              value={subject}
              labelcolor={"text-blue-900 font-Roboto font-bold"}
              width={"w-1/2 p-3"}
            errormessage={error.subject ? <>{`${error.subject}`}</> : <></>}
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
              placeholder={"Add Subject Code"}
              handleInputData={setsubject_code}
              value={subject_code}
              labelcolor={"text-blue-900 font-Roboto font-bold"}
              width={"w-1/2 p-3"}
             errormessage={error.subject ? <>{`${error.subject}`}</> : <></>}
            />
           
        </div>
        <div className=' flex justify-center '>
              <Custom_buttons
                text={"Submit"}
                className="bg-slate-900 hover:bg-indigo-900 text-white px-3 py-2 mt-1  font-bold font-Roboto  text-thin text-center rounded-md flex gap-1"
                onClick={() => add_subject()}
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3" />
              </svg>}
              />
            </div>

           
    </div>
    <div className='bg-white p-3 my-2 '>
    <div className='p-2'>
          <Heading_text
            text="Courses Subjects Lists "
            boldness={"font-bold"}
            family={"font-Roboto"}
            size={"text-xl"}
            color={"text-blue-900"}
            decoration={"underline"}
            className={"ml-1 mt-1"}

          />
        </div>
       <div className='bg-white p-3  pb-20 overflow-auto scrollbar-thin'>
       <table class="table-auto  w-full">
  <thead>
    <tr className='bg-slate-900 '>
    <th className='text-white p-2'>Index</th>
      <th className='text-white p-2'>Course Name</th>
      <th className='text-white p-2'>Subject</th>
      <th className='text-white p-2'>Course Duration</th>
   
      <th className='text-white p-2'>Subject Code</th>
     
      <th className='text-white p-2'>Semester/Year</th>
     
    </tr>
  </thead>
  <tbody>
  {data.map((i , index)=>
    <>
    <tr className='my-2  font-Roboto font-bold'>
    <td className=' shadow-md rounded-sm text-center p-2'>{index}</td>
    <td className='text-center shadow-md  p-2'>{i.course_name}</td>
    <td className='text-center shadow-md  p-2'>{i.subject}</td>
    <td className='text-center shadow-md  p-2'>{i.course_duration}</td>
    <td className='text-center shadow-md  p-2'>{i.subject_code}</td>
    
   
    <td className='text-center shadow-md  p-2'>{i.semester}</td>
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
